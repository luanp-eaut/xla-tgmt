# Bài tập thực hành chương 1

---


## 1. Khái niệm cơ bản về ảnh số

---


### 1.1. Đọc, hiển thị và lưu ảnh
**📌 Bài tập 1:**
Cho ảnh xám `data.camera()` và ảnh màu `data.astronaut()`. Hãy:
1. Lưu hai ảnh này vào thư mục `images/` dưới định dạng `.png`.
2. Đọc lại ảnh màu bằng `cv2.imread()` và in ra kích thước, kiểu dữ liệu, số kênh màu, giá trị min/max.
3. Hiển thị cả hai ảnh cạnh nhau bằng `matplotlib`.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt
from pathlib import Path
from skimage import data

# Tạo thư mục images/ nếu chưa có
Path("images").mkdir(exist_ok=True)

# 1. Tải ảnh mẫu
img_gray  = data.camera()       # uint8, shape (512, 512)
img_color = data.astronaut()    # uint8, shape (512, 512, 3) - RGB

# 2. Lưu vào images/ (OpenCV dùng BGR khi ghi ảnh màu)
cv2.imwrite('images/camera_gray.png', img_gray)
cv2.imwrite('images/astronaut_color.png',
            cv2.cvtColor(img_color, cv2.COLOR_RGB2BGR))

# 3. Đọc lại bằng OpenCV
img_cv = cv2.imread('images/astronaut_color.png')   # BGR
print(f"Shape      : {img_cv.shape}")
print(f"Dtype      : {img_cv.dtype}")
print(f"Số kênh màu: {img_cv.shape[2]}")
print(f"Min/Max    : {img_cv.min()} / {img_cv.max()}")

# 4. Hiển thị
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].imshow(img_gray, cmap='gray')
axes[0].set_title('Ảnh xám (camera)')
axes[0].axis('off')

axes[1].imshow(img_color)
axes[1].set_title('Ảnh màu (astronaut)')
axes[1].axis('off')

plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Bên trái: ảnh xám cô gái cầm máy ảnh.
- Bên phải: ảnh màu phi hành gia.
- Ảnh màu có shape `(512, 512, 3)`, dtype `uint8`.

---


### 1.2. Biểu diễn ảnh dưới dạng ma trận
**📌 Bài tập 2:**
Viết hàm `print_image_info(img, name)` in thông tin ảnh (shape, dtype, min, max, số kênh). Áp dụng cho 3 ảnh `data.camera()`, `data.astronaut()`, `data.coins()`. Truy cập pixel `(100, 200)` của ảnh camera và crop vùng 100×100 từ góc trên-trái.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt
from skimage import data

# 1. Hàm in thông tin ảnh
def print_image_info(img, name="Ảnh"):
    print(f"=== {name} ===")
    print(f"  Shape  : {img.shape}")
    print(f"  Dtype  : {img.dtype}")
    print(f"  Min/Max: {img.min()} / {img.max()}")
    if img.ndim == 3:
        print(f"  Số kênh: {img.shape[2]}")
    print()

# 2. Áp dụng cho 3 ảnh
img_cam  = data.camera()
img_ast  = data.astronaut()
img_coin = data.coins()

print_image_info(img_cam,  "Camera (xám)")
print_image_info(img_ast,  "Astronaut (màu)")
print_image_info(img_coin, "Coins (xám)")

# 3. Truy cập pixel tại (100, 200)
x, y = 100, 200
print(f"Pixel ({x},{y}) của ảnh camera = {img_cam[x, y]}")

# 4. Crop vùng 100×100 từ góc trên-trái
crop = img_cam[0:100, 0:100]

# 5. Hiển thị
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].imshow(img_cam, cmap='gray')
axes[0].set_title(f'Ảnh camera gốc {img_cam.shape}')
axes[0].axis('off')

axes[1].imshow(crop, cmap='gray')
axes[1].set_title(f'Crop 100×100 từ góc trên-trái')
axes[1].axis('off')

plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Ảnh xám có shape `(M, N)`, ảnh màu có shape `(M, N, 3)`.
- Pixel `(100, 200)` của camera có giá trị cụ thể (ví dụ 155).
- Crop có kích thước `(100, 100)`.

---


### 1.3. Chuyển đổi không gian màu
**📌 Bài tập 3:**
Cho ảnh `data.astronaut()`. Chuyển RGB → Gray bằng 2 cách: `cv2.cvtColor` và công thức thủ công `Gray = 0.299·R + 0.587·G + 0.114·B`. So sánh sai số. Sau đó chuyển sang HSV và trích xuất 3 kênh H, S, V.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh màu
img_rgb = data.astronaut()

# 2. Cách 1: dùng OpenCV
img_gray_cv = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)

# 3. Cách 2: công thức thủ công
R, G, B = img_rgb[:,:,0], img_rgb[:,:,1], img_rgb[:,:,2]
img_gray_manual = (0.299*R + 0.587*G + 0.114*B).astype(np.uint8)

# 4. So sánh sai số
diff = np.abs(img_gray_cv.astype(int) - img_gray_manual.astype(int))
print(f"Sai số tuyệt đối trung bình: {diff.mean():.4f}")
print(f"Sai số tối đa              : {diff.max()}")

# 5. Chuyển sang HSV
img_hsv = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2HSV)
H, S, V = img_hsv[:,:,0], img_hsv[:,:,1], img_hsv[:,:,2]

# 6. Hiển thị
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
axes[0, 0].imshow(img_rgb);              axes[0, 0].set_title('RGB gốc')
axes[0, 1].imshow(img_gray_cv, cmap='gray');     axes[0, 1].set_title('Gray (OpenCV)')
axes[0, 2].imshow(img_gray_manual, cmap='gray'); axes[0, 2].set_title('Gray (thủ công)')
axes[1, 0].imshow(H, cmap='gray');       axes[1, 0].set_title('Kênh H (Hue)')
axes[1, 1].imshow(S, cmap='gray');       axes[1, 1].set_title('Kênh S (Saturation)')
axes[1, 2].imshow(V, cmap='gray');       axes[1, 2].set_title('Kênh V (Value)')
for ax in axes.ravel(): ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Sai số giữa 2 cách chuyển Gray rất nhỏ (do làm tròn số nguyên).
- 3 kênh H/S/V thể hiện các khía cạnh khác nhau của ảnh.

---


## 2. Biến đổi hình học cơ bản

---


### 2.1. Resize, Flip và Rotate
**📌 Bài tập 4:**
Cho ảnh `data.astronaut()`. Áp dụng:
1. Resize xuống 50% và lên 200% (dùng `INTER_LINEAR` và `INTER_CUBIC`).
2. Lật ảnh theo 3 chế độ: ngang, dọc, cả hai.
3. Xoay ảnh 90°, 180°, 270°.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.astronaut()

# 2. Resize
img_50  = cv2.resize(img, None, fx=0.5, fy=0.5, interpolation=cv2.INTER_LINEAR)
img_200 = cv2.resize(img, None, fx=2.0, fy=2.0, interpolation=cv2.INTER_CUBIC)
print(f"Kích thước gốc : {img.shape}")
print(f"Sau resize 50% : {img_50.shape}")
print(f"Sau resize 200%: {img_200.shape}")

# 3. Flip
flip_h = cv2.flip(img, 1)    # ngang
flip_v = cv2.flip(img, 0)    # dọc
flip_b = cv2.flip(img, -1)   # cả hai

# 4. Rotate
rot_90  = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
rot_180 = cv2.rotate(img, cv2.ROTATE_180)
rot_270 = cv2.rotate(img, cv2.ROTATE_90_COUNTERCLOCKWISE)

