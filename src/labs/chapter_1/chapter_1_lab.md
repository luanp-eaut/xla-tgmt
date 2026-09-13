# BÀI TẬP THỰC HÀNH CHƯƠNG 1
## Giới thiệu tổng quan về Xử lý ảnh và Thị giác máy tính

---

## 📁 Cấu trúc thư mục

```
chapter_1_lab/
├── images/              # Ảnh đầu vào
├── output/              # Kết quả xử lý
└── chapter_1_lab.ipynb  # File notebook (đặt trực tiếp ở thư mục ngoài)
```

> **Lưu ý:** File notebook `chapter_1_lab.ipynb` nằm **cùng cấp** với `images/` và `output/`, do đó đường dẫn trong code là `images/...` và `output/...` (không có `../`).

---

## ⚙️ 0. Chuẩn bị môi trường

Cài đặt các thư viện cần thiết:

```bash
pip install "opencv-python>=4.8" numpy matplotlib scikit-image pillow ipykernel
```

**Cell 0 — Khởi tạo chung (chạy đầu tiên trong notebook):**

```python
%matplotlib inline

import numpy as np
import cv2
import matplotlib.pyplot as plt
from pathlib import Path
from skimage import data

# Tạo thư mục images/ và output/ nếu chưa tồn tại
Path("images").mkdir(exist_ok=True)
Path("output").mkdir(exist_ok=True)

print("OpenCV version:", cv2.__version__)
print("NumPy version :", np.__version__)

# ---------- Hàm tiện ích hiển thị ảnh ----------
def show_image(img, title="", cmap=None, figsize=(5, 4), save_path=None):
    """Hiển thị 1 ảnh (tự xử lý BGR -> RGB)."""
    plt.figure(figsize=figsize)
    if img.ndim == 3:
        plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    else:
        plt.imshow(img, cmap=cmap or 'gray')
    plt.title(title)
    plt.axis('off')
    if save_path:
        plt.savefig(save_path, dpi=100, bbox_inches='tight')
    plt.show()


def show_grid(images, titles, ncols=3, figsize=(15, 8),
              cmap='gray', save_path=None, main_title=None):
    """
    Hiển thị nhiều ảnh trong lưới.
    images : list các ảnh (numpy array)
    titles : list tiêu đề tương ứng
    """
    n = len(images)
    nrows = (n + ncols - 1) // ncols
    fig, axes = plt.subplots(nrows, ncols, figsize=figsize)
    axes = np.array(axes).ravel()

    for i, (im, t) in enumerate(zip(images, titles)):
        ax = axes[i]
        if im.ndim == 3:
            ax.imshow(im)
        else:
            ax.imshow(im, cmap=cmap)
        ax.set_title(t, fontsize=10)
        ax.axis('off')

    # Ẩn các ô trống
    for j in range(n, len(axes)):
        axes[j].axis('off')

    if main_title:
        plt.suptitle(main_title, fontsize=13, fontweight='bold')
    plt.tight_layout()
    if save_path:
        plt.savefig(save_path, dpi=100, bbox_inches='tight')
    plt.show()
```

> **Lưu ý về màu sắc:**
> - `cv2.imread()` đọc ảnh theo thứ tự **BGR**.
> - `skimage.data` và `matplotlib` dùng **RGB**.
> - Ảnh đọc bằng OpenCV cần đổi `BGR → RGB` trước khi hiển thị bằng `matplotlib`.
> - **Trong notebook này KHÔNG dùng `cv2.imshow` / `cv2.waitKey`** vì chúng gây treo kernel.

---

## Bài 1: Đọc, hiển thị và lưu ảnh

**Mức độ:** Cơ bản

**Mục tiêu:** Làm quen với các hàm `cv2.imread()`, `cv2.imwrite()` và biểu diễn ảnh dưới dạng mảng NumPy.

**Yêu cầu:**
1. Tải ảnh xám `data.camera()` và ảnh màu `data.astronaut()` từ `skimage`.
2. Lưu hai ảnh này vào thư mục `images/` dưới định dạng `.png`.
3. Đọc lại ảnh màu bằng `cv2.imread()` và in ra kích thước, kiểu dữ liệu.
4. Hiển thị cả hai ảnh cạnh nhau bằng `matplotlib`.
5. Lưu kết quả hiển thị vào `output/bai1_output.png`.

**Lời giải:**

