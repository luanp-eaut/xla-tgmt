---

marp: true
theme: eaut
paginate: true

---
<!--_class: cover-->

<div class="middle">

# XỬ LÝ ẢNH & THỊ GIÁC MÁY TÍNH

## CHƯƠNG 2 - BIẾN ĐỔI ẢNH

</div>

### Giảng viên: Nguyễn Phồn Lữa

---
<!--_class: toc-->

# NỘI DUNG

1. **Tổng quan**
2. **Biến đổi trong miền không gian**
    - Biến đổi cường độ (Point Processing)
    - Lọc không gian (Neighborhood Processing)
3. **Histogram** và các kỹ thuật cân bằng, khớp histogram
4. **Biến đổi trong miền tần số**
    - Biến đổi Fourier 2D
    - Lọc thông thấp, thông cao, lọc chọn lọc
    - FFT và ứng dụng

---

# MỤC TIÊU HỌC TẬP

Sau chương này, sinh viên có thể:

1. **Phân biệt** được miền không gian và miền tần số trong xử lý ảnh.
2. **Thực hiện** các phép biến đổi cường độ để tăng cường ảnh.
3. **Hiểu và áp dụng** các bộ lọc không gian để làm mịn và làm nét ảnh.
4. **Phân tích và xử lý** ảnh dựa trên Histogram.
5. **Hiểu nguyên lý** của biến đổi Fourier 2D.
6. **Thực hiện** lọc ảnh trong miền tần số.
7. **Sử dụng** Python, NumPy, OpenCV và Matplotlib để cài đặt các kỹ thuật cơ bản.

---
<!--_class: section-->

# TỔNG QUAN

---

# NỘI DUNG TỔNG QUÁT

1. **Biến đổi trong miền không gian**
    - Point Processing
    - Neighborhood Processing
2. **Biến đổi cường độ**
    - Negative, Log, Gamma, Piecewise-Linear
3. **Lọc không gian**
    - Smoothing: Mean, Gaussian, Median
    - Sharpening: Sobel, Laplacian, Unsharp, Highboost
4. **Xử lý Histogram**
    - Histogram Equalization, Matching, Local Histogram, CLAHE
5. **Biến đổi trong miền tần số**
    - Fourier Transform, Frequency Spectrum, LPF/HPF, FFT

---

# HAI CÁCH NHÌN VỀ ẢNH

**Miền không gian (Spatial Domain)**

- Làm việc **trực tiếp trên pixel** của ảnh.
- Quan tâm: *Pixel nằm ở đâu và có giá trị bao nhiêu?*
- **Ví dụ:** Biến đổi cường độ, Mean Filter, Gaussian Filter, Median Filter, Sobel, Laplacian.

**Miền tần số (Frequency Domain)**

- Biểu diễn ảnh bằng các **thành phần tần số**.
- Quan tâm: *Ảnh thay đổi nhanh hay chậm?*
- **Ví dụ:** Fourier Transform, Low-pass Filter, High-pass Filter, Band-reject Filter.

> **Ví dụ minh họa:** Một bức ảnh khuôn mặt trong miền không gian là ma trận các pixel; trong miền tần số, nó được mô tả bằng tập hợp các sóng sin/cosin với tần số và biên độ khác nhau.

---
<!--_class: section-->

# BIẾN ĐỔI TRONG MIỀN KHÔNG GIAN

---

# KHÁI NIỆM MIỀN KHÔNG GIAN

**Miền không gian (Spatial Domain)** là chính mặt phẳng ảnh, trong đó các phương pháp xử lý tác động **trực tiếp lên các pixel**.

Hai nhóm chính:

- **Point Processing** (Xử lý điểm): biến đổi từng pixel độc lập.
- **Neighborhood Processing** (Xử lý lân cận): biến đổi dựa trên vùng lân cận của pixel.

> **Ví dụ:** Khi bạn chỉnh độ sáng của một bức ảnh trên điện thoại, bạn đang thực hiện Point Processing. Khi bạn dùng chế độ "làm mờ" (blur), bạn đang dùng Neighborhood Processing vì giá trị mỗi pixel mới được tính từ các pixel xung quanh.

---

# POINT PROCESSING VÀ NEIGHBORHOOD PROCESSING

**Point Processing**

- Giá trị pixel đầu ra **chỉ phụ thuộc** vào pixel tương ứng ở ảnh đầu vào.
- Công thức: $g(x,y) = T[f(x,y)]$
- **Ví dụ:** Negative, Log, Gamma, Contrast stretching.

**Neighborhood Processing**

- Giá trị pixel đầu ra **phụ thuộc vào một vùng lân cận** quanh pixel đó.
- Công thức: $g(x,y) = T\{f(s,t) \mid (s,t) \in N(x,y)\}$
- **Ví dụ:** Mean Filter, Gaussian Filter, Median Filter, Sobel, Laplacian.

> **Ví dụ minh họa:** Với Point Processing, pixel (x,y) mới chỉ phụ thuộc vào pixel (x,y) cũ. Với Neighborhood Processing, pixel (x,y) mới được tính từ 9 pixel xung quanh (kernel 3x3).

---

# BIẾN ĐỔI CƯỜNG ĐỘ (INTENSITY TRANSFORMATION)

**Định nghĩa:** Là kỹ thuật Point Processing, mỗi pixel được biến đổi độc lập dựa trên giá trị cường độ của chính nó.

**Công thức tổng quát:** $s = T(r)$

Trong đó:
- $r$: cường độ pixel đầu vào
- $s$: cường độ pixel đầu ra
- $T$: hàm biến đổi

**Mục đích:**

- Thay đổi độ sáng, tăng hoặc giảm tương phản.
- Làm nổi bật vùng ảnh quan tâm.
- Điều chỉnh ảnh phù hợp với thiết bị hiển thị.

> **Ví dụ:** Khi chụp ảnh trong điều kiện thiếu sáng, ta dùng biến đổi Gamma để làm sáng các vùng tối mà không làm cháy sáng các vùng đã sáng.

---

# ẢNH ÂM BẢN (IMAGE NEGATIVE)

**Công thức:** $s = L - 1 - r$

Với ảnh 8-bit ($L = 256$): $s = 255 - r$

**Đặc điểm:**

- Pixel sáng → pixel tối, pixel tối → pixel sáng.
- Đảo ngược thứ tự các mức cường độ.

**Ứng dụng:**

- Làm nổi bật chi tiết sáng trong vùng tối.
- Ảnh X-quang và ảnh y tế.
- Ảnh phim âm bản.

> **Ví dụ:** Trên phim X-quang, vùng xương (cản tia) sẽ có màu trắng, vùng mô mềm (cho tia đi qua) có màu đen. Ảnh âm bản giúp bác sĩ quan sát chi tiết dễ hơn.

---

# BIẾN ĐỔI LOGARITHM

**Công thức:** $s = c \cdot \log(1 + r)$

**Đặc điểm:**

- **Mở rộng** vùng giá trị cường độ thấp.
- **Nén** vùng giá trị cường độ cao.
- Các chi tiết trong vùng tối được làm nổi bật.

**Ứng dụng:**

- Hiển thị các giá trị có dynamic range lớn.
- Hiển thị Fourier magnitude spectrum.
- Làm nổi bật thông tin trong vùng cường độ thấp.

> **Ví dụ:** Phổ Fourier thường có giá trị rất lớn ở tâm (DC component) và rất nhỏ ở các vùng biên. Biến đổi log giúp ta nhìn thấy cả hai vùng này trên cùng một hình ảnh.

---

# BIẾN ĐỔI LŨY THỪA / GAMMA

**Công thức:** $s = c \cdot r^\gamma$

Với $r$ thường được chuẩn hóa về $[0, 1]$.

**Ảnh hưởng của $\gamma$:**

