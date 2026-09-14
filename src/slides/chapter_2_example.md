# Bài tập thực hành chương 2

---


## 1. Biến đổi trong miền không gian

---


### 1.1. Point Processing vs Neighborhood Processing
**📌 Bài tập 1:**
Cho ảnh `data.camera()`. Hãy:
1. Tạo ảnh âm bản bằng **point processing** (chỉ phụ thuộc pixel hiện tại).
2. Làm mờ ảnh bằng **neighborhood processing** (dùng pixel lân cận).
3. Hiển thị kết quả để so sánh 2 loại xử lý.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh mẫu (ảnh xám, uint8)
img = data.camera()
print(f"Kích thước ảnh: {img.shape}, dtype: {img.dtype}")

# 2. POINT PROCESSING: g(x,y) = T[f(x,y)]
#    → Mỗi pixel đầu ra chỉ phụ thuộc pixel tương ứng ở đầu vào
#    → Dùng phép toán NumPy (nhanh) hoặc cv2.LUT
negative = 255 - img   # công thức: s = L - 1 - r với L = 256

# 3. NEIGHBORHOOD PROCESSING: g(x,y) = T[f(x+s, y+t)]
#    → Mỗi pixel đầu ra phụ thuộc vùng lân cận
#    → Dùng kernel convolution (cv2.blur, cv2.filter2D, ...)
blurred = cv2.blur(img, (5, 5))   # lọc trung bình kernel 5×5

# 4. Hiển thị
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
axes[0].imshow(img, cmap='gray');       axes[0].set_title('Ảnh gốc')
axes[1].imshow(negative, cmap='gray');  axes[1].set_title('Point: Âm bản')
axes[2].imshow(blurred, cmap='gray');   axes[2].set_title('Neighborhood: Làm mờ 5×5')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Ảnh âm bản: đảo sáng tối, giữ nguyên cấu trúc.
- Ảnh làm mờ: mất chi tiết sắc nét, biên bị "nhòe".

---


