# Bài tập thực hành chương 4

---


## 1. Phát hiện điểm, đường và biên

---


### 1.1. Phát hiện điểm biệt lập (Point Detection)
**📌 Bài tập 1:**
Tạo ảnh tổng hợp 300×300 nền xám 100, đặt 6 điểm sáng đơn lẻ (giá trị 255) ở vị trí ngẫu nhiên. Áp dụng mặt nạ Laplacian 8-láng giềng để phát hiện điểm biệt lập bằng ngưỡng `T = 200`.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

# 1. Tạo ảnh tổng hợp: nền xám + điểm sáng ngẫu nhiên
np.random.seed(42)
img = (np.ones((300, 300)) * 100).astype(np.uint8)

n_points = 6
positions = []
for _ in range(n_points):
    y, x = np.random.randint(20, 280, 2)
    img[y, x] = 255
    positions.append((y, x))
print("Vị trí các điểm biệt lập:", positions)

# 2. Mặt nạ Laplacian point detection (tâm dương 8, lân cận -1)
kernel_point = np.array([
    [-1, -1, -1],
    [-1,  8, -1],
    [-1, -1, -1]
], dtype=np.float32)

# 3. Tích chập
response = cv2.filter2D(img.astype(np.float32), -1, kernel_point)

# 4. Phân ngưỡng |R| > T
T = 200
detected = (np.abs(response) > T).astype(np.uint8) * 255

# 5. Hàm chuẩn hóa để hiển thị
def norm_vis(x):
    x = np.abs(x)
    return (x / x.max() * 255).astype(np.uint8) if x.max() > 0 else x.astype(np.uint8)

# 6. Hiển thị
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
axes[0].imshow(img, cmap='gray');              axes[0].set_title('Ảnh gốc (nền 100, điểm 255)')
axes[1].imshow(norm_vis(response), cmap='gray'); axes[1].set_title('Đáp ứng Laplacian (chuẩn hóa)')
axes[2].imshow(detected, cmap='gray');         axes[2].set_title(f'Điểm phát hiện (T={T})')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()

