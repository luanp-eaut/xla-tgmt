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

1. Tổng quan
2. Biến đổi trong miền không gian
   - Biến đổi cường độ
   - Lọc không gian
3. Histogram
4. Biến đổi trong miền tần số

---

# MỤC TIÊU HỌC TẬP

Sau khi hoàn thành chương này, sinh viên có thể:

* Phân biệt được **miền không gian** và **miền tần số** trong xử lý ảnh, hiểu rõ mỗi miền biểu diễn ảnh theo cách nào và phù hợp với những bài toán nào.
* Thực hiện được các phép **biến đổi cường độ** để tăng cường ảnh, bao gồm các phép biến đổi điểm cơ bản như âm bản, log, gamma và biến đổi hàm bậc thang.
* Hiểu và áp dụng được các **bộ lọc không gian** để làm mịn và làm nét ảnh, từ các bộ lọc tuyến tính như mean, Gaussian đến các bộ lọc phi tuyến như median.
* Phân tích và xử lý ảnh dựa trên **Histogram**, bao gồm cân bằng histogram, khớp histogram, xử lý cục bộ và CLAHE.
* Hiểu được nguyên lý của **biến đổi Fourier 2D** và ý nghĩa của phổ tần số trong xử lý ảnh.
* Thực hiện được lọc ảnh trong **miền tần số**, bao gồm lọc thông thấp, thông cao, band-pass, band-reject và notch filter.
* Sử dụng được **Python, NumPy, OpenCV và Matplotlib** để cài đặt các kỹ thuật cơ bản trong chương này.

---
<!--_class: section-->

# TỔNG QUAN

---

# NỘI DUNG

### 1. Biến đổi trong miền không gian

Phần này tập trung vào các kỹ thuật xử lý ảnh trực tiếp trên các pixel. Nội dung bao gồm hai nhóm chính là **Point Processing** – xử lý từng pixel độc lập, và **Neighborhood Processing** – xử lý dựa trên vùng lân cận của pixel.

### 2. Biến đổi cường độ

Các phép biến đổi cường độ cơ bản sẽ được trình bày, bao gồm **Negative**, **Log**, **Gamma** và **Piecewise-Linear**. Đây là những kỹ thuật nền tảng giúp thay đổi độ sáng, độ tương phản và làm nổi bật thông tin trong ảnh.

### 3. Lọc không gian

Phần lọc không gian giới thiệu các bộ lọc làm mịn và làm nét ảnh. Các bộ lọc làm mịn tiêu biểu gồm **Mean**, **Gaussian** và **Median**. Các bộ lọc làm nét gồm **Sobel**, **Laplacian**, **Unsharp Masking** và **Highboost Filtering**.

### 4. Xử lý Histogram

Histogram là công cụ quan trọng để phân tích và tăng cường ảnh. Nội dung bao gồm **Histogram**, **Histogram Equalization**, **Histogram Matching**, **Local Histogram** và **CLAHE**.

### 5. Biến đổi trong miền tần số

Phần cuối của chương giới thiệu cách biểu diễn và xử lý ảnh trong miền tần số, bao gồm **Fourier Transform**, **Frequency Spectrum**, **Frequency-domain Filtering**, **LPF / HPF**, **Selective Filtering** và **FFT**.

---

# XỬ LÝ ẢNH: HAI MIỀN BIỂU DIỄN

### Miền không gian — Spatial Domain

Trong miền không gian, ta làm việc **trực tiếp trên pixel** của ảnh. Mỗi pixel được xem xét với vị trí và giá trị cường độ của nó. Câu hỏi trung tâm ở đây là: **Pixel nằm ở đâu và có giá trị bao nhiêu?**

Các kỹ thuật tiêu biểu trong miền không gian bao gồm:

* Biến đổi cường độ
* Mean Filter
* Gaussian Filter
* Median Filter
* Sobel
* Laplacian

### Miền tần số — Frequency Domain

Trong miền tần số, ảnh được biểu diễn bằng các **thành phần tần số**. Thay vì quan tâm đến từng pixel, ta quan tâm đến mức độ thay đổi nhanh hay chậm của cường độ trên toàn ảnh. Câu hỏi trung tâm là: **Ảnh thay đổi nhanh hay chậm?**

Các kỹ thuật tiêu biểu trong miền tần số bao gồm:

* Fourier Transform
* Low-pass Filter
* High-pass Filter
* Band-reject / Notch Filter

---

# PHẦN II — BIẾN ĐỔI TRONG MIỀN KHÔNG GIAN

---

# BIẾN ĐỔI TRONG MIỀN KHÔNG GIAN

**Spatial-domain processing**

Miền không gian chính là mặt phẳng ảnh, trong đó các phương pháp xử lý tác động trực tiếp lên các pixel. Đây là cách tiếp cận tự nhiên nhất vì ảnh vốn được biểu diễn dưới dạng ma trận các pixel.

Có hai nhóm chính trong xử lý ảnh miền không gian:

```text
Spatial-domain Processing
          │
     ┌────┴────┐
     │         │
   Point    Neighborhood
Processing   Processing
     │         │
Intensity    Spatial
Transform    Filtering
```

Nhóm thứ nhất là **Point Processing** – xử lý từng pixel một cách độc lập. Nhóm thứ hai là **Neighborhood Processing** – xử lý dựa trên mối quan hệ giữa pixel trung tâm và các pixel lân cận.

---

# PHÂN LOẠI XỬ LÝ TRONG MIỀN KHÔNG GIAN

### Point Processing

Trong Point Processing, giá trị pixel đầu ra chỉ phụ thuộc vào **pixel tương ứng ở ảnh đầu vào**. Mỗi pixel được biến đổi độc lập, không quan tâm đến các pixel xung quanh.

$$
g(x,y)=T[f(x,y)]
$$

Ví dụ:

* Negative
* Log
* Gamma
* Contrast stretching

### Neighborhood Processing

Trong Neighborhood Processing, giá trị pixel đầu ra phụ thuộc vào **một vùng lân cận** quanh pixel đó. Kết quả tại một vị trí không chỉ phụ thuộc vào pixel tại vị trí đó mà còn phụ thuộc vào các pixel xung quanh.