- $\gamma < 1$: mở rộng vùng tối, nén vùng sáng → **ảnh sáng hơn**.
- $\gamma = 1$: biến đổi tuyến tính.
- $\gamma > 1$: nén vùng tối, mở rộng vùng sáng → **ảnh tối hơn**.

**Ứng dụng:** Hiệu chỉnh gamma, điều chỉnh ảnh theo đặc tính thiết bị hiển thị (màn hình CRT, LCD), tiền xử lý ảnh.

> **Ví dụ:** Màn hình máy tính thường có gamma ≈ 2.2, nên ảnh hiển thị sẽ tối hơn ảnh gốc. Ta cần hiệu chỉnh gamma để bù lại.

---

# TRỰC QUAN VỀ GAMMA

Đồ thị hàm biến đổi $s = r^\gamma$:

- Đường cong $\gamma < 1$ nằm **phía trên** đường chéo → pixel đầu ra lớn hơn đầu vào → ảnh sáng hơn.
- Đường chéo $\gamma = 1$ là biến đổi tuyến tính.
- Đường cong $\gamma > 1$ nằm **phía dưới** đường chéo → pixel đầu ra nhỏ hơn đầu vào → ảnh tối hơn.

**Ghi nhớ:**

- $\gamma < 1 \Rightarrow$ ảnh sáng hơn
- $\gamma > 1 \Rightarrow$ ảnh tối hơn

> **Lưu ý:** Hiệu ứng cụ thể phụ thuộc vào cách chuẩn hóa và hệ số $c$.

---

# BIẾN ĐỔI HÀM BẬC THANG (PIECEWISE-LINEAR)

**Định nghĩa:** Thay vì sử dụng một hàm duy nhất trên toàn bộ dải cường độ, ta **chia dải giá trị thành nhiều đoạn**, mỗi đoạn có một hàm biến đổi riêng.

**Công thức:**
$$s = \begin{cases} T_1(r), & r < r_1 \\ T_2(r), & r_1 \leq r \leq r_2 \\ T_3(r), & r > r_2 \end{cases}$$

**Ưu điểm:** Cho phép kiểm soát cường độ theo từng khoảng giá trị.

**Các kỹ thuật tiêu biểu:**

- Contrast Stretching
- Gray-Level Slicing
- Bit-Plane Slicing

> **Ví dụ:** Trong ảnh y tế, ta chỉ muốn làm nổi bật vùng mô có mức xám từ 80 đến 150, các vùng còn lại giữ nguyên hoặc làm tối đi.

---

# TĂNG CƯỜNG ĐỘ TƯƠNG PHẢN (CONTRAST STRETCHING)

**Mục tiêu:** Mở rộng khoảng giá trị cường độ của ảnh để tăng sự khác biệt giữa các vùng sáng và tối.

**Ví dụ:** Ảnh đầu vào có $r \in [r_1, r_2]$ được ánh xạ sang $s \in [s_1, s_2]$.

**Trường hợp tuyến tính:**
$$s = \frac{s_2 - s_1}{r_2 - r_1}(r - r_1) + s_1$$

**Ứng dụng:**

- Ảnh có tương phản thấp.
- Ảnh bị mờ do điều kiện chiếu sáng.
- Tiền xử lý trước các bước phân tích ảnh.

> **Ví dụ:** Ảnh chụp trong sương mù có các mức xám tập trung trong khoảng hẹp [60, 120]. Contrast stretching kéo giãn khoảng này ra [0, 255] giúp ảnh rõ hơn.

---

# CẮT MỨC XÁM (GRAY-LEVEL SLICING)

**Mục tiêu:** Làm nổi bật một khoảng mức xám quan tâm (ROI - Region Of Interest).

**Cách thực hiện:**

- Giữ nguyên các mức xám ngoài khoảng.
- Hoặc đưa toàn bộ vùng ngoài khoảng về một giá trị cố định.

**Ứng dụng:**

- Làm nổi bật cấu trúc trong ảnh y tế.
- Phân tích vật thể có khoảng cường độ đặc trưng.

> **Ví dụ:** Trong ảnh vệ tinh, ta muốn làm nổi bật vùng nước (có mức xám 40-80) để phân tích sông hồ. Các vùng khác (đất, cây cối) được đưa về màu đen.

---

# TRÍCH XUẤT MẶT PHẲNG BIT (BIT-PLANE SLICING)

**Định nghĩa:** Pixel 8-bit được biểu diễn bởi $b_7b_6b_5b_4b_3b_2b_1b_0$. Ảnh có thể được phân tách thành **8 bit-plane**.

**Trong đó:**

- $b_7$: Most Significant Bit (MSB) - bit có trọng số lớn nhất.
- $b_0$: Least Significant Bit (LSB) - bit có trọng số nhỏ nhất.

**Ý nghĩa:**

- Bit cao → đóng góp lớn vào cấu trúc và độ sáng.
- Bit thấp → thường chứa chi tiết nhỏ và có thể chứa nhiễu.

**Ứng dụng:** Phân tích cấu trúc ảnh, nghiên cứu nén ảnh, phân tích thông tin bit.

> **Ví dụ:** Bit-plane 7 (MSB) thường cho thấy hình dạng tổng quát của vật thể, trong khi bit-plane 0 (LSB) trông như nhiễu ngẫu nhiên.

---

# BÀI TẬP THỰC HÀNH - BIẾN ĐỔI CƯỜNG ĐỘ

**Yêu cầu:** Sử dụng Python + OpenCV

1. Đọc ảnh grayscale.
2. Tạo ảnh âm bản (Negative).
3. Thực hiện Gamma Transformation với:
    - $\gamma = 0.5$
    - $\gamma = 1.0$
    - $\gamma = 2.0$
4. So sánh kết quả.
5. Vẽ đồ thị hàm biến đổi $T(r)$.

**Câu hỏi thảo luận:** Giải thích tại sao các giá trị gamma khác nhau tạo ra kết quả khác nhau?

---
<!--_class: section-->

# LỌC KHÔNG GIAN

---

# KHÁI NIỆM LỌC KHÔNG GIAN

**Spatial Filtering** là kỹ thuật thay đổi giá trị pixel dựa trên các pixel trong **vùng lân cận**.

**Cơ chế hoạt động:**

- Một **kernel** (hay mask, window) có kích thước nhỏ (thường 3x3, 5x5, 7x7) được đặt lên ảnh.
- Pixel trung tâm của kernel được tính toán lại dựa trên các pixel trong vùng kernel phủ lên.
- Kernel được **trượt** qua toàn bộ ảnh để tạo ra ảnh đầu ra.

> **Ví dụ:** Khi bạn dùng ứng dụng chỉnh ảnh để "làm mờ" một vùng, phần mềm đang áp dụng một kernel trung bình lên vùng lân cận của mỗi pixel.

---

# KERNEL VÀ PHÉP LỌC

**Công thức tổng quát:** Với kernel $w(s,t)$:
$$g(x,y) = \sum_s \sum_t w(s,t) \cdot f(x-s, y-t)$$

Trong đó:
- $f(x,y)$: ảnh đầu vào
- $w(s,t)$: kernel (bộ lọc)
- $g(x,y)$: ảnh đầu ra

**Kích thước kernel:** Thường là số lẻ ($3\times3$, $5\times5$, $7\times7$) để xác định rõ pixel trung tâm.

> **Ví dụ:** Kernel trung bình 3x3 có tất cả 9 phần tử bằng 1/9. Khi áp dụng lên một pixel, giá trị mới bằng trung bình cộng của 9 pixel xung quanh.

---

# PHÂN LOẠI BỘ LỌC KHÔNG GIAN

**Smoothing Filters (Bộ lọc làm mịn / Low-pass)**