### 1.2. Ảnh âm bản (Image Negative)
**📌 Bài tập 2:**
Cho ảnh `data.camera()`. Tạo ảnh âm bản theo công thức `s = L - 1 - r` với `L = 256`. So sánh 2 cách cài đặt: NumPy và OpenCV.
```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh xám
img = data.camera()

# 2. Cách 1: Dùng NumPy (đơn giản, nhanh)
#    Công thức: s = 255 - r  (vì L = 256, L-1 = 255)
negative_np = 255 - img

# 3. Cách 2: Dùng OpenCV bitwise_not
#    → Tương đương với 255 - img cho ảnh uint8
negative_cv = cv2.bitwise_not(img)

# 4. Kiểm tra 2 cách cho kết quả giống nhau
diff = np.abs(negative_np.astype(int) - negative_cv.astype(int))
print(f"Sai số tối đa giữa 2 cách: {diff.max()}")

# 5. Hiển thị + histogram
fig, axes = plt.subplots(2, 2, figsize=(13, 9))
axes[0, 0].imshow(img, cmap='gray');           axes[0, 0].set_title('Ảnh gốc')
axes[0, 1].imshow(negative_np, cmap='gray');   axes[0, 1].set_title('Âm bản (255 - r)')
axes[1, 0].hist(img.ravel(), 256, [0, 256], color='gray')
axes[1, 0].set_title('Histogram gốc')
axes[1, 1].hist(negative_np.ravel(), 256, [0, 256], color='gray')
axes[1, 1].set_title('Histogram âm bản (đảo ngược)')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:**
- Histogram của ảnh âm bản là **đảo ngược** của histogram gốc.
- Ứng dụng: tăng cường chi tiết trắng/xám trong vùng tối (ảnh X-quang).

---

### 1.3. Biến đổi Log (Log Transformation)
**📌 Bài tập 3:**
Cho ảnh `data.camera()`. Áp dụng biến đổi Log `s = c·log(1 + r)` với `c = 255 / log(1 + max(r))`. Quan sát tác dụng "mở rộng vùng tối" của phép biến đổi.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh và chuyển sang float32 để tránh tràn số
img = data.camera().astype(np.float32)

# 2. Tính hệ số c
#    → Đảm bảo giá trị lớn nhất sau biến đổi = 255
c = 255.0 / np.log(1 + img.max())
print(f"Hệ số c = {c:.4f}")

# 3. Biến đổi Log: s = c * log(1 + r)
log_img = c * np.log(1 + img)

# 4. Clip về [0, 255] và chuyển về uint8
log_img = np.clip(log_img, 0, 255).astype(np.uint8)

# 5. Hiển thị ảnh + histogram
fig, axes = plt.subplots(2, 2, figsize=(13, 9))
axes[0, 0].imshow(img.astype(np.uint8), cmap='gray'); axes[0, 0].set_title('Ảnh gốc')
axes[0, 1].imshow(log_img, cmap='gray');              axes[0, 1].set_title(f'Log (c={c:.1f})')
axes[1, 0].hist(img.ravel(), 256, [0, 256], color='gray')
axes[1, 0].set_title('Histogram gốc')
axes[1, 1].hist(log_img.ravel(), 256, [0, 256], color='gray')
axes[1, 1].set_title('Histogram sau Log (dịch phải)')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:**
- Vùng tối được "nâng sáng" rõ rệt.
- Histogram dịch về phía phải (giá trị cao).
- Ứng dụng: hiển thị phổ Fourier, ảnh thiên văn.

---

### 1.4. Biến đổi Gamma (Power-Law)

**📌 Bài tập 4:**
Cho ảnh `data.camera()`. Áp dụng biến đổi Gamma `s = c·r^γ` với `γ ∈ {0.2, 0.5, 1.0, 2.0, 4.0}` dùng `cv2.LUT`. Quan sát ảnh hưởng của γ.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh xám
img = data.camera()

# 2. Hàm biến đổi Gamma dùng LUT (Look-Up Table)
def gamma_transform(img, gamma):
    """
    Áp dụng biến đổi Gamma.
    - LUT: bảng tra 256 giá trị → áp dụng song song, rất nhanh.
    - Công thức: s = (r/255)^γ * 255
    """
    lut = np.array([
        np.clip((i / 255.0) ** gamma * 255, 0, 255)
        for i in range(256)
    ], dtype=np.uint8)
    return cv2.LUT(img, lut)

# 3. Áp dụng với nhiều γ
gammas = [0.2, 0.5, 1.0, 2.0, 4.0]
results = [gamma_transform(img, g) for g in gammas]

# 4. Hiển thị ảnh gốc + 5 kết quả
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
axes[0, 0].imshow(img, cmap='gray'); axes[0, 0].set_title('Ảnh gốc')
for i, (g, r) in enumerate(zip(gammas, results)):
    ax = axes[(i + 1) // 3, (i + 1) % 3]
    ax.imshow(r, cmap='gray')
    ax.set_title(f'γ = {g}')
    ax.axis('off')
for ax in axes.ravel()[:1]: ax.axis('off')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:**
- `γ < 1` (0.2, 0.5): ảnh **sáng hơn**, mở rộng vùng tối.
- `γ = 1`: không đổi.
- `γ > 1` (2.0, 4.0): ảnh **tối hơn**, mở rộng vùng sáng.

---

### 1.5. Contrast Stretching (Piecewise-Linear)

**📌 Bài tập 5:**
Cho ảnh `data.camera()`. Áp dụng biến đổi tuyến tính từng đoạn 3 đoạn với `(r1, s1, r2, s2) = (70, 0, 180, 255)` để tăng độ tương phản. So sánh với ảnh gốc qua histogram.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()

# 2. Hàm contrast stretching 3 đoạn
def contrast_stretch(img, r1, s1, r2, s2):
    """
    Biến đổi tuyến tính từng đoạn (piecewise-linear) 3 đoạn:
    - Đoạn 1: (0, 0) → (r1, s1)         [dốc nhỏ]
    - Đoạn 2: (r1, s1) → (r2, s2)       [dốc lớn → tăng tương phản]
    - Đoạn 3: (r2, s2) → (255, 255)      [dốc nhỏ]
    """
    L = 256
    lut = np.zeros(256, dtype=np.uint8)
    for r in range(L):
        if r < r1:
            # Đoạn 1: nội suy tuyến tính từ (0,0) đến (r1, s1)
            s = s1 * r / r1
        elif r <= r2:
            # Đoạn 2: nội suy tuyến tính từ (r1, s1) đến (r2, s2)
            s = s1 + (s2 - s1) * (r - r1) / (r2 - r1)
        else:
            # Đoạn 3: nội suy tuyến tính từ (r2, s2) đến (255, 255)
            s = s2 + (L - 1 - s2) * (r - r2) / (L - 1 - r2)
        lut[r] = int(np.clip(s, 0, 255))
    return cv2.LUT(img, lut)

# 3. Áp dụng với 2 bộ tham số
out1 = contrast_stretch(img, 70, 0, 180, 255)      # tăng vừa
out2 = contrast_stretch(img, 100, 0, 150, 255)     # tăng mạnh

# 4. Hiển thị + histogram
fig, axes = plt.subplots(2, 3, figsize=(15, 9))
axes[0, 0].imshow(img, cmap='gray');   axes[0, 0].set_title('Ảnh gốc');         axes[0, 0].axis('off')
axes[0, 1].imshow(out1, cmap='gray');  axes[0, 1].set_title('(70,0)-(180,255)'); axes[0, 1].axis('off')
axes[0, 2].imshow(out2, cmap='gray');  axes[0, 2].set_title('(100,0)-(150,255)'); axes[0, 2].axis('off')
axes[1, 0].hist(img.ravel(),  256, [0, 256], color='gray'); axes[1, 0].set_title('Histogram gốc')
axes[1, 1].hist(out1.ravel(), 256, [0, 256], color='gray'); axes[1, 1].set_title('Histogram out1')
axes[1, 2].hist(out2.ravel(), 256, [0, 256], color='gray'); axes[1, 2].set_title('Histogram out2')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:** Đoạn dốc càng lớn (out2), tương phản càng mạnh — histogram dàn trải rộng hơn.

---

### 1.6. Gray-Level Slicing & Bit-Plane Slicing
**📌 Bài tập 6:**
Cho ảnh `data.camera()`.
1. **Gray-level slicing:** làm nổi bật dải mức xám `[100, 150]` theo 2 biến thể (binary + preserve).
2. **Bit-plane slicing:** trích xuất 8 bit-plane.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()
a, b = 100, 150   # dải mức xám cần làm nổi bật

# 2a. Gray-level slicing — Binary
binary_slice = np.where((img >= a) & (img <= b), 255, 0).astype(np.uint8)

# 2b. Gray-level slicing — Preserve
preserve_slice = img.copy()
preserve_slice[(img >= a) & (img <= b)] = 255

# 3. Bit-plane slicing — trích xuất 8 bit-plane
planes = [((img >> bit) & 1) * 255 for bit in range(8)]

# 4. Hiển thị — ✅ SỬA: dùng lưới 3×5 thay vì 2×5
fig, axes = plt.subplots(3, 5, figsize=(18, 10))

# Hàng 0: ảnh gốc + 2 kết quả slicing
axes[0, 0].imshow(img, cmap='gray')
axes[0, 0].set_title('Ảnh gốc')

axes[0, 1].imshow(binary_slice, cmap='gray')
axes[0, 1].set_title(f'Binary [{a},{b}]')

axes[0, 2].imshow(preserve_slice, cmap='gray')
axes[0, 2].set_title(f'Preserve [{a},{b}]')

# Hàng 1 + 2: 8 bit-plane (5 ô hàng 1 + 3 ô hàng 2)
for i, p in enumerate(planes):
    row = 1 + i // 5    # i=0..4 → row 1 ; i=5..7 → row 2
    col = i % 5
    axes[row, col].imshow(p, cmap='gray')
    axes[row, col].set_title(f'Bit {i} (2^{i}={2**i})')

# 5. Ẩn tất cả các trục còn lại
for ax in axes.ravel():
    ax.axis('off')

plt.tight_layout()
plt.show()
```

**📸 Kết quả mong đợi:**
- **Binary slicing:** chỉ giữ pixel trong dải, còn lại đen.
- **Preserve slicing:** làm nổi bật dải nhưng vẫn giữ nền.
- **Bit 7 (MSB):** mang cấu trúc chính của ảnh.
- **Bit 0 (LSB):** chủ yếu là nhiễu, ít thông tin.

---

### 1.7. Cơ chế Convolution với cv2.filter2D

