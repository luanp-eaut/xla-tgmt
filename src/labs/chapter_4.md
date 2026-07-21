# THỰC HÀNH CHƯƠNG 4
## XỬ LÝ ẢNH & THỊ GIÁC MÁY TÍNH
### Phát hiện biên & Phân vùng ảnh (Edge Detection & Segmentation)

---

## Mục tiêu chương

Sau khi hoàn thành các bài tập thực hành này, sinh viên có thể:

- Phát hiện điểm biệt lập và đường thẳng theo hướng bằng mặt nạ tích chập
- Áp dụng các toán tử gradient (Roberts, Prewitt, Sobel) để phát hiện biên
- Phân biệt và sử dụng phương pháp đạo hàm bậc 1 (Gradient) và bậc 2 (Laplacian)
- Triển khai bộ phát hiện biên Canny và tối ưu tham số
- Áp dụng phân ngưỡng toàn cục (Otsu) và cục bộ (Adaptive)
- Thực hiện phân đoạn bằng phát triển vùng (Region Growing)
- Sử dụng K-Means và Superpixel (SLIC) để phân đoạn ảnh

---

## Chuẩn bị

- Cài đặt Python 3.11+ và các thư viện:
  ```bash
  pip install opencv-python numpy matplotlib scikit-image scipy
  ```
- Ảnh mẫu: `lena.jpg`, `cameraman.jpg`, `coins.jpg`, `text.jpg` (ảnh có nhiều chi tiết biên)
- Tạo cấu trúc thư mục:
  ```
  chapter_4_lab/
  ├── images/          # Ảnh đầu vào
  ├── output/          # Kết quả xử lý
  └── src/             # Mã nguồn Python
  ```

---

## Ôn tập lý thuyết trọng tâm

<table>
  <thead>
    <tr>
      <th>Kỹ thuật</th>
      <th>Nguyên lý</th>
      <th>Kernel/Đặc điểm</th>
      <th>Ứng dụng</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Điểm biệt lập</b></td>
      <td>Laplacian tâm 8</td>
      <td>
        $$\begin{bmatrix}
        -1 & -1 & -1 \\
        -1 & 8 & -1 \\
        -1 & -1 & -1
        \end{bmatrix}$$
      </td>
      <td>Phát hiện đốm sáng</td>
    </tr>
    <tr>
      <td><b>Đường (hướng)</b></td>
      <td>Đạo hàm theo hướng</td>
      <td>
        Ngang:
        $$\begin{bmatrix}
        -1 & -1 & -1 \\
        2 & 2 & 2 \\
        -1 & -1 & -1
        \end{bmatrix}$$
      </td>
      <td>Phát hiện vạch kẻ</td>
    </tr>
    <tr>
      <td><b>Roberts</b></td>
      <td>2×2, chéo</td>
      <td>
        $$\begin{bmatrix}
        1 & 0 \\
        0 & -1
        \end{bmatrix}$$
        $$\begin{bmatrix}
        0 & 1 \\
        -1 & 0
        \end{bmatrix}$$
      </td>
      <td>Nhanh, nhạy nhiễu</td>
    </tr>
    <tr>
      <td><b>Prewitt</b></td>
      <td>3×3, trọng số đều</td>
      <td>Trung bình theo hướng</td>
      <td>Cơ bản, dễ tính</td>
    </tr>
    <tr>
      <td><b>Sobel</b></td>
      <td>3×3, trọng số trung tâm cao</td>
      <td>
        $$\begin{bmatrix}
        -1 & 0 & 1 \\
        -2 & 0 & 2 \\
        -1 & 0 & 1
        \end{bmatrix}$$
      </td>
      <td>Chống nhiễu tốt</td>
    </tr>
    <tr>
      <td><b>Laplacian</b></td>
      <td>Đạo hàm bậc 2</td>
      <td>
        $$\begin{bmatrix}
        0 & -1 & 0 \\
        -1 & 4 & -1 \\
        0 & -1 & 0
        \end{bmatrix}$$
      </td>
      <td>Zero-crossing, biên mảnh</td>
    </tr>
    <tr>
      <td><b>Canny</b></td>
      <td>5 bước</td>
      <td>Gauss → Gradient → NMS → Double Thresh → Hysteresis</td>
      <td>Chuẩn công nghiệp</td>
    </tr>
    <tr>
      <td><b>Otsu</b></td>
      <td>Max between-class variance</td>
      <td>Tự động tìm ngưỡng T</td>
      <td>Phân ngưỡng toàn cục</td>
    </tr>
    <tr>
      <td><b>Adaptive</b></td>
      <td>Ngưỡng theo lân cận</td>
      <td>Gaussian/Mean + C</td>
      <td>Ảnh sáng không đều</td>
    </tr>
    <tr>
      <td><b>Region Growing</b></td>
      <td>Phát triển từ seed</td>
      <td>Điều kiện đồng nhất</td>
      <td>Ảnh y tế, đối tượng đồng nhất</td>
    </tr>
    <tr>
      <td><b>K-Means</b></td>
      <td>Phân cụm không gian màu</td>
      <td>Euclid distance</td>
      <td>Phân đoạn tổng quát</td>
    </tr>
    <tr>
      <td><b>SLIC</b></td>
      <td>K-Means + không gian (CIELAB + xy)</td>
      <td>
        $$D = \sqrt{\left(\frac{d_{lab}}{S}\right)^2 + \left(\frac{d_{xy}}{m}\right)^2}$$
      </td>
      <td>Superpixel, giảm dữ liệu</td>
    </tr>
  </tbody>