```python
# 1. Tải ảnh mẫu
img_gray  = data.camera()       # uint8, shape (512, 512)
img_color = data.astronaut()    # uint8, shape (512, 512, 3) - RGB

# 2. Lưu vào images/ (OpenCV dùng BGR khi ghi ảnh màu)
cv2.imwrite('images/camera_gray.png', img_gray)
cv2.imwrite('images/astronaut_color.png',
            cv2.cvtColor(img_color, cv2.COLOR_RGB2BGR))

# 3. Đọc lại bằng OpenCV
img_cv = cv2.imread('images/astronaut_color.png')   # BGR
print("Shape      :", img_cv.shape)
print("Dtype      :", img_cv.dtype)
print("Số kênh màu:", img_cv.shape[2])
print("Min/Max    :", img_cv.min(), "/", img_cv.max())

# 4. Hiển thị
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].imshow(img_gray, cmap='gray')
axes[0].set_title('Ảnh xám (camera)')
axes[0].axis('off')

axes[1].imshow(img_color)
axes[1].set_title('Ảnh màu (astronaut)')
axes[1].axis('off')

plt.tight_layout()
plt.savefig('output/bai1_output.png', dpi=100, bbox_inches='tight')
plt.show()
```

**📸 Kết quả hiển thị:**
- Bên trái: ảnh xám `camera` (cô gái cầm máy ảnh).
- Bên phải: ảnh màu `astronaut` (phi hành gia).

---

## Bài 2: Thông tin ảnh và biểu diễn ma trận

**Mức độ:** Cơ bản

**Mục tiêu:** Hiểu cách ảnh số được biểu diễn dưới dạng ma trận M×N (xám) hoặc M×N×3 (màu).

**Yêu cầu:**
1. Viết hàm `print_image_info(img, name)` in ra: shape, dtype, min, max, số kênh màu (nếu có).
2. Áp dụng cho 3 ảnh: `data.camera()`, `data.astronaut()`, `data.coins()`.
3. Truy cập và in giá trị pixel tại vị trí `(100, 200)` của ảnh xám camera.
4. Trích xuất và hiển thị một vùng ảnh (crop) kích thước 100×100 từ góc trên-trái của ảnh camera; lưu vào `output/bai2_crop.png`.

**Lời giải:**

```python
def print_image_info(img, name="Ảnh"):
    print(f"=== {name} ===")
    print(f"  Shape  : {img.shape}")
    print(f"  Dtype  : {img.dtype}")
    print(f"  Min/Max: {img.min()} / {img.max()}")
    if img.ndim == 3:
        print(f"  Số kênh: {img.shape[2]}")
    print()

# 1, 2
img_cam  = data.camera()
img_ast  = data.astronaut()
img_coin = data.coins()

print_image_info(img_cam,  "Camera (xám)")
print_image_info(img_ast,  "Astronaut (màu)")
print_image_info(img_coin, "Coins (xám)")

# 3. Truy cập pixel
x, y = 100, 200
print(f"Pixel ({x},{y}) của ảnh camera = {img_cam[x, y]}")

# 4. Crop 100x100 từ góc trên-trái
crop = img_cam[0:100, 0:100]
cv2.imwrite('output/bai2_crop.png', crop)

# Hiển thị ảnh gốc + vùng crop
show_grid(
    [img_cam, crop],
    [f'Ảnh camera gốc {img_cam.shape}',
     f'Crop 100×100 từ góc trên-trái'],
    ncols=2, figsize=(12, 5),
    save_path='output/bai2_display.png',
    main_title='Bài 2: Truy cập pixel và crop ảnh'
)
```

**📸 Kết quả hiển thị:**
- Ảnh gốc 512×512 bên trái.
- Ảnh crop 100×100 bên phải (được phóng to khi hiển thị).

---

## Bài 3: Chuyển đổi không gian màu

**Mức độ:** Cơ bản

**Mục tiêu:** Hiểu các không gian màu RGB, Gray, HSV và công thức chuyển đổi.

**Yêu cầu:**
1. Chuyển ảnh `astronaut()` từ RGB sang Gray bằng `cv2.cvtColor`.
2. Chuyển RGB sang Gray **thủ công**: `Gray = 0.299·R + 0.587·G + 0.114·B`.
3. So sánh kết quả hai cách (tính sai số tuyệt đối trung bình).
4. Chuyển RGB sang HSV và trích xuất 3 kênh H, S, V riêng biệt.
5. Hiển thị tất cả và lưu vào `output/`.

**Lời giải:**