# 5. Hiển thị
fig, axes = plt.subplots(3, 3, figsize=(15, 12))
titles = ['Ảnh gốc', 'Resize 50%', 'Resize 200%',
          'Flip ngang', 'Flip dọc', 'Flip cả hai',
          'Rotate 90°', 'Rotate 180°', 'Rotate 270°']
imgs = [img, img_50, img_200, flip_h, flip_v, flip_b, rot_90, rot_180, rot_270]
for ax, im, t in zip(axes.ravel(), imgs, titles):
    ax.imshow(im); ax.set_title(t); ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Resize 50% cho ảnh nhỏ hơn nhưng vẫn rõ cấu trúc.
- Flip ngang → ảnh đối xứng gương.
- Rotate 90/180/270 → ảnh quay đúng góc.

---


### 2.2. Vẽ hình học trên ảnh
**📌 Bài tập 5:**
Tạo canvas trắng 400×600. Vẽ lên đó: đường thẳng đỏ ngang ở `y=50`, hình chữ nhật viền xanh lá từ `(50,100)` đến `(250,250)`, hình tròn đặc xanh dương tâm `(450,200)` bán kính 80, và dòng chữ "XLA & TGMT" tại `(150, 350)`.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt

# 1. Tạo canvas trắng 400×600
canvas = np.ones((400, 600, 3), dtype=np.uint8) * 255

# 2. Vẽ đường thẳng đỏ (BGR: đỏ = (0,0,255))
cv2.line(canvas, (50, 50), (550, 50), (0, 0, 255), 3)

# 3. Vẽ hình chữ nhật viền xanh lá (xanh lá = (0,255,0))
cv2.rectangle(canvas, (50, 100), (250, 250), (0, 255, 0), 2)

# 4. Vẽ hình tròn đặc xanh dương (xanh dương = (255,0,0))
cv2.circle(canvas, (450, 200), 80, (255, 0, 0), -1)

# 5. Vẽ text
cv2.putText(canvas, "XLA & TGMT", (150, 350),
            cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 0, 0), 2)