$$
g(x,y)=T\{f(s,t)\mid(s,t)\in N(x,y)\}
$$

Ví dụ:

* Mean Filter
* Gaussian Filter
* Median Filter
* Sobel
* Laplacian

---

# BIẾN ĐỔI CƯỜNG ĐỘ

**Intensity Transformation**

Biến đổi cường độ là kỹ thuật **point processing**. Điều này có nghĩa là mỗi pixel được biến đổi độc lập dựa trên giá trị cường độ của chính nó, không phụ thuộc vào các pixel lân cận.

Công thức tổng quát:

$$
s=T(r)
$$

Trong đó:

* \(r\): cường độ pixel đầu vào.
* \(s\): cường độ pixel đầu ra.
* \(T\): hàm biến đổi.

Mục đích của biến đổi cường độ bao gồm:

* Thay đổi độ sáng của ảnh.
* Tăng hoặc giảm tương phản.
* Làm nổi bật vùng ảnh quan tâm.
* Điều chỉnh ảnh phù hợp với thiết bị hiển thị hoặc bước xử lý tiếp theo.

---

# ẢNH ÂM BẢN

**Image Negative**

Ảnh âm bản là phép biến đổi cường độ đơn giản nhất. Công thức:

$$
s=L-1-r
$$

Với ảnh 8-bit:

$$
s=255-r
$$

Đặc điểm:

* Pixel sáng → pixel tối.
* Pixel tối → pixel sáng.
* Đảo ngược thứ tự các mức cường độ.

### Ứng dụng

* Làm nổi bật chi tiết sáng trong vùng tối.
* Ảnh X-quang và ảnh y tế.
* Một số ảnh phim âm bản.

---

# BIẾN ĐỔI LOGARITHM

**Log Transformation**

Công thức:

$$
s=c\log(1+r)
$$

Đặc điểm:

* **Mở rộng** vùng giá trị cường độ thấp.
* **Nén** vùng giá trị cường độ cao.

Do đó, các chi tiết trong vùng tối có thể được làm nổi bật. Đây là đặc tính rất hữu ích khi ảnh có dải động lớn, tức là chênh lệch giữa vùng sáng nhất và tối nhất quá lớn.

### Ứng dụng

* Hiển thị các giá trị có dynamic range lớn.
* Hiển thị **Fourier magnitude spectrum**.
* Làm nổi bật thông tin trong vùng cường độ thấp.

---

# BIẾN ĐỔI LŨY THỪA / GAMMA

**Power-Law / Gamma Transformation**

Công thức:

$$
s=cr^\gamma
$$

với \(r\) thường được chuẩn hóa về \([0,1]\).

### Ảnh hưởng của \(\gamma\)

* \(\gamma<1\): mở rộng vùng tối, nén vùng sáng.
* \(\gamma=1\): biến đổi tuyến tính.
* \(\gamma>1\): nén vùng tối, mở rộng vùng sáng.

### Ứng dụng

* Hiệu chỉnh gamma.
* Điều chỉnh ảnh theo đặc tính thiết bị hiển thị.
* Tiền xử lý ảnh.

---

# ẢNH HƯỞNG CỦA THAM SỐ GAMMA

```text
Output
255 │                 γ < 1
    │             ___/
    │          __/
    │       __/       γ = 1
    │     _/        /
    │   _/        /
    │ _/        /
  0 └──────────────────── Input
    0                    255
```

### Ghi nhớ

$$
\gamma<1 \Rightarrow \text{ảnh sáng hơn}
$$

$$
\gamma>1 \Rightarrow \text{ảnh tối hơn}
$$

**Lưu ý:** Hiệu ứng cụ thể phụ thuộc cách chuẩn hóa và hệ số \(c\).

---

# BIẾN ĐỔI HÀM BẬC THANG

**Piecewise-Linear Transformation**

Thay vì sử dụng một hàm duy nhất trên toàn bộ dải cường độ, ta chia dải giá trị thành nhiều đoạn. Mỗi đoạn có thể có một hàm biến đổi riêng, cho phép kiểm soát cường độ theo **từng khoảng giá trị**.

$$
s=
\begin{cases}
T_1(r), & r<r_1\\
T_2(r), & r_1\le r\le r_2\\
T_3(r), & r>r_2
\end{cases}
$$

Các kỹ thuật tiêu biểu:

* Contrast Stretching
* Gray-Level Slicing
* Bit-Plane Slicing

---

# TĂNG CƯỜNG ĐỘ TƯƠNG PHẢN

**Contrast Stretching**

Mục tiêu:

> Mở rộng khoảng giá trị cường độ của ảnh để tăng sự khác biệt giữa các vùng sáng và tối.

Ví dụ:

Ảnh đầu vào:

$$
r\in[r_1,r_2]
$$

được ánh xạ sang:

$$
s\in[s_1,s_2]
$$

Trong trường hợp tuyến tính:

$$
s=
\frac{s_2-s_1}{r_2-r_1}(r-r_1)+s_1
$$

### Ứng dụng

* Ảnh có tương phản thấp.
* Ảnh bị mờ do điều kiện chiếu sáng.
* Tiền xử lý trước các bước phân tích ảnh.

---

# CẮT MỨC XÁM

**Gray-Level Slicing**

Mục tiêu:

> Làm nổi bật một khoảng mức xám quan tâm.

Ví dụ:

```text
Input intensity

0 ─────────── a █████ b ─────────── 255
              │       │
              └─ ROI ─┘
```

Có thể:

* Giữ nguyên các mức xám ngoài khoảng.
* Hoặc đưa toàn bộ vùng ngoài khoảng về một giá trị.

### Ứng dụng

* Làm nổi bật cấu trúc trong ảnh y tế.
* Phân tích vật thể có khoảng cường độ đặc trưng.

---

# TRÍCH XUẤT MẶT PHẲNG BIT

**Bit-Plane Slicing**

Pixel 8-bit có thể biểu diễn:

$$
b_7b_6b_5b_4b_3b_2b_1b_0
$$

Trong đó:

* \(b_7\): Most Significant Bit — MSB.
* \(b_0\): Least Significant Bit — LSB.

Ảnh có thể được phân tách thành **8 bit-plane**.