**📌 Bài tập 7:**
Cho ảnh `data.camera()`. Áp dụng một kernel 3×3 tự định nghĩa bằng `cv2.filter2D`. So sánh kết quả với kernel identity (giữ nguyên ảnh) và kernel làm mờ.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh xám
img = data.camera()

# 2. Định nghĩa các kernel
# 2a. Kernel identity — giữ nguyên ảnh (kiểm tra cơ chế)
kernel_identity = np.array([
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
], dtype=np.float32)

# 2b. Kernel làm mờ 3×3 — mỗi phần tử = 1/9
kernel_blur = np.ones((3, 3), dtype=np.float32) / 9

# 2c. Kernel làm nét 3×3
kernel_sharpen = np.array([
    [ 0, -1,  0],
    [-1,  5, -1],
    [ 0, -1,  0]
], dtype=np.float32)

# 3. Áp dụng cv2.filter2D
#    ddepth = -1 → giữ nguyên kiểu dữ liệu đầu vào (uint8)
result_identity = cv2.filter2D(img, -1, kernel_identity)
result_blur     = cv2.filter2D(img, -1, kernel_blur)
result_sharp    = cv2.filter2D(img, -1, kernel_sharpen)

# 4. Hiển thị
fig, axes = plt.subplots(1, 4, figsize=(18, 5))
axes[0].imshow(img, cmap='gray');             axes[0].set_title('Ảnh gốc'); axes[0].axis('off')
axes[1].imshow(result_identity, cmap='gray'); axes[1].set_title('Kernel identity (giữ nguyên)'); axes[1].axis('off')
axes[2].imshow(result_blur, cmap='gray');     axes[2].set_title('Kernel làm mờ 3×3'); axes[2].axis('off')
axes[3].imshow(result_sharp, cmap='gray');    axes[3].set_title('Kernel làm nét 3×3'); axes[3].axis('off')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:**
- **Identity:** ảnh không đổi (kiểm tra cơ chế tích chập).
- **Blur:** ảnh mờ nhẹ.
- **Sharpen:** biên được làm nổi bật.

---


### 1.8. Mean Filter (cv2.blur)

**📌 Bài tập 8:**
Cho ảnh `data.camera()`. Áp dụng lọc trung bình với các kích thước kernel `{3×3, 5×5, 9×9, 15×15}`. So sánh mức độ mờ của ảnh khi kernel tăng.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()

# 2. Áp dụng cv2.blur với nhiều kích thước kernel
#    → Kernel càng lớn → ảnh càng mờ
ksizes = [3, 5, 9, 15]
results = [cv2.blur(img, (k, k)) for k in ksizes]

# 3. Kiểm tra tương đương với cv2.filter2D cho kernel 3×3
kernel_3x3 = np.ones((3, 3), dtype=np.float32) / 9
filter2d_result = cv2.filter2D(img, -1, kernel_3x3)
diff = np.abs(results[0].astype(int) - filter2d_result.astype(int))
print(f"Sai số tối đa giữa cv2.blur(3×3) và cv2.filter2D: {diff.max()}")

# 4. Hiển thị
fig, axes = plt.subplots(1, 5, figsize=(20, 4))
axes[0].imshow(img, cmap='gray'); axes[0].set_title('Ảnh gốc'); axes[0].axis('off')
for i, (k, r) in enumerate(zip(ksizes, results)):
    axes[i+1].imshow(r, cmap='gray')
    axes[i+1].set_title(f'Kernel {k}×{k}')
    axes[i+1].axis('off')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:** Kernel càng lớn → ảnh càng mờ, chi tiết nhỏ bị mất.

---

### 1.9. Gaussian Filter (cv2.GaussianBlur)

**📌 Bài tập 9:**
Cho ảnh `data.camera()`. Áp dụng lọc Gaussian với:
1. Cùng `ksize=5×5`, thay đổi `σ ∈ {1, 3, 5}`.
2. Cùng `σ=5`, thay đổi `ksize ∈ {5×5, 11×11, 15×15}`.
So sánh với lọc Mean 5×5 để thấy sự khác biệt.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()

# 2a. Cùng ksize, thay đổi sigma
g_sigma_1 = cv2.GaussianBlur(img, (5, 5), sigmaX=1)
g_sigma_3 = cv2.GaussianBlur(img, (5, 5), sigmaX=3)
g_sigma_5 = cv2.GaussianBlur(img, (5, 5), sigmaX=5)

# 2b. Cùng sigma, thay đổi ksize
g_k5  = cv2.GaussianBlur(img, (5, 5),  sigmaX=5)
g_k11 = cv2.GaussianBlur(img, (11, 11), sigmaX=5)
g_k15 = cv2.GaussianBlur(img, (15, 15), sigmaX=5)

# 2c. So sánh với Mean 5×5
mean_5 = cv2.blur(img, (5, 5))

# 3. Hiển thị
fig, axes = plt.subplots(2, 4, figsize=(18, 9))
axes[0, 0].imshow(img, cmap='gray');      axes[0, 0].set_title('Ảnh gốc')
axes[0, 1].imshow(g_sigma_1, cmap='gray'); axes[0, 1].set_title('Gaussian k=5, σ=1')
axes[0, 2].imshow(g_sigma_3, cmap='gray'); axes[0, 2].set_title('Gaussian k=5, σ=3')
axes[0, 3].imshow(g_sigma_5, cmap='gray'); axes[0, 3].set_title('Gaussian k=5, σ=5')
axes[1, 0].imshow(mean_5, cmap='gray');    axes[1, 0].set_title('Mean 5×5 (so sánh)')
axes[1, 1].imshow(g_k5,  cmap='gray');     axes[1, 1].set_title('Gaussian k=5,  σ=5')
axes[1, 2].imshow(g_k11, cmap='gray');     axes[1, 2].set_title('Gaussian k=11, σ=5')
axes[1, 3].imshow(g_k15, cmap='gray');     axes[1, 3].set_title('Gaussian k=15, σ=5')
for ax in axes.ravel(): ax.axis('off')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:**
- σ càng lớn → mờ càng mạnh (cùng ksize).
- Gaussian mượt tự nhiên hơn Mean, ít để lại hiệu ứng "khối vuông".

---

### 1.10. Median Filter — Khử nhiễu muối tiêu