# 6. Hiển thị (đổi BGR → RGB)
plt.figure(figsize=(9, 6))
plt.imshow(cv2.cvtColor(canvas, cv2.COLOR_BGR2RGB))
plt.title('Hình vẽ hình học cơ bản')
plt.axis('off'); plt.show()
```

**Kết quả mong đợi:**
- Canvas trắng với đường thẳng đỏ, hình chữ nhật xanh lá, hình tròn xanh dương và dòng chữ "XLA & TGMT".

---


## 3. Phép toán trên ảnh

---


### 3.1. Phép toán số học
**📌 Bài tập 6:**
Cho ảnh `data.camera()`. Thực hiện 4 phép toán:
1. Ảnh âm bản: `s = 255 - r`.
2. Tăng sáng: cộng 50 (dùng `cv2.add`).
3. Giảm sáng: trừ 50 (dùng `cv2.subtract`).
4. Trộn 2 ảnh `camera` và `coins` với trọng số 0.5/0.5.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải 2 ảnh
img  = data.camera()
img2 = data.coins()

# 2. Ảnh âm bản
img_negative = 255 - img

# 3. Tăng sáng (+50) — dùng cv2.add để tránh tràn số
#    (nếu 255+50 → 255 thay vì 49 do wrap-around của uint8)
img_bright = cv2.add(img, 50)

# 4. Giảm sáng (-50) — dùng cv2.subtract để tránh giá trị âm
img_dark = cv2.subtract(img, 50)

# 5. Trộn 2 ảnh — resize cho cùng kích thước
img2_rs = cv2.resize(img2, (img.shape[1], img.shape[0]))
img_blend = cv2.addWeighted(img, 0.5, img2_rs, 0.5, 0)

# 6. Hiển thị
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
items = [
    (img,          'Gốc'),
    (img_negative, 'Âm bản (255 - r)'),
    (img_bright,   'Tăng sáng (+50)'),
    (img_dark,     'Giảm sáng (-50)'),
    (img2_rs,      'Ảnh coins (resize)'),
    (img_blend,    'Trung bình 2 ảnh'),
]
for ax, (im, t) in zip(axes.ravel(), items):
    ax.imshow(im, cmap='gray'); ax.set_title(t); ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- **Âm bản:** đảo sáng tối.
- **Tăng/giảm sáng:** ảnh sáng/tối hơn nhưng vẫn giữ cấu trúc.
- **Trung bình:** kết hợp cấu trúc của cả 2 ảnh.

---


### 3.2. Phép toán logic
**📌 Bài tập 7:**
Tạo 2 mask nhị phân 300×300:
- Mask A: hình chữ nhật trắng từ `(50,50)` đến `(200,200)`.
- Mask B: hình tròn trắng tâm `(200,200)` bán kính 100.

Tính AND, OR, NOT A, XOR của 2 mask.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt

# 1. Tạo mask A (chữ nhật)
mask_a = np.zeros((300, 300), dtype=np.uint8)
cv2.rectangle(mask_a, (50, 50), (200, 200), 255, -1)

# 2. Tạo mask B (hình tròn)
mask_b = np.zeros((300, 300), dtype=np.uint8)
cv2.circle(mask_b, (200, 200), 100, 255, -1)

# 3. Phép toán logic
and_img = cv2.bitwise_and(mask_a, mask_b)   # giao
or_img  = cv2.bitwise_or(mask_a, mask_b)    # hợp
not_a   = cv2.bitwise_not(mask_a)           # đảo A
xor_img = cv2.bitwise_xor(mask_a, mask_b)   # khác nhau

# 4. Hiển thị
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
items = [
    (mask_a,  'Mask A (chữ nhật)'),
    (mask_b,  'Mask B (hình tròn)'),
    (and_img, 'A AND B (giao)'),
    (or_img,  'A OR B (hợp)'),
    (not_a,   'NOT A (đảo)'),
    (xor_img, 'A XOR B (khác nhau)'),
]
for ax, (im, t) in zip(axes.ravel(), items):
    ax.imshow(im, cmap='gray'); ax.set_title(t); ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- **AND:** chỉ vùng giao của chữ nhật và hình tròn.
- **OR:** vùng hợp.
- **NOT A:** đảo ngược A.
- **XOR:** vùng thuộc A hoặc B nhưng không thuộc cả hai.

---


### 3.3. Trung bình ảnh giảm nhiễu Gaussian
**📌 Bài tập 8:**
Cho ảnh sạch `data.camera()`. Thêm nhiễu Gaussian (σ=25) vào `K` ảnh với `K ∈ {1, 5, 10, 20, 50}`. Tính ảnh trung bình của K ảnh nhiễu và đo MSE so với ảnh gốc để thấy phương sai nhiễu giảm theo K.

```python
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Ảnh sạch
clean = data.camera().astype(np.float32)

# 2. Hàm thêm nhiễu Gaussian
def add_gaussian_noise(img, sigma=25):
    noise = np.random.normal(0, sigma, img.shape)
    noisy = img + noise
    return np.clip(noisy, 0, 255).astype(np.uint8)

def mse(a, b):
    return np.mean((a.astype(np.float32) - b.astype(np.float32)) ** 2)

# 3. Trung bình K ảnh nhiễu
K_list = [1, 5, 10, 20, 50]
averaged = []
print(f"{'K':>4} | {'MSE so với ảnh sạch':>22}")
print("-" * 32)
for K in K_list:
    noisy_stack = np.stack([add_gaussian_noise(clean, sigma=25)
                            for _ in range(K)])
    avg = np.mean(noisy_stack, axis=0).astype(np.uint8)
    averaged.append(avg)
    print(f"{K:>4} | {mse(avg, clean):>22.2f}")