- Giảm nhiễu, làm mờ ảnh.
- Giảm chi tiết nhỏ.
- Làm giảm các thay đổi cường độ nhanh.

**Sharpening Filters (Bộ lọc làm nét / High-pass)**

- Tăng cường chi tiết, làm nổi bật biên.
- Tăng các thay đổi cường độ nhanh.

> **Ví dụ:** Bộ lọc Mean làm mờ ảnh (smoothing), trong khi bộ lọc Sobel làm nổi bật các đường biên (sharpening).

---

# BỘ LỌC TRUNG BÌNH (MEAN / BOX FILTER)

**Định nghĩa:** Tất cả pixel trong kernel có **trọng số như nhau**.

Với kernel $m \times n$: $w(i,j) = \frac{1}{mn}$

**Ví dụ kernel 3×3:**
$$\frac{1}{9}\begin{bmatrix} 1 & 1 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & 1 \end{bmatrix}$$

**Đặc điểm:**

- Đơn giản, tính toán nhanh.
- Làm mờ ảnh nhưng có thể làm mất biên và chi tiết.
- Nhạy với nhiễu salt-and-pepper (nhiễu muối tiêu).

> **Ví dụ:** Khi áp dụng Mean Filter 3x3 lên ảnh có một pixel nhiễu giá trị 255 (trắng), giá trị mới sẽ bị kéo lên khoảng 28, làm nhiễu lan sang các pixel xung quanh.

---

# BỘ LỌC GAUSSIAN

**Định nghĩa:** Trọng số kernel tuân theo **phân phối Gaussian**.

$$G(x,y) = \frac{1}{2\pi\sigma^2} e^{-\frac{x^2+y^2}{2\sigma^2}}$$

**Đặc điểm:**

- Pixel gần tâm có trọng số lớn hơn, càng xa tâm trọng số càng nhỏ.
- $\sigma$ kiểm soát mức độ làm mờ.

**Ưu điểm:**

- Làm mờ tự nhiên, giảm nhiễu tốt.
- Thường được sử dụng trước các thuật toán phát hiện biên.

> **Ví dụ:** Trong bộ lọc Gaussian 3x3, pixel trung tâm có trọng số lớn nhất (ví dụ 4/16), các pixel ở cạnh có trọng số nhỏ hơn (2/16), và pixel ở góc nhỏ nhất (1/16).

---

# BỘ LỌC TRUNG VỊ (MEDIAN FILTER)

**Định nghĩa:** Thay giá trị pixel trung tâm bằng **trung vị** (median) của các pixel trong vùng lân cận.

**Ví dụ:** Với vùng 3x3 có các giá trị:
```
10   12   11
 9  255   10
11   13   12
```
Sắp xếp: 9, 10, 10, 11, **11**, 12, 12, 13, 255
→ Median = **11** (pixel nhiễu 255 đã bị loại bỏ)

**Ưu điểm:**

- Hiệu quả với nhiễu salt-and-pepper.
- Bảo toàn biên tốt hơn bộ lọc trung bình.

> **Ví dụ:** Ảnh bị nhiễu muối tiêu (các chấm trắng/đen ngẫu nhiên) sẽ được khôi phục gần như hoàn toàn bằng Median Filter 3x3.

---

# SO SÁNH CÁC BỘ LỌC LÀM MỊN

| Tiêu chí | Mean | Gaussian | Median |
| --- | --- | --- | --- |
| **Nguyên lý** | Trung bình | Trung bình có trọng số | Trung vị |
| **Loại** | Tuyến tính | Tuyến tính | Phi tuyến |
| **Làm mờ** | Mạnh | Tự nhiên | Tùy dữ liệu |
| **Salt-and-pepper** | Kém | Kém | Tốt |
| **Bảo toàn biên** | Kém | Tốt hơn Mean | Tốt |
| **Tốc độ** | Nhanh | Nhanh | Chậm hơn |
| **Ứng dụng** | Làm mờ đơn giản | Tiền xử lý | Khử nhiễu xung |

---

# BÀI TẬP THỰC HÀNH - LÀM MỊN ẢNH

```python
import cv2
import matplotlib.pyplot as plt

img = cv2.imread("input.jpg", cv2.IMREAD_GRAYSCALE)
mean = cv2.blur(img, (5, 5))
gaussian = cv2.GaussianBlur(img, (5, 5), 0)
median = cv2.medianBlur(img, 5)
```

**Yêu cầu:**

- Hiển thị và so sánh 4 ảnh: Original, Mean, Gaussian, Median.
- Quan sát tác động lên chi tiết và biên.
- Nhận xét bộ lọc nào phù hợp với loại nhiễu nào.

---
<!--_class: section-->

# LÀM NÉT ẢNH

---

# ĐẠO HÀM VÀ BIÊN ẢNH

**Nguyên lý:** Biên thường xuất hiện tại những vị trí mà cường độ ảnh **thay đổi mạnh**.

**Đạo hàm bậc nhất** $\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}$:

- Bằng 0 trong vùng cường độ không đổi.
- Có giá trị lớn tại vùng thay đổi mạnh.
- Cho biết độ lớn và hướng thay đổi.

**Đạo hàm bậc hai** $\frac{\partial^2 f}{\partial x^2}, \frac{\partial^2 f}{\partial y^2}$:

- Nhạy với các thay đổi cường độ nhanh.
- Được sử dụng trong toán tử Laplacian.

> **Ví dụ:** Tại biên giữa vùng trắng và đen, đạo hàm bậc nhất có giá trị lớn (dương hoặc âm), đạo hàm bậc hai đi qua 0 (zero-crossing).

---

# GRADIENT CỦA ẢNH

**Gradient:** $\nabla f = \begin{bmatrix} \frac{\partial f}{\partial x} \\ \frac{\partial f}{\partial y} \end{bmatrix}$

**Độ lớn (Magnitude):**
$$|\nabla f| = \sqrt{G_x^2 + G_y^2} \approx |G_x| + |G_y|$$

**Hướng (Direction):**
$$\theta = \text{atan2}(G_y, G_x)$$

**Ý nghĩa:**

- **Magnitude** → biên mạnh hay yếu.
- **Direction** → hướng thay đổi cường độ (vuông góc với đường biên).

> **Ví dụ:** Với một đường biên thẳng đứng (trắng bên trái, đen bên phải), gradient có hướng nằm ngang và độ lớn lớn tại vị trí biên.

---

# TOÁN TỬ SOBEL

**Định nghĩa:** Sobel sử dụng hai kernel để xấp xỉ đạo hàm theo hai hướng $x$ và $y$.

$$G_x = \begin{bmatrix} -1 & 0 & 1 \\ -2 & 0 & 2 \\ -1 & 0 & 1 \end{bmatrix}, \quad G_y = \begin{bmatrix} -1 & -2 & -1 \\ 0 & 0 & 0 \\ 1 & 2 & 1 \end{bmatrix}$$

Sau đó tính: $G = \sqrt{G_x^2 + G_y^2}$

**Đặc điểm:**

- Phát hiện biên, cho magnitude và direction.
- Có khả năng giảm ảnh hưởng của nhiễu tốt hơn đạo hàm đơn giản (do có thành phần làm mịn).

> **Ví dụ:** Kernel $G_x$ vừa tính đạo hàm theo $x$ (cột [-1, 0, 1]) vừa làm mịn theo $y$ (hàng [1, 2, 1]).

---

# TOÁN TỬ PREWITT

**Định nghĩa:** Prewitt cũng sử dụng đạo hàm bậc nhất theo hai hướng.

$$G_x = \begin{bmatrix} -1 & 0 & 1 \\ -1 & 0 & 1 \\ -1 & 0 & 1 \end{bmatrix}, \quad G_y = \begin{bmatrix} -1 & -1 & -1 \\ 0 & 0 & 0 \\ 1 & 1 & 1 \end{bmatrix}$$