</table>

---

## Bài tập 1: Phát hiện điểm biệt lập và đường

**Yêu cầu:**

1. Tạo ảnh nhân tạo có chứa điểm biệt lập (đốm sáng) và áp dụng mặt nạ Laplacian tâm 8 để phát hiện
2. Sử dụng các mặt nạ phát hiện đường (ngang, dọc, chéo 45°, -45°) trên ảnh có cấu trúc đường
3. Đặt ngưỡng $T$ và lọc các đáp ứng yếu

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex1_points_lines.py
import cv2
import numpy as np
import matplotlib.pyplot as plt

def detect_point(img, threshold=200):
    """Phát hiện điểm biệt lập bằng Laplacian tâm 8"""
    kernel = np.array([[-1, -1, -1],
                       [-1,  8, -1],
                       [-1, -1, -1]], dtype=np.float32)
    
    # Tích chập
    response = cv2.filter2D(img, cv2.CV_64F, kernel)
    response = np.abs(response)
    
    # Đánh dấu điểm phát hiện (R > T)
    points = response > threshold
    return response, points

def detect_lines(img, direction='horizontal'):
    """Phát hiện đường theo hướng"""
    kernels = {
        'horizontal': np.array([[-1, -1, -1],
                                 [ 2,  2,  2],
                                 [-1, -1, -1]], dtype=np.float32),
        'vertical': np.array([[-1,  2, -1],
                              [-1,  2, -1],
                              [-1,  2, -1]], dtype=np.float32),
        'diag_45': np.array([[-1, -1,  2],
                             [-1,  2, -1],
                             [ 2, -1, -1]], dtype=np.float32),
        'diag_m45': np.array([[ 2, -1, -1],
                              [-1,  2, -1],
                              [-1, -1,  2]], dtype=np.float32)
    }
    
    kernel = kernels.get(direction)
    if kernel is None:
        raise ValueError("Hướng không hợp lệ")
    
    response = cv2.filter2D(img, cv2.CV_64F, kernel)
    return response

def main():
    # ---- 1. Tạo ảnh với điểm biệt lập ----
    img_points = np.zeros((200, 200), dtype=np.uint8)
    # Vẽ một vài điểm sáng
    cv2.circle(img_points, (50, 50), 2, 255, -1)
    cv2.circle(img_points, (150, 100), 3, 255, -1)
    cv2.circle(img_points, (100, 170), 2, 255, -1)
    # Vẽ nền có nhiễu nhẹ
    noise = np.random.randint(0, 30, (200, 200), dtype=np.uint8)
    img_points = cv2.add(img_points, noise)
    
    response, points = detect_point(img_points, threshold=100)
    
    # ---- 2. Ảnh có đường ----
    img_lines = np.zeros((200, 200), dtype=np.uint8)
    cv2.line(img_lines, (20, 50), (180, 50), 255, 3)  # Ngang
    cv2.line(img_lines, (100, 20), (100, 180), 255, 3)  # Dọc
    cv2.line(img_lines, (20, 180), (180, 20), 255, 3)  # Chéo 45
    img_lines = cv2.add(img_lines, np.random.randint(0, 20, (200, 200), dtype=np.uint8))
    
    # Phát hiện các hướng
    line_h = detect_lines(img_lines, 'horizontal')
    line_v = detect_lines(img_lines, 'vertical')
    line_d1 = detect_lines(img_lines, 'diag_45')
    line_d2 = detect_lines(img_lines, 'diag_m45')
    
    # ---- Hiển thị ----
    plt.figure(figsize=(15, 10))
    
    # Điểm biệt lập
    plt.subplot(2, 4, 1)
    plt.imshow(img_points, cmap='gray')
    plt.title('Ảnh điểm biệt lập')
    plt.axis('off')
    
    plt.subplot(2, 4, 2)
    plt.imshow(response, cmap='gray')
    plt.title('Đáp ứng Laplacian')
    plt.axis('off')
    
    plt.subplot(2, 4, 3)
    plt.imshow(points, cmap='gray')
    plt.title('Điểm phát hiện (R>T)')
    plt.axis('off')
    
    # Đường
    plt.subplot(2, 4, 5)
    plt.imshow(img_lines, cmap='gray')
    plt.title('Ảnh đường')
    plt.axis('off')
    
    plt.subplot(2, 4, 6)
    plt.imshow(np.abs(line_h), cmap='gray')
    plt.title('Đường ngang')
    plt.axis('off')
    
    plt.subplot(2, 4, 7)
    plt.imshow(np.abs(line_v), cmap='gray')
    plt.title('Đường dọc')
    plt.axis('off')
    
    plt.subplot(2, 4, 8)
    plt.imshow(np.abs(line_d1), cmap='gray')
    plt.title('Đường chéo 45°')
    plt.axis('off')
    
    plt.tight_layout()
    plt.show()
    
    cv2.imwrite('output/point_detection.jpg', points * 255)
    print("Đã lưu kết quả phát hiện điểm.")