**📌 Bài tập 10:**
Cho ảnh `data.camera()`. Thêm nhiễu muối tiêu (salt-and-pepper) với tỉ lệ 5%. Khử nhiễu bằng:
1. `cv2.medianBlur` với `k ∈ {3, 5}`.
2. `cv2.blur` (mean) với kernel `3×3` để so sánh.
Tính MSE giữa kết quả và ảnh gốc.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh gốc
img = data.camera()

# 2. Hàm thêm nhiễu muối tiêu
def add_salt_pepper(img, ratio=0.05):
    """Thêm nhiễu muối (trắng) + tiêu (đen) với tỉ lệ cho trước."""
    noisy = img.copy()
    n = int(ratio * img.size)                       # số pixel bị nhiễu
    # Muối (trắng)
    coords = [np.random.randint(0, d, n) for d in img.shape]
    noisy[coords[0], coords[1]] = 255
    # Tiêu (đen)
    coords = [np.random.randint(0, d, n) for d in img.shape]
    noisy[coords[0], coords[1]] = 0
    return noisy

# 3. Tạo ảnh nhiễu
noisy = add_salt_pepper(img, ratio=0.05)

# 4. Khử nhiễu
med_3 = cv2.medianBlur(noisy, 3)       # median kernel 3×3
med_5 = cv2.medianBlur(noisy, 5)       # median kernel 5×5
mean_3 = cv2.blur(noisy, (3, 3))       # mean 3×3 (để so sánh)

# 5. Tính MSE so với ảnh gốc
def mse(a, b):
    return np.mean((a.astype(np.float32) - b.astype(np.float32)) ** 2)

print(f"MSE ảnh nhiễu:  {mse(img, noisy):.2f}")
print(f"MSE Median 3:   {mse(img, med_3):.2f}")
print(f"MSE Median 5:   {mse(img, med_5):.2f}")
print(f"MSE Mean 3:     {mse(img, mean_3):.2f}")

# 6. Hiển thị
fig, axes = plt.subplots(1, 5, figsize=(20, 4))
for ax, (im, t) in zip(axes, [
    (img, 'Ảnh gốc'),
    (noisy, 'Nhiễu muối tiêu 5%'),
    (med_3, 'Median 3×3'),
    (med_5, 'Median 5×5'),
    (mean_3, 'Mean 3×3 (kém)')
]):
    ax.imshow(im, cmap='gray'); ax.set_title(t); ax.axis('off')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:** Median khử muối tiêu cực tốt và giữ biên sắc nét; Mean chỉ làm mờ nhiễu chứ không khử được.

---

### 1.11. Bilateral Filter

**📌 Bài tập 11:**
Cho ảnh `data.astronaut()`. Áp dụng Bilateral Filter để **làm mịn nhưng giữ biên**. So sánh với Gaussian blur ở cùng mức độ mờ.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh màu (RGB)
img_rgb = data.astronaut()
# Chuyển sang BGR cho OpenCV
img_bgr = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2BGR)

# 2. Bilateral Filter
#    - d=9: đường kính vùng lân cận
#    - sigmaColor=75: trọng số màu sắc
#    - sigmaSpace=75: trọng số không gian
bilateral = cv2.bilateralFilter(img_bgr, d=9,
                                 sigmaColor=75, sigmaSpace=75)

# 3. Gaussian blur để so sánh
gaussian = cv2.GaussianBlur(img_bgr, (9, 9), sigmaX=3)

# 4. Hiển thị (chuyển BGR → RGB để hiển thị đúng)
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
for ax, (im, t) in zip(axes, [
    (img_bgr, 'Ảnh gốc'),
    (gaussian, 'Gaussian (mờ cả biên)'),
    (bilateral, 'Bilateral (giữ biên)')
]):
    ax.imshow(cv2.cvtColor(im, cv2.COLOR_BGR2RGB))
    ax.set_title(t); ax.axis('off')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:**
- **Gaussian:** làm mờ đều cả vùng phẳng lẫn biên.
- **Bilateral:** làm mịn vùng phẳng (da), giữ biên sắc nét (mắt, tóc).

---

### 1.12. Bộ lọc Laplacian — Làm nét ảnh

**📌 Bài tập 12:**
Cho ảnh `data.camera()`. Làm nét ảnh theo công thức `g = f - k·∇²f` với `k ∈ {0.5, 1.0, 2.0}`. Hiển thị ảnh Laplace (chuẩn hóa) và 3 kết quả.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()

# 2. Tính Laplacian
#    - CV_64F: độ sâu 64-bit float để giữ giá trị âm
#    - Kernel mặc định có tâm âm (-4)
laplacian = cv2.Laplacian(img, cv2.CV_64F)

# 3. Hàm làm nét: g = f - k·Laplacian
def sharpen(img, laplacian, k):
    """Làm nét ảnh với hệ số k."""
    g = img.astype(np.float64) - k * laplacian
    return np.clip(g, 0, 255).astype(np.uint8)

# 4. Làm nét với 3 hệ số k
sharp_05 = sharpen(img, laplacian, 0.5)
sharp_10 = sharpen(img, laplacian, 1.0)
sharp_20 = sharpen(img, laplacian, 2.0)

# 5. Chuẩn hóa Laplacian để hiển thị
lap_vis = cv2.normalize(np.abs(laplacian), None,
                        0, 255, cv2.NORM_MINMAX).astype(np.uint8)

# 6. Hiển thị
fig, axes = plt.subplots(1, 5, figsize=(20, 4))
for ax, (im, t) in zip(axes, [
    (img, 'Ảnh gốc'),
    (lap_vis, '|Laplacian| (chuẩn hóa)'),
    (sharp_05, 'Làm nét k=0.5'),
    (sharp_10, 'Làm nét k=1.0'),
    (sharp_20, 'Làm nét k=2.0 (quá mức)')
]):
    ax.imshow(im, cmap='gray'); ax.set_title(t); ax.axis('off')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:**
- `|Laplacian|`: ảnh biên (đường viền mảnh).
- `k=1.0`: nổi bật chi tiết.
- `k=2.0`: bắt đầu xuất hiện nhiễu và quầng sáng.

---


### 1.13. Sobel Gradient và phát hiện biên

**📌 Bài tập 13:**
Cho ảnh `data.camera()`. Tính gradient theo 2 hướng X, Y bằng Sobel. Tính độ lớn gradient theo 2 cách: chính xác `M = √(Gx² + Gy²)` và xấp xỉ `M ≈ |Gx| + |Gy|`. So sánh sai số.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()