### Ý nghĩa

* Bit cao → đóng góp lớn vào cấu trúc và độ sáng.
* Bit thấp → thường chứa chi tiết nhỏ và có thể chứa nhiễu.

### Ứng dụng

* Phân tích cấu trúc ảnh.
* Nghiên cứu nén ảnh.
* Phân tích thông tin bit.

---

# BÀI TẬP THỰC HÀNH

Sử dụng Python + OpenCV:

1. Đọc ảnh grayscale.
2. Tạo ảnh âm bản.
3. Thực hiện Gamma Transformation với:

   * \(\gamma=0.5\)
   * \(\gamma=1.0\)
   * \(\gamma=2.0\)
4. So sánh kết quả.
5. Vẽ đồ thị hàm biến đổi \(T(r)\).

**Yêu cầu:** Giải thích tại sao các giá trị gamma khác nhau tạo ra kết quả khác nhau.

---
<!--_class: section-->
# LỌC KHÔNG GIAN

---

# LỌC KHÔNG GIAN

**Spatial Filtering**

Lọc không gian là kỹ thuật thay đổi giá trị pixel dựa trên **các pixel trong vùng lân cận**. Thay vì chỉ xem xét một pixel đơn lẻ, bộ lọc không gian xem xét một tập hợp các pixel xung quanh để tính toán giá trị mới cho pixel trung tâm.

Cơ chế:

```text
        Neighborhood
       ┌─────────────┐
       │  •  •  •    │
       │  •  X  •    │ → Kernel
       │  •  •  •    │
       └─────────────┘
              │
              ▼
        Output pixel
```

Kernel được dịch chuyển qua toàn bộ ảnh. Tại mỗi vị trí, kernel được áp dụng lên vùng lân cận tương ứng để tạo ra giá trị pixel đầu ra.

---

# KERNEL / MASK

Với kernel \(w(s,t)\):

$$
g(x,y)=
\sum_s\sum_t
w(s,t)f(x-s,y-t)
$$

Trong đó:

* \(f(x,y)\): ảnh đầu vào.
* \(w(s,t)\): kernel.
* \(g(x,y)\): ảnh đầu ra.

Kích thước kernel thường là số lẻ:

$$
3\times3,\quad5\times5,\quad7\times7
$$

để xác định rõ pixel trung tâm. Kernel càng lớn thì vùng ảnh hưởng càng rộng, nhưng chi phí tính toán cũng tăng lên.

---

# PHÂN LOẠI BỘ LỌC KHÔNG GIAN

### Smoothing Filters

**Làm mịn / Low-pass**

* Giảm nhiễu.
* Làm mờ.
* Giảm chi tiết nhỏ.
* Làm giảm các thay đổi cường độ nhanh.

### Sharpening Filters

**Làm nét / High-pass**

* Tăng cường chi tiết.
* Làm nổi bật biên.
* Tăng các thay đổi cường độ nhanh.

---

# BỘ LỌC TRUNG BÌNH

**Mean / Box Filter**

Trong bộ lọc trung bình, tất cả pixel trong kernel có trọng số như nhau. Với kernel \(m\times n\):

$$
w(i,j)=\frac{1}{mn}
$$

Ví dụ kernel 3×3:

$$
\frac{1}{9}
\begin{bmatrix}
1&1&1\\
1&1&1\\
1&1&1
\end{bmatrix}
$$

### Đặc điểm

* Đơn giản.
* Tính toán nhanh.
* Làm mờ ảnh.
* Có thể làm mất biên và chi tiết.
* Nhạy với nhiễu salt-and-pepper.

---

# BỘ LỌC GAUSSIAN

Trọng số kernel tuân theo phân phối Gaussian.

$$
G(x,y)=
\frac{1}{2\pi\sigma^2}
e^{-\frac{x^2+y^2}{2\sigma^2}}
$$

Đặc điểm:

* Pixel gần tâm có trọng số lớn hơn.
* Pixel càng xa tâm có trọng số nhỏ hơn.
* \(\sigma\) kiểm soát mức độ làm mờ.

### Ưu điểm

* Làm mờ tự nhiên.
* Giảm nhiễu tốt.
* Thường được sử dụng trước các thuật toán phát hiện biên.

---

# BỘ LỌC TRUNG VỊ

**Median Filter**

Bộ lọc trung vị thay giá trị pixel trung tâm bằng **trung vị** của các pixel trong vùng lân cận.

Ví dụ:

```text
10   12   11
 9  255   10
11   13   12
```

Sắp xếp:

```text
9, 10, 10, 11, 11, 12, 12, 13, 255
```

Median:

$$
11
$$

### Ưu điểm

* Hiệu quả với **salt-and-pepper noise**.
* Bảo toàn biên tốt hơn nhiều bộ lọc trung bình trong trường hợp phù hợp.

---

# TỔNG HỢP CÁC BỘ LỌC LÀM MỊN

| Tiêu chí        | Mean            | Gaussian               | Median         |
| --------------- | --------------- | ---------------------- | -------------- |
| Nguyên lý       | Trung bình      | Trung bình có trọng số | Trung vị       |
| Loại            | Tuyến tính      | Tuyến tính             | Phi tuyến      |
| Làm mờ          | Mạnh            | Tự nhiên               | Tùy dữ liệu    |
| Salt-and-pepper | Kém             | Kém                    | Tốt            |
| Bảo toàn biên   | Kém             | Tốt hơn Mean           | Tốt            |
| Tốc độ          | Nhanh           | Nhanh                  | Chậm hơn       |
| Ứng dụng        | Làm mờ đơn giản | Tiền xử lý             | Khử nhiễu xung |

---

# BÀI TẬP THỰC HÀNH

```python
import cv2
import matplotlib.pyplot as plt

img = cv2.imread(
    "input.jpg",
    cv2.IMREAD_GRAYSCALE
)

mean = cv2.blur(img, (5, 5))

gaussian = cv2.GaussianBlur(
    img, (5, 5), 0
)

median = cv2.medianBlur(
    img, 5
)
```

Hiển thị và so sánh:

```text
Original | Mean | Gaussian | Median
```

**Yêu cầu:** Quan sát tác động lên chi tiết và biên.

---