```python
img_rgb = data.astronaut()  # RGB

# 1. Chuyển sang Gray bằng OpenCV
img_gray_cv = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)

# 2. Chuyển thủ công
R, G, B = img_rgb[:,:,0], img_rgb[:,:,1], img_rgb[:,:,2]
img_gray_manual = (0.299*R + 0.587*G + 0.114*B).astype(np.uint8)

# 3. So sánh
diff = np.abs(img_gray_cv.astype(int) - img_gray_manual.astype(int))
print(f"Sai số tuyệt đối trung bình: {diff.mean():.4f}")
print(f"Sai số tối đa              : {diff.max()}")

# 4. Chuyển sang HSV
img_hsv = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2HSV)
H, S, V = img_hsv[:,:,0], img_hsv[:,:,1], img_hsv[:,:,2]

# 5. Hiển thị
show_grid(
    [img_rgb, img_gray_cv, img_gray_manual,
     H, S, V],
    ['RGB gốc',
     'Gray (OpenCV)',
     'Gray (thủ công)',
     'Kênh H (Hue)',
     'Kênh S (Saturation)',
     'Kênh V (Value)'],
    ncols=3, figsize=(15, 10),
    save_path='output/bai3_color_spaces.png',
    main_title='Bài 3: Không gian màu RGB → Gray / HSV'
)

# Lưu từng kênh
cv2.imwrite('output/bai3_gray.png', img_gray_cv)
cv2.imwrite('output/bai3_hue.png',  H)
cv2.imwrite('output/bai3_sat.png',  S)
cv2.imwrite('output/bai3_val.png',  V)
```

**📸 Kết quả hiển thị:** Lưới 2×3 gồm ảnh gốc, 2 ảnh xám (gần như giống nhau), và 3 kênh H/S/V.

---

## Bài 4: Biến đổi hình học cơ bản

**Mức độ:** Cơ bản

**Mục tiêu:** Sử dụng `cv2.resize`, `cv2.flip`, `cv2.rotate`.

**Yêu cầu:**
1. Resize ảnh `astronaut()` xuống 50% và lên 200% (dùng `INTER_LINEAR` và `INTER_CUBIC`).
2. Lật ảnh theo 3 chế độ: ngang, dọc, cả hai.
3. Xoay ảnh 90°, 180°, 270°.
4. Hiển thị tất cả kết quả và lưu vào `output/bai4_geometric.png`.

**Lời giải:**

```python
img = data.astronaut()

# 1. Resize
img_50  = cv2.resize(img, None, fx=0.5, fy=0.5, interpolation=cv2.INTER_LINEAR)
img_200 = cv2.resize(img, None, fx=2.0, fy=2.0, interpolation=cv2.INTER_CUBIC)
print("Kích thước gốc :", img.shape)
print("Sau resize 50% :", img_50.shape)
print("Sau resize 200%:", img_200.shape)

# 2. Flip
flip_h = cv2.flip(img, 1)    # ngang
flip_v = cv2.flip(img, 0)    # dọc
flip_b = cv2.flip(img, -1)   # cả hai

# 3. Rotate
rot_90  = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
rot_180 = cv2.rotate(img, cv2.ROTATE_180)
rot_270 = cv2.rotate(img, cv2.ROTATE_90_COUNTERCLOCKWISE)

# 4. Hiển thị
show_grid(
    [img, img_50, img_200,
     flip_h, flip_v, flip_b,
     rot_90, rot_180, rot_270],
    ['Ảnh gốc',
     'Resize 50% (Linear)',
     'Resize 200% (Cubic)',
     'Flip ngang (axis=1)',
     'Flip dọc (axis=0)',
     'Flip cả hai (axis=-1)',
     'Rotate 90°',
     'Rotate 180°',
     'Rotate 270°'],
    ncols=3, figsize=(15, 12),
    save_path='output/bai4_geometric.png',
    main_title='Bài 4: Biến đổi hình học — resize, flip, rotate'
)

cv2.imwrite('output/bai4_resize50.png', cv2.cvtColor(img_50, cv2.COLOR_RGB2BGR))
cv2.imwrite('output/bai4_flip_h.png',   cv2.cvtColor(flip_h, cv2.COLOR_RGB2BGR))
cv2.imwrite('output/bai4_rot90.png',    cv2.cvtColor(rot_90, cv2.COLOR_RGB2BGR))
```

**📸 Kết quả hiển thị:** Lưới 3×3 gồm ảnh gốc, 2 ảnh resize, 3 ảnh flip, 3 ảnh rotate.

---

## Bài 5: Vẽ hình học lên ảnh