print(f"Số pixel được phát hiện: {np.count_nonzero(detected)}")
```

**Kết quả mong đợi:**
- Các điểm sáng đơn lẻ được phát hiện chính xác.
- Nền phẳng không cho đáp ứng (response ≈ 0).
- Mỗi điểm có thể chiếm **vài pixel** lân cận tùy ngưỡng T.

---


### 1.2. Phát hiện đường (Line Detection)
**📌 Bài tập 2:**
Tạo ảnh 300×300 nền đen, vẽ 4 đường trắng mảnh theo 4 hướng: ngang, dọc, chéo +45°, chéo −45°. Áp dụng 4 mặt nạ định hướng tương ứng để phát hiện từng loại đường.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

# 1. Tạo ảnh với 4 đường theo 4 hướng
img = np.zeros((300, 300), dtype=np.uint8)
cv2.line(img, (50, 75),  (250, 75),  255, 1)   # ngang
cv2.line(img, (75, 50),  (75, 250),  255, 1)   # dọc
cv2.line(img, (50, 50),  (250, 250), 255, 1)   # chéo +45
cv2.line(img, (250, 50), (50, 250),  255, 1)   # chéo -45

# 2. Bốn mặt nạ định hướng
masks = {
    'Ngang':    np.array([[-1,-1,-1],[ 2, 2, 2],[-1,-1,-1]], dtype=np.float32),
    'Dọc':      np.array([[-1, 2,-1],[-1, 2,-1],[-1, 2,-1]], dtype=np.float32),
    'Chéo +45': np.array([[-1,-1, 2],[-1, 2,-1],[ 2,-1,-1]], dtype=np.float32),
    'Chéo -45': np.array([[ 2,-1,-1],[-1, 2,-1],[-1,-1, 2]], dtype=np.float32),
}

# 3. Tích chập từng mặt nạ + ngưỡng
T = 200
results, titles = [], []
for name, k in masks.items():
    resp = cv2.filter2D(img.astype(np.float32), -1, k)
    det  = (resp > T).astype(np.uint8) * 255
    results.append(det)
    titles.append(f'{name}\n(T={T})')

# 4. Hiển thị
fig, axes = plt.subplots(1, 5, figsize=(20, 4))
axes[0].imshow(img, cmap='gray'); axes[0].set_title('Ảnh gốc (4 đường)')
for i, (r, t) in enumerate(zip(results, titles)):
    axes[i+1].imshow(r, cmap='gray'); axes[i+1].set_title(t)
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Mỗi mặt nạ chỉ **phản ứng mạnh** với đường có hướng tương ứng.
- Đường sai hướng → không xuất hiện (hoặc rất mờ).

---


### 1.3. Gradient — Roberts / Prewitt / Sobel
**📌 Bài tập 3:**
Cho ảnh `data.camera()`. Cài đặt thủ công 3 cặp kernel Roberts (2×2), Prewitt (3×3), Sobel (3×3). Tính độ lớn gradient `M = √(Gx² + Gy²)` cho mỗi phương pháp và so sánh kết quả.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera().astype(np.float32)

# 2. Định nghĩa 3 cặp kernel
operators = {
    'Roberts': (
        np.array([[1, 0], [0, -1]], dtype=np.float32),
        np.array([[0, 1], [-1, 0]], dtype=np.float32)
    ),
    'Prewitt': (
        np.array([[-1,0,1],[-1,0,1],[-1,0,1]], dtype=np.float32),
        np.array([[-1,-1,-1],[0,0,0],[1,1,1]], dtype=np.float32)
    ),
    'Sobel': (
        np.array([[-1,0,1],[-2,0,2],[-1,0,1]], dtype=np.float32),
        np.array([[-1,-2,-1],[0,0,0],[1,2,1]], dtype=np.float32)
    ),
}

# 3. Tính magnitude cho từng phương pháp
def norm_vis(x):
    x = np.abs(x)
    return (x / x.max() * 255).astype(np.uint8) if x.max() > 0 else x.astype(np.uint8)

magnitudes = {}
for name, (Kx, Ky) in operators.items():
    Gx = cv2.filter2D(img, -1, Kx)
    Gy = cv2.filter2D(img, -1, Ky)
    M  = np.sqrt(Gx**2 + Gy**2)
    magnitudes[name] = norm_vis(M)

# 4. Hiển thị
fig, axes = plt.subplots(1, 4, figsize=(18, 5))
axes[0].imshow(img.astype(np.uint8), cmap='gray'); axes[0].set_title('Ảnh gốc')
for i, (name, mag) in enumerate(magnitudes.items()):
    axes[i+1].imshow(mag, cmap='gray'); axes[i+1].set_title(name)
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- **Roberts:** nhanh nhưng nhạy nhiễu, biên mảnh.
- **Prewitt:** ổn định hơn, biên dày.
- **Sobel:** trọng số tâm cao → giảm nhiễu tốt nhất, biên rõ và mượt.

---


### 1.4. Phát hiện biên Canny
**📌 Bài tập 4:**
Cho ảnh `data.camera()`. Chạy Canny với 4 cặp ngưỡng `(50,100)`, `(100,200)`, `(150,250)`, `(200,300)`. Nhận xét ảnh hưởng của ngưỡng lên số lượng và chất lượng biên.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()

# 2. Chạy Canny với 4 cặp ngưỡng
threshold_pairs = [(50, 100), (100, 200), (150, 250), (200, 300)]
canny_imgs = [cv2.Canny(img, t1, t2) for t1, t2 in threshold_pairs]

# 3. Hiển thị
fig, axes = plt.subplots(1, 5, figsize=(20, 4))
axes[0].imshow(img, cmap='gray'); axes[0].set_title('Ảnh gốc')
for i, (cimg, (t1, t2)) in enumerate(zip(canny_imgs, threshold_pairs)):
    axes[i+1].imshow(cimg, cmap='gray')
    axes[i+1].set_title(f'Canny ({t1}, {t2})\n{np.count_nonzero(cimg):,} pixel')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Ngưỡng thấp → nhiều biên (bao gồm cả nhiễu).
- Ngưỡng cao → chỉ giữ biên mạnh, nhưng có thể làm **đứt biên yếu**.
- Tỷ lệ `t1:t2` lý tưởng là **1:2** hoặc **1:3** theo khuyến nghị của Canny.

---


### 1.5. Marr-Hildreth (LoG)
**📌 Bài tập 5:**
Cho ảnh `data.camera()`. Cài đặt pipeline LoG: làm mịn Gaussian (σ=1.5, ksize=9×9), tính Laplacian, tìm zero-crossing để phát hiện biên.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()

# 2. Làm mịn Gaussian
blurred = cv2.GaussianBlur(img, (9, 9), sigmaX=1.5)

# 3. Laplacian — ✅ OpenCV 5.0: dùng CV_32F với input float32
lap = cv2.Laplacian(blurred.astype(np.float32), cv2.CV_32F)

# 4. Tìm zero-crossing
def zero_crossing(lap):
    """Phát hiện zero-crossing: dấu đổi giữa các láng giềng."""
    h, w = lap.shape
    zc = np.zeros((h, w), dtype=np.uint8)
    sign = np.sign(lap)
    for i in range(1, h-1):
        for j in range(1, w-1):
            patch = sign[i-1:i+2, j-1:j+2]
            if patch.max() > 0 and patch.min() < 0:
                zc[i, j] = 255
    return zc

zc = zero_crossing(lap)

# 5. Chuẩn hóa Laplacian để hiển thị
def norm_vis(x):
    return cv2.normalize(np.abs(x), None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)

# 6. Hiển thị
fig, axes = plt.subplots(1, 4, figsize=(18, 5))
axes[0].imshow(img, cmap='gray');          axes[0].set_title('Ảnh gốc')
axes[1].imshow(blurred, cmap='gray');      axes[1].set_title('Gaussian σ=1.5')
axes[2].imshow(norm_vis(lap), cmap='gray');axes[2].set_title('|Laplacian| (chuẩn hóa)')
axes[3].imshow(zc, cmap='gray');           axes[3].set_title('Zero-crossing (biên LoG)')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Làm mịn trước giúp **giảm nhiễu** → zero-crossing sạch hơn Laplacian thuần.
- σ lớn → biên mượt hơn nhưng mất chi tiết nhỏ.

---


### 1.6. Kết hợp Gradient + Phân ngưỡng
**📌 Bài tập 6:**
Cho ảnh `data.camera()`. Tính magnitude từ Sobel, chuẩn hóa về `[0, 255]`. Phân ngưỡng với `T ∈ {30, 60, 100, 150}` để tạo ảnh biên nhị phân.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()

# 2. Tính Sobel magnitude
Gx = cv2.Sobel(img, cv2.CV_64F, 1, 0, ksize=3)
Gy = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=3)
M  = np.sqrt(Gx**2 + Gy**2)
M_norm = np.clip(M / M.max() * 255, 0, 255).astype(np.uint8)

# 3. Phân ngưỡng
thresholds = [30, 60, 100, 150]
edges = [(M_norm > T).astype(np.uint8) * 255 for T in thresholds]

# 4. Hiển thị
fig, axes = plt.subplots(1, 6, figsize=(22, 4))
axes[0].imshow(img, cmap='gray');    axes[0].set_title('Ảnh gốc')
axes[1].imshow(M_norm, cmap='gray'); axes[1].set_title('M chuẩn hóa')
for i, (e, T) in enumerate(zip(edges, thresholds)):
    axes[i+2].imshow(e, cmap='gray')
    axes[i+2].set_title(f'Biên T={T}')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Ngưỡng càng cao → càng ít pixel biên nhưng chỉ giữ biên mạnh nhất.

---


### 1.7. Nối biên — Hough Transform
**📌 Bài tập 7:**
Tạo ảnh 300×300 có 3 đường thẳng rõ ràng. Phát hiện biên Canny, sau đó dùng `cv2.HoughLines` (Hough chuẩn) và `cv2.HoughLinesP` (xác suất) để phát hiện lại các đường thẳng.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

# 1. Tạo ảnh với 3 đường thẳng
img = np.zeros((300, 300), dtype=np.uint8)
cv2.line(img, (30, 80),  (270, 80),  255, 2)   # ngang
cv2.line(img, (100, 20), (100, 280), 255, 2)   # dọc
cv2.line(img, (50, 250), (250, 50),  255, 2)   # chéo

# 2. Phát hiện biên Canny
edges = cv2.Canny(img, 50, 150)

# 3. Hough chuẩn
lines_std = cv2.HoughLines(edges, 1, np.pi/180, threshold=100)
img_hough_std = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
if lines_std is not None:
    # ✅ OpenCV 5.0: dùng .flatten() để tương thích mọi phiên bản
    for line in lines_std[:10]:
        rho, theta = line.flatten()[:2]
        a, b = np.cos(theta), np.sin(theta)
        x0, y0 = a * rho, b * rho
        x1, y1 = int(x0 + 1000 * -b), int(y0 + 1000 * a)
        x2, y2 = int(x0 - 1000 * -b), int(y0 - 1000 * a)
        cv2.line(img_hough_std, (x1, y1), (x2, y2), (0, 0, 255), 1)

# 4. HoughLinesP
lines_p = cv2.HoughLinesP(edges, 1, np.pi/180, threshold=80,
                          minLineLength=60, maxLineGap=10)
img_hough_p = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
if lines_p is not None:
    for line in lines_p:
        x1, y1, x2, y2 = line.flatten()[:4]
        cv2.line(img_hough_p, (x1, y1), (x2, y2), (0, 255, 0), 2)

# 5. Hiển thị
fig, axes = plt.subplots(1, 4, figsize=(18, 5))
axes[0].imshow(img, cmap='gray');           axes[0].set_title('Ảnh gốc (3 đường)')
axes[1].imshow(edges, cmap='gray');         axes[1].set_title('Canny edges')
axes[2].imshow(cv2.cvtColor(img_hough_std, cv2.COLOR_BGR2RGB))
axes[2].set_title('Hough chuẩn (ρ, θ)')
axes[3].imshow(cv2.cvtColor(img_hough_p, cv2.COLOR_BGR2RGB))
axes[3].set_title('HoughLinesP (xác suất)')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- **Hough chuẩn:** đường vẽ toàn bộ, nhưng có thể phát hiện trùng.
- **HoughLinesP:** chỉ vẽ đoạn có thật trong ảnh, kết quả gọn hơn.

---


## 2. Phân ngưỡng (Thresholding)

---


### 2.1. Phân ngưỡng toàn cục — Thủ công & Otsu
**📌 Bài tập 8:**
Cho ảnh `data.coins()`. So sánh phân ngưỡng thủ công (`T=100`, `T=150`) với Otsu tự động. Hiển thị ảnh gốc, histogram có đánh dấu ngưỡng Otsu, và các ảnh nhị phân.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.coins()

# 2. Ngưỡng thủ công
_, thresh100 = cv2.threshold(img, 100, 255, cv2.THRESH_BINARY)
_, thresh150 = cv2.threshold(img, 150, 255, cv2.THRESH_BINARY)

# 3. Otsu — tự động tìm ngưỡng
otsu_val, otsu_img = cv2.threshold(img, 0, 255,
                                    cv2.THRESH_BINARY + cv2.THRESH_OTSU)
print(f"Ngưỡng Otsu tự động: T = {otsu_val:.2f}")

# 4. Hiển thị
fig, axes = plt.subplots(2, 3, figsize=(15, 9))
axes[0, 0].imshow(img, cmap='gray');          axes[0, 0].set_title('Ảnh gốc'); axes[0, 0].axis('off')
axes[0, 1].imshow(thresh100, cmap='gray');    axes[0, 1].set_title('Ngưỡng T=100'); axes[0, 1].axis('off')
axes[0, 2].imshow(thresh150, cmap='gray');    axes[0, 2].set_title('Ngưỡng T=150'); axes[0, 2].axis('off')
axes[1, 0].imshow(otsu_img, cmap='gray')
axes[1, 0].set_title(f'Otsu: T={otsu_val:.1f}'); axes[1, 0].axis('off')
axes[1, 1].hist(img.ravel(), 256, [0, 256], color='gray')
axes[1, 1].axvline(otsu_val, color='red', linestyle='--', label=f'Otsu T={otsu_val:.1f}')
axes[1, 1].legend(); axes[1, 1].set_title('Histogram + ngưỡng Otsu')
axes[1, 2].axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Otsu tự động tìm ngưỡng nằm **giữa hai đỉnh histogram** → tách nền và đối tượng tốt.

---


### 2.2. Phân ngưỡng thích nghi (Adaptive Thresholding)
**📌 Bài tập 9:**
Cho ảnh `data.page()`. So sánh Global Otsu với Adaptive Thresholding (Gaussian) với 2 cấu hình `blockSize` khác nhau.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.page()

# 2. Global Otsu
_, global_img = cv2.threshold(img, 0, 255,
                              cv2.THRESH_BINARY + cv2.THRESH_OTSU)

# 3. Adaptive Gaussian với 2 blockSize
adaptive_15 = cv2.adaptiveThreshold(img, 255,
                                     cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                     cv2.THRESH_BINARY,
                                     blockSize=15, C=8)
adaptive_35 = cv2.adaptiveThreshold(img, 255,
                                     cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                     cv2.THRESH_BINARY,
                                     blockSize=35, C=8)

# 4. Hiển thị
fig, axes = plt.subplots(1, 4, figsize=(18, 6))
axes[0].imshow(img, cmap='gray');          axes[0].set_title('Ảnh gốc (page)')
axes[1].imshow(global_img, cmap='gray');   axes[1].set_title('Global Otsu')
axes[2].imshow(adaptive_15, cmap='gray');  axes[2].set_title('Adaptive (blockSize=15)')
axes[3].imshow(adaptive_35, cmap='gray');  axes[3].set_title('Adaptive (blockSize=35)')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Global Otsu bị "chết" ở vùng tối (mất chữ).
- Adaptive xử lý tốt hơn nhờ ngưỡng riêng cho từng vùng cục bộ.
- `blockSize` lớn hơn → xử lý vùng rộng, ít nhạy với chi tiết nhỏ.

---


### 2.3. Đa ngưỡng (Multi-Otsu)
**📌 Bài tập 10:**
Cho ảnh `data.camera()`. Áp dụng Multi-Otsu với `classes=3` và `classes=4`. Phân đoạn ảnh theo các ngưỡng tìm được và hiển thị histogram có đánh dấu các ngưỡng.

```python
import numpy as np
import matplotlib.pyplot as plt
from skimage import data
from skimage.filters import threshold_multiotsu