# PHẦN IV — LÀM NÉT ẢNH

---

# ĐẠO HÀM VÀ BIÊN ẢNH

Biên thường xuất hiện tại những vị trí mà cường độ ảnh thay đổi mạnh. Để phát hiện biên, ta có thể sử dụng đạo hàm.

### Đạo hàm bậc nhất

$$
\frac{\partial f}{\partial x},
\qquad
\frac{\partial f}{\partial y}
$$

* Bằng 0 trong vùng cường độ không đổi.
* Có giá trị lớn tại vùng thay đổi mạnh.
* Cho biết **độ lớn và hướng thay đổi**.

### Đạo hàm bậc hai

$$
\frac{\partial^2 f}{\partial x^2},
\qquad
\frac{\partial^2 f}{\partial y^2}
$$

Nhạy với các thay đổi cường độ nhanh và được sử dụng trong Laplacian.

---

# GRADIENT CỦA ẢNH

Gradient:

$$
\nabla f=
\begin{bmatrix}
\frac{\partial f}{\partial x}\\
\frac{\partial f}{\partial y}
\end{bmatrix}
$$

Độ lớn:

$$
|\nabla f|
=
\sqrt{G_x^2+G_y^2}
$$

Có thể xấp xỉ:

$$
|\nabla f|
\approx |G_x|+|G_y|
$$

Hướng gradient:

$$
\theta=
\operatorname{atan2}(G_y,G_x)
$$

### Ý nghĩa

* Magnitude → biên mạnh hay yếu.
* Direction → hướng thay đổi cường độ.

---

# TOÁN TỬ SOBEL

Sobel sử dụng hai kernel để xấp xỉ đạo hàm theo hai hướng.

$$
G_x=
\begin{bmatrix}
-1&0&1\\
-2&0&2\\
-1&0&1
\end{bmatrix}
$$

$$
G_y=
\begin{bmatrix}
-1&-2&-1\\
0&0&0\\
1&2&1
\end{bmatrix}
$$

Sau đó tính:

$$
G=\sqrt{G_x^2+G_y^2}
$$

### Đặc điểm

* Phát hiện biên.
* Cho magnitude và direction.
* Có khả năng giảm ảnh hưởng của nhiễu tốt hơn đạo hàm đơn giản.

---

# TOÁN TỬ PREWITT

Prewitt cũng sử dụng đạo hàm bậc nhất theo hai hướng.

$$
G_x=
\begin{bmatrix}
-1&0&1\\
-1&0&1\\
-1&0&1
\end{bmatrix}
$$

$$
G_y=
\begin{bmatrix}
-1&-1&-1\\
0&0&0\\
1&1&1
\end{bmatrix}
$$

### Sobel vs Prewitt

* Cùng dựa trên gradient.
* Sobel sử dụng trọng số lớn hơn ở hàng/cột trung tâm.
* Sobel thường được sử dụng phổ biến hơn trong thực tế.

---

# BÀI TẬP THỰC HÀNH

```python
sobel_x = cv2.Sobel(
    img, cv2.CV_64F, 1, 0, ksize=3
)

sobel_y = cv2.Sobel(
    img, cv2.CV_64F, 0, 1, ksize=3
)

magnitude = cv2.magnitude(
    sobel_x.astype("float32"),
    sobel_y.astype("float32")
)
```

Hiển thị:

```text
Original
   ↓
Sobel X
   ↓
Sobel Y
   ↓
Gradient Magnitude
```

---

# BỘ LỌC LAPLACIAN

Laplacian sử dụng đạo hàm bậc hai:

$$
\nabla^2f=
\frac{\partial^2f}{\partial x^2}
+
\frac{\partial^2f}{\partial y^2}
$$

Một kernel phổ biến:

$$
\begin{bmatrix}
0&-1&0\\
-1&4&-1\\
0&-1&0
\end{bmatrix}
$$

Hoặc:

$$
\begin{bmatrix}
-1&-1&-1\\
-1&8&-1\\
-1&-1&-1
\end{bmatrix}
$$

**Lưu ý:** Dấu của kernel có thể đảo ngược tùy quy ước.

---

# ỨNG DỤNG LAPLACIAN

### Phát hiện biên

Kết quả Laplacian có thể được sử dụng để biểu diễn các vùng thay đổi cường độ mạnh.

### Làm nét

Kết hợp ảnh gốc với Laplacian:

$$
g=f-c\nabla^2f
$$

Trong đó dấu \(c\) phụ thuộc quy ước kernel.

### Đặc điểm

* Đẳng hướng.
* Không trực tiếp cung cấp hướng biên.
* Nhạy với nhiễu.
* Có thể tạo biên kép.

---

# CÁC BƯỚC LÀM NÉT ẢNH

```text
Ảnh gốc
   │
   ├───────────────┐
   │               │
   ▼               ▼
Laplacian       Ảnh gốc
   │               │
   └──────┐        │
          ▼        ▼
        Kết hợp ───┘
             │
             ▼
        Ảnh làm nét
```

Cần kiểm soát:

* Dấu của Laplacian.
* Độ lớn giá trị pixel.
* Clipping về \([0,255]\).

---

# UNSHARP MASKING

Ý tưởng:

> Làm mờ ảnh để lấy thành phần chi tiết, sau đó cộng thành phần chi tiết trở lại ảnh gốc.

### Bước 1

Làm mờ:

$$
f_{blur}=f*h
$$

### Bước 2

Tạo mặt nạ:

$$
m=f-f_{blur}
$$

### Bước 3

Làm nét:

$$
g=f+k\,m
$$

với \(k>0\).

---

# HIGHBOOST FILTERING

Highboost là mở rộng của Unsharp Masking.

Có thể viết:

$$
g=A f-f_{blur}
$$

với:

$$
A>1
$$

Tương đương:

$$
g=(A-1)f+(f-f_{blur})
$$

### Điều chỉnh mức độ

* \(A\) gần 1 → tăng cường nhẹ.
* \(A>1\) → tăng cường mạnh hơn.

### Lưu ý

Nếu tăng quá mạnh:

* Nhiễu cũng được khuếch đại.
* Có thể xuất hiện **halo** quanh biên.

---

# TỔNG HỢP CÁC BỘ LỌC LÀM NÉT