**Mức độ:** Cơ bản

**Mục tiêu:** Sử dụng `cv2.line`, `cv2.rectangle`, `cv2.circle`, `cv2.putText`.

**Yêu cầu:**
Tạo canvas trắng 400×600, sau đó vẽ:
1. Đường thẳng đỏ ngang `y = 50`, từ `x = 50` đến `x = 550`, độ dày 3.
2. Hình chữ nhật viền xanh lá `(50,100)` → `(250,250)`, độ dày 2.
3. Hình tròn đặc xanh dương tâm `(450,200)` bán kính 80.
4. Dòng chữ `"XLA & TGMT"` tại `(150, 350)`.
5. Hiển thị và lưu vào `output/bai5_drawing.png`.

**Lời giải:**

```python
# Tạo canvas trắng
canvas = np.ones((400, 600, 3), dtype=np.uint8) * 255

# 1. Đường thẳng (BGR: đỏ = (0,0,255))
cv2.line(canvas, (50, 50), (550, 50), (0, 0, 255), 3)

# 2. Hình chữ nhật (xanh lá = (0,255,0))
cv2.rectangle(canvas, (50, 100), (250, 250), (0, 255, 0), 2)

# 3. Hình tròn đặc (xanh dương = (255,0,0))
cv2.circle(canvas, (450, 200), 80, (255, 0, 0), -1)

# 4. Text
cv2.putText(canvas, "XLA & TGMT", (150, 350),
            cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 0, 0), 2)

# Hiển thị & lưu
show_image(canvas, "Bài 5: Hình vẽ hình học cơ bản",
           figsize=(9, 6),
           save_path='output/bai5_drawing.png')
cv2.imwrite('output/bai5_drawing_cv.png', canvas)
```

**📸 Kết quả hiển thị:** Canvas trắng 400×600 với đường thẳng đỏ, hình chữ nhật xanh lá, hình tròn xanh dương, và dòng chữ "XLA & TGMT".

---

## Bài 6: Phép toán số học trên ảnh

**Mức độ:** Trung bình

**Mục tiêu:** Hiểu phép toán theo phần tử (elementwise): cộng, trừ, tạo ảnh âm bản, trung bình 2 ảnh.

**Yêu cầu:**
1. Tạo ảnh âm bản của `data.camera()` bằng công thức `s = 255 - r`.
2. Tăng độ sáng ảnh bằng `cv2.add(img, 50)` (tránh tràn số).
3. Giảm độ sáng ảnh bằng `cv2.subtract(img, 50)`.
4. Trộn `camera` và `coins` (đã resize cùng kích thước) với trọng số 0.5/0.5.
5. Hiển thị và lưu kết quả.

**Lời giải:**

```python
img  = data.camera()            # grayscale
img2 = data.coins()             # grayscale

# 1. Âm bản
img_negative = 255 - img

# 2. Tăng sáng (+50) — cv2.add sẽ bão hòa ở 255 thay vì tràn số
img_bright = cv2.add(img, 50)

# 3. Giảm sáng (-50) — cv2.subtract sẽ bão hòa ở 0
img_dark = cv2.subtract(img, 50)

# 4. Trung bình 2 ảnh — resize cho cùng kích thước
img2_rs = cv2.resize(img2, (img.shape[1], img.shape[0]))
img_blend = cv2.addWeighted(img, 0.5, img2_rs, 0.5, 0)

# Hiển thị
show_grid(
    [img, img_negative, img_bright,
     img_dark, img2_rs, img_blend],
    ['Gốc',
     'Âm bản (255 - r)',
     'Tăng sáng (+50)',
     'Giảm sáng (-50)',
     'Ảnh coins (resize)',
     'Trung bình 2 ảnh (0.5/0.5)'],
    ncols=3, figsize=(15, 10),
    save_path='output/bai6_arithmetic.png',
    main_title='Bài 6: Phép toán số học trên ảnh'
)

cv2.imwrite('output/bai6_negative.png', img_negative)
cv2.imwrite('output/bai6_bright.png',   img_bright)
cv2.imwrite('output/bai6_blend.png',    img_blend)
```

**📸 Kết quả hiển thị:** Lưới 2×3, thấy rõ ảnh âm bản (đảo sáng tối), ảnh sáng hơn, ảnh tối hơn, và ảnh trộn hai nguồn.

---

## Bài 7: Phép toán logic trên ảnh

**Mức độ:** Trung bình