**So sánh Sobel và Prewitt:**

- Cùng dựa trên gradient.
- Sobel sử dụng trọng số lớn hơn ở hàng/cột trung tâm → giảm nhiễu tốt hơn.
- Sobel thường được sử dụng phổ biến hơn trong thực tế.

> **Ví dụ:** Trên ảnh có nhiễu, Sobel cho kết quả biên rõ ràng hơn Prewitt do kernel của nó có tính làm mịn tốt hơn.

---

# BÀI TẬP THỰC HÀNH - PHÁT HIỆN BIÊN VỚI SOBEL

```python
sobel_x = cv2.Sobel(img, cv2.CV_64F, 1, 0, ksize=3)
sobel_y = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=3)
magnitude = cv2.magnitude(
    sobel_x.astype("float32"),
    sobel_y.astype("float32")
)
```

**Hiển thị:**

- Original → Sobel X → Sobel Y → Gradient Magnitude

**Yêu cầu:** Nhận xét sự khác biệt giữa biên ngang (thấy rõ ở Sobel X) và biên dọc (thấy rõ ở Sobel Y).

---

# BỘ LỌC LAPLACIAN

**Định nghĩa:** Laplacian sử dụng **đạo hàm bậc hai**:
$$\nabla^2 f = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2}$$

**Một số kernel phổ biến:**
$$\begin{bmatrix} 0 & -1 & 0 \\ -1 & 4 & -1 \\ 0 & -1 & 0 \end{bmatrix} \quad \text{hoặc} \quad \begin{bmatrix} -1 & -1 & -1 \\ -1 & 8 & -1 \\ -1 & -1 & -1 \end{bmatrix}$$

**Lưu ý:** Dấu của kernel có thể đảo ngược tùy quy ước.

> **Ví dụ:** Khi áp dụng kernel Laplacian lên một vùng đồng nhất, kết quả bằng 0. Tại biên, kết quả có giá trị lớn (dương hoặc âm).

---

# ỨNG DỤNG LAPLACIAN

**Phát hiện biên:**

- Kết quả Laplacian biểu diễn các vùng thay đổi cường độ mạnh.

**Làm nét ảnh:**

- Kết hợp ảnh gốc với Laplacian: $g = f - c \cdot \nabla^2 f$
- Dấu của $c$ phụ thuộc quy ước kernel.

**Đặc điểm:**

- Đẳng hướng (isotropic) - phát hiện biên theo mọi hướng.
- Không trực tiếp cung cấp hướng biên.
- Nhạy với nhiễu.
- Có thể tạo biên kép (double edges).

> **Ví dụ:** Khi làm nét ảnh, ta cộng thêm Laplacian của ảnh vào chính ảnh đó: $g = f + \nabla^2 f$, giúp biên trở nên sắc nét hơn.

---

# CÁC BƯỚC LÀM NÉT ẢNH BẰNG LAPLACIAN

**Quy trình:**

1. Tính Laplacian của ảnh gốc.
2. Kết hợp ảnh gốc với Laplacian (cộng hoặc trừ tùy dấu kernel).
3. Clipping giá trị về $[0, 255]$.

**Cần kiểm soát:**

- Dấu của Laplacian.
- Độ lớn giá trị pixel.
- Clipping về $[0, 255]$ để hiển thị đúng.

> **Ví dụ:** Ảnh mờ do out-focus có thể được cải thiện độ sắc nét đáng kể bằng cách cộng thêm Laplacian, giúp các đường biên trở nên rõ ràng hơn.

---

# UNSHARP MASKING

**Ý tưởng:** Làm mờ ảnh để lấy thành phần chi tiết, sau đó cộng thành phần chi tiết trở lại ảnh gốc.

**Ba bước thực hiện:**

1. **Làm mờ:** $f_{blur} = f * h$ (với $h$ là bộ lọc làm mờ).
2. **Tạo mặt nạ chi tiết:** $m = f - f_{blur}$ (phần chi tiết bị mất khi làm mờ).
3. **Làm nét:** $g = f + k \cdot m$ với $k > 0$.

> **Ví dụ:** Trong Photoshop, tính năng "Unsharp Mask" hoạt động theo đúng nguyên lý này - tạo ra một bản mờ, tính phần chênh lệch với ảnh gốc, rồi cộng ngược lại với hệ số khuếch đại.

---

# HIGHBOOST FILTERING

**Định nghĩa:** Highboost là mở rộng của Unsharp Masking.

**Công thức:** $g = A \cdot f - f_{blur}$ với $A > 1$

Tương đương: $g = (A-1) \cdot f + (f - f_{blur})$

**Điều chỉnh mức độ:**

- $A$ gần 1 → tăng cường nhẹ.
- $A > 1$ → tăng cường mạnh hơn.

**Lưu ý:**

- Nếu tăng quá mạnh: nhiễu cũng được khuếch đại.
- Có thể xuất hiện halo (vầng sáng) quanh biên.

> **Ví dụ:** Với $A = 1$, Highboost trở thành Unsharp Masking thông thường. Với $A = 2$, ảnh được làm nét mạnh hơn nhưng cũng dễ xuất hiện nhiễu.

---

# SO SÁNH CÁC PHƯƠNG PHÁP LÀM NÉT

| Phương pháp | Cơ sở | Ưu điểm | Hạn chế |
| --- | --- | --- | --- |
| **Laplacian** | Đạo hàm bậc hai | Nhanh, đẳng hướng | Nhạy nhiễu |
| **Sobel** | Gradient | Có magnitude + direction | Không tối ưu cho sharpening mạnh |
| **Unsharp** | Gốc − Blur | Tự nhiên, kiểm soát được | Có thể tạo halo |
| **Highboost** | Tăng cường high-frequency | Làm nét mạnh | Dễ khuếch đại nhiễu |

---

# BÀI TẬP THỰC HÀNH - SHARPENING

**Yêu cầu:** Với cùng một ảnh, thực hiện:

1. Làm nét bằng Laplacian.
2. Làm nét bằng Unsharp Masking.
3. Làm nét bằng Highboost.
4. So sánh với Sobel.

**Đánh giá theo các tiêu chí:**

- Độ sắc nét.
- Biên.
- Nhiễu.
- Halo.
- Khả năng giữ chi tiết.

---
<!--_class: section-->

# XỬ LÝ HISTOGRAM

---

# HISTOGRAM LÀ GÌ?

**Định nghĩa:** Histogram biểu diễn **tần suất xuất hiện** của các mức cường độ trong ảnh.

**Với ảnh grayscale:** $h(r_k) = n_k$

Trong đó:
- $r_k$: mức cường độ thứ $k$
- $n_k$: số pixel có mức cường độ $r_k$

**Histogram chuẩn hóa:**
$$p(r_k) = \frac{n_k}{M \cdot N}$$

với ảnh kích thước $M \times N$.

> **Ví dụ:** Một ảnh 8-bit có histogram là một đồ thị gồm 256 cột, mỗi cột thể hiện số lượng pixel có mức xám tương ứng (từ 0 đến 255).

---

# HISTOGRAM CHO BIẾT ĐIỀU GÌ?

- **Ảnh tối:** Histogram tập trung về bên trái (gần 0).
- **Ảnh sáng:** Histogram tập trung về bên phải (gần 255).
- **Tương phản thấp:** Histogram tập trung trong một khoảng hẹp.
- **Tương phản cao:** Histogram trải rộng trên một khoảng lớn.

**Lưu ý quan trọng:** Histogram **không chứa thông tin vị trí không gian** của pixel.

> **Ví dụ:** Hai ảnh hoàn toàn khác nhau (một ảnh bầu trời, một ảnh khuôn mặt) có thể có cùng histogram nếu phân bố mức xám giống nhau. Đây là hạn chế lớn nhất của histogram.