# 1. Tải ảnh
img = data.camera()

# 2. Multi-Otsu với 3 và 4 lớp
thresh3 = threshold_multiotsu(img, classes=3)
thresh4 = threshold_multiotsu(img, classes=4)
print(f"Ngưỡng 3 lớp: {thresh3}")
print(f"Ngưỡng 4 lớp: {thresh4}")

# 3. Phân đoạn
regions3 = np.digitize(img, bins=thresh3)
regions4 = np.digitize(img, bins=thresh4)

# 4. Hiển thị
fig, axes = plt.subplots(2, 3, figsize=(15, 9))
axes[0, 0].imshow(img, cmap='gray');           axes[0, 0].set_title('Ảnh gốc')
axes[0, 1].imshow(regions3, cmap='viridis');   axes[0, 1].set_title(f'3 lớp\nT={thresh3}')
axes[0, 2].imshow(regions4, cmap='viridis');   axes[0, 2].set_title(f'4 lớp\nT={thresh4}')

axes[1, 0].hist(img.ravel(), 256, [0, 256], color='gray')
for t in thresh3:
    axes[1, 0].axvline(t, color='red', linestyle='--')
axes[1, 0].set_title('Histogram + ngưỡng 3 lớp')

axes[1, 1].hist(img.ravel(), 256, [0, 256], color='gray')
for t in thresh4:
    axes[1, 1].axvline(t, color='orange', linestyle='--')