**Mục tiêu:** Sử dụng `cv2.bitwise_and/or/not/xor` trên ảnh nhị phân (mask).

**Yêu cầu:**
1. Tạo mask A: hình chữ nhật trắng `(50,50)` → `(200,200)` trên nền 300×300.
2. Tạo mask B: hình tròn trắng tâm `(200,200)` bán kính 100.
3. Tính AND, OR, NOT A, XOR.
4. Hiển thị tất cả và lưu vào `output/bai7_logic.png`.

**Lời giải:**

```python
# Tạo mask A
mask_a = np.zeros((300, 300), dtype=np.uint8)
cv2.rectangle(mask_a, (50, 50), (200, 200), 255, -1)

# Tạo mask B
mask_b = np.zeros((300, 300), dtype=np.uint8)
cv2.circle(mask_b, (200, 200), 100, 255, -1)

# Phép toán logic
and_img = cv2.bitwise_and(mask_a, mask_b)
or_img  = cv2.bitwise_or(mask_a, mask_b)
not_a   = cv2.bitwise_not(mask_a)
xor_img = cv2.bitwise_xor(mask_a, mask_b)

# Hiển thị
show_grid(
    [mask_a, mask_b, and_img,
     or_img, not_a, xor_img],
    ['Mask A (chữ nhật)',
     'Mask B (hình tròn)',
     'A AND B (giao)',
     'A OR B (hợp)',
     'NOT A (đảo)',
     'A XOR B (khác nhau)'],
    ncols=3, figsize=(15, 10),
    save_path='output/bai7_logic.png',
    main_title='Bài 7: Phép toán logic trên mask nhị phân'
)
```

**📸 Kết quả hiển thị:** Lưới 2×3. Thấy rõ AND là phần giao, OR là phần hợp, NOT A là phần đảo, XOR là phần khác nhau.

---

## Bài 8: Trung bình ảnh để giảm nhiễu Gaussian

**Mức độ:** Trung bình

**Mục tiêu:** Minh họa nguyên lý "trung bình k ảnh nhiễu → phương sai nhiễu giảm k lần".

**Yêu cầu:**
1. Lấy ảnh sạch `data.camera()`, chuyển sang `float32`.
2. Viết hàm `add_gaussian_noise(img, sigma=25)`.
3. Với `K ∈ {1, 5, 10, 20, 50}`: tạo K ảnh nhiễu, tính trung bình.
4. Tính MSE giữa ảnh trung bình và ảnh sạch cho từng K → in ra bảng.
5. Hiển thị tất cả ảnh và lưu ảnh trung bình của 50 ảnh nhiễu.

**Lời giải:**

```python
clean = data.camera().astype(np.float32)

def add_gaussian_noise(img, sigma=25):
    """Thêm nhiễu Gaussian vào ảnh float32."""
    noise = np.random.normal(0, sigma, img.shape)
    noisy = img + noise
    return np.clip(noisy, 0, 255).astype(np.uint8)

def mse(a, b):
    return np.mean((a.astype(np.float32) - b.astype(np.float32)) ** 2)

K_list = [1, 5, 10, 20, 50]
averaged = []
print(f"{'K':>4} | {'MSE so với ảnh sạch':>22}")
print("-" * 32)
for K in K_list:
    noisy_stack = np.stack([add_gaussian_noise(clean, sigma=25) for _ in range(K)])
    avg = np.mean(noisy_stack, axis=0).astype(np.uint8)
    averaged.append(avg)
    print(f"{K:>4} | {mse(avg, clean):>22.2f}")

# Hiển thị: ảnh sạch + 1 ảnh nhiễu + các ảnh trung bình
show_grid(
    [clean.astype(np.uint8),
     add_gaussian_noise(clean, sigma=25)] + averaged,
    ['Ảnh sạch',
     'Ảnh nhiễu (1 ảnh)',
     'Trung bình 1 ảnh',
     'Trung bình 5 ảnh',
     'Trung bình 10 ảnh',
     'Trung bình 20 ảnh',
     'Trung bình 50 ảnh'],
    ncols=4, figsize=(18, 8),
    save_path='output/bai8_averaging.png',
    main_title='Bài 8: Trung bình K ảnh nhiễu → giảm nhiễu Gaussian'
)

cv2.imwrite('output/bai8_avg50.png', averaged[-1])
```

**📸 Kết quả hiển thị:** Lưới 2×4. Ảnh nhiễu (K=1) rất hạt, càng nhiều ảnh trung bình (K=50) càng mịn → minh họa rõ nguyên lý giảm nhiễu.