---

# ỨNG DỤNG CỦA HISTOGRAM

**Phân tích ảnh:**

- Độ sáng, độ tương phản, phân bố mức xám.

**Tăng cường ảnh:**

- Histogram Equalization, Histogram Matching, Local Enhancement.

**Phân đoạn ảnh:**

- Hỗ trợ lựa chọn ngưỡng: Thresholding, Otsu.

**Chuẩn hóa:**

- So sánh hoặc điều chỉnh ảnh có điều kiện chiếu sáng khác nhau.

> **Ví dụ:** Trong nhận dạng khuôn mặt, histogram của vùng da mặt thường có phân bố đặc trưng, giúp phân biệt da người với nền.

---

# CÂN BẰNG HISTOGRAM (HISTOGRAM EQUALIZATION)

**Mục tiêu:** Phân bố lại các mức cường độ để tăng cường độ tương phản **toàn cục**.

**Công thức:**

- Xác suất: $p(r_k) = \frac{n_k}{M \cdot N}$
- Hàm phân phối tích lũy: $CDF(r_k) = \sum_{j=0}^{k} p(r_j)$
- Phép biến đổi: $s_k = (L-1) \cdot CDF(r_k)$

Trong đó $L$ là số mức cường độ (với ảnh 8-bit: $L = 256$).

> **Ví dụ:** Ảnh chụp trong phòng tối có histogram tập trung ở vùng 0-80. Sau khi cân bằng, histogram được trải đều trên toàn dải 0-255, ảnh sáng và rõ chi tiết hơn.

---

# CƠ CHẾ CÂN BẰNG HISTOGRAM

**Quy trình:**

1. Tính histogram gốc.
2. Tính xác suất $p(r_k)$.
3. Tính CDF (hàm phân phối tích lũy).
4. Dùng CDF làm hàm ánh xạ.
5. Áp dụng lên từng pixel để có histogram mới.
6. Ảnh có tương phản được cải thiện.

**Lưu ý:** Histogram sau cân bằng **không nhất thiết phẳng hoàn toàn** vì:

- Pixel là dữ liệu rời rạc.
- Số mức cường độ hữu hạn.
- Phép ánh xạ có làm tròn.

---

# HẠN CHẾ CỦA HISTOGRAM EQUALIZATION

**Histogram Equalization toàn cục có thể:**

- Khuếch đại nhiễu.
- Làm thay đổi quá mạnh độ sáng.
- Không xử lý tốt ảnh có nhiều vùng sáng/tối khác nhau.
- Làm mất một số chi tiết cục bộ.

**Giải pháp:** Cần các phương pháp **local/adaptive enhancement** như CLAHE.

> **Ví dụ:** Ảnh có cả vùng bầu trời sáng và vùng đất tối. Histogram Equalization toàn cục có thể làm bầu trời bị cháy sáng trong khi cố gắng làm sáng vùng đất.

---

# KHỚP HISTOGRAM (HISTOGRAM MATCHING)

**Mục tiêu:** Biến đổi ảnh đầu vào để histogram của nó **gần với một histogram mục tiêu**.

**Quy trình:**

1. Tính CDF của ảnh đầu vào sau equalization.
2. Tính CDF của ảnh mục tiêu sau equalization.
3. Tìm hàm ánh xạ từ CDF đầu vào sang CDF mục tiêu.
4. Áp dụng hàm ánh xạ lên ảnh đầu vào.

**Ứng dụng:**

- Chuẩn hóa ảnh.
- Xử lý ảnh y tế, ảnh vệ tinh.
- Các hệ thống cần đưa ảnh về một phân bố tham chiếu.

> **Ví dụ:** Trong y tế, các ảnh X-quang chụp ở các máy khác nhau có histogram khác nhau. Histogram Matching giúp đưa tất cả về cùng một phân bố để bác sĩ dễ so sánh.

---

# XỬ LÝ HISTOGRAM CỤC BỘ (LOCAL HISTOGRAM)

**Ý tưởng:** Thay vì tính histogram trên toàn ảnh, ta di chuyển một **cửa sổ nhỏ** qua ảnh và xử lý từng vùng lân cận.

**Kích thước cửa sổ:** $3\times3$, $5\times5$, $7\times7$, ...

**Tại mỗi vị trí:**

1. Xác định vùng lân cận.
2. Tính histogram cục bộ.
3. Thực hiện biến đổi (ví dụ: equalization).
4. Cập nhật pixel trung tâm.

**Ưu điểm:** Tăng cường chi tiết cục bộ.

**Nhược điểm:** Tốn chi phí tính toán, có thể khuếch đại nhiễu.

> **Ví dụ:** Trong ảnh có cả vùng sáng và tối, local histogram processing có thể tăng cường chi tiết ở cả hai vùng mà không làm ảnh hưởng lẫn nhau.

---

# CLAHE (CONTRAST LIMITED ADAPTIVE HISTOGRAM EQUALIZATION)

**Định nghĩa:** CLAHE là phương pháp tăng cường tương phản cục bộ có giới hạn.

**Quy trình:**

1. Chia ảnh thành các tile (ví dụ 8x8).
2. Tính histogram từng tile.
3. Giới hạn clipping (clip limit) để tránh khuếch đại nhiễu.
4. Equalization trên từng tile.
5. Nội suy giữa các tile để tránh biên cứng.

**So sánh với AHE (Adaptive HE):**

- AHE: Có thể khuếch đại nhiễu mạnh.
- CLAHE: Giới hạn mức khuếch đại histogram thông qua clip limit.

> **Ví dụ:** Trong ảnh nội tạng y tế, CLAHE giúp làm rõ chi tiết ở cả vùng sáng và tối mà không tạo ra nhiễu quá mức ở vùng đồng nhất.

---

# BÀI TẬP THỰC HÀNH - HISTOGRAM

```python
import cv2

eq = cv2.equalizeHist(img)
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
clahe_img = clahe.apply(img)
```

**Yêu cầu:**

- So sánh 3 ảnh: Original, Histogram Equalization, CLAHE.
- Vẽ histogram của cả ba ảnh.
- Nhận xét sự khác biệt về tương phản và nhiễu.

---
<!--_class: section-->

# BIẾN ĐỔI TRONG MIỀN TẦN SỐ

---

# TỔNG QUAN VỀ MIỀN TẦN SỐ

**Ý tưởng:** Ngoài việc xử lý trực tiếp trên pixel, ta có thể chuyển ảnh sang **miền tần số**.

**Mục tiêu:** Phân tích và xử lý ảnh dựa trên các thành phần tần số.

**Quy trình tổng quát:**

1. Ảnh trong miền không gian $f(x,y)$.
2. Biến đổi Fourier → Miền tần số $F(u,v)$.
3. Lọc trong miền tần số → $G(u,v)$.
4. Biến đổi Fourier ngược → Ảnh đã xử lý $g(x,y)$.

> **Ví dụ:** Giống như âm thanh có thể được phân tích thành các nốt nhạc với tần số khác nhau, ảnh cũng có thể được phân tích thành các thành phần tần số khác nhau.

---

# TẦN SỐ THẤP VÀ TẦN SỐ CAO

**Low Frequency (Tần số thấp):**

- Ảnh thay đổi chậm.
- Vùng nền, vùng tương đối đồng nhất.
- Biến thiên ánh sáng, các cấu trúc lớn.

**High Frequency (Tần số cao):**

- Ảnh thay đổi nhanh.
- Biên, chi tiết nhỏ, texture, nhiễu.

**Ghi nhớ:**

- Smooth region → Low frequency
- Sharp edge → High frequency