axes[1, 1].set_title('Histogram + ngưỡng 4 lớp')

axes[1, 2].axis('off')
for ax in axes[0]: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Multi-Otsu chia ảnh thành nhiều lớp (nền tối / trung bình / sáng).
- Phù hợp khi histogram có **nhiều đỉnh** (multi-modal).

---


## 3. Phân đoạn bằng phát triển, chia tách/hợp nhất vùng

---


### 3.1. Phát triển vùng (Region Growing)
**📌 Bài tập 11:**
Cho ảnh `data.coins()`. Cài đặt Region Growing với BFS (8-láng giềng) từ một seed point. Khảo sát ảnh hưởng của `threshold` với `T ∈ {5, 15, 30}`.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data
from collections import deque

# 1. Tải ảnh
img = data.coins()

# 2. Cài đặt Region Growing
def region_growing(img, seed, threshold=10):
    """Region growing với BFS — 8 láng giềng."""
    h, w = img.shape
    segmented = np.zeros((h, w), dtype=np.uint8)
    seed_value = int(img[seed[0], seed[1]])
    queue = deque([seed])
    segmented[seed[0], seed[1]] = 255

    while queue:
        y, x = queue.popleft()
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                if dy == 0 and dx == 0:
                    continue
                ny, nx = y + dy, x + dx
                if 0 <= ny < h and 0 <= nx < w and segmented[ny, nx] == 0:
                    if abs(int(img[ny, nx]) - seed_value) <= threshold:
                        segmented[ny, nx] = 255
                        queue.append((ny, nx))
    return segmented