---

## Bài 9: Mô phỏng lấy mẫu và lượng tử hóa

**Mức độ:** Trung bình

**Mục tiêu:** Hiểu vai trò của sampling (độ phân giải không gian) và quantization (độ phân giải cường độ), quan sát false contouring.

**Yêu cầu:**
1. Viết hàm `downsample(img, factor)`.
2. Viết hàm `quantize(img, bits)`.
3. Hiển thị với `factor ∈ {1, 2, 4, 8}` và `bits ∈ {8, 4, 2, 1}`.
4. Nhận xét hiện tượng xảy ra ở `bits ≤ 2`.
5. Lưu ảnh `downsample x4` và `quantize 2-bit`.

**Lời giải:**

```python
img = data.camera()

def downsample(img, factor):
    """Giảm độ phân giải không gian bằng cách lấy mẫu thưa."""
    return img[::factor, ::factor]

def quantize(img, bits):
    """Lượng tử hóa ảnh xuống còn 2^bits mức xám."""
    levels = 2 ** bits
    step = 256 // levels
    return ((img // step) * step).astype(np.uint8)

# Hàng trên: Downsampling
ds_list   = [downsample(img, f) for f in [1, 2, 4, 8]]
ds_titles = [f'Downsample ×{f}\nShape {d.shape}' for f, d in zip([1,2,4,8], ds_list)]

# Hàng dưới: Quantization
q_list    = [quantize(img, b) for b in [8, 4, 2, 1]]
q_titles  = [f'Quantize {b}-bit ({2**b} mức xám)' for b in [8,4,2,1]]

show_grid(
    ds_list + q_list,
    ds_titles + q_titles,
    ncols=4, figsize=(18, 10),
    save_path='output/bai9_sampling_quantization.png',
    main_title='Bài 9: Lấy mẫu (hàng trên) và Lượng tử hóa (hàng dưới)'
)

# NHẬN XÉT:
# - Hàng trên: Khi factor tăng, ảnh bị "pixel hóa" (mất chi tiết không gian).
# - Hàng dưới: Khi bits <= 2, ảnh xuất hiện "đường viền giả" (false contouring)
#   do số mức xám quá ít, vùng chuyển màu mượt bị chia thành các dải rõ rệt.

cv2.imwrite('output/bai9_ds4.png',   downsample(img, 4))
cv2.imwrite('output/bai9_q2bit.png', quantize(img, 2))
```

**📸 Kết quả hiển thị:** Lưới 2×4. Hàng trên thấy rõ hiệu ứng pixel hóa. Hàng dưới thấy rõ false contouring khi bits giảm.

---

## Bài 10: Nội suy ảnh (Nearest / Bilinear / Bicubic)

**Mức độ:** Trung bình

**Mục tiêu:** So sánh 3 phương pháp nội suy khi phóng to ảnh.

**Yêu cầu:**
1. Downsample ảnh `camera` xuống 10% bằng `INTER_NEAREST`.
2. Upsample trở lại kích thước gốc bằng 3 phương pháp: `INTER_NEAREST`, `INTER_LINEAR`, `INTER_CUBIC`.
3. Hiển thị ảnh nhỏ và 3 kết quả cạnh nhau.
4. Lưu 3 ảnh kết quả.

**Lời giải:**

```python
img = data.camera()
H, W = img.shape

# 1. Downsample xuống 10%
small = cv2.resize(img, None, fx=0.1, fy=0.1, interpolation=cv2.INTER_NEAREST)
print("Kích thước ảnh nhỏ:", small.shape)

# 2. Upsample trở lại kích thước gốc
up_nn = cv2.resize(small, (W, H), interpolation=cv2.INTER_NEAREST)
up_bl = cv2.resize(small, (W, H), interpolation=cv2.INTER_LINEAR)
up_bc = cv2.resize(small, (W, H), interpolation=cv2.INTER_CUBIC)

# 3. Hiển thị
show_grid(
    [img, small, up_nn, up_bl, up_bc],
    [f'Ảnh gốc {img.shape}',
     f'Ảnh nhỏ {small.shape} (10%)',
     'Upsample INTER_NEAREST\n→ răng cưa rõ',
     'Upsample INTER_LINEAR\n→ mượt hơn',
     'Upsample INTER_CUBIC\n→ mượt nhất'],
    ncols=5, figsize=(22, 5),
    save_path='output/bai10_interpolation.png',
    main_title='Bài 10: So sánh 3 phương pháp nội suy'
)

# 4. Lưu
cv2.imwrite('output/bai10_nn.png',       up_nn)
cv2.imwrite('output/bai10_bilinear.png', up_bl)
cv2.imwrite('output/bai10_bicubic.png',  up_bc)
```