> **Ví dụ:** Vùng bầu trời xanh đồng nhất là tần số thấp. Đường biên giữa tóc và nền là tần số cao. Nhiễu muối tiêu cũng là tần số cao.

---

# BIẾN ĐỔI FOURIER

**Ý tưởng:** Một tín hiệu phức tạp có thể được biểu diễn bằng **tổng các thành phần hình sin/cosin** với các tần số khác nhau.

**Miền không gian:** Ảnh được biểu diễn bằng $f(x,y)$

**Miền tần số:** Ảnh được biểu diễn bằng $F(u,v)$

**Biến đổi Fourier:** $f(x,y) \rightarrow F(u,v)$

**Biến đổi Fourier ngược:** $F(u,v) \rightarrow f(x,y)$

> **Ví dụ:** Một bức ảnh có thể được xem như tổng của nhiều sóng sin 2D với tần số, biên độ và pha khác nhau. Biến đổi Fourier tách ảnh thành các thành phần sóng này.

---

# 2D DISCRETE FOURIER TRANSFORM (2D DFT)

**Công thức:** Với ảnh kích thước $M \times N$:
$$F(u,v) = \sum_{x=0}^{M-1} \sum_{y=0}^{N-1} f(x,y) \cdot e^{-j2\pi\left(\frac{ux}{M} + \frac{vy}{N}\right)}$$

Trong đó:
- $f(x,y)$: pixel trong miền không gian
- $F(u,v)$: thành phần tần số
- $(u,v)$: tọa độ tần số
- $j = \sqrt{-1}$

**Lưu ý:** Kết quả DFT là **giá trị phức**.

> **Ví dụ:** Với ảnh 256x256, DFT cho ta một ma trận 256x256 các số phức, mỗi phần tử biểu diễn một thành phần tần số.

---

# PHỔ FOURIER: MAGNITUDE VÀ PHASE

**Từ $F(u,v)$, ta có:**

**Magnitude** $|F(u,v)|$:
- Cho biết **độ mạnh** của thành phần tần số.

**Phase** $\angle F(u,v)$:
- Mô tả **quan hệ pha**, có vai trò quan trọng trong việc xác định cấu trúc và vị trí thông tin trong ảnh.

**Ghi nhớ:** $F(u,v) = |F(u,v)| \cdot e^{j\phi(u,v)}$

> **Ví dụ:** Nếu ta hoán đổi magnitude của ảnh này với phase của ảnh khác, kết quả sẽ trông giống ảnh có phase (vì phase chứa thông tin về vị trí các đặc trưng).

---

# FOURIER MAGNITUDE SPECTRUM

**Khi dịch phổ để thành phần DC nằm ở giữa:**

**Tại tâm (DC component):**

- Tần số thấp nhất.
- Liên quan đến mức sáng trung bình của ảnh.

**Càng xa tâm:**

- Tần số càng cao.
- Chi tiết nhanh, biên, texture, nhiễu.

> **Ví dụ:** Trong phổ Fourier của ảnh khuôn mặt, tâm phổ sáng (DC) thể hiện độ sáng trung bình, các điểm sáng xa tâm thể hiện các chi tiết như mắt, mũi, miệng.

---

# CÁC TÍNH CHẤT CỦA 2D DFT

**Tính tuần hoàn:** DFT có tính tuần hoàn theo miền tần số.

**Đối xứng liên hợp:** Với ảnh thực: $F(-u,-v) = F^*(u,v)$

**Tính phân tách (Separability):** 2D DFT có thể thực hiện bằng:
1. DFT theo hàng.
2. DFT theo cột.

**Tính dịch chuyển:** Dịch ảnh trong miền không gian làm thay đổi phase, nhưng **không làm thay đổi magnitude**.

> **Ví dụ:** Nhờ tính phân tách, 2D FFT của ảnh 1024x1024 chỉ cần thực hiện 2048 phép FFT 1D kích thước 1024, nhanh hơn nhiều so với tính trực tiếp.

---

# TỪ SPATIAL FILTER ĐẾN FREQUENCY FILTER

| Miền không gian | Miền tần số |
| --- | --- |
| Mean Filter | Low-pass |
| Gaussian Filter | Gaussian LPF |
| Sharpening | High-pass |
| Laplacian | Laplacian frequency filter |
| Unsharp Masking | High-frequency emphasis |

**Ý tưởng cốt lõi:** Lọc trong hai miền là **hai cách biểu diễn khác nhau** của cùng một bài toán xử lý tín hiệu.

> **Ví dụ:** Bộ lọc Mean trong miền không gian (tính trung bình các pixel lân cận) tương đương với bộ lọc Low-pass trong miền tần số (giữ tần số thấp, loại tần số cao).

---

# ĐỊNH LÝ TÍCH CHẬP (CONVOLUTION THEOREM)

**Phát biểu:** Trong điều kiện phù hợp:
$$f(x,y) * h(x,y) \Longleftrightarrow F(u,v) \cdot H(u,v)$$

**Nghĩa là:** Tích chập trong miền không gian tương ứng với **phép nhân** trong miền tần số.

**Quy trình:**

1. Ảnh $f$ → Fourier → $F$
2. Kernel $h$ → Fourier → $H$
3. Nhân: $G = F \times H$
4. IFFT → $g$

**Ý nghĩa:** Cho phép thực hiện một số phép lọc lớn hiệu quả hơn bằng FFT.

> **Ví dụ:** Với kernel lớn 100x100, tích chập trong miền không gian cần 10.000 phép nhân cho mỗi pixel. Trong miền tần số, chỉ cần một phép nhân sau khi FFT.

---

# QUY TRÌNH LỌC TRONG MIỀN TẦN SỐ

**Các bước:**

1. Ảnh đầu vào $f(x,y)$.
2. FFT → $F(u,v)$.
3. Dịch tâm phổ (fftshift).
4. Tạo filter $H(u,v)$.
5. Nhân: $G(u,v) = H(u,v) \cdot F(u,v)$.
6. Dịch ngược phổ (ifftshift).
7. IFFT → $g(x,y)$.
8. Hậu xử lý kết quả (lấy phần thực, chuẩn hóa).

> **Ví dụ:** Để làm mờ ảnh bằng Gaussian LPF trong miền tần số, ta tạo một mask Gaussian ở tâm phổ, nhân với phổ, rồi IFFT để có ảnh mờ.

---
<!--_class: section-->

# LỌC THÔNG THẤP (LOW-PASS FILTER)

---

# KHÁI NIỆM LOW-PASS FILTER

**Mục tiêu:** Giữ các thành phần **tần số thấp** và loại bỏ/giảm các thành phần **tần số cao**.

**Hiệu ứng:**

- Làm mịn, làm mờ ảnh.
- Giảm nhiễu.
- Giảm chi tiết nhỏ.

**Trong phổ đã dịch tâm:**

- Vùng trung tâm (tần số thấp) được giữ lại.
- Vùng biên (tần số cao) bị loại bỏ.

> **Ví dụ:** Khi áp dụng LPF lên ảnh có nhiễu, các chấm nhiễu (tần số cao) bị loại bỏ, ảnh trở nên mượt mà hơn nhưng cũng mờ hơn.

---

# IDEAL LOW-PASS FILTER

**Công thức:**
$$H(u,v) = \begin{cases} 1, & D(u,v) \leq D_0 \\ 0, & D(u,v) > D_0 \end{cases}$$

Trong đó: $D(u,v) = \sqrt{(u-u_0)^2 + (v-v_0)^2}$

$D_0$: bán kính cắt.

**Đặc điểm:**

- Cắt tần số đột ngột.
- Dễ hiểu và dễ cài đặt.
- Có thể gây **ringing** (hiệu ứng gợn sóng) do biên chuyển tiếp quá đột ngột.