| Phương pháp | Cơ sở                     | Ưu điểm                  | Hạn chế                                        |
| ----------- | ------------------------- | ------------------------ | ---------------------------------------------- |
| Laplacian   | Đạo hàm bậc hai           | Nhanh, đẳng hướng        | Nhạy nhiễu                                     |
| Sobel       | Gradient                  | Có magnitude + direction | Không phải lựa chọn tối ưu cho sharpening mạnh |
| Unsharp     | Gốc − Blur                | Tự nhiên, kiểm soát được | Có thể tạo halo                                |
| Highboost   | Tăng cường high-frequency | Làm nét mạnh             | Dễ khuếch đại nhiễu                            |

---

# BÀI TẬP THỰC HÀNH

Với cùng một ảnh:

1. Làm nét bằng Laplacian.
2. Làm nét bằng Unsharp Masking.
3. Làm nét bằng Highboost.
4. So sánh với Sobel.

Đánh giá:

* Độ sắc nét.
* Biên.
* Nhiễu.
* Halo.
* Khả năng giữ chi tiết.

---

# PHẦN V — XỬ LÝ HISTOGRAM

---

# HISTOGRAM ẢNH

Histogram biểu diễn **tần suất xuất hiện của các mức cường độ**.

Với ảnh grayscale:

$$
h(r_k)=n_k
$$

Trong đó:

* \(r_k\): mức cường độ thứ \(k\).
* \(n_k\): số pixel có mức cường độ \(r_k\).

Histogram chuẩn hóa:

$$
p(r_k)=\frac{n_k}{MN}
$$

với ảnh kích thước \(M\times N\).

---

# HISTOGRAM CHO BIẾT ĐIỀU GÌ?

### Ảnh tối

Histogram tập trung về **bên trái**.

### Ảnh sáng

Histogram tập trung về **bên phải**.

### Tương phản thấp

Histogram tập trung trong một khoảng hẹp.

### Tương phản cao

Histogram trải rộng trên một khoảng lớn.

**Lưu ý:** Histogram không chứa thông tin vị trí không gian của pixel.

---

# HISTOGRAM ĐƯỢC SỬ DỤNG ĐỂ LÀM GÌ?

Histogram hỗ trợ:

### Phân tích ảnh

* Độ sáng.
* Độ tương phản.
* Phân bố mức xám.

### Tăng cường ảnh

* Histogram Equalization.
* Histogram Matching.
* Local Enhancement.

### Phân đoạn

Histogram có thể hỗ trợ lựa chọn ngưỡng:

* Thresholding.
* Otsu.

### Chuẩn hóa

So sánh hoặc điều chỉnh ảnh có điều kiện chiếu sáng khác nhau.

---

# CÂN BẰNG HISTOGRAM

**Histogram Equalization**

Mục tiêu:

> Phân bố lại các mức cường độ để tăng cường **độ tương phản toàn cục**.

Xác suất:

$$
p(r_k)=\frac{n_k}{MN}
$$

Hàm phân phối tích lũy:

$$
CDF(r_k)
=
\sum_{j=0}^{k}p(r_j)
$$

Phép biến đổi:

$$
s_k=(L-1)CDF(r_k)
$$

Trong đó:

* \(L\): số mức cường độ.
* Với ảnh 8-bit: \(L=256\).

---

# CƠ CHẾ CÂN BẰNG HISTOGRAM

```text
Histogram gốc
      │
      ▼
Probability
      │
      ▼
CDF
      │
      ▼
Mapping function
      │
      ▼
Histogram mới
      │
      ▼
Ảnh có tương phản được cải thiện
```

### Lưu ý

Histogram sau cân bằng **không nhất thiết phẳng hoàn toàn** vì:

* Pixel là dữ liệu rời rạc.
* Số mức cường độ hữu hạn.
* Phép ánh xạ có làm tròn.

---

# HẠN CHẾ

Histogram Equalization toàn cục có thể:

* Khuếch đại nhiễu.
* Làm thay đổi quá mạnh độ sáng.
* Không xử lý tốt ảnh có nhiều vùng sáng/tối khác nhau.
* Làm mất một số chi tiết cục bộ.

Do đó cần các phương pháp **local/adaptive enhancement**.

---

# KHỚP HISTOGRAM

**Histogram Matching / Specification**

Mục tiêu:

> Biến đổi ảnh đầu vào để histogram của nó gần với một histogram mục tiêu.

Quy trình:

```text
Input Image ──→ Equalization ──→ CDF_input
                                      │
                                      ▼
Target Image ──→ Equalization ──→ CDF_target
                                      │
                                      ▼
                              Mapping
                                      │
                                      ▼
                               Output Image
```

### Ứng dụng

* Chuẩn hóa ảnh.
* Xử lý ảnh y tế.
* Ảnh vệ tinh.
* Các hệ thống cần đưa ảnh về một phân bố tham chiếu.

---

# XỬ LÝ HISTOGRAM CỤC BỘ

Thay vì tính histogram trên toàn ảnh:

> Di chuyển một cửa sổ nhỏ qua ảnh và xử lý từng vùng lân cận.

Ví dụ:

$$
3\times3,\quad5\times5,\quad7\times7
$$

Tại mỗi vị trí:

1. Xác định vùng lân cận.
2. Tính histogram cục bộ.
3. Thực hiện biến đổi.
4. Cập nhật pixel trung tâm.

### Ưu điểm

* Tăng cường chi tiết cục bộ.

### Nhược điểm

* Tốn chi phí tính toán hơn.
* Có thể khuếch đại nhiễu.

---

# CLAHE

**Contrast Limited Adaptive Histogram Equalization**

CLAHE là một phương pháp tăng cường tương phản cục bộ.

Quy trình:

```text
Ảnh
 ↓
Chia thành các tile
 ↓
Tính histogram từng tile
 ↓
Giới hạn clipping
 ↓
Equalization
 ↓
Nội suy giữa các tile
 ↓
Ảnh đầu ra
```

### Điểm khác biệt

**AHE:** Có thể khuếch đại nhiễu mạnh.

**CLAHE:** Giới hạn mức khuếch đại histogram thông qua **clip limit**.

---