# 4. Hiển thị
fig, axes = plt.subplots(1, 6, figsize=(22, 4))
axes[0].imshow(clean.astype(np.uint8), cmap='gray')
axes[0].set_title('Ảnh sạch')
for i, (K, avg) in enumerate(zip(K_list, averaged)):
    axes[i+1].imshow(avg, cmap='gray')
    axes[i+1].set_title(f'Trung bình {K} ảnh\nMSE={mse(avg, clean):.1f}')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- K càng lớn → MSE càng nhỏ → ảnh càng mịn (nhiễu giảm).
- **Nguyên lý:** trung bình K ảnh nhiễu Gaussian → phương sai giảm K lần.

---


## 4. Lấy mẫu, lượng tử hóa và nội suy

---


### 4.1. Lấy mẫu và Lượng tử hóa
**📌 Bài tập 9:**
Cho ảnh `data.camera()`. Áp dụng:
1. **Downsample** với `factor ∈ {1, 2, 4, 8}` — giảm độ phân giải không gian.
2. **Quantize** với `bits ∈ {8, 4, 2, 1}` — giảm độ phân giải cường độ.

Quan sát hiện tượng **false contouring** khi số bit giảm xuống ≤ 2.

```python
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()

# 2. Hàm downsample — lấy mẫu thưa theo bước
def downsample(img, factor):
    return img[::factor, ::factor]

# 3. Hàm quantize — giảm số mức xám
def quantize(img, bits):
    levels = 2 ** bits
    step = 256 // levels
    return ((img // step) * step).astype(np.uint8)

# 4. Hiển thị: hàng trên = downsampling, hàng dưới = quantization
fig, axes = plt.subplots(2, 4, figsize=(18, 10))

# Downsampling
for i, f in enumerate([1, 2, 4, 8]):
    ds = downsample(img, f)
    axes[0, i].imshow(ds, cmap='gray')
    axes[0, i].set_title(f'Downsample ×{f}\nShape {ds.shape}')
    axes[0, i].axis('off')

# Quantization
for i, b in enumerate([8, 4, 2, 1]):
    q = quantize(img, b)
    axes[1, i].imshow(q, cmap='gray')
    axes[1, i].set_title(f'Quantize {b}-bit\n{2**b} mức xám')
    axes[1, i].axis('off')

plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- **Hàng trên:** factor tăng → ảnh bị "pixel hóa", mất chi tiết không gian.
- **Hàng dưới:** bits ≤ 2 → xuất hiện **đường viền giả** (false contouring) do số mức xám quá ít.

---


### 4.2. Nội suy ảnh (Nearest / Bilinear / Bicubic)
**📌 Bài tập 10:**
Cho ảnh `data.camera()`. Downsample xuống 10% kích thước, sau đó upsample trở lại kích thước gốc bằng 3 phương pháp: `INTER_NEAREST`, `INTER_LINEAR`, `INTER_CUBIC`. So sánh chất lượng.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()
H, W = img.shape

# 2. Downsample xuống 10%
small = cv2.resize(img, None, fx=0.1, fy=0.1,
                    interpolation=cv2.INTER_NEAREST)
print(f"Kích thước ảnh nhỏ: {small.shape}")

# 3. Upsample trở lại bằng 3 phương pháp
up_nn = cv2.resize(small, (W, H), interpolation=cv2.INTER_NEAREST)
up_bl = cv2.resize(small, (W, H), interpolation=cv2.INTER_LINEAR)
up_bc = cv2.resize(small, (W, H), interpolation=cv2.INTER_CUBIC)

# 4. Hiển thị
fig, axes = plt.subplots(1, 5, figsize=(22, 5))
items = [
    (img,   f'Ảnh gốc {img.shape}'),
    (small, f'Ảnh nhỏ {small.shape} (10%)'),
    (up_nn, 'Upsample NEAREST\n→ răng cưa rõ'),
    (up_bl, 'Upsample LINEAR\n→ mượt hơn'),
    (up_bc, 'Upsample CUBIC\n→ mượt nhất'),
]
for ax, (im, t) in zip(axes, items):
    ax.imshow(im, cmap='gray'); ax.set_title(t); ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- **Nearest:** răng cưa rõ (mỗi pixel nguồn thành 1 khối vuông).
- **Bilinear:** mượt hơn, dùng 4 láng giềng.
- **Bicubic:** mượt nhất, dùng 16 láng giềng.

---


## 5. Láng giềng, kề và khoảng cách

---


### 5.1. Láng giềng của một điểm ảnh
**📌 Bài tập 11:**
Viết hàm `get_neighbors(p, shape, mode)` trả về danh sách tọa độ láng giềng của pixel `p` trong ảnh kích thước `shape`, với `mode ∈ {'N4', 'ND', 'N8'}`. Kiểm tra với pixel trung tâm `(2,2)`, pixel góc `(0,0)`, pixel biên `(0,2)` trên ảnh 5×5. Trực quan hóa kết quả.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt

# 1. Hàm lấy láng giềng
def get_neighbors(p, shape, mode='N4'):
    x, y = p
    M, N = shape
    offsets_N4 = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    offsets_ND = [(-1, -1), (-1, 1), (1, -1), (1, 1)]

    if mode == 'N4':
        offsets = offsets_N4
    elif mode == 'ND':
        offsets = offsets_ND
    elif mode == 'N8':
        offsets = offsets_N4 + offsets_ND
    else:
        raise ValueError("mode phải là 'N4', 'ND' hoặc 'N8'")

    neighbors = []
    for dx, dy in offsets:
        nx, ny = x + dx, y + dy
        if 0 <= nx < M and 0 <= ny < N:
            neighbors.append((nx, ny))
    return neighbors

# 2. In kết quả text
shape = (5, 5)
for label, p in [("Trung tâm (2,2)", (2, 2)),
                 ("Góc (0,0)",      (0, 0)),
                 ("Biên (0,2)",     (0, 2))]:
    print(f"Pixel {label}:")
    print(f"  N4: {get_neighbors(p, shape, 'N4')}")
    print(f"  ND: {get_neighbors(p, shape, 'ND')}")
    print(f"  N8: {get_neighbors(p, shape, 'N8')}")
    print()

# 3. Trực quan hóa
def visualize_neighbors(p, shape, mode):
    canvas = np.ones((*shape, 3), dtype=np.uint8) * 255
    for i in range(shape[0] + 1):
        cv2.line(canvas, (0, i*50), (shape[1]*50, i*50), (200,200,200), 1)
    for j in range(shape[1] + 1):
        cv2.line(canvas, (j*50, 0), (j*50, shape[0]*50), (200,200,200), 1)
    # Vẽ pixel p (đỏ)
    cv2.rectangle(canvas, (p[1]*50+5, p[0]*50+5),
                  ((p[1]+1)*50-5, (p[0]+1)*50-5), (0, 0, 255), -1)
    # Vẽ láng giềng (xanh)
    for (nx, ny) in get_neighbors(p, shape, mode):
        cv2.rectangle(canvas, (ny*50+5, nx*50+5),
                      ((ny+1)*50-5, (nx+1)*50-5), (0, 200, 0), -1)
    return canvas

vis = [visualize_neighbors((2,2), shape, m) for m in ['N4','ND','N8']]
vis += [visualize_neighbors((0,0), shape, m) for m in ['N4','ND','N8']]

fig, axes = plt.subplots(2, 3, figsize=(12, 8))
titles = ['p=(2,2) N4', 'p=(2,2) ND', 'p=(2,2) N8',
          'p=(0,0) N4', 'p=(0,0) ND', 'p=(0,0) N8']
for ax, im, t in zip(axes.ravel(), vis, titles):
    ax.imshow(cv2.cvtColor(im, cv2.COLOR_BGR2RGB))
    ax.set_title(t); ax.axis('off')
plt.suptitle('Đỏ = pixel p, Xanh = láng giềng', fontsize=13, fontweight='bold')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Pixel góc `(0,0)` chỉ có 2 láng giềng N4, 1 ND, 3 N8.
- Pixel trung tâm có đủ 4 N4, 4 ND, 8 N8.

---


### 5.2. Các độ đo khoảng cách
**📌 Bài tập 12:**
Cài đặt 3 độ đo khoảng cách: Euclidean, City-block, Chessboard. Kiểm tra với `p=(2,3)`, `q=(5,7)` — kỳ vọng lần lượt là `5`, `7`, `4`. Vẽ minh họa "hình dạng" đường đẳng khoảng cách (R=5) trên lưới 21×21.

```python
import numpy as np
import matplotlib.pyplot as plt