**📸 Kết quả hiển thị:** Ảnh gốc, ảnh nhỏ 10%, và 3 ảnh upsample. Thấy rõ Nearest bị răng cưa, Bilinear mượt hơn, Bicubic mượt nhất.

---

## Bài 11: Láng giềng của một điểm ảnh

**Mức độ:** Nâng cao

**Mục tiêu:** Cài đặt N4(p), ND(p), N8(p) và xử lý biên ảnh.

**Yêu cầu:**
1. Viết hàm `get_neighbors(p, shape, mode)` với `mode ∈ {'N4', 'ND', 'N8'}`.
2. Kiểm tra với pixel trung tâm `(2,2)`, pixel góc `(0,0)`, pixel biên `(0,2)` trên ảnh 5×5.
3. In kết quả và **trực quan hóa** láng giềng trên lưới 5×5.

**Lời giải:**

```python
def get_neighbors(p, shape, mode='N4'):
    """Trả về danh sách tọa độ láng giềng của pixel p trong ảnh kích thước shape."""
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

shape = (5, 5)

# In kết quả text
for label, p in [("Trung tâm (2,2)", (2, 2)),
                 ("Góc (0,0)",      (0, 0)),
                 ("Biên (0,2)",     (0, 2))]:
    print(f"Pixel {label}:")
    print(f"  N4: {get_neighbors(p, shape, 'N4')}")
    print(f"  ND: {get_neighbors(p, shape, 'ND')}")
    print(f"  N8: {get_neighbors(p, shape, 'N8')}")
    print()

# ----- Trực quan hóa -----
def visualize_neighbors(p, shape, mode):
    """Vẽ lưới 5x5: pixel p = đỏ, láng giềng = xanh, còn lại = trắng."""
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

show_grid(
    vis,
    ['p=(2,2) N4', 'p=(2,2) ND', 'p=(2,2) N8',
     'p=(0,0) N4', 'p=(0,0) ND', 'p=(0,0) N8'],
    ncols=3, figsize=(12, 8),
    save_path='output/bai11_neighbors.png',
    main_title='Bài 11: Trực quan hóa láng giềng\n(Đỏ = pixel p, Xanh = láng giềng)'
)
```

**📸 Kết quả hiển thị:** Lưới 2×3 với các ô vuông:
- **Đỏ** = pixel trung tâm p.
- **Xanh** = các láng giềng theo mode tương ứng.
- **Trắng** = pixel ngoài tập láng giềng.

Với p=(0,0) (góc), thấy rõ N4 chỉ có 2 láng giềng, ND chỉ có 1, N8 có 3.

---

## Bài 12: Các độ đo khoảng cách

**Mức độ:** Nâng cao

**Mục tiêu:** Cài đặt và so sánh khoảng cách Euclidean, City-block, Chessboard.

**Yêu cầu:**
1. Viết 3 hàm `dist_euclidean`, `dist_cityblock`, `dist_chessboard`.
2. Kiểm tra với ví dụ slide: `p=(2,3)`, `q=(5,7)` → kỳ vọng `5`, `7`, `4`.
3. Vẽ minh họa "hình dạng" đường đẳng khoảng cách (R=5) trên lưới 21×21.
4. Lưu kết quả.

**Lời giải:**

```python
def dist_euclidean(p, q):
    return np.sqrt((p[0]-q[0])**2 + (p[1]-q[1])**2)

def dist_cityblock(p, q):
    return abs(p[0]-q[0]) + abs(p[1]-q[1])

def dist_chessboard(p, q):
    return max(abs(p[0]-q[0]), abs(p[1]-q[1]))

# 1. Test với ví dụ slide
p, q = (2, 3), (5, 7)
print(f"p = {p}, q = {q}")
print(f"  Euclidean : {dist_euclidean(p, q):.4f}  (kỳ vọng 5)")
print(f"  City-block: {dist_cityblock(p, q)}       (kỳ vọng 7)")
print(f"  Chessboard: {dist_chessboard(p, q)}       (kỳ vọng 4)")
print()

# 2. Vẽ minh họa
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

# Hiển thị
show_grid(
    [img_euc, img_city, img_chess],
    ['Euclidean (R=5)\n→ hình tròn',
     'City-block (R=5)\n→ hình thoi',
     'Chessboard (R=5)\n→ hình vuông'],
    ncols=3, figsize=(12, 5),
    save_path='output/bai12_distance.png',
    main_title='Bài 12: Hình dạng đường đẳng khoảng cách (R=5)'
)
```