> **Ví dụ:** Ideal LPF với $D_0 = 30$ sẽ giữ nguyên tất cả các thành phần tần số trong bán kính 30 từ tâm, và loại bỏ hoàn toàn các thành phần ngoài bán kính này.

---

# GAUSSIAN LOW-PASS FILTER

**Công thức:**
$$H(u,v) = e^{-\frac{D^2(u,v)}{2\sigma^2}}$$

**Đặc điểm:**

- Suy giảm **mượt** theo khoảng cách.
- Không có biên cắt đột ngột.
- Giảm ringing so với Ideal LPF.

**Tham số:** $\sigma \uparrow \Rightarrow$ lọc mạnh hơn (bán kính hiệu dụng lớn hơn).

> **Ví dụ:** Gaussian LPF với $\sigma = 20$ cho chuyển tiếp mượt từ tâm ra biên, không gây hiệu ứng ringing như Ideal LPF.

---

# BUTTERWORTH LOW-PASS FILTER

**Công thức:**
$$H(u,v) = \frac{1}{1 + \left(\frac{D(u,v)}{D_0}\right)^{2n}}$$

Trong đó:
- $D_0$: tần số cắt.
- $n$: bậc của bộ lọc.

**Đặc điểm:**

- Chuyển tiếp giữa vùng cho qua và vùng chặn **có thể điều chỉnh**.
- $n$ càng lớn → chuyển tiếp càng dốc.
- Nằm giữa Gaussian và Ideal về độ sắc của vùng chuyển tiếp.

> **Ví dụ:** Butterworth LPF bậc 2 cho chuyển tiếp mềm, bậc 10 cho chuyển tiếp gần như Ideal LPF.

---

# SO SÁNH CÁC LOW-PASS FILTER

| Filter | Chuyển tiếp | Ringing | Điều chỉnh |
| --- | --- | --- | --- |
| **Ideal** | Đột ngột | Cao | $D_0$ |
| **Gaussian** | Mượt | Rất thấp | $\sigma$ |
| **Butterworth** | Điều chỉnh được | Trung gian | $D_0, n$ |

**Ghi nhớ:** Càng cắt tần số đột ngột → càng có nguy cơ ringing.

> **Ví dụ minh họa:** Khi làm mờ ảnh văn bản, Ideal LPF có thể tạo ra các gợn sóng quanh chữ, trong khi Gaussian LPF cho kết quả mượt mà hơn.

---
<!--_class: section-->

# LỌC THÔNG CAO (HIGH-PASS FILTER)

---

# KHÁI NIỆM HIGH-PASS FILTER

**Mục tiêu:** Giữ các thành phần **tần số cao** và loại bỏ/giảm các thành phần **tần số thấp**.

**Ứng dụng:**

- Làm nét ảnh.
- Tăng cường biên.
- Tăng cường chi tiết.

**Trong phổ đã dịch tâm:**

- Vùng trung tâm (tần số thấp, DC) bị loại bỏ.
- Vùng biên (tần số cao) được giữ lại.

> **Ví dụ:** Khi áp dụng HPF lên ảnh, các vùng đồng nhất (bầu trời, tường) trở nên tối, trong khi các đường biên (chữ, đường kẻ) được làm nổi bật.

---

# HPF VÀ THÀNH PHẦN DC

**Thành phần DC** nằm tại trung tâm phổ, đại diện cho mức sáng trung bình.

**Với high-pass filter:** $H(0,0) \approx 0$

→ Thành phần liên quan đến mức sáng trung bình bị loại bỏ.

**Kết quả sau IFFT có thể:**

- Tối.
- Mang giá trị âm.
- Cần chuẩn hóa để hiển thị.

**Khi cần giữ độ sáng:**

- Sử dụng Offset.
- High-frequency emphasis.
- Các phương pháp sharpening thích hợp.

> **Ví dụ:** Ảnh sau khi áp dụng HPF thuần túy thường có nền đen với các đường biên trắng. Để giữ độ sáng gốc, ta cần thêm thành phần DC trở lại.

---

# TOÁN TỬ LAPLACIAN TRONG MIỀN TẦN SỐ

**Tính chất Fourier của Laplacian:**
$$\mathcal{F}\{\nabla^2 f\} = -4\pi^2(u^2 + v^2)F(u,v)$$

Nếu đặt $D^2 = u^2 + v^2$ thì thành phần Laplacian tỷ lệ với: $-D^2 F(u,v)$

**Ý nghĩa:**

- Khi $D$ tăng → $D^2 \uparrow$ → thành phần tần số cao được khuếch đại mạnh hơn.
- Laplacian trong miền tần số chính là một bộ lọc high-pass.

> **Ví dụ:** Bộ lọc Laplacian trong miền tần số có dạng cái bát úp, với giá trị 0 tại tâm (DC) và tăng dần khi ra xa tâm.

---

# HIGH-FREQUENCY EMPHASIS

**Vấn đề:** Nếu chỉ dùng HPF, chi tiết được giữ nhưng thành phần tần số thấp bị loại bỏ → độ sáng tổng thể có thể bị mất.

**Giải pháp:**
$$H_{hfe}(u,v) = a + b \cdot H_{hp}(u,v)$$

với $a > 0, b > 0$

**Ý nghĩa:**

- $a$: giữ lại thành phần nền (tần số thấp).
- $b$: điều chỉnh mức tăng cường high-frequency.

> **Ví dụ:** Với $a = 0.5, b = 1.5$, ta giữ lại 50% thành phần tần số thấp và khuếch đại 150% thành phần tần số cao, cho ảnh vừa sáng vừa sắc nét.

---
<!--_class: section-->

# LỌC CHỌN LỌC

---

# BAND-PASS VÀ BAND-REJECT FILTER

**Band-pass Filter:**

- Chỉ giữ một khoảng tần số: $D_1 \leq D \leq D_2$.
- **Ứng dụng:** Tách các cấu trúc theo scale, phân tích texture.

**Band-reject Filter:**

- Loại bỏ một khoảng tần số: $D_1 < D < D_2$.
- **Ứng dụng:** Loại bỏ một dải nhiễu cụ thể, xử lý nhiễu tuần hoàn.

> **Ví dụ:** Ảnh chụp qua lưới sắt có nhiễu tuần hoàn ở một tần số cụ thể. Band-reject filter chỉ loại bỏ đúng dải tần số đó, giữ lại phần còn lại của ảnh.

---

# NOTCH FILTER

**Định nghĩa:** Notch filter tác động vào một hoặc một số **vùng tần số rất cụ thể**.

**Đặc biệt hữu ích với:** Periodic noise (nhiễu tuần hoàn).

**Quy trình:**

1. Ảnh có nhiễu tuần hoàn.
2. Biến đổi Fourier.
3. Phát hiện các đỉnh bất thường trong phổ.
4. Thiết kế Notch Filter tại các vị trí đỉnh.
5. Biến đổi Fourier ngược.
6. Ảnh giảm nhiễu.

> **Ví dụ:** Ảnh chụp từ camera an ninh bị nhiễu vân (moiré pattern) do interference với màn hình. Các đỉnh nhiễu xuất hiện đối xứng trong phổ Fourier và có thể loại bỏ bằng Notch Filter.

---

# NHIỄU TUẦN HOÀN TRONG MIỀN TẦN SỐ

**Đặc điểm:** Nhiễu tuần hoàn trong miền không gian thường tạo ra các **đỉnh sáng đối xứng** trong Fourier spectrum.

**Vị trí các đỉnh:** Đối xứng qua tâm phổ.

**Cách xử lý:**

- Tìm nhiễu trong miền tần số.
- Loại bỏ đúng vùng tần số tương ứng.
- Khôi phục ảnh.

> **Ví dụ:** Ảnh scan từ báo giấy có các đường sọc ngang do cảm biến máy scan. Trong phổ Fourier, các đường sọc này tạo ra các đỉnh sáng ở vị trí cụ thể, và Notch Filter có thể loại bỏ chúng.