# 3. Chọn seed trên một đồng xu
seed = (150, 180)   # (y, x) — điều chỉnh nếu cần

# 4. Áp dụng với 3 threshold
thresholds = [5, 15, 30]
overlays = []
for T in thresholds:
    mask = region_growing(img, seed, T)
    rgb = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
    rgb[mask > 0] = [255, 100, 100]   # tô đỏ vùng phát triển
    overlays.append(rgb)

# 5. Hiển thị
fig, axes = plt.subplots(1, 4, figsize=(18, 5))
axes[0].imshow(img, cmap='gray'); axes[0].set_title('Ảnh gốc')
for i, (ov, T) in enumerate(zip(overlays, thresholds)):
    axes[i+1].imshow(ov); axes[i+1].set_title(f'Region Growing\nT={T}')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- T nhỏ → vùng gọn, chỉ giữ pixel rất giống seed.
- T lớn → vùng loang rộng có thể "tràn" sang cả nền.

---


### 3.2. Chia tách và hợp nhất vùng (Split & Merge)
**📌 Bài tập 12:**
Cho ảnh `data.camera()` cắt về 256×256. Cài đặt Split & Merge dùng cây tứ phân (quadtree): chia đệ quy nếu phương sai > ngưỡng. Khảo sát với `threshold ∈ {50, 150}`.