# BÀI TẬP THỰC HÀNH

Sử dụng OpenCV:

```python
eq = cv2.equalizeHist(img)

clahe = cv2.createCLAHE(
    clipLimit=2.0,
    tileGridSize=(8, 8)
)

clahe_img = clahe.apply(img)
```

So sánh:

```text
Original
   │
   ├── Histogram Equalization
   │
   └── CLAHE
```

Vẽ histogram của cả ba ảnh.

---

# PHẦN VI — BIẾN ĐỔI TRONG MIỀN TẦN SỐ

---

# BIẾN ĐỔI TRONG MIỀN TẦN SỐ

Ngoài việc xử lý trực tiếp trên pixel, ta có thể chuyển ảnh sang **frequency domain**.

Mục tiêu:

> Phân tích và xử lý ảnh dựa trên các thành phần tần số.

```text
Spatial Domain
      │
      │ Fourier Transform
      ▼
Frequency Domain
      │
      │ Filtering
      ▼
Modified Frequency Domain
      │
      │ Inverse Fourier Transform
      ▼
Spatial Domain
```

---

# TẦN SỐ THẤP VÀ TẦN SỐ CAO

### Low Frequency

Ảnh thay đổi chậm:

* Vùng nền.
* Vùng tương đối đồng nhất.
* Biến thiên ánh sáng.
* Các cấu trúc lớn.

### High Frequency

Ảnh thay đổi nhanh:

* Biên.
* Chi tiết nhỏ.
* Texture.
* Nhiễu.

```text
Smooth region → Low frequency

Sharp edge    → High frequency
```

---

# BIẾN ĐỔI FOURIER

Ý tưởng:

> Một tín hiệu phức tạp có thể được biểu diễn bằng tổng các thành phần hình sin/cosin với các tần số khác nhau.

### Miền không gian

Ảnh được biểu diễn bằng:

$$
f(x,y)
$$

### Miền tần số

Ảnh được biểu diễn bằng:

$$
F(u,v)
$$

Fourier Transform chuyển:

$$
f(x,y)\rightarrow F(u,v)
$$

Inverse Fourier Transform chuyển ngược:

$$
F(u,v)\rightarrow f(x,y)
$$

---

# 2D DFT

Với ảnh kích thước \(M\times N\):

$$
F(u,v)=
\sum_{x=0}^{M-1}
\sum_{y=0}^{N-1}
f(x,y)
e^{-j2\pi
\left(
\frac{ux}{M}+\frac{vy}{N}
\right)}
$$

Trong đó:

* \(f(x,y)\): pixel trong miền không gian.
* \(F(u,v)\): thành phần tần số.
* \(u,v\): tọa độ tần số.
* \(j=\sqrt{-1}\).

Kết quả DFT là **giá trị phức**.

---

# PHỔ FOURIER

Từ:

$$
F(u,v)
$$

ta có:

### Magnitude

$$
|F(u,v)|
$$

Cho biết **độ mạnh của thành phần tần số**.

### Phase

$$
\angle F(u,v)
$$

Mô tả **quan hệ pha**, có vai trò quan trọng trong việc xác định cấu trúc và vị trí thông tin trong ảnh.

### Ghi nhớ

$$
F(u,v)
=
|F(u,v)|e^{j\phi(u,v)}
$$

---

# FOURIER MAGNITUDE SPECTRUM

Khi dịch phổ để thành phần DC nằm ở giữa:

```text
        High frequency
             ↑
       ┌─────────────┐
       │             │
       │      ●      │
       │     DC      │
       │             │
       └─────────────┘
             ↓
        High frequency
```

### Tại tâm

* Tần số thấp nhất.
* Thành phần DC.
* Liên quan đến mức sáng trung bình.

### Càng xa tâm

* Tần số càng cao.
* Chi tiết nhanh.
* Biên.
* Texture.
* Nhiễu.

---

# CÁC TÍNH CHẤT CỦA 2D DFT

### Tính tuần hoàn

DFT có tính tuần hoàn theo miền tần số.

### Đối xứng liên hợp

Với ảnh thực:

$$
F(-u,-v)=F^*(u,v)
$$

### Tính phân tách

2D DFT có thể thực hiện bằng:

```text
DFT theo hàng
      ↓
DFT theo cột
```

### Tính dịch chuyển

Dịch ảnh trong miền không gian làm thay đổi **phase**, nhưng không làm thay đổi magnitude.

---

# HAI MIỀN — CÙNG MỘT Ý TƯỞNG

| Miền không gian | Miền tần số                |
| --------------- | -------------------------- |
| Mean Filter     | Low-pass                   |
| Gaussian Filter | Gaussian LPF               |
| Sharpening      | High-pass                  |
| Laplacian       | Laplacian frequency filter |
| Unsharp Masking | High-frequency emphasis    |

### Ý tưởng cốt lõi

> Lọc trong hai miền là hai cách biểu diễn khác nhau của cùng một bài toán xử lý tín hiệu.

---

# CONVOLUTION THEOREM

Trong điều kiện phù hợp:

$$
f(x,y)*h(x,y)
\quad\Longleftrightarrow\quad
F(u,v)H(u,v)
$$

Nghĩa là:

> **Tích chập trong miền không gian tương ứng với phép nhân trong miền tần số.**

Do đó:

```text
Spatial
f * h
  │
  │ Fourier
  ▼
F × H
  │
  │ Inverse Fourier
  ▼
g
```

### Ý nghĩa

Cho phép thực hiện một số phép lọc lớn hiệu quả hơn bằng FFT.

---

# FREQUENCY-DOMAIN FILTERING

Quy trình:

1. Ảnh đầu vào \(f(x,y)\).
2. FFT → \(F(u,v)\).
3. Dịch tâm phổ.
4. Tạo filter \(H(u,v)\).
5. Nhân:

$$
G(u,v)=H(u,v)F(u,v)
$$

6. Dịch ngược.
7. IFFT.
8. Hậu xử lý kết quả.

```text
Image
 ↓ FFT
Spectrum
 ↓ × H(u,v)
Filtered Spectrum
 ↓ IFFT
Output Image
```

---

# PHẦN VII — LỌC THÔNG THẤP

---

# LỌC THÔNG THẤP

**Low-pass Filter — LPF**

Mục tiêu:

> Giữ các thành phần tần số thấp và loại bỏ/giảm các thành phần tần số cao.

Hiệu ứng:

* Làm mịn.
* Làm mờ.
* Giảm nhiễu.
* Giảm chi tiết nhỏ.

Trong phổ đã dịch tâm:

```text
       ┌───────────┐
       │           │
       │    ███    │ ← giữ
       │    ███    │
       │           │
       └───────────┘
```

---

# IDEAL LPF

$$
H(u,v)=
\begin{cases}
1,&D(u,v)\le D_0\\
0,&D(u,v)>D_0
\end{cases}
$$

Trong đó:

$$
D(u,v)=
\sqrt{(u-u_0)^2+(v-v_0)^2}
$$

\(D_0\): bán kính cắt.

### Đặc điểm

* Cắt tần số đột ngột.
* Dễ hiểu và dễ cài đặt.
* Có thể gây **ringing** do biên chuyển tiếp quá đột ngột.

---

# GAUSSIAN LPF

Một dạng:

$$
H(u,v)=
e^{-\frac{D^2(u,v)}{2\sigma^2}}
$$

Đặc điểm:

* Suy giảm mượt theo khoảng cách.
* Không có biên cắt đột ngột.
* Giảm ringing so với Ideal LPF.

### Tham số

$$
\sigma\uparrow
\Rightarrow
\text{lọc mạnh hơn}
$$

---

# BUTTERWORTH LPF

Một dạng:

$$
H(u,v)=
\frac{1}
{1+\left(\frac{D(u,v)}{D_0}\right)^{2n}}
$$

Trong đó:

* \(D_0\): tần số cắt.
* \(n\): bậc của bộ lọc.

### Đặc điểm

* Chuyển tiếp giữa vùng cho qua và vùng chặn có thể điều chỉnh.
* \(n\) càng lớn → chuyển tiếp càng dốc.
* Nằm giữa Gaussian và Ideal về độ sắc của vùng chuyển tiếp.

---

# SO SÁNH CÁC LPF

| Filter      | Chuyển tiếp     | Ringing    | Điều chỉnh |
| ----------- | --------------- | ---------- | ---------- |
| Ideal       | Đột ngột        | Cao        | \(D_0\)    |
| Gaussian    | Mượt            | Rất thấp   | \(\sigma\) |
| Butterworth | Điều chỉnh được | Trung gian | \(D_0,n\)  |

### Ghi nhớ

> **Càng cắt tần số đột ngột → càng có nguy cơ ringing.**

---

# PHẦN VIII — LỌC THÔNG CAO

---

# LỌC THÔNG CAO

**High-pass Filter — HPF**

Mục tiêu:

> Giữ các thành phần tần số cao và loại bỏ/giảm các thành phần tần số thấp.

Ứng dụng:

* Làm nét.
* Tăng cường biên.
* Tăng cường chi tiết.

Trong phổ đã dịch tâm:

```text
       ┌───────────┐
       │ █████████ │
       │ ███ ○ ███ │ ← loại DC
       │ █████████ │
       └───────────┘
```

---

# HPF VÀ THÀNH PHẦN DC

Thành phần DC nằm tại trung tâm phổ.

Với high-pass filter:

$$
H(0,0)\approx0
$$

Do đó thành phần liên quan đến mức sáng trung bình bị loại bỏ.

Kết quả sau IFFT có thể:

* Tối.
* Mang giá trị âm.
* Cần chuẩn hóa để hiển thị.

### Khi cần giữ độ sáng

Sử dụng:

* Offset.
* High-frequency emphasis.
* Các phương pháp sharpening thích hợp.

---

# TOÁN TỬ LAPLACIAN TRONG MIỀN TẦN SỐ

Tính chất Fourier của Laplacian:

$$
\mathcal{F}\{\nabla^2f\}
=
-4\pi^2(u^2+v^2)F(u,v)
$$

Nếu đặt:

$$
D^2=u^2+v^2
$$

thì thành phần Laplacian tỷ lệ với:

$$
-D^2F(u,v)
$$

### Ý nghĩa

Khi \(D\) tăng:

$$
D^2\uparrow
$$

→ thành phần tần số cao được khuếch đại mạnh hơn.

---

# HIGH-FREQUENCY EMPHASIS

Nếu chỉ dùng HPF:

* Chi tiết được giữ.
* Nhưng thành phần tần số thấp bị loại bỏ.
* Độ sáng tổng thể có thể bị mất.

Giải pháp:

$$
H_{hfe}(u,v)
=
a+bH_{hp}(u,v)
$$

với:

$$
a>0,\quad b>0
$$

### Ý nghĩa

* \(a\): giữ lại thành phần nền.
* \(b\): điều chỉnh mức tăng cường high-frequency.

---

# PHẦN IX — LỌC CHỌN LỌC

---

# LỌC CHỌN LỌC

### Band-pass Filter

Chỉ giữ một khoảng tần số:

$$
D_1\le D\le D_2
$$

Ứng dụng:

* Tách các cấu trúc theo scale.
* Phân tích texture.

### Band-reject Filter

Loại bỏ một khoảng tần số:

$$
D_1<D<D_2
$$

Ứng dụng:

* Loại bỏ một dải nhiễu cụ thể.
* Xử lý nhiễu tuần hoàn.

---

# NOTCH FILTER

Notch filter tác động vào **một hoặc một số vùng tần số rất cụ thể**.

Đặc biệt hữu ích với:

> **Periodic noise**

Quy trình:

```text
Ảnh có nhiễu tuần hoàn
        ↓
Fourier Transform
        ↓
Phát hiện các đỉnh bất thường
        ↓
Notch Filter
        ↓
Inverse Fourier Transform
        ↓
Ảnh giảm nhiễu
```

---

# NHIỄU TUẦN HOÀN TRONG MIỀN TẦN SỐ

Nhiễu tuần hoàn trong miền không gian thường tạo ra **các đỉnh sáng đối xứng** trong Fourier spectrum.

```text
Frequency Spectrum

          ×
          
     ×    ●    ×
          
          ×
```

Các điểm bất thường này có thể được loại bỏ bằng notch filter.

### Ý tưởng

> Tìm nhiễu trong miền tần số → loại bỏ đúng vùng tần số → khôi phục ảnh.

---

# PHẦN X — FFT

---

# BIẾN ĐỔI FOURIER NHANH

**Fast Fourier Transform — FFT**

DFT trực tiếp có độ phức tạp:

$$
O(N^2)
$$

FFT giảm xuống:

$$
O(N\log N)
$$

### Ý tưởng

Sử dụng chiến lược **Divide and Conquer**:

```text
DFT lớn
  │
  ├── DFT nhỏ
  ├── DFT nhỏ
  ├── DFT nhỏ
  └── DFT nhỏ
        ↓
      Kết hợp
        ↓
      Kết quả
```

FFT là thuật toán hiệu quả để tính DFT.

---

# FFT CHO ẢNH

2D FFT có thể thực hiện bằng:

```text
Ảnh
 │
 ├── FFT từng hàng
 │
 └── FFT từng cột
        │
        ▼
     2D FFT
```

Đây là hệ quả của tính **separability** của DFT.

### Trong Python

```python
F = np.fft.fft2(img)

F_shift = np.fft.fftshift(F)
```

---

# MAGNITUDE SPECTRUM

Magnitude có dynamic range rất lớn.

Do đó thường dùng:

$$
S(u,v)
=
\log(1+|F(u,v)|)
$$

Trong Python:

```python
spectrum = np.log(
    1 + np.abs(F_shift)
)
```

### Mục đích

* Làm rõ các thành phần tần số yếu.
* Giúp quan sát Fourier spectrum dễ hơn.

---

# BÀI TẬP THỰC HÀNH

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread(
    "input.jpg",
    cv2.IMREAD_GRAYSCALE
)

F = np.fft.fft2(img)
F_shift = np.fft.fftshift(F)

rows, cols = img.shape
crow, ccol = rows // 2, cols // 2

y, x = np.ogrid[:rows, :cols]

D = np.sqrt(
    (x - ccol)**2 +
    (y - crow)**2
)

D0 = 50

mask = (D <= D0).astype(np.float32)

F_filtered = F_shift * mask

F_ishift = np.fft.ifftshift(
    F_filtered
)

result = np.fft.ifft2(
    F_ishift
)

result = np.abs(result)
```

---

# PHÂN TÍCH KẾT QUẢ

Hiển thị:

```text
┌────────────┬──────────────────┬───────────────┐
│ Original   │ Fourier Spectrum │ After LPF     │
└────────────┴──────────────────┴───────────────┘
```

Quan sát:

* Chi tiết nào bị mất?
* Biên thay đổi như thế nào?
* Khi giảm \(D_0\), ảnh thay đổi ra sao?
* Khi tăng \(D_0\), ảnh thay đổi ra sao?

### Kết luận

$$
D_0\downarrow
\Rightarrow
\text{lọc mạnh hơn}
\Rightarrow
\text{ảnh mờ hơn}
$$

---

# PHẦN XI — QUY TRÌNH TỔNG QUÁT

---

# CÁC BƯỚC XỬ LÝ ẢNH TRONG MIỀN TẦN SỐ

### Bước 1 — Tiền xử lý

* Đọc ảnh.
* Chuyển grayscale nếu cần.
* Padding khi cần để giảm ảnh hưởng biên.

### Bước 2 — Fourier Transform

$$
f(x,y)\rightarrow F(u,v)
$$

### Bước 3 — Dịch tâm

Đưa DC component về trung tâm.

### Bước 4 — Filtering

$$
G(u,v)=H(u,v)F(u,v)
$$

### Bước 5 — Dịch ngược

Đưa phổ về vị trí ban đầu.

### Bước 6 — IFFT

$$
G(u,v)\rightarrow g(x,y)
$$

### Bước 7 — Hậu xử lý

* Lấy phần thực.
* Chuẩn hóa/clipping.
* Cắt padding nếu đã thêm.

---

# SO SÁNH HAI MIỀN

|                 | Spatial Domain      | Frequency Domain       |
| --------------- | ------------------- | ---------------------- |
| Làm việc với    | Pixel               | Frequency components   |
| Thao tác        | Trực tiếp           | Sau Fourier Transform  |
| Kernel nhỏ      | Hiệu quả            | Có thể không cần thiết |
| Kernel lớn      | Có thể tốn chi phí  | FFT có lợi             |
| Nhiễu tuần hoàn | Khó xử lý trực tiếp | Rất phù hợp            |
| Trực quan       | Dễ hiểu             | Khó hơn                |
| Công cụ         | OpenCV filters      | FFT + frequency mask   |

### Ghi nhớ

> Không có miền nào luôn tốt hơn.
> **Lựa chọn miền xử lý phụ thuộc vào bài toán.**

---

# TÓM TẮT CHƯƠNG 2

### Spatial Domain

**Point Processing**

$$
g=T(f)
$$

* Negative
* Log
* Gamma
* Piecewise-linear

**Neighborhood Processing**

* Mean
* Gaussian
* Median
* Sobel
* Laplacian
* Unsharp / Highboost

### Histogram

* Histogram
* Equalization
* Matching
* Local processing
* CLAHE

### Frequency Domain

$$
f
\xrightarrow{FFT}
F
\xrightarrow{H}
G
\xrightarrow{IFFT}
g
$$

* Fourier Transform
* Magnitude / Phase
* LPF
* HPF
* Band-pass / Band-reject
* Notch
* FFT

---

# KEY TAKEAWAYS

**1. Point processing**

> Mỗi pixel được xử lý độc lập.

**2. Spatial filtering**

> Giá trị pixel mới phụ thuộc vào vùng lân cận.

**3. Smoothing**

> Giảm high-frequency → giảm chi tiết và nhiễu.

**4. Sharpening**

> Tăng high-frequency → tăng biên và chi tiết.

**5. Histogram**

> Mô tả phân bố cường độ, nhưng không chứa thông tin vị trí.

**6. Fourier Transform**

> Chuyển cách nhìn từ pixel sang frequency components.

**7. Frequency filtering**

> Thay đổi các thành phần tần số để thay đổi đặc tính ảnh.

---