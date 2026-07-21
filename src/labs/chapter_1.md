# THỰC HÀNH CHƯƠNG 1
## XỬ LÝ ẢNH & THỊ GIÁC MÁY TÍNH
### Giới thiệu tổng quan, khái niệm nền tảng và cài đặt môi trường

---

## Mục tiêu chương

Sau khi hoàn thành các bài tập thực hành này, sinh viên có thể:

- Cài đặt và cấu hình thành công môi trường phát triển xử lý ảnh với Python
- Đọc, hiển thị và ghi ảnh với OpenCV và Pillow
- Thao tác với pixel và các phép toán cơ bản trên ảnh
- Hiểu rõ ảnh hưởng của độ phân giải và lượng tử hóa đến chất lượng ảnh
- Áp dụng các phép toán không gian và hình học vào bài toán thực tế

---

## Chuẩn bị

- Cài đặt Python 3.11+ và VS Code
- Các thư viện: `opencv-python`, `numpy`, `matplotlib`, `pillow`, `scikit-image`
- Ảnh mẫu: Sử dụng ảnh `lena.jpg`, `sample.jpg` hoặc ảnh tự chọn
- Tạo cấu trúc thư mục:
  ```
  chapter_1_lab/
  ├── images/          # Ảnh đầu vào
  ├── output/          # Kết quả xử lý
  └── src/             # Mã nguồn Python
  ```

---

## Bài tập 1: Cài đặt môi trường và kiểm tra OpenCV

**Yêu cầu:**

1. Cài đặt các thư viện bằng pip (hoặc pipenv)
2. Viết chương trình đọc một ảnh từ thư mục `images/`, hiển thị ảnh, và lưu kết quả vào thư mục `output/`
<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex1_env_check.py
import cv2
import numpy as np
import matplotlib.pyplot as plt

def main():
    # Đọc ảnh
    img = cv2.imread('images/sample.jpg')
    
    if img is None:
        print("Không thể đọc ảnh. Kiểm tra đường dẫn!")
        return
    
    # Chuyển sang RGB để hiển thị đúng màu với matplotlib
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Hiển thị thông tin
    print(f"Kích thước ảnh: {img.shape}")
    print(f"Loại dữ liệu: {img.dtype}")
    print(f"Số kênh: {img.shape[2] if len(img.shape) > 2 else 1}")
    
    # Hiển thị bằng matplotlib
    plt.imshow(img_rgb)
    plt.title('Ảnh gốc')
    plt.axis('off')
    plt.show()
    
    # Lưu ảnh
    cv2.imwrite('output/sample_output.jpg', img)
    print("Đã lưu ảnh tại output/sample_output.jpg")

if __name__ == "__main__":
    main()