```python
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Chuẩn bị ảnh
img = data.camera()[:256, :256]

# 2. Split bằng quadtree
def split(img, x, y, size, threshold, blocks):
    """Chia đệ quy nếu phương sai vùng > threshold."""
    block = img[y:y+size, x:x+size]
    if block.var() > threshold and size > 4:
        half = size // 2
        split(img, x,       y,       half, threshold, blocks)
        split(img, x + half, y,       half, threshold, blocks)
        split(img, x,       y + half, half, threshold, blocks)
        split(img, x + half, y + half, half, threshold, blocks)
    else:
        blocks.append((x, y, size, block.mean()))

def draw_blocks(shape, blocks):
    """Vẽ các block với giá trị trung bình."""
    out = np.zeros(shape, dtype=np.uint8)
    for (x, y, size, mean_val) in blocks:
        out[y:y+size, x:x+size] = int(mean_val)
    return out

# 3. Áp dụng với 2 ngưỡng
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
axes[0].imshow(img, cmap='gray'); axes[0].set_title('Ảnh gốc')
for i, T in enumerate([50, 150]):
    blocks = []
    split(img, 0, 0, 256, T, blocks)
    result = draw_blocks(img.shape, blocks)
    print(f"T={T}: số block = {len(blocks)}")
    axes[i+1].imshow(result, cmap='gray')
    axes[i+1].set_title(f'T={T} — {len(blocks)} blocks')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Ngưỡng phương sai **nhỏ** → nhiều block nhỏ (chia mịn).
- Ngưỡng phương sai **lớn** → ít block (chia thô).

---


## 4. Phân đoạn sử dụng phân cụm và superpixels

---


### 4.1. Phân cụm K-Means
**📌 Bài tập 13:**
Cho ảnh `data.astronaut()`. Áp dụng K-Means phân đoạn ảnh màu với `K ∈ {2, 3, 5, 8}`. Hiển thị kết quả.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img_rgb = data.astronaut()

# 2. Chuẩn bị dữ liệu: reshape thành (N_pixels, 3)
pixel_values = img_rgb.reshape((-1, 3)).astype(np.float32)

# 3. Tiêu chí dừng
criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 0.2)

# 4. Chạy K-means với nhiều K
results = []
for K in [2, 3, 5, 8]:
    _, labels, centers = cv2.kmeans(pixel_values, K, None,
                                    criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
    centers = np.uint8(centers)
    segmented = centers[labels.flatten()].reshape(img_rgb.shape)
    results.append(segmented)
    print(f"K={K}: đã phân đoạn")

# 5. Hiển thị
fig, axes = plt.subplots(1, 5, figsize=(22, 5))
axes[0].imshow(img_rgb); axes[0].set_title('Ảnh gốc')
for i, (seg, K) in enumerate(zip(results, [2, 3, 5, 8])):
    axes[i+1].imshow(seg); axes[i+1].set_title(f'K-Means K={K}')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- K nhỏ → ảnh bị "poster hóa" mạnh, ít màu.
- K lớn → giữ được nhiều chi tiết màu hơn.

---


### 4.2. Superpixels SLIC
**📌 Bài tập 14:**
Cho ảnh `data.astronaut()`. Tạo superpixel với SLIC cho 4 cấu hình `(n_segments, compactness)`: `(100,10)`, `(100,30)`, `(500,10)`, `(500,30)`. Hiển thị viền superpixel trên ảnh gốc.

```python
import numpy as np
import matplotlib.pyplot as plt
from skimage import data
from skimage.segmentation import slic, mark_boundaries