# 2. Tính đạo hàm theo 2 hướng
#    CV_64F để giữ giá trị âm
Gx = cv2.Sobel(img, cv2.CV_64F, 1, 0, ksize=3)   # đạo hàm ngang
Gy = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=3)   # đạo hàm dọc

# 3. Độ lớn gradient — 2 cách
M_exact  = np.sqrt(Gx**2 + Gy**2)         # chính xác
M_approx = np.abs(Gx) + np.abs(Gy)        # xấp xỉ (nhanh hơn)

# 4. So sánh sai số
diff = np.abs(M_exact - M_approx)
print(f"Sai số tuyệt đối trung bình: {diff.mean():.2f}")
print(f"Sai số tuyệt đối tối đa:     {diff.max():.2f}")

# 5. Chuẩn hóa để hiển thị
def norm_vis(x):
    return cv2.normalize(np.abs(x), None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)

# 6. Hiển thị
fig, axes = plt.subplots(1, 5, figsize=(20, 4))
for ax, (im, t) in zip(axes, [
    (img, 'Ảnh gốc'),
    (norm_vis(Gx), '|Gx| (đạo hàm ngang)'),
    (norm_vis(Gy), '|Gy| (đạo hàm dọc)'),
    (norm_vis(M_exact), 'M = √(Gx²+Gy²)'),
    (norm_vis(M_approx), 'M ≈ |Gx|+|Gy|')
]):
    ax.imshow(im, cmap='gray'); ax.set_title(t); ax.axis('off')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:**
- `Gx`: làm nổi bật biên dọc (thay đổi theo hướng x).
- `Gy`: làm nổi bật biên ngang.
- `M`: làm nổi bật tất cả biên.

---

### 1.14. Unsharp Masking & Highboost Filtering

**📌 Bài tập 14:**
Cho ảnh `data.camera()`. Áp dụng Unsharp Masking (k=1) và Highboost (k=1.5, 2.5) theo công thức `g = f + k·(f - f_blur)`.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()

# 2. Bước 1: Làm mờ ảnh gốc bằng Gaussian
f_blur = cv2.GaussianBlur(img, (5, 5), sigmaX=2)

# 3. Bước 2: Tạo mask = f - f_blur (phần chi tiết bị mất khi làm mờ)
mask = img.astype(np.float32) - f_blur.astype(np.float32)

# 4. Bước 3: Cộng mask vào ảnh gốc với hệ số k
def highboost(img, mask, k):
    """
    Unsharp Masking / Highboost Filtering.
    - k = 1: Unsharp Masking (làm nét tiêu chuẩn)
    - k > 1: Highboost Filtering (làm nét mạnh)
    """
    g = img.astype(np.float32) + k * mask
    return np.clip(g, 0, 255).astype(np.uint8)

usm   = highboost(img, mask, 1.0)   # Unsharp Masking
hb_15 = highboost(img, mask, 1.5)   # Highboost nhẹ
hb_25 = highboost(img, mask, 2.5)   # Highboost mạnh

# 5. Hiển thị
fig, axes = plt.subplots(1, 5, figsize=(20, 4))
mask_vis = cv2.normalize(mask, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)
for ax, (im, t) in zip(axes, [
    (img, 'Ảnh gốc'),
    (f_blur, 'f_blur (Gaussian)'),
    (mask_vis, 'Mask = f - f_blur'),
    (usm, 'Unsharp (k=1.0)'),
    (hb_25, 'Highboost (k=2.5)')
]):
    ax.imshow(im, cmap='gray'); ax.set_title(t); ax.axis('off')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:**
- `k=1.0`: làm nét tự nhiên.
- `k=2.5`: làm nét mạnh nhưng xuất hiện quầng sáng (halo) quanh biên.

---

## 2. Xử lý histogram

---


### 2.1. Tính Histogram với cv2.calcHist

**📌 Bài tập 15:**
Cho ảnh `data.camera()`. Tính histogram theo 3 cách:
1. Dùng `cv2.calcHist` — histogram xám.
2. Histogram chuẩn hóa (xác suất).
3. Histogram với mask (chỉ tính vùng quan tâm).

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()

# 2. Histogram xám cơ bản
#    - [img]: danh sách ảnh
#    - [0]: kênh 0 (xám)
#    - None: không dùng mask
#    - [256]: 256 bin
#    - [0, 256]: khoảng giá trị
hist = cv2.calcHist([img], [0], None, [256], [0, 256])

# 3. Histogram chuẩn hóa (xác suất)
hist_norm = hist / hist.sum()

# 4. Histogram với mask (chỉ tính vùng 100:300 × 100:300)
mask = np.zeros(img.shape, dtype=np.uint8)
mask[100:300, 100:300] = 255
hist_masked = cv2.calcHist([img], [0], mask, [256], [0, 256])

# 5. Hiển thị
fig, axes = plt.subplots(2, 2, figsize=(13, 9))
axes[0, 0].imshow(img, cmap='gray');        axes[0, 0].set_title('Ảnh gốc')
axes[0, 1].imshow(mask, cmap='gray');       axes[0, 1].set_title('Mask (vùng 100:300)')
axes[1, 0].plot(hist, color='steelblue');   axes[1, 0].set_title('Histogram toàn ảnh')
axes[1, 1].plot(hist_masked, color='crimson'); axes[1, 1].set_title('Histogram với mask')
plt.tight_layout(); plt.show()