```
</div>

**Thực hành thêm:**
- Thử đọc ảnh grayscale bằng `cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)`
- So sánh kết quả hiển thị với Pillow: `Image.open('images/sample.jpg').show()`

---

## Bài tập 2: Thao tác với pixel và ảnh cơ bản

**Yêu cầu:**

1. Truy xuất và thay đổi giá trị pixel tại vị trí cụ thể
2. Cắt (crop) một vùng ảnh và lưu thành ảnh mới
3. Lật ảnh theo chiều ngang và chiều dọc
4. Thay đổi kích thước ảnh với các phương pháp nội suy khác nhau

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex2_pixel_operations.py
import cv2
import numpy as np
import matplotlib.pyplot as plt

def main():
    img = cv2.imread('images/sample.jpg')
    if img is None:
        print("Không thể đọc ảnh!")
        return
    
    # ---- 1. Truy xuất và thay đổi pixel ----
    x, y = 100, 50
    pixel = img[y, x]  # Lưu ý: OpenCV dùng (hàng, cột) ~ (y, x)
    print(f"Giá trị pixel tại ({x}, {y}): BGR = {pixel}")
    
    # Vẽ một hình chữ nhật màu đỏ lên ảnh (thay đổi pixel vùng)
    img_copy = img.copy()
    cv2.rectangle(img_copy, (50, 50), (150, 150), (0, 0, 255), 2)
    cv2.circle(img_copy, (200, 200), 30, (0, 255, 0), -1)
    
    # ---- 2. Cắt ảnh (Crop) ----
    cropped = img[50:250, 100:300]  # y từ 50->250, x từ 100->300
    cv2.imwrite('output/cropped.jpg', cropped)
    
    # ---- 3. Lật ảnh ----
    flip_h = cv2.flip(img, 1)   # Lật ngang
    flip_v = cv2.flip(img, 0)   # Lật dọc
    flip_both = cv2.flip(img, -1)  # Lật cả hai
    cv2.imwrite('output/flip_horizontal.jpg', flip_h)
    cv2.imwrite('output/flip_vertical.jpg', flip_v)
    
    # ---- 4. Resize với các phương pháp nội suy ----
    new_size = (200, 200)
    resized_nearest = cv2.resize(img, new_size, interpolation=cv2.INTER_NEAREST)
    resized_bilinear = cv2.resize(img, new_size, interpolation=cv2.INTER_LINEAR)
    resized_bicubic = cv2.resize(img, new_size, interpolation=cv2.INTER_CUBIC)
    
    cv2.imwrite('output/resize_nearest.jpg', resized_nearest)
    cv2.imwrite('output/resize_bilinear.jpg', resized_bilinear)
    cv2.imwrite('output/resize_bicubic.jpg', resized_bicubic)
    
    # ---- Hiển thị so sánh ----
    plt.figure(figsize=(12, 6))
    images = [resized_nearest, resized_bilinear, resized_bicubic]
    titles = ['Nearest', 'Bilinear', 'Bicubic']
    for i in range(3):
        plt.subplot(1, 3, i+1)
        plt.imshow(cv2.cvtColor(images[i], cv2.COLOR_BGR2RGB))
        plt.title(titles[i])
        plt.axis('off')
    plt.show()
    
    print("Đã lưu tất cả kết quả vào thư mục output/")

if __name__ == "__main__":
    main()
```
</div>

**Câu hỏi kiểm tra:**
- Quan sát ảnh crop và resize. Phương pháp nội suy nào cho chất lượng tốt nhất? Phương pháp nào nhanh nhất?
- Khi thay đổi giá trị pixel, tại sao vùng chữ nhật hiển thị màu đỏ trong OpenCV lại là `(0,0,255)`?

---

## Bài tập 3: Phép toán trên ảnh

**Yêu cầu:**

1. Cộng hai ảnh (hoặc ảnh với hằng số) – ứng dụng tăng độ sáng
2. Trừ ảnh – phát hiện sự khác biệt giữa hai ảnh
3. Nhân/Chia ảnh – tạo mặt nạ vùng quan tâm (ROI Masking)
4. Phép toán logic AND, OR, XOR trên ảnh nhị phân

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex3_arithmetic_logic.py
import cv2
import numpy as np
import matplotlib.pyplot as plt