# 1. Tải ảnh
img_rgb = data.astronaut()

# 2. Cấu hình SLIC
configs = [
    (100, 10),
    (100, 30),
    (500, 10),
    (500, 30),
]

# 3. Áp dụng SLIC cho từng cấu hình
results = []
for n_seg, comp in configs:
    segments = slic(img_rgb, n_segments=n_seg, compactness=comp,
                    sigma=1, start_label=0)
    vis = mark_boundaries(img_rgb, segments, color=(1, 0, 0))
    results.append(vis)
    print(f"n_segments={n_seg}, compactness={comp} → OK")

# 4. Hiển thị
fig, axes = plt.subplots(1, 5, figsize=(22, 5))
axes[0].imshow(img_rgb); axes[0].set_title('Ảnh gốc')
for i, (vis, (n, c)) in enumerate(zip(results, configs)):
    axes[i+1].imshow(vis); axes[i+1].set_title(f'n={n}, c={c}')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- `n_segments` lớn → superpixel nhỏ hơn, **bám biên tốt hơn**.
- `compactness` lớn → superpixel đều đặn hơn (ưu tiên hình học).
- `compactness` nhỏ → superpixel bám màu sắc hơn (có thể méo).

---


## 5. Tổng kết

---


### 5.1. Bảng tổng hợp — Ví dụ theo slide lý thuyết