print(f"Tổng pixel: {hist.sum():.0f}")
print(f"Max bin: {hist.argmax()} với {hist.max():.0f} pixel")
```

**📸 Kết quả mong đợi:** Histogram với mask chỉ tính pixel trong vùng chỉ định.

---

### 2.2. Cân bằng Histogram (Equalization)

**📌 Bài tập 16:**
Cho ảnh `data.camera()` và một phiên bản tối của nó (nhân 0.4). Áp dụng `cv2.equalizeHist` và so sánh histogram trước/sau.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh và tạo ảnh tối
img = data.camera()
dark_img = (img.astype(np.float32) * 0.4).astype(np.uint8)

# 2. Cân bằng histogram
eq_dark   = cv2.equalizeHist(dark_img)
eq_normal = cv2.equalizeHist(img)

# 3. Hiển thị: ảnh + histogram
fig, axes = plt.subplots(3, 2, figsize=(13, 12))
axes[0, 0].imshow(dark_img, cmap='gray'); axes[0, 0].set_title('Ảnh tối (×0.4)'); axes[0, 0].axis('off')
axes[0, 1].hist(dark_img.ravel(), 256, [0, 256], color='gray'); axes[0, 1].set_title('Histogram ảnh tối')
axes[1, 0].imshow(eq_dark, cmap='gray');  axes[1, 0].set_title('Sau cân bằng'); axes[1, 0].axis('off')
axes[1, 1].hist(eq_dark.ravel(), 256, [0, 256], color='gray'); axes[1, 1].set_title('Histogram sau cân bằng')
axes[2, 0].imshow(img, cmap='gray');      axes[2, 0].set_title('Ảnh gốc'); axes[2, 0].axis('off')
axes[2, 1].imshow(eq_normal, cmap='gray'); axes[2, 1].set_title('Cân bằng ảnh gốc'); axes[2, 1].axis('off')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:** Ảnh tối sau cân bằng có tương phản tăng rõ rệt, histogram dàn trải đều hơn.

---

### 2.3. Khớp Histogram (Histogram Matching)

**📌 Bài tập 17:**
Cho 2 ảnh: `data.camera()` (source) và `data.moon()` (template). Biến đổi histogram của source sao cho giống histogram của template.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Load 2 ảnh
source   = data.camera()
template = data.moon()

# 2. Hàm khớp histogram
def histogram_matching(source, template):
    """
    Biến đổi histogram source giống template.
    Quy trình:
    1. Tính histogram của source và template
    2. Tính CDF (Cumulative Distribution Function)
    3. Ánh xạ: với mỗi mức xám i của source → tìm j trong template
       sao cho CDF_template(j) >= CDF_source(i)
    """
    # Histogram
    src_hist, _  = np.histogram(source.flatten(),   256, [0, 256])
    tmpl_hist, _ = np.histogram(template.flatten(), 256, [0, 256])

    # CDF (chuẩn hóa về [0, 1])
    src_cdf  = np.cumsum(src_hist).astype(np.float64);  src_cdf  /= src_cdf[-1]
    tmpl_cdf = np.cumsum(tmpl_hist).astype(np.float64); tmpl_cdf /= tmpl_cdf[-1]

    # Ánh xạ ngược
    mapping = np.zeros(256, dtype=np.uint8)
    for i in range(256):
        j = np.searchsorted(tmpl_cdf, src_cdf[i])   # tìm j đầu tiên có tmpl_cdf[j] >= src_cdf[i]
        mapping[i] = min(j, 255)

    return mapping[source]

# 3. Áp dụng
matched = histogram_matching(source, template)

# 4. Hiển thị ảnh + histogram
fig, axes = plt.subplots(2, 3, figsize=(15, 9))
axes[0, 0].imshow(source, cmap='gray');  axes[0, 0].set_title('Source (camera)'); axes[0, 0].axis('off')
axes[0, 1].imshow(template, cmap='gray'); axes[0, 1].set_title('Template (moon)'); axes[0, 1].axis('off')
axes[0, 2].imshow(matched, cmap='gray');  axes[0, 2].set_title('Matched'); axes[0, 2].axis('off')
axes[1, 0].hist(source.ravel(),   256, [0, 256], color='gray'); axes[1, 0].set_title('Histogram source')
axes[1, 1].hist(template.ravel(), 256, [0, 256], color='gray'); axes[1, 1].set_title('Histogram template')
axes[1, 2].hist(matched.ravel(),  256, [0, 256], color='gray'); axes[1, 2].set_title('Histogram matched')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:** Histogram của ảnh matched gần khớp với histogram template.

---


### 2.4. CLAHE (Cân bằng cục bộ)

**📌 Bài tập 18:**
Cho ảnh `data.page()` (trang văn bản scan có chiếu sáng không đều). So sánh `cv2.equalizeHist` (toàn cục) với `cv2.createCLAHE` (cục bộ).

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.page()

# 2. Cân bằng toàn cục
global_eq = cv2.equalizeHist(img)

# 3. CLAHE — Cân bằng cục bộ
#    - clipLimit=2.0: giới hạn tương phản (tránh khuếch đại nhiễu)
#    - tileGridSize=(8,8): chia ảnh thành 8×8 tile
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
clahe_img = clahe.apply(img)

# 4. Thử với tile lớn hơn
clahe_2 = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(16, 16))
clahe_img_2 = clahe_2.apply(img)

# 5. Hiển thị
fig, axes = plt.subplots(1, 4, figsize=(18, 5))
for ax, (im, t) in zip(axes, [
    (img, 'Ảnh gốc (page)'),
    (global_eq, 'Global Equalize'),
    (clahe_img, 'CLAHE tile=8×8'),
    (clahe_img_2, 'CLAHE tile=16×16')
]):
    ax.imshow(im, cmap='gray'); ax.set_title(t); ax.axis('off')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:** CLAHE xử lý tốt hơn trên ảnh có chiếu sáng không đều; Global bị "chết" ở vùng tối.

---

## 3. Biến đổi trong miền tần số

---


### 3.1. Biến đổi Fourier và Phổ tần số

**📌 Bài tập 19:**
Cho ảnh `data.camera()`. Tính FFT 2D và hiển thị:
1. Phổ biên độ (log scale).
2. Phổ pha.
3. Chứng minh tính chất dịch chuyển: dịch ảnh đi (50, 50) — phổ biên độ **không đổi**.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera().astype(np.float32)

# 2. FFT ảnh gốc
F = np.fft.fft2(img)
Fshift = np.fft.fftshift(F)          # dịch tâm về giữa

# 3. Phổ biên độ (log scale để hiển thị)
magnitude = 20 * np.log(1 + np.abs(Fshift))
mag_vis = cv2.normalize(magnitude, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)

# 4. Phổ pha
phase = np.angle(Fshift)

# 5. Kiểm tra tính dịch chuyển: dịch ảnh đi (50, 50)
img_shifted = np.roll(np.roll(img, 50, axis=0), 50, axis=1)
F2 = np.fft.fft2(img_shifted)
Fshift2 = np.fft.fftshift(F2)

# So sánh phổ biên độ
diff_mag = np.mean(np.abs(np.abs(Fshift) - np.abs(Fshift2)))
print(f"Sai số trung bình phổ biên độ giữa 2 ảnh: {diff_mag:.6f}")
print("→ Dịch chuyển trong không gian KHÔNG làm thay đổi phổ biên độ")

# 6. Hiển thị
fig, axes = plt.subplots(2, 2, figsize=(13, 10))
axes[0, 0].imshow(img.astype(np.uint8), cmap='gray'); axes[0, 0].set_title('Ảnh gốc'); axes[0, 0].axis('off')
axes[0, 1].imshow(img_shifted.astype(np.uint8), cmap='gray'); axes[0, 1].set_title('Ảnh dịch (50,50)'); axes[0, 1].axis('off')
axes[1, 0].imshow(mag_vis, cmap='gray'); axes[1, 0].set_title('Phổ biên độ ảnh gốc'); axes[1, 0].axis('off')
axes[1, 1].imshow(cv2.normalize(20*np.log(1+np.abs(Fshift2)), None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8), cmap='gray')
axes[1, 1].set_title('Phổ biên độ ảnh dịch (giống hệt)'); axes[1, 1].axis('off')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:**
- Tâm phổ rất sáng → thành phần DC (độ sáng trung bình).
- Càng xa tâm → tần số càng cao (biên, chi tiết).
- Phổ biên độ 2 ảnh **giống hệt nhau** → xác nhận tính chất Translation.

---

### 3.2. Lọc thông thấp Ideal (ILPF)

**📌 Bài tập 20:**
Cho ảnh `data.camera()`. Áp dụng Ideal Low-Pass Filter (ILPF) với `D0 ∈ {10, 30, 60}`. Quan sát hiện tượng **ringing** (rung) khi D0 nhỏ.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()

# 2. Hàm tạo mask Ideal LPF
def ideal_lpf(shape, D0):
    """Tạo mask ILPF: H(u,v) = 1 nếu D(u,v) <= D0, ngược lại = 0."""
    M, N = shape
    u = np.arange(M).reshape(-1, 1) - M // 2
    v = np.arange(N).reshape(1, -1) - N // 2
    D = np.sqrt(u**2 + v**2)
    return (D <= D0).astype(np.float32)

# 3. Hàm áp dụng bộ lọc trong miền tần số
def apply_filter(img, H):
    """Áp dụng bộ lọc H trong miền tần số."""
    F = np.fft.fft2(img.astype(np.float32))
    Fshift = np.fft.fftshift(F)
    G = Fshift * H
    g = np.abs(np.fft.ifft2(np.fft.ifftshift(G)))
    return np.clip(g, 0, 255).astype(np.uint8)

# 4. Áp dụng với 3 giá trị D0
D0_list = [10, 30, 60]
results = [apply_filter(img, ideal_lpf(img.shape, D0)) for D0 in D0_list]

# 5. Hiển thị
fig, axes = plt.subplots(1, 4, figsize=(18, 5))
axes[0].imshow(img, cmap='gray'); axes[0].set_title('Ảnh gốc'); axes[0].axis('off')
for i, (D0, r) in enumerate(zip(D0_list, results)):
    axes[i+1].imshow(r, cmap='gray')
    axes[i+1].set_title(f'ILPF D0={D0}')
    axes[i+1].axis('off')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:** D0 nhỏ → ảnh mờ mạnh và có **ringing** rõ; D0 lớn → giữ chi tiết hơn.

---

### 3.3. Lọc thông thấp Gaussian (GLPF)

**📌 Bài tập 21:**
Cho ảnh `data.camera()`. Áp dụng Gaussian LPF với `D0 ∈ {10, 30, 60}`. So sánh với ILPF để thấy GLPF **không gây ringing**.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()

# 2. Hàm tạo mask Gaussian LPF
def gaussian_lpf(shape, D0):
    """Tạo mask GLPF: H(u,v) = exp(-D²(u,v) / (2·D0²))"""
    M, N = shape
    u = np.arange(M).reshape(-1, 1) - M // 2
    v = np.arange(N).reshape(1, -1) - N // 2
    D2 = u**2 + v**2
    return np.exp(-D2 / (2 * D0**2)).astype(np.float32)

# 3. Hàm áp dụng bộ lọc
def apply_filter(img, H):
    F = np.fft.fft2(img.astype(np.float32))
    Fshift = np.fft.fftshift(F)
    G = Fshift * H
    g = np.abs(np.fft.ifft2(np.fft.ifftshift(G)))
    return np.clip(g, 0, 255).astype(np.uint8)

# 4. Áp dụng với 3 giá trị D0
D0_list = [10, 30, 60]
results = [apply_filter(img, gaussian_lpf(img.shape, D0)) for D0 in D0_list]

# 5. Hiển thị
fig, axes = plt.subplots(1, 4, figsize=(18, 5))
axes[0].imshow(img, cmap='gray'); axes[0].set_title('Ảnh gốc'); axes[0].axis('off')
for i, (D0, r) in enumerate(zip(D0_list, results)):
    axes[i+1].imshow(r, cmap='gray')
    axes[i+1].set_title(f'GLPF D0={D0}')
    axes[i+1].axis('off')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:** GLPF cho kết quả mượt, **không có ringing** như ILPF.

---

### 3.4. Lọc thông cao & High-Frequency Emphasis

**📌 Bài tập 22:**
Cho ảnh `data.camera()`. Áp dụng:
1. HPF thuần `H_HP = 1 - H_LP` → quan sát ảnh tối đen.
2. High-frequency Emphasis `H = a + b·H_HP` với `(a, b) = (0.5, 2.0)`.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()

# 2. Hàm Gaussian LPF
def gaussian_lpf(shape, D0):
    M, N = shape
    u = np.arange(M).reshape(-1, 1) - M // 2
    v = np.arange(N).reshape(1, -1) - N // 2
    D2 = u**2 + v**2
    return np.exp(-D2 / (2 * D0**2)).astype(np.float32)

# 3. Hàm áp dụng bộ lọc
def apply_filter(img, H):
    F = np.fft.fft2(img.astype(np.float32))
    Fshift = np.fft.fftshift(F)
    G = Fshift * H
    g = np.abs(np.fft.ifft2(np.fft.ifftshift(G)))
    return np.clip(g, 0, 255).astype(np.uint8)

# 4. Tạo các mask
D0 = 30
H_LP = gaussian_lpf(img.shape, D0)      # Low-pass
H_HP = 1.0 - H_LP                        # High-pass

# 5. High-frequency Emphasis
a, b = 0.5, 2.0
H_he = a + b * H_HP

# 6. Áp dụng
img_lp = apply_filter(img, H_LP)
img_hp = apply_filter(img, H_HP)
img_he = apply_filter(img, H_he)

# 7. Hiển thị
fig, axes = plt.subplots(1, 4, figsize=(18, 5))
for ax, (im, t) in zip(axes, [
    (img, 'Ảnh gốc'),
    (img_lp, f'LPF D0={D0}'),
    (img_hp, f'HPF thuần (ảnh tối đen)'),
    (img_he, f'High-freq Emphasis (a={a}, b={b})')
]):
    ax.imshow(im, cmap='gray'); ax.set_title(t); ax.axis('off')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:** HPF thuần → ảnh tối đen, chỉ giữ biên. High-freq Emphasis → giữ độ sáng nền + làm nét biên.

---


### 3.5. Lọc Notch khử nhiễu tuần hoàn

**📌 Bài tập 23:**
Cho ảnh `data.camera()`. Thêm nhiễu tuần hoàn dạng sin với tần số `(u0, v0) = (0.15, 0.15)`. Áp dụng notch filter để loại bỏ nhiễu.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()
M, N = img.shape

# 2. Thêm nhiễu tuần hoàn
#    ⚠️ Khai báo ở phạm vi toàn cục để tránh NameError
A, u0, v0 = 40, 0.15, 0.15
x = np.arange(M).reshape(-1, 1)
y = np.arange(N).reshape(1, -1)
noise = A * np.sin(2 * np.pi * (u0 * x + v0 * y))
noisy = np.clip(img.astype(np.float32) + noise, 0, 255).astype(np.uint8)

# 3. FFT ảnh nhiễu
F = np.fft.fft2(noisy.astype(np.float32))
Fshift = np.fft.fftshift(F)

# 4. Notch filter: chặn các đỉnh nhiễu (và đối xứng của chúng)
H = np.ones((M, N), dtype=np.float32)
crow, ccol = M // 2, N // 2
r = 8   # bán kính notch

# Vị trí đỉnh nhiễu (tần số dương và âm)
peaks = [(int(u0*M), int(v0*N)), (-int(u0*M), -int(v0*N))]

u_grid = np.arange(M).reshape(-1, 1)
v_grid = np.arange(N).reshape(1, -1)
for du, dv in peaks:
    cu, cv_ = crow + du, ccol + dv
    D = np.sqrt((u_grid - cu)**2 + (v_grid - cv_)**2)
    H[D <= r] = 0

# 5. Lọc và biến đổi ngược
G = Fshift * H
restored = np.abs(np.fft.ifft2(np.fft.ifftshift(G)))
restored = np.clip(restored, 0, 255).astype(np.uint8)

# 6. Hiển thị
def norm_vis(x):
    return cv2.normalize(x, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)

mag_noisy = norm_vis(20 * np.log(1 + np.abs(Fshift)))
mag_H = (H * 255).astype(np.uint8)

fig, axes = plt.subplots(2, 3, figsize=(15, 9))
axes[0, 0].imshow(img, cmap='gray');       axes[0, 0].set_title('Ảnh gốc');           axes[0, 0].axis('off')
axes[0, 1].imshow(noisy, cmap='gray');     axes[0, 1].set_title('Ảnh nhiễu tuần hoàn'); axes[0, 1].axis('off')
axes[0, 2].imshow(mag_noisy, cmap='gray'); axes[0, 2].set_title('Phổ nhiễu (có đỉnh sáng)'); axes[0, 2].axis('off')
axes[1, 0].imshow(mag_H, cmap='gray');     axes[1, 0].set_title('Notch mask');         axes[1, 0].axis('off')
axes[1, 1].imshow(restored, cmap='gray');  axes[1, 1].set_title('Ảnh khử nhiễu');      axes[1, 1].axis('off')
axes[1, 2].axis('off')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:**
- Ảnh nhiễu xuất hiện **sọc/vân** đều đặn.
- Phổ xuất hiện **các đỉnh sáng** ngoài tâm.
- Notch filter → ảnh khôi phục gần như ảnh gốc.

---


### 3.6. Pipeline 7 bước biến đổi miền tần số

**📌 Bài tập 24:**
Xây dựng hàm `freq_pipeline(img, filter_mask)` thực hiện đầy đủ 7 bước biến đổi ảnh trong miền tần số. Áp dụng với Gaussian LPF `D0=30`.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()

# 2. Hàm pipeline 7 bước
def freq_pipeline(img, filter_mask):
    """
    Pipeline biến đổi ảnh trong miền tần số (7 bước):
    1. Tiền xử lý: chuyển float32
    2. FFT thuận
    3. Dịch tâm
    4. Lọc: nhân với mask
    5. Dịch ngược
    6. IFFT
    7. Hậu xử lý: magnitude + chuẩn hóa
    """
    # 1. Tiền xử lý
    img_f = img.astype(np.float32)

    # 2. FFT thuận
    F = np.fft.fft2(img_f)

    # 3. Dịch tâm (DC về giữa)
    Fshift = np.fft.fftshift(F)

    # 4. Lọc
    G = Fshift * filter_mask

    # 5. Dịch ngược
    G_ishift = np.fft.ifftshift(G)

    # 6. IFFT
    img_back = np.fft.ifft2(G_ishift)

    # 7. Hậu xử lý
    img_out = np.abs(img_back)
    img_out = np.clip(img_out, 0, 255).astype(np.uint8)

    return img_out

# 3. Tạo Gaussian LPF mask
def gaussian_lpf(shape, D0):
    M, N = shape
    u = np.arange(M).reshape(-1, 1) - M // 2
    v = np.arange(N).reshape(1, -1) - N // 2
    D2 = u**2 + v**2
    return np.exp(-D2 / (2 * D0**2)).astype(np.float32)

# 4. Áp dụng pipeline
H = gaussian_lpf(img.shape, D0=30)
result = freq_pipeline(img, H)

# 5. Hiển thị
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
axes[0].imshow(img, cmap='gray');    axes[0].set_title('Ảnh gốc');        axes[0].axis('off')
axes[1].imshow(H, cmap='gray');      axes[1].set_title('Gaussian LPF mask'); axes[1].axis('off')
axes[2].imshow(result, cmap='gray'); axes[2].set_title('Kết quả (D0=30)'); axes[2].axis('off')
plt.tight_layout(); plt.show()
```

**📸 Kết quả mong đợi:** Ảnh mờ mượt, không ringing (nhờ Gaussian).