if __name__ == "__main__":
    main()
```
</div>

---

## Bài tập 2: So sánh các toán tử gradient (Sobel, Prewitt, Roberts, Laplacian)

**Yêu cầu:**

1. Áp dụng các toán tử Sobel, Prewitt, Roberts và Laplacian lên cùng một ảnh
2. Tính độ lớn gradient (Magnitude) cho Sobel, Prewitt, Roberts
3. Hiển thị và so sánh kết quả phát hiện biên
4. Nhận xét về độ dày biên, khả năng chống nhiễu và chi tiết

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex2_gradient_operators.py
import cv2
import numpy as np
import matplotlib.pyplot as plt

def gradient_magnitude(gx, gy):
    """Tính độ lớn gradient từ Gx và Gy"""
    return np.sqrt(gx**2 + gy**2)

def main():
    img = cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Không thể đọc ảnh!")
        return
    
    # ---- 1. Sobel ----
    sobelx = cv2.Sobel(img, cv2.CV_64F, 1, 0, ksize=3)
    sobely = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=3)
    sobel_mag = gradient_magnitude(sobelx, sobely)
    sobel_mag = np.clip(sobel_mag, 0, 255).astype(np.uint8)
    
    # ---- 2. Prewitt ----
    kernel_x = np.array([[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]], dtype=np.float32)
    kernel_y = np.array([[-1, -1, -1], [0, 0, 0], [1, 1, 1]], dtype=np.float32)
    prewittx = cv2.filter2D(img, cv2.CV_64F, kernel_x)
    prewitty = cv2.filter2D(img, cv2.CV_64F, kernel_y)
    prewitt_mag = gradient_magnitude(prewittx, prewitty)
    prewitt_mag = np.clip(prewitt_mag, 0, 255).astype(np.uint8)
    
    # ---- 3. Roberts ----
    kernel_robert_x = np.array([[1, 0], [0, -1]], dtype=np.float32)
    kernel_robert_y = np.array([[0, 1], [-1, 0]], dtype=np.float32)
    robertx = cv2.filter2D(img, cv2.CV_64F, kernel_robert_x)
    roberty = cv2.filter2D(img, cv2.CV_64F, kernel_robert_y)
    robert_mag = gradient_magnitude(robertx, roberty)
    robert_mag = np.clip(robert_mag, 0, 255).astype(np.uint8)
    
    # ---- 4. Laplacian ----
    laplacian = cv2.Laplacian(img, cv2.CV_64F)
    laplacian = np.abs(laplacian)
    laplacian = np.clip(laplacian, 0, 255).astype(np.uint8)
    
    # ---- 5. Hiển thị ----
    plt.figure(figsize=(15, 10))
    
    plt.subplot(2, 3, 1)
    plt.imshow(img, cmap='gray')
    plt.title('Ảnh gốc')
    plt.axis('off')
    
    plt.subplot(2, 3, 2)
    plt.imshow(sobel_mag, cmap='gray')
    plt.title('Sobel')
    plt.axis('off')
    
    plt.subplot(2, 3, 3)
    plt.imshow(prewitt_mag, cmap='gray')
    plt.title('Prewitt')
    plt.axis('off')
    
    plt.subplot(2, 3, 4)
    plt.imshow(robert_mag, cmap='gray')
    plt.title('Roberts')
    plt.axis('off')
    
    plt.subplot(2, 3, 5)
    plt.imshow(laplacian, cmap='gray')
    plt.title('Laplacian')
    plt.axis('off')
    
    # Thêm ảnh hướng gradient (Sobel)
    # Tính hướng
    angle = np.arctan2(sobely, sobelx) * 180 / np.pi
    angle = (angle + 180) / 360 * 255
    angle = angle.astype(np.uint8)
    
    plt.subplot(2, 3, 6)
    plt.imshow(angle, cmap='hsv')
    plt.title('Hướng gradient (Sobel)')
    plt.axis('off')
    
    plt.tight_layout()
    plt.show()
    
    # Lưu kết quả
    cv2.imwrite('output/sobel_magnitude.jpg', sobel_mag)
    cv2.imwrite('output/prewitt_magnitude.jpg', prewitt_mag)
    cv2.imwrite('output/robert_magnitude.jpg', robert_mag)
    cv2.imwrite('output/laplacian_edge.jpg', laplacian)
    
    print("Đã lưu các kết quả so sánh toán tử gradient.")

if __name__ == "__main__":
    main()
```
</div>