def main():
    # Đọc ảnh grayscale
    img = cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Không thể đọc ảnh!")
        return
    
    # ---- 1. Cộng ảnh (tăng độ sáng) ----
    bright_img = cv2.add(img, 50)  # Tăng 50 mức xám
    cv2.imwrite('output/bright.jpg', bright_img)
    
    # ---- 2. Trừ ảnh (phát hiện khác biệt) ----
    # Tạo ảnh bị thay đổi (chèn hình chữ nhật)
    img_changed = img.copy()
    img_changed[50:150, 100:200] = 255
    
    diff = cv2.absdiff(img, img_changed)
    cv2.imwrite('output/difference.jpg', diff)
    
    # ---- 3. Nhân ảnh với mặt nạ (ROI Masking) ----
    # Tạo mặt nạ hình tròn
    mask = np.zeros_like(img, dtype=np.uint8)
    cv2.circle(mask, (img.shape[1]//2, img.shape[0]//2), 100, 255, -1)
    
    masked = cv2.bitwise_and(img, mask)
    cv2.imwrite('output/masked_roi.jpg', masked)
    
    # ---- 4. Phép toán logic trên ảnh nhị phân ----
    # Tạo 2 ảnh nhị phân
    _, binary1 = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)
    binary2 = np.zeros_like(img)
    cv2.rectangle(binary2, (50, 50), (200, 200), 255, -1)
    
    and_result = cv2.bitwise_and(binary1, binary2)
    or_result = cv2.bitwise_or(binary1, binary2)
    xor_result = cv2.bitwise_xor(binary1, binary2)
    not_result = cv2.bitwise_not(binary1)
    
    cv2.imwrite('output/logic_and.jpg', and_result)
    cv2.imwrite('output/logic_or.jpg', or_result)
    cv2.imwrite('output/logic_xor.jpg', xor_result)
    cv2.imwrite('output/logic_not.jpg', not_result)
    
    # Hiển thị kết quả
    plt.figure(figsize=(15, 5))
    plt.subplot(1, 3, 1); plt.imshow(bright_img, cmap='gray'); plt.title('Tăng sáng (+50)')
    plt.subplot(1, 3, 2); plt.imshow(diff, cmap='gray'); plt.title('Sai khác (Abs diff)')
    plt.subplot(1, 3, 3); plt.imshow(masked, cmap='gray'); plt.title('ROI Masking')
    plt.show()
    
    print("Đã hoàn thành các phép toán.")

if __name__ == "__main__":
    main()
```
</div>

**Thực hành thêm:**
- Dùng phép cộng trung bình để khử nhiễu: Tạo 10 ảnh nhiễu Gaussian từ ảnh gốc, tính trung bình cộng của chúng và so sánh với ảnh gốc.
- Dùng phép trừ để phát hiện vật thể chuyển động trong 2 ảnh chụp liên tiếp.

---

## Bài tập 4: Ảnh hưởng của độ phân giải và lượng tử hóa

**Yêu cầu:**

1. Giảm độ phân giải không gian (downsample) rồi phóng to lại (upsample) để quan sát hiệu ứng
2. Giảm số lượng mức xám (lượng tử hóa) từ 256 xuống các mức thấp hơn (128, 64, 32, 16, 8, 4, 2) và quan sát hiện tượng vân giả (false contouring)

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex4_resolution_quantization.py
import cv2
import numpy as np
import matplotlib.pyplot as plt

def main():
    img = cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Không thể đọc ảnh!")
        return
    
    # ---- 1. Ảnh hưởng của độ phân giải ----
    plt.figure(figsize=(15, 5))
    
    # Giảm và phóng to với các tỉ lệ khác nhau
    scales = [0.5, 0.25, 0.125]
    for i, scale in enumerate(scales):
        h, w = img.shape
        new_h, new_w = int(h * scale), int(w * scale)
        small = cv2.resize(img, (new_w, new_h), interpolation=cv2.INTER_AREA)
        resized = cv2.resize(small, (w, h), interpolation=cv2.INTER_NEAREST)
        
        plt.subplot(1, 3, i+1)
        plt.imshow(resized, cmap='gray')
        plt.title(f'Tỉ lệ {scale*100:.0f}% (NEAREST)')
        plt.axis('off')
    plt.show()
    
    # ---- 2. Ảnh hưởng của lượng tử hóa ----
    plt.figure(figsize=(15, 10))
    
    levels = [128, 64, 32, 16, 8, 4, 2]
    for i, level in enumerate(levels):
        # Lượng tử hóa: giảm số mức xám
        # Bước = 256 / level
        step = 256 // level
        quantized = (img // step) * step
        quantized = np.clip(quantized, 0, 255).astype(np.uint8)
        
        plt.subplot(2, 4, i+1)
        plt.imshow(quantized, cmap='gray')
        plt.title(f'{level} mức xám')
        plt.axis('off')
    
    plt.show()
    
    # ---- 3. Lưu kết quả ----
    for level in levels:
        step = 256 // level
        quantized = (img // step) * step
        cv2.imwrite(f'output/quantized_{level}.jpg', quantized.astype(np.uint8))
    
    print("Đã lưu kết quả lượng tử hóa.")

if __name__ == "__main__":
    main()
```
</div>

**Câu hỏi kiểm tra:**
- Khi số mức xám giảm xuống dưới bao nhiêu thì bắt đầu xuất hiện vân giả (false contouring)?
- Phương pháp nội suy nào cho kết quả tốt nhất khi phóng to ảnh? Tại sao?

---

## Bài tập 5: Khoảng cách và láng giềng (Lý thuyết + Thực hành)

**Phần lý thuyết:**
Cho hai điểm $p(2, 3)$ và $q(5, 7)$. Tính:
- Khoảng cách Euclidean: $D_e = \sqrt{((5-2)^2 + (7-3)^2)}$
- Khoảng cách City-block: $D_4 = |5-2| + |7-3|$
- Khoảng cách Chessboard: $D_8 = max(|5-2|, |7-3|)$

<div style="display: none;">

**Phần thực hành:**

```python
# src/ex5_distance_neighbors.py
import numpy as np
import math

def euclidean(p, q):
    return math.sqrt((p[0] - q[0])**2 + (p[1] - q[1])**2)

def cityblock(p, q):
    return abs(p[0] - q[0]) + abs(p[1] - q[1])

def chessboard(p, q):
    return max(abs(p[0] - q[0]), abs(p[1] - q[1]))

def get_4_neighbors(img_shape, x, y):
    """Trả về 4-láng giềng của pixel (x, y)"""
    neighbors = []
    h, w = img_shape
    for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
        nx, ny = x + dx, y + dy
        if 0 <= nx < w and 0 <= ny < h:
            neighbors.append((nx, ny))
    return neighbors

def get_8_neighbors(img_shape, x, y):
    """Trả về 8-láng giềng của pixel (x, y)"""
    neighbors = []
    h, w = img_shape
    for dx in range(-1, 2):
        for dy in range(-1, 2):
            if dx == 0 and dy == 0:
                continue
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h:
                neighbors.append((nx, ny))
    return neighbors

def main():
    # ---- 1. Tính khoảng cách ----
    p, q = (2, 3), (5, 7)
    print("="*40)
    print("Tính khoảng cách giữa hai điểm:")
    print(f"p{p}, q{q}")
    print(f"D_e (Euclidean)   : {euclidean(p, q):.4f}")
    print(f"D_4 (City-block)  : {cityblock(p, q)}")
    print(f"D_8 (Chessboard)  : {chessboard(p, q)}")
    print("="*40)
    
    # ---- 2. Láng giềng trên ảnh giả lập ----
    img_shape = (10, 10)  # 10x10
    point = (5, 5)
    
    n4 = get_4_neighbors(img_shape, point[0], point[1])
    n8 = get_8_neighbors(img_shape, point[0], point[1])
    
    print(f"Điểm trung tâm: {point}")
    print(f"4-láng giềng (N4): {n4}")
    print(f"Số lượng N4: {len(n4)}")
    print(f"8-láng giềng (N8): {n8}")
    print(f"Số lượng N8: {len(n8)}")
    
    # ---- 3. Xác định m-kề trên ma trận nhị phân ----
    # Tạo ma trận 5x5 với giá trị V = {1}
    binary = np.array([
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0]
    ], dtype=np.uint8)
    
    # Xác định các điểm có giá trị 1
    points = np.argwhere(binary == 1)
    print("\nMa trận nhị phân:")
    print(binary)
    print(f"Các điểm có giá trị 1: {[(x,y) for y,x in points]}")
    
    # Kiểm tra tính 8-kề giữa các điểm
    print("\nKiểm tra 8-kề giữa các điểm 1:")
    for i in range(len(points)):
        for j in range(i+1, len(points)):
            p1, p2 = points[i], points[j]
            dist = chessboard(p1, p2)
            if dist <= 1:
                print(f"  {tuple(p1)} và {tuple(p2)} là 8-kề nhau (D8={dist})")
    
    print("\n=> Theo 8-kề, ma trận trên tạo thành một đường chéo liên thông.")
    print("Tuy nhiên, theo m-kề (mixed), các điểm ở góc không kề trực tiếp với nhau")

if __name__ == "__main__":
    main()
```
</div>

---

## Bài tập 6: Histogram cơ bản

**Yêu cầu:**
- Tính và vẽ histogram của ảnh grayscale
- Nhận xét về phân bố cường độ (ảnh tối, sáng, tương phản thấp/cao)

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex6_histogram.py
import cv2
import numpy as np
import matplotlib.pyplot as plt

def main():
    img = cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Không thể đọc ảnh!")
        return
    
    # ---- 1. Tính histogram bằng NumPy ----
    hist_np, bins = np.histogram(img.ravel(), bins=256, range=[0, 256])
    
    # ---- 2. Tính histogram bằng OpenCV ----
    hist_cv = cv2.calcHist([img], [0], None, [256], [0, 256])
    
    # ---- 3. Hiển thị ảnh và histogram ----
    plt.figure(figsize=(12, 6))
    
    plt.subplot(1, 2, 1)
    plt.imshow(img, cmap='gray')
    plt.title('Ảnh grayscale')
    plt.axis('off')
    
    plt.subplot(1, 2, 2)
    plt.bar(range(256), hist_np, width=1, color='black')
    plt.title('Histogram')
    plt.xlabel('Mức xám')
    plt.ylabel('Số pixel')
    
    # Vẽ thêm các thống kê
    mean_val = np.mean(img)
    std_val = np.std(img)
    plt.axvline(mean_val, color='red', linestyle='--', label=f'Trung bình = {mean_val:.1f}')
    plt.axvline(mean_val - std_val, color='orange', linestyle=':', label=f'±1σ')
    plt.axvline(mean_val + std_val, color='orange', linestyle=':')
    plt.legend()
    
    plt.tight_layout()
    plt.show()
    
    # ---- 4. Phân loại ảnh dựa trên histogram ----
    print("\n=== Phân tích ảnh dựa trên histogram ===")
    print(f"Giá trị trung bình: {mean_val:.2f}")
    print(f"Độ lệch chuẩn: {std_val:.2f}")
    
    if mean_val < 85:
        print("=> Ảnh TỐI (phân bố tập trung bên trái)")
    elif mean_val > 170:
        print("=> Ảnh SÁNG (phân bố tập trung bên phải)")
    else:
        print("=> Ảnh TRUNG BÌNH (phân bố ở giữa)")
    
    if std_val > 60:
        print("=> Tương phản CAO (histogram trải rộng)")
    elif std_val < 30:
        print("=> Tương phản THẤP (histogram hẹp)")
    else:
        print("=> Tương phản TRUNG BÌNH")

if __name__ == "__main__":
    main()
```
</div>

---

## Bài tập nâng cao (Tự chọn)

### Bài 7: Khử nhiễu bằng trung bình nhiều ảnh

Viết chương trình:
1. Đọc một ảnh gốc
2. Tạo 20 ảnh nhiễu bằng cách cộng nhiễu Gaussian (`np.random.normal`) vào ảnh gốc
3. Tính ảnh trung bình của các ảnh nhiễu
4. So sánh ảnh trung bình với ảnh gốc (tính RMSE và hiển thị ảnh)

### Bài 8: Xác định vùng liên thông

Viết chương trình:
1. Tạo một ma trận nhị phân 10×10
2. Sử dụng thuật toán flood fill (hoặc BFS) để gán nhãn cho từng vùng liên thông với 4-kề và 8-kề
3. Đếm số lượng vùng liên thông trong mỗi trường hợp

### Bài 9: Biến đổi hình học – Ghép ảnh (Image Stitching)

Viết chương trình:
1. Đọc hai ảnh chụp cùng một cảnh nhưng có độ dịch chuyển
2. Xác định các điểm mốc bằng tay (chọn điểm tương ứng)
3. Ước lượng ma trận biến đổi Affine hoặc Homography
4. Ghép hai ảnh thành một ảnh toàn cảnh (Panorama) sử dụng `cv2.warpAffine` hoặc `cv2.warpPerspective`