---
<!--_class: section-->

# FAST FOURIER TRANSFORM (FFT)

---

# KHÁI NIỆM FFT

**Fast Fourier Transform (FFT)** là thuật toán hiệu quả để tính DFT.

**Độ phức tạp:**

- DFT trực tiếp: $O(N^2)$
- FFT: $O(N \log N)$

**Ý tưởng:** Sử dụng chiến lược **Divide and Conquer**:

1. Chia DFT lớn thành nhiều DFT nhỏ.
2. Tính toán các DFT nhỏ.
3. Kết hợp kết quả.

> **Ví dụ:** Với ảnh 1024x1024, DFT trực tiếp cần khoảng 1 tỷ phép tính, trong khi FFT chỉ cần khoảng 10 triệu phép tính - nhanh hơn 100 lần.

---

# FFT 2D CHO ẢNH

**2D FFT có thể thực hiện bằng:**

1. FFT từng hàng.
2. FFT từng cột.

Đây là hệ quả của **tính separability** của DFT.

**Trong Python:**
```python
F = np.fft.fft2(img)
F_shift = np.fft.fftshift(F)
```

> **Ví dụ:** Thay vì tính 2D DFT trực tiếp với độ phức tạp $O(N^4)$, ta thực hiện $2N$ phép FFT 1D kích thước $N$, giảm xuống còn $O(N^2 \log N)$.

---

# HIỂN THỊ FOURIER SPECTRUM

**Vấn đề:** Magnitude có dynamic range rất lớn.

**Giải pháp:** Sử dụng biến đổi log:
$$S(u,v) = \log(1 + |F(u,v)|)$$

**Trong Python:**
```python
spectrum = np.log(1 + np.abs(F_shift))
```

**Mục đích:**

- Làm rõ các thành phần tần số yếu.
- Giúp quan sát Fourier spectrum dễ hơn.

> **Ví dụ:** Không có biến đổi log, ta chỉ thấy một điểm sáng lớn ở tâm phổ và không thấy gì ở vùng biên. Với log, ta có thể thấy cả các thành phần tần số cao ở xa tâm.

---

# BÀI TẬP THỰC HÀNH - FFT + LOW-PASS

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread("input.jpg", cv2.IMREAD_GRAYSCALE)
F = np.fft.fft2(img)
F_shift = np.fft.fftshift(F)
rows, cols = img.shape
crow, ccol = rows // 2, cols // 2
y, x = np.ogrid[:rows, :cols]
D = np.sqrt((x - ccol)**2 + (y - crow)**2)
D0 = 50
mask = (D <= D0).astype(np.float32)
F_filtered = F_shift * mask
F_ishift = np.fft.ifftshift(F_filtered)
result = np.fft.ifft2(F_ishift)
result = np.abs(result)
```

---

# PHÂN TÍCH KẾT QUẢ LỌC TẦN SỐ

**Hiển thị:** Original | Fourier Spectrum | After LPF

**Quan sát:**

- Chi tiết nào bị mất?
- Biên thay đổi như thế nào?
- Khi giảm $D_0$, ảnh thay đổi ra sao?
- Khi tăng $D_0$, ảnh thay đổi ra sao?

**Kết luận:**
$$D_0 \downarrow \Rightarrow \text{lọc mạnh hơn} \Rightarrow \text{ảnh mờ hơn}$$

> **Ví dụ:** Với $D_0 = 20$, ảnh trở nên rất mờ, chỉ còn thấy các khối màu lớn. Với $D_0 = 100$, ảnh chỉ hơi mờ và vẫn giữ được nhiều chi tiết.

---
<!--_class: section-->

# QUY TRÌNH TỔNG QUÁT

---

# CÁC BƯỚC XỬ LÝ ẢNH TRONG MIỀN TẦN SỐ

1. **Tiền xử lý:** Đọc ảnh, chuyển grayscale nếu cần, padding khi cần để giảm ảnh hưởng biên.
2. **Fourier Transform:** $f(x,y) \rightarrow F(u,v)$
3. **Dịch tâm:** Đưa DC component về trung tâm.
4. **Filtering:** $G(u,v) = H(u,v) \cdot F(u,v)$
5. **Dịch ngược:** Đưa phổ về vị trí ban đầu.
6. **IFFT:** $G(u,v) \rightarrow g(x,y)$
7. **Hậu xử lý:** Lấy phần thực, chuẩn hóa/clipping, cắt padding nếu đã thêm.

> **Ví dụ:** Khi áp dụng LPF, bước padding giúp tránh hiện tượng biên ảnh bị wrap-around (hiệu ứng cuộn) do tính tuần hoàn của DFT.

---

# SO SÁNH SPATIAL DOMAIN VÀ FREQUENCY DOMAIN

|  | Spatial Domain | Frequency Domain |
| --- | --- | --- |
| **Làm việc với** | Pixel | Frequency components |
| **Thao tác** | Trực tiếp | Sau Fourier Transform |
| **Kernel nhỏ** | Hiệu quả | Có thể không cần thiết |
| **Kernel lớn** | Có thể tốn chi phí | FFT có lợi |
| **Nhiễu tuần hoàn** | Khó xử lý trực tiếp | Rất phù hợp |
| **Trực quan** | Dễ hiểu | Khó hơn |
| **Công cụ** | OpenCV filters | FFT + frequency mask |

**Ghi nhớ:** Không có miền nào luôn tốt hơn. Lựa chọn miền xử lý phụ thuộc vào bài toán.

> **Ví dụ:** Với kernel 3x3, spatial filtering nhanh hơn. Với kernel 100x100, frequency filtering qua FFT nhanh hơn. Với nhiễu tuần hoàn, frequency domain là lựa chọn duy nhất hiệu quả.

---
<!--_class: section-->

# TỔNG KẾT CHƯƠNG 2

---

# TÓM TẮT CHƯƠNG 2

**Spatial Domain:**

- **Point Processing:** $g = T(f)$ - Negative, Log, Gamma, Piecewise-linear
- **Neighborhood Processing:** Mean, Gaussian, Median, Sobel, Laplacian, Unsharp, Highboost
- **Histogram:** Histogram, Equalization, Matching, Local processing, CLAHE

**Frequency Domain:**

- $f \xrightarrow{FFT} F \xrightarrow{H} G \xrightarrow{IFFT} g$
- Fourier Transform, Magnitude / Phase
- LPF, HPF, Band-pass / Band-reject, Notch
- FFT

> **Sơ đồ tư duy:** Biến đổi ảnh chia thành hai nhánh lớn - Spatial Domain (xử lý trực tiếp trên pixel) và Frequency Domain (xử lý qua biến đổi Fourier), với Histogram là công cụ phân tích hỗ trợ cả hai miền.

---

# KIẾN THỨC CẦN GHI NHỚ

1. **Point processing:** Mỗi pixel được xử lý độc lập.
2. **Spatial filtering:** Giá trị pixel mới phụ thuộc vào vùng lân cận.
3. **Smoothing:** Giảm high-frequency → giảm chi tiết và nhiễu.
4. **Sharpening:** Tăng high-frequency → tăng biên và chi tiết.
5. **Histogram:** Mô tả phân bố cường độ, nhưng không chứa thông tin vị trí.
6. **Fourier Transform:** Chuyển cách nhìn từ pixel sang frequency components.
7. **Frequency filtering:** Thay đổi các thành phần tần số để thay đổi đặc tính ảnh.

> **Thông điệp cuối chương:** Hiểu rõ hai miền biểu diễn ảnh và mối liên hệ giữa chúng là nền tảng để lựa chọn phương pháp xử lý phù hợp cho từng bài toán cụ thể trong thực tế.