| Slide lý thuyết | Bài tập | Chủ đề |
|-----------------|:-------:|--------|
| Phát hiện điểm biệt lập | 1 | Mặt nạ Laplacian 8-láng giềng |
| Phát hiện đường | 2 | 4 mặt nạ định hướng |
| Toán tử Gradient | 3 | Roberts / Prewitt / Sobel |
| Phát hiện biên Canny | 4 | Ngưỡng kép |
| Marr-Hildreth (LoG) | 5 | Gaussian + Laplacian + zero-crossing |
| Gradient + phân ngưỡng | 6 | Biên nhị phân |
| Nối biên (Hough) | 7 | HoughLines & HoughLinesP |
| Phân ngưỡng toàn cục | 8 | Thủ công + Otsu |
| Phân ngưỡng thích nghi | 9 | Adaptive Thresholding |
| Đa ngưỡng | 10 | Multi-Otsu |
| Phát triển vùng | 11 | Region Growing (BFS) |
| Chia tách & hợp nhất | 12 | Quadtree Split & Merge |
| Phân cụm K-Means | 13 | K-Means segmentation |
| Superpixels SLIC | 14 | SLIC với n_segments & compactness |

---


### 5.2. Lưu ý quan trọng khi chạy code

| Vấn đề | Cách xử lý |
|--------|-----------|
| **OpenCV 5.0:** `Laplacian(float32, CV_64F)` | Dùng `cv2.CV_32F` |
| **OpenCV 5.0:** `HoughLines` shape `(N, 2)` | Dùng `line.flatten()[:2]` |
| **OpenCV 5.0:** `HoughLinesP` shape `(N, 4)` | Dùng `line.flatten()[:4]` |
| **OverflowError** khi cộng/trừ `uint8` | Ép về `int`/`float` trước, `clip` sau |
| **Zero-crossing** vòng lặp chậm | Chỉ dùng cho ảnh nhỏ hoặc tối ưu bằng vector hóa |
| **Region Growing** cần seed đúng | Chọn seed trên đối tượng cần tách |
| **K-Means** nhiều K | Chạy từng K riêng để tránh nhầm kết quả |

---


### 5.3. Tổng kết

**Bốn nhóm nội dung chính Chương 4:**

| Nhóm | Số bài tập | Kỹ thuật chủ đạo |
|------|:----------:|------------------|
| **1. Phát hiện điểm/đường/biên** | 1 → 7 | Laplacian, Sobel, Canny, LoG, Hough |
| **2. Phân ngưỡng** | 8 → 10 | Otsu, Adaptive, Multi-Otsu |
| **3. Phân đoạn dựa trên vùng** | 11 → 12 | Region Growing, Split & Merge |
| **4. Phân cụm & Superpixels** | 13 → 14 | K-Means, SLIC |

**📌 Nhớ 3 điều:**
1. **Biên** là nơi cường độ thay đổi đột ngột — phát hiện qua đạo hàm bậc 1 (gradient) hoặc bậc 2 (Laplacian).
2. **Phân ngưỡng Otsu** tự động tìm ngưỡng tối ưu — nhưng kém hiệu quả khi ảnh có chiếu sáng không đều → dùng **Adaptive**.
3. **Region-based** (Region Growing, Split & Merge) và **Clustering** (K-Means, SLIC) tiếp cận theo tính đồng nhất vùng, khác với phương pháp dựa trên biên.