# 1. Cài đặt 3 độ đo
def dist_euclidean(p, q):
    return np.sqrt((p[0]-q[0])**2 + (p[1]-q[1])**2)

def dist_cityblock(p, q):
    return abs(p[0]-q[0]) + abs(p[1]-q[1])

def dist_chessboard(p, q):
    return max(abs(p[0]-q[0]), abs(p[1]-q[1]))

# 2. Test với ví dụ
p, q = (2, 3), (5, 7)
print(f"p = {p}, q = {q}")
print(f"  Euclidean : {dist_euclidean(p, q):.4f}  (kỳ vọng 5)")
print(f"  City-block: {dist_cityblock(p, q)}       (kỳ vọng 7)")
print(f"  Chessboard: {dist_chessboard(p, q)}       (kỳ vọng 4)")
print()

# 3. Vẽ minh họa
R = 5
size = 21
center = (size // 2, size // 2)

img_euc   = np.zeros((size, size), dtype=np.uint8)
img_city  = np.zeros((size, size), dtype=np.uint8)
img_chess = np.zeros((size, size), dtype=np.uint8)

for i in range(size):
    for j in range(size):
        if dist_euclidean(center, (i, j)) <= R:
            img_euc[i, j] = 255
        if dist_cityblock(center, (i, j)) <= R:
            img_city[i, j] = 255
        if dist_chessboard(center, (i, j)) <= R:
            img_chess[i, j] = 255

fig, axes = plt.subplots(1, 3, figsize=(12, 5))
items = [
    (img_euc,   'Euclidean (R=5)\n→ hình tròn'),
    (img_city,  'City-block (R=5)\n→ hình thoi'),
    (img_chess, 'Chessboard (R=5)\n→ hình vuông'),
]
for ax, (im, t) in zip(axes, items):
    ax.imshow(im, cmap='gray'); ax.set_title(t); ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- **Euclidean:** hình tròn.
- **City-block:** hình thoi (vuông xoay 45°).
- **Chessboard:** hình vuông.

---


## 6. Thống kê cường độ ảnh

---


### 6.1. Histogram, Mean, Variance
**📌 Bài tập 13:**
Cho ảnh `data.camera()`. Tính histogram `p(z_k) = n_k / (M·N)`. Tính `mean` và `variance` **thủ công** từ công thức slide, sau đó so sánh với `np.mean` và `np.var`. Vẽ histogram bên cạnh ảnh gốc.

```python
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()
MN = img.size
zk = np.arange(256)

# 2. Histogram
nk = np.bincount(img.ravel(), minlength=256).astype(float)
p  = nk / MN

# 3. Tính mean và variance thủ công
mean_manual = np.sum(zk * p)
var_manual  = np.sum(((zk - mean_manual) ** 2) * p)

# 4. So sánh với NumPy
mean_np = np.mean(img)
var_np  = np.var(img)

print(f"{'Đại lượng':<18}{'Thủ công':>15}{'NumPy':>15}")
print("-" * 48)
print(f"{'Mean':<18}{mean_manual:>15.4f}{mean_np:>15.4f}")
print(f"{'Variance':<18}{var_manual:>15.4f}{var_np:>15.4f}")

# 5. Hiển thị: ảnh gốc + histogram
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

axes[0].imshow(img, cmap='gray')
axes[0].set_title('Ảnh camera')
axes[0].axis('off')

axes[1].bar(zk, nk, width=1, color='gray')
axes[1].set_title(f'Histogram — mean = {mean_np:.1f}, variance = {var_np:.1f}')
axes[1].set_xlabel('Mức xám z')
axes[1].set_ylabel('Số pixel n_k')
axes[1].set_xlim(0, 255)

plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Giá trị mean và variance tính thủ công **khớp** với NumPy.
- Histogram cho thấy phân bố mức xám của ảnh.

---


## 7. Tổng kết

---


### 7.1. Bảng tổng hợp — Ví dụ theo slide lý thuyết

| Slide lý thuyết | Bài tập | Chủ đề |
|-----------------|:-------:|--------|
| Đọc/ghi/hiển thị ảnh | 1 | `cv2.imread/imwrite` |
| Biểu diễn ảnh số | 2 | Ma trận M×N, truy cập pixel, crop |
| Không gian màu | 3 | RGB / Gray / HSV |
| Biến đổi hình học | 4 | Resize, Flip, Rotate |
| Vẽ hình học | 5 | Line, Rectangle, Circle, Text |
| Phép toán số học | 6 | Cộng, trừ, âm bản, trung bình |
| Phép toán logic | 7 | AND, OR, NOT, XOR |
| Trung bình ảnh giảm nhiễu | 8 | Nhiễu Gaussian |
| Lấy mẫu & lượng tử hóa | 9 | Downsample, Quantize |
| Nội suy ảnh | 10 | Nearest / Bilinear / Bicubic |
| Láng giềng | 11 | N4, ND, N8 |
| Khoảng cách | 12 | Euclidean / City-block / Chessboard |
| Histogram, Mean, Variance | 13 | Thống kê cường độ |

---


### 7.2. Lưu ý quan trọng khi chạy code

| Vấn đề | Cách xử lý |
|--------|-----------|
| **OverflowError** khi cộng/trừ `uint8` | Dùng `cv2.add` / `cv2.subtract` hoặc ép về `int` trước |
| **Hiển thị ảnh màu** đọc từ OpenCV | Đổi `BGR → RGB` trước khi `imshow` |
| **Không dùng `cv2.imshow`** trong Jupyter | Gây treo kernel — dùng `matplotlib` |
| **Truy cập pixel** | `img[y, x]` (hàng trước, cột sau) — không phải `img[x, y]` |
| **Histogram `np.bincount`** | Chỉ nhận mảng 1D không âm, dùng `minlength=256` |

---


### 7.3. Tổng kết

**Bốn nhóm nội dung chính Chương 1:**

| Nhóm | Số bài tập | Kỹ thuật chủ đạo |
|------|:----------:|------------------|
| **1. Khái niệm cơ bản về ảnh số** | 1 → 3 | Đọc/ghi ảnh, ma trận, không gian màu |
| **2. Biến đổi hình học** | 4 → 5 | Resize, Flip, Rotate, vẽ hình |
| **3. Phép toán trên ảnh** | 6 → 8 | Số học, logic, trung bình giảm nhiễu |
| **4. Lấy mẫu & nội suy** | 9 → 10 | Downsample, Quantize, nội suy |
| **5. Láng giềng & khoảng cách** | 11 → 12 | N4/ND/N8, Euclidean/City-block/Chessboard |
| **6. Thống kê cường độ** | 13 | Histogram, Mean, Variance |

**📌 Nhớ 3 điều:**
1. **Ảnh = ma trận NumPy** — `img[y, x]` cho pixel, `img[y1:y2, x1:x2]` để crop.
2. **Không dùng `cv2.imshow` trong Jupyter** — gây treo kernel, dùng `matplotlib`.
3. **Chú ý kiểu dữ liệu** — `uint8` dễ bị tràn số khi cộng/trừ, dùng `cv2.add`/`cv2.subtract` hoặc ép về `int`/`float`.