**📸 Kết quả hiển thị:** 3 khối trắng trên nền đen — lần lượt là hình tròn, hình thoi (vuông xoay 45°), và hình vuông. Đây là minh họa trực quan rất rõ cho 3 loại khoảng cách.

---

## Bài 13: Thống kê cường độ ảnh (Histogram, Mean, Variance)

**Mức độ:** Nâng cao

**Mục tiêu:** Cài đặt thủ công histogram, mean, variance từ công thức slide và so sánh với NumPy.

**Yêu cầu:**
1. Tính histogram `p(z_k) = n_k / (M·N)` bằng `np.bincount`.
2. Tính `mean` và `variance` **thủ công**.
3. So sánh với `np.mean` và `np.var`.
4. Vẽ histogram bằng `matplotlib`, hiển thị ảnh gốc + histogram, lưu kết quả.

**Lời giải:**

```python
img = data.camera()
MN = img.size
zk = np.arange(256)

# 1. Histogram
nk = np.bincount(img.ravel(), minlength=256).astype(float)
p  = nk / MN

# 2. Tính thủ công
mean_manual = np.sum(zk * p)
var_manual  = np.sum(((zk - mean_manual) ** 2) * p)

# 3. So sánh với NumPy
mean_np = np.mean(img)
var_np  = np.var(img)

print(f"{'Đại lượng':<18}{'Thủ công':>15}{'NumPy':>15}")
print("-" * 48)
print(f"{'Mean':<18}{mean_manual:>15.4f}{mean_np:>15.4f}")
print(f"{'Variance':<18}{var_manual:>15.4f}{var_np:>15.4f}")

# 4. Hiển thị: ảnh gốc + histogram
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

axes[0].imshow(img, cmap='gray')
axes[0].set_title('Ảnh camera')
axes[0].axis('off')

axes[1].bar(zk, nk, width=1, color='gray')
axes[1].set_title(f'Histogram — mean = {mean_np:.1f}, variance = {var_np:.1f}')
axes[1].set_xlabel('Mức xám z')
axes[1].set_ylabel('Số pixel n_k')
axes[1].set_xlim(0, 255)

plt.suptitle('Bài 13: Histogram, Mean, Variance của ảnh camera',
             fontsize=13, fontweight='bold')
plt.tight_layout()
plt.savefig('output/bai13_histogram.png', dpi=100, bbox_inches='tight')
plt.show()
```

**📸 Kết quả hiển thị:**
- Bên trái: ảnh camera.
- Bên phải: biểu đồ histogram với trục x là mức xám 0–255, trục y là số pixel. Thấy rõ phân bố cường độ của ảnh.

---

## 📌 Tổng kết kiến thức được sử dụng

| Bài | Kiến thức Chương 1 |
|-----|--------------------|
| 1 | Đọc/ghi/hiển thị ảnh, biểu diễn mảng NumPy |
| 2 | Ma trận ảnh M×N, truy cập pixel, crop |
| 3 | Không gian màu RGB/Gray/HSV, công thức Gray |
| 4 | Biến đổi hình học: resize, flip, rotate |
| 5 | Vẽ hình học trên ảnh |
| 6 | Phép toán số học elementwise, âm bản |
| 7 | Phép toán logic trên mask |
| 8 | Trung bình ảnh giảm nhiễu Gaussian |
| 9 | Sampling & Quantization, false contouring |
| 10 | Nội suy Nearest / Bilinear / Bicubic |
| 11 | Láng giềng N4, ND, N8 |
| 12 | Khoảng cách Euclidean / City-block / Chessboard |
| 13 | Histogram, Mean, Variance |

**✅ Thay đổi trong phiên bản này:**
- Cấu trúc thư mục gọn hơn: **chỉ có `images/` và `output/`**, file notebook đặt trực tiếp ở thư mục ngoài `chapter_1_lab/`.
- Đường dẫn trong code đổi từ `../images/...` → `images/...` và `../output/...` → `output/...`.
- Mỗi bài vẫn giữ phần **hiển thị ảnh minh họa** đầy đủ để sinh viên dễ theo dõi.

Bạn có muốn tôi điều chỉnh gì trước khi gửi **Chương 2** không? 🚀