**Câu hỏi kiểm tra:**
- Tại sao Roberts cho biên mảnh nhưng lại nhạy với nhiễu?
- Sobel và Laplacian, phương pháp nào tạo ra biên kép? Tại sao?

---

## Bài tập 3: Phát hiện biên Canny và tối ưu tham số

**Yêu cầu:**

1. Áp dụng Canny với các cặp ngưỡng (threshold1, threshold2) khác nhau
2. Quan sát ảnh hưởng của ngưỡng thấp và ngưỡng cao
3. Thử nghiệm với các kích thước Gaussian kernel khác nhau
4. So sánh Canny với Sobel (có phân ngưỡng) và tìm ra ưu điểm

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex3_canny.py
import cv2
import numpy as np
import matplotlib.pyplot as plt

def main():
    img = cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Không thể đọc ảnh!")
        return
    
    # ---- 1. Canny với các cặp ngưỡng khác nhau ----
    threshold_pairs = [(30, 90), (50, 150), (100, 200), (150, 250)]
    
    plt.figure(figsize=(15, 10))
    
    # Ảnh gốc
    plt.subplot(2, 3, 1)
    plt.imshow(img, cmap='gray')
    plt.title('Ảnh gốc')
    plt.axis('off')
    
    for idx, (t1, t2) in enumerate(threshold_pairs):
        edges = cv2.Canny(img, threshold1=t1, threshold2=t2)
        plt.subplot(2, 3, idx+2)
        plt.imshow(edges, cmap='gray')
        plt.title(f'Canny (T1={t1}, T2={t2})')
        plt.axis('off')
        
        cv2.imwrite(f'output/canny_t1_{t1}_t2_{t2}.jpg', edges)
    
    plt.tight_layout()
    plt.show()
    
    # ---- 2. Canny với các kích thước kernel khác nhau ----
    kernel_sizes = [3, 5, 7]
    plt.figure(figsize=(15, 5))
    
    for idx, ksize in enumerate(kernel_sizes):
        edges = cv2.Canny(img, threshold1=50, threshold2=150, apertureSize=ksize)
        plt.subplot(1, 3, idx+1)
        plt.imshow(edges, cmap='gray')
        plt.title(f'Canny (Aperture={ksize})')
        plt.axis('off')
        cv2.imwrite(f'output/canny_ksize_{ksize}.jpg', edges)
    
    plt.tight_layout()
    plt.show()
    
    # ---- 3. So sánh Canny với Sobel + Ngưỡng ----
    # Sobel
    sobelx = cv2.Sobel(img, cv2.CV_64F, 1, 0, ksize=3)
    sobely = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=3)
    sobel_mag = np.sqrt(sobelx**2 + sobely**2)
    sobel_mag = np.clip(sobel_mag, 0, 255).astype(np.uint8)
    
    # Ngưỡng Sobel
    _, sobel_thresh = cv2.threshold(sobel_mag, 100, 255, cv2.THRESH_BINARY)
    
    # Canny
    canny_edges = cv2.Canny(img, 50, 150)
    
    plt.figure(figsize=(15, 5))
    
    plt.subplot(1, 3, 1)
    plt.imshow(sobel_mag, cmap='gray')
    plt.title('Sobel Magnitude')
    plt.axis('off')
    
    plt.subplot(1, 3, 2)
    plt.imshow(sobel_thresh, cmap='gray')
    plt.title('Sobel + Ngưỡng')
    plt.axis('off')
    
    plt.subplot(1, 3, 3)
    plt.imshow(canny_edges, cmap='gray')
    plt.title('Canny')
    plt.axis('off')
    
    plt.tight_layout()
    plt.show()
    
    print("Đã hoàn thành bài tập Canny.")

if __name__ == "__main__":
    main()
```
</div>

**Câu hỏi kiểm tra:**
- Khi ngưỡng thấp $(T_1)$ và ngưỡng cao $(T_2)$ quá gần nhau, điều gì xảy ra?
- Canny có gì vượt trội so với Sobel + ngưỡng thông thường?

---

## Bài tập 4: Phân ngưỡng (Thresholding) - Toàn cục, Otsu, Adaptive

**Yêu cầu:**

1. Áp dụng phân ngưỡng toàn cục thủ công với các giá trị $T$ khác nhau
2. Sử dụng Otsu để tự động tìm ngưỡng tối ưu
3. Áp dụng phân ngưỡng thích nghi (Adaptive) cho ảnh có điều kiện sáng không đều
4. So sánh kết quả của 3 phương pháp

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex4_thresholding.py
import cv2
import numpy as np
import matplotlib.pyplot as plt

def main():
    # Đọc ảnh grayscale
    img = cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Không thể đọc ảnh!")
        return
    
    # ---- 1. Phân ngưỡng toàn cục thủ công ----
    thresholds = [80, 127, 180]
    manual_thresholds = []
    for T in thresholds:
        _, thresh = cv2.threshold(img, T, 255, cv2.THRESH_BINARY)
        manual_thresholds.append(thresh)
    
    # ---- 2. Otsu ----
    _, otsu_thresh = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    
    # ---- 3. Phân ngưỡng thích nghi (Adaptive) ----
    adaptive_mean = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_MEAN_C,
                                          cv2.THRESH_BINARY, 11, 2)
    adaptive_gaussian = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                              cv2.THRESH_BINARY, 11, 2)
    
    # ---- 4. Hiển thị ----
    plt.figure(figsize=(15, 12))
    
    # Ảnh gốc
    plt.subplot(2, 4, 1)
    plt.imshow(img, cmap='gray')
    plt.title('Ảnh gốc')
    plt.axis('off')
    
    # Toàn cục
    for i, (T, thresh) in enumerate(zip(thresholds, manual_thresholds)):
        plt.subplot(2, 4, i+2)
        plt.imshow(thresh, cmap='gray')
        plt.title(f'Toàn cục T={T}')
        plt.axis('off')
    
    # Otsu
    plt.subplot(2, 4, 5)
    plt.imshow(otsu_thresh, cmap='gray')
    plt.title(f'Otsu (T={_} tự động)')
    plt.axis('off')
    
    # Adaptive
    plt.subplot(2, 4, 6)
    plt.imshow(adaptive_mean, cmap='gray')
    plt.title('Adaptive Mean (11x11)')
    plt.axis('off')
    
    plt.subplot(2, 4, 7)
    plt.imshow(adaptive_gaussian, cmap='gray')
    plt.title('Adaptive Gaussian (11x11)')
    plt.axis('off')
    
    # Histogram + ngưỡng Otsu
    plt.subplot(2, 4, 8)
    hist = cv2.calcHist([img], [0], None, [256], [0, 256])
    plt.bar(range(256), hist.ravel(), width=1, color='gray')
    plt.axvline(_, color='red', linestyle='--', label=f'Otsu T={_}')
    plt.title('Histogram với ngưỡng Otsu')
    plt.xlabel('Mức xám')
    plt.ylabel('Số pixel')
    plt.legend()
    
    plt.tight_layout()
    plt.show()
    
    # ---- 5. Ứng dụng trên ảnh có chiếu sáng không đều ----
    # Tạo ảnh giả lập nền sáng không đều
    x = np.linspace(0, 1, img.shape[1])
    y = np.linspace(0, 1, img.shape[0])
    X, Y = np.meshgrid(x, y)
    gradient = (0.5 + 0.5 * X) * 255  # Sáng dần từ trái sang phải
    gradient = gradient.astype(np.uint8)
    
    # Tạo ảnh vật thể trên nền gradient
    object_img = (img * 0.3 + gradient * 0.7).astype(np.uint8)
    object_img = np.clip(object_img, 0, 255).astype(np.uint8)
    cv2.imwrite('output/uneven_lighting.jpg', object_img)
    
    # Áp dụng các phương pháp lên ảnh này
    _, otsu_uneven = cv2.threshold(object_img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    adapt_uneven = cv2.adaptiveThreshold(object_img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                         cv2.THRESH_BINARY, 21, 3)
    
    plt.figure(figsize=(15, 5))
    plt.subplot(1, 3, 1)
    plt.imshow(object_img, cmap='gray')
    plt.title('Ảnh chiếu sáng không đều')
    plt.axis('off')
    
    plt.subplot(1, 3, 2)
    plt.imshow(otsu_uneven, cmap='gray')
    plt.title('Otsu (thất bại)')
    plt.axis('off')
    
    plt.subplot(1, 3, 3)
    plt.imshow(adapt_uneven, cmap='gray')
    plt.title('Adaptive (hiệu quả)')
    plt.axis('off')
    
    plt.tight_layout()
    plt.show()
    
    cv2.imwrite('output/otsu.jpg', otsu_thresh)
    cv2.imwrite('output/adaptive_mean.jpg', adaptive_mean)
    cv2.imwrite('output/adaptive_gaussian.jpg', adaptive_gaussian)
    cv2.imwrite('output/otsu_uneven.jpg', otsu_uneven)
    cv2.imwrite('output/adapt_uneven.jpg', adapt_uneven)
    
    print(f"Ngưỡng Otsu tìm được: T = {_}")
    print("Đã lưu các kết quả phân ngưỡng.")

if __name__ == "__main__":
    main()
```
</div>

**Câu hỏi kiểm tra:**
- Trong trường hợp nào Otsu hoạt động kém? Lấy ví dụ.
- Adaptive thresholding sử dụng tham số $C$ (hằng số trừ). Nếu $C$ quá lớn hoặc quá nhỏ thì sao?

---

## Bài tập 5: Phân đoạn bằng phát triển vùng (Region Growing)

**Yêu cầu:**

1. Viết hàm phát triển vùng từ một điểm hạt giống (seed point)
2. Sử dụng điều kiện đồng nhất về cường độ (|pixel - seed_value| <= threshold)
3. Hiển thị vùng phát triển trên ảnh
4. Thử nghiệm với các hạt giống và ngưỡng khác nhau

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex5_region_growing.py
import cv2
import numpy as np
import matplotlib.pyplot as plt
from collections import deque

def region_growing(img, seed, threshold=10, connectivity=8):
    """
    Phát triển vùng từ seed point
    seed: (x, y)
    connectivity: 4 hoặc 8
    """
    h, w = img.shape
    segmented = np.zeros_like(img, dtype=np.uint8)
    
    # Lấy giá trị seed
    seed_value = int(img[seed[1], seed[0]])
    
    # Hàng đợi BFS
    queue = deque([seed])
    segmented[seed[1], seed[0]] = 255
    
    # Xác định hướng di chuyển
    if connectivity == 4:
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    else:  # 8-connectivity
        directions = [(-1, -1), (-1, 0), (-1, 1),
                      (0, -1),           (0, 1),
                      (1, -1),  (1, 0),  (1, 1)]
    
    while queue:
        x, y = queue.popleft()
        
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            
            # Kiểm tra trong ảnh
            if 0 <= nx < w and 0 <= ny < h:
                # Chưa được gán nhãn và thỏa mãn điều kiện đồng nhất
                if segmented[ny, nx] == 0:
                    if abs(int(img[ny, nx]) - seed_value) <= threshold:
                        segmented[ny, nx] = 255
                        queue.append((nx, ny))
    
    return segmented

def main():
    img = cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Không thể đọc ảnh!")
        return
    
    # Chọn các seed points (x, y)
    seeds = [(150, 100), (250, 200), (100, 250)]
    thresholds = [10, 20, 30]
    
    plt.figure(figsize=(15, 10))
    
    # Ảnh gốc với đánh dấu seed
    img_with_seeds = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
    for x, y in seeds:
        cv2.circle(img_with_seeds, (x, y), 5, (0, 0, 255), -1)
    
    plt.subplot(2, 3, 1)
    plt.imshow(cv2.cvtColor(img_with_seeds, cv2.COLOR_BGR2RGB))
    plt.title('Ảnh gốc với seed (đỏ)')
    plt.axis('off')
    
    # Thử nghiệm với các seed và ngưỡng khác nhau
    for idx, (seed, threshold) in enumerate(zip(seeds, thresholds)):
        # Region growing với 8-kề
        region = region_growing(img, seed, threshold=threshold, connectivity=8)
        
        # Overlay vùng lên ảnh gốc
        overlay = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
        mask = region == 255
        overlay[mask] = [0, 255, 0]  # Tô xanh vùng phát triển
        
        plt.subplot(2, 3, idx+2)
        plt.imshow(cv2.cvtColor(overlay, cv2.COLOR_BGR2RGB))
        plt.title(f'Seed ({seed[0]},{seed[1]})\nThreshold={threshold}')
        plt.axis('off')
        
        cv2.imwrite(f'output/region_growing_seed_{idx+1}.jpg', region)
    
    # ---- So sánh 4-kề và 8-kề ----
    seed = (200, 150)
    threshold = 15
    
    region_4 = region_growing(img, seed, threshold=threshold, connectivity=4)
    region_8 = region_growing(img, seed, threshold=threshold, connectivity=8)
    
    plt.subplot(2, 3, 5)
    plt.imshow(region_4, cmap='gray')
    plt.title('4-kề')
    plt.axis('off')
    
    plt.subplot(2, 3, 6)
    plt.imshow(region_8, cmap='gray')
    plt.title('8-kề')
    plt.axis('off')
    
    plt.tight_layout()
    plt.show()
    
    print("Đã hoàn thành Region Growing.")

if __name__ == "__main__":
    main()
```
</div>

**Câu hỏi kiểm tra:**
- Nếu ngưỡng quá lớn, hiện tượng gì xảy ra? Gọi là gì?
- 4-kề và 8-kề khác nhau như thế nào về kết quả vùng phát triển?

---

## Bài tập 6: Phân đoạn ảnh bằng K-Means

**Yêu cầu:**

1. Áp dụng K-Means trên ảnh màu (dùng không gian RGB)
2. Thử nghiệm với số cụm K khác nhau (2, 3, 5, 8)
3. Quan sát sự phân đoạn đối tượng theo màu sắc
4. Mở rộng: Dùng không gian màu Lab để phân đoạn tốt hơn

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex6_kmeans.py
import cv2
import numpy as np
import matplotlib.pyplot as plt

def kmeans_segment(img, K=3, max_iters=100, eps=0.2):
    """
    Phân đoạn ảnh màu bằng K-Means
    """
    # Chuẩn bị dữ liệu
    data = img.reshape((-1, 3))
    data = np.float32(data)
    
    # Áp dụng K-Means
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, max_iters, eps)
    _, labels, centers = cv2.kmeans(data, K, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
    
    # Gán nhãn và tạo ảnh kết quả
    centers = np.uint8(centers)
    segmented = centers[labels.flatten()]
    segmented = segmented.reshape(img.shape)
    
    return segmented, labels.reshape(img.shape[:2])

def main():
    img = cv2.imread('images/sample.jpg')
    if img is None:
        print("Không thể đọc ảnh!")
        return
    
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # ---- 1. Thử nghiệm với các K khác nhau ----
    K_values = [2, 3, 5, 8]
    
    plt.figure(figsize=(15, 10))
    
    plt.subplot(2, 3, 1)
    plt.imshow(img_rgb)
    plt.title('Ảnh gốc')
    plt.axis('off')
    
    for idx, K in enumerate(K_values):
        segmented, labels = kmeans_segment(img, K=K)
        
        plt.subplot(2, 3, idx+2)
        plt.imshow(segmented)
        plt.title(f'K-Means K={K}')
        plt.axis('off')
        
        cv2.imwrite(f'output/kmeans_K_{K}.jpg', cv2.cvtColor(segmented, cv2.COLOR_RGB2BGR))
    
    plt.tight_layout()
    plt.show()
    
    # ---- 2. Sử dụng không gian màu Lab (tốt hơn cho phân đoạn) ----
    img_lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    segmented_lab, labels_lab = kmeans_segment(img_lab, K=3)
    segmented_lab_rgb = cv2.cvtColor(segmented_lab, cv2.COLOR_LAB2RGB)
    
    # ---- 3. Kết hợp thêm tọa độ không gian (không gian 5D) ----
    h, w = img.shape[:2]
    # Tạo dữ liệu 5D: [R, G, B, x, y]
    data_5d = np.zeros((h * w, 5), dtype=np.float32)
    data_5d[:, 0:3] = img.reshape(-1, 3).astype(np.float32)
    # Tọa độ chuẩn hóa
    y_coords, x_coords = np.meshgrid(np.linspace(0, 1, h), np.linspace(0, 1, w), indexing='ij')
    data_5d[:, 3] = x_coords.flatten()
    data_5d[:, 4] = y_coords.flatten()
    
    # Chuẩn hóa màu về khoảng 0-1 để cân bằng với tọa độ
    data_5d[:, 0:3] = data_5d[:, 0:3] / 255.0
    
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 0.2)
    _, labels_5d, centers_5d = cv2.kmeans(data_5d, 5, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
    
    # Khôi phục ảnh từ labels (chỉ lấy 3 kênh màu đầu)
    centers_rgb = (centers_5d[:, 0:3] * 255).astype(np.uint8)
    segmented_5d = centers_rgb[labels_5d.flatten()]
    segmented_5d = segmented_5d.reshape(h, w, 3)
    
    # ---- Hiển thị so sánh ----
    plt.figure(figsize=(15, 5))
    
    plt.subplot(1, 3, 1)
    plt.imshow(img_rgb)
    plt.title('Gốc')
    plt.axis('off')
    
    plt.subplot(1, 3, 2)
    plt.imshow(segmented_lab_rgb)
    plt.title('K-Means (Lab, K=3)')
    plt.axis('off')
    
    plt.subplot(1, 3, 3)
    plt.imshow(segmented_5d)
    plt.title('K-Means (RGB + xy, K=5)')
    plt.axis('off')
    
    plt.tight_layout()
    plt.show()
    
    cv2.imwrite('output/kmeans_lab.jpg', cv2.cvtColor(segmented_lab_rgb, cv2.COLOR_RGB2BGR))
    cv2.imwrite('output/kmeans_spatial.jpg', cv2.cvtColor(segmented_5d, cv2.COLOR_RGB2BGR))
    
    print("Đã hoàn thành phân đoạn K-Means.")

if __name__ == "__main__":
    main()
```
</div>

**Câu hỏi kiểm tra:**
- Làm thế nào để chọn K tối ưu cho một ảnh cụ thể?
- Tại sao không gian màu Lab tốt hơn RGB cho phân đoạn?

---

## Bài tập 7: Superpixel với SLIC

**Yêu cầu:**

1. Áp dụng thuật toán SLIC để tạo superpixel trên ảnh
2. Điều chỉnh tham số `n_segments` và `compactness`
3. Vẽ biên của superpixel lên ảnh gốc
4. Phân đoạn ảnh bằng cách gom các superpixel (lấy màu trung bình của mỗi superpixel)

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex7_slic.py
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage.segmentation import slic, mark_boundaries
from skimage.util import img_as_float

def draw_superpixel_boundaries(img, segments, color=(0, 255, 0)):
    """Vẽ biên superpixel lên ảnh"""
    boundary_img = img.copy()
    h, w = img.shape[:2]
    
    for i in range(h-1):
        for j in range(w-1):
            # Kiểm tra biên giữa pixel (i,j) và pixel bên phải
            if segments[i, j] != segments[i, j+1]:
                boundary_img[i, j] = color
            # Kiểm tra biên giữa pixel (i,j) và pixel bên dưới
            if segments[i, j] != segments[i+1, j]:
                boundary_img[i, j] = color
    
    return boundary_img

def average_segment_color(img, segments):
    """Thay thế mỗi superpixel bằng màu trung bình của nó"""
    result = img.copy().astype(np.float32)
    for seg_id in np.unique(segments):
        mask = (segments == seg_id)
        # Tính màu trung bình
        mean_color = np.mean(img[mask], axis=0)
        result[mask] = mean_color
    return result.astype(np.uint8)

def main():
    img = cv2.imread('images/sample.jpg')
    if img is None:
        print("Không thể đọc ảnh!")
        return
    
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_float = img_as_float(img_rgb)
    
    # ---- 1. SLIC với các tham số khác nhau ----
    n_segments_list = [100, 200, 500]
    compactness_list = [5, 10, 20]
    
    plt.figure(figsize=(15, 10))
    
    # Hiển thị ảnh gốc
    plt.subplot(2, 3, 1)
    plt.imshow(img_rgb)
    plt.title('Ảnh gốc')
    plt.axis('off')
    
    # Thử nghiệm với số segments khác nhau
    for idx, n_seg in enumerate(n_segments_list):
        segments = slic(img_float, n_segments=n_seg, compactness=10, sigma=1)
        boundary_img = mark_boundaries(img_float, segments)
        
        plt.subplot(2, 3, idx+2)
        plt.imshow(boundary_img)
        plt.title(f'SLIC n={n_seg}, compactness=10')
        plt.axis('off')
        
        # Lưu ảnh
        cv2.imwrite(f'output/slic_n_{n_seg}.jpg', 
                    cv2.cvtColor((boundary_img * 255).astype(np.uint8), cv2.COLOR_RGB2BGR))
    
    # Thử nghiệm với compactness khác nhau
    plt.figure(figsize=(15, 5))
    
    for idx, comp in enumerate(compactness_list):
        segments = slic(img_float, n_segments=200, compactness=comp, sigma=1)
        boundary_img = mark_boundaries(img_float, segments)
        
        plt.subplot(1, 3, idx+1)
        plt.imshow(boundary_img)
        plt.title(f'SLIC compactness={comp}')
        plt.axis('off')
    
    plt.tight_layout()
    plt.show()
    
    # ---- 2. Lấy màu trung bình của mỗi superpixel ----
    segments = slic(img_float, n_segments=300, compactness=10, sigma=1)
    avg_img = average_segment_color(img_rgb, segments)
    
    plt.figure(figsize=(15, 5))
    
    plt.subplot(1, 3, 1)
    plt.imshow(img_rgb)
    plt.title('Gốc')
    plt.axis('off')
    
    plt.subplot(1, 3, 2)
    boundary_img = mark_boundaries(img_float, segments)
    plt.imshow(boundary_img)
    plt.title(f'SLIC biên (300 segments)')
    plt.axis('off')
    
    plt.subplot(1, 3, 3)
    plt.imshow(avg_img)
    plt.title('Trung bình màu superpixel')
    plt.axis('off')
    
    plt.tight_layout()
    plt.show()
    
    cv2.imwrite('output/slic_average.jpg', cv2.cvtColor(avg_img, cv2.COLOR_RGB2BGR))
    
    # ---- 3. Thống kê superpixel ----
    print("=" * 50)
    print("THỐNG KÊ SUPERPIXEL SLIC")
    print("=" * 50)
    print(f"Số superpixel: {len(np.unique(segments))}")
    print(f"Kích thước ảnh: {img.shape[0]} x {img.shape[1]} = {img.shape[0] * img.shape[1]} pixels")
    print(f"Giảm dữ liệu: {img.shape[0] * img.shape[1]} -> {len(np.unique(segments))} regions")
    print(f"Tỷ lệ giảm: {100 * (1 - len(np.unique(segments)) / (img.shape[0] * img.shape[1])):.2f}%")

if __name__ == "__main__":
    main()
```
</div>

**Câu hỏi kiểm tra:**
- Tham số `compactness` ảnh hưởng đến hình dạng superpixel như thế nào?
- Superpixel được sử dụng để làm gì trong các bài toán thị giác máy tính?

---

## Bài tập nâng cao (Tự chọn)

### Bài 8: Hough Transform - Phát hiện đường thẳng
- Sử dụng `cv2.HoughLines()` và `cv2.HoughLinesP()` để phát hiện đường thẳng từ ảnh biên Canny
- Vẽ các đường thẳng phát hiện được lên ảnh gốc
- Điều chỉnh tham số rho, theta, threshold

### Bài 9: Phân đoạn bằng Split & Merge
- Triển khai thuật toán chia tách và hợp nhất vùng sử dụng cây tứ phân (QuadTree)
- Điều kiện chia: Phương sai của vùng > ngưỡng
- Điều kiện hợp: Sự khác biệt trung bình giữa hai vùng lân cận < ngưỡng

### Bài 10: Đánh giá phân đoạn (Segmentation Metrics)
- Viết hàm tính Dice Coefficient và IoU (Intersection over Union)
- Tạo ground truth giả lập và so sánh với kết quả phân đoạn từ K-Means/SLIC

### Bài 11: Phát hiện biên nâng cao - Bộ lọc Gabor
- Áp dụng bộ lọc Gabor để phát hiện biên theo hướng và tần số cụ thể
- Trích xuất texture và kết hợp với phân đoạn