---
marp: true
theme: eaut
paginate: true
transition: zoom
---

<!-- _class: cover -->

<div class="middle">

# XỬ LÝ ẢNH& THỊ GIÁC MÁY TÍNH

## Chương 4: Phát hiện biên & phân vùng

</div>

### Giảng viên: Nguyễn Phồn Lữa

---

# SLIDE 1. PHÁT HIỆN BIÊN & PHÂN VÙNG

### Nội dung chính

* Giới thiệu tổng quan về phát hiện biên và phân vùng ảnh
* Phát hiện điểm, đường và biên
* Phân ngưỡng (Thresholding)
* Phân đoạn dựa trên vùng:

  * Region Growing
  * Split & Merge
* Phân đoạn dựa trên phân cụm
* Superpixels và thuật toán SLIC
* Ứng dụng với OpenCV và các thư viện xử lý ảnh

### Mục tiêu của chương

Sau chương này, sinh viên có thể:

* Giải thích được khái niệm **biên**, **vùng** và **phân đoạn ảnh**.
* Trình bày được nguyên lý của các phương pháp phát hiện biên.
* Sử dụng các toán tử Roberts, Prewitt, Sobel và Canny.
* Phân đoạn ảnh bằng phương pháp thresholding.
* Hiểu và cài đặt được Region Growing và Split & Merge ở mức cơ bản.
* Sử dụng K-Means để phân đoạn ảnh.
* Giải thích khái niệm superpixel và thuật toán SLIC.

---

# PHẦN 1

# GIỚI THIỆU TỔNG QUAN

---

# SLIDE 2. BÀI TOÁN PHÂN ĐOẠN ẢNH

### Image Segmentation là gì?

**Phân đoạn ảnh (Image Segmentation)** là quá trình chia một ảnh thành các **vùng có ý nghĩa**, sao cho các pixel trong cùng một vùng có đặc điểm tương đồng.

Ví dụ:

* Ảnh giao thông → đường, xe, người, cây cối, bầu trời.
* Ảnh y tế → mô, cơ quan, khối u.
* Ảnh sản phẩm → sản phẩm và nền.
* Ảnh tài liệu → chữ và nền.

### Mục tiêu

Thay vì xử lý từng pixel riêng lẻ, hệ thống chuyển ảnh thành một tập hợp các **vùng hoặc đối tượng có ý nghĩa hơn**.

> **Segmentation trả lời câu hỏi:**
> "Pixel nào thuộc cùng một vùng/đối tượng?"

---

# SLIDE 3. REGION, BOUNDARY VÀ SEGMENTATION

### Region – Vùng ảnh

Một **region** là tập hợp các pixel có những đặc điểm tương đồng.

Các đặc điểm có thể là:

* Cường độ sáng
* Màu sắc
* Kết cấu (texture)
* Đặc trưng hình học
* Đặc trưng được trích xuất từ ảnh

### Boundary – Biên

**Boundary** là ranh giới giữa hai vùng có đặc tính khác nhau.

Ví dụ:

```text
        Vùng A
    ┌──────────────┐
    │              │
    │              │
    └──────────────┘
           ↑
         Boundary
           ↓
    ┌──────────────┐
    │    Vùng B    │
    │              │
```

### Segmentation

**Segmentation** là quá trình xác định các region và/hoặc boundary trong ảnh.

---

# SLIDE 4. ĐIỀU KIỆN CỦA MỘT PHÂN ĐOẠN ẢNH

Cho không gian ảnh \(R\), một phân đoạn gồm các vùng:

$$
R_1,R_2,\ldots,R_n
$$

Một phân đoạn hợp lệ thường thỏa mãn:

### 1. Bao phủ toàn bộ ảnh

$$
\bigcup_{i=1}^{n}R_i = R
$$

Mọi pixel đều thuộc ít nhất một vùng.

### 2. Các vùng liên thông

Mỗi \(R_i\) phải là một vùng liên thông.

### 3. Các vùng không chồng lấn

$$
R_i \cap R_j = \varnothing,\quad i\neq j
$$

Một pixel không đồng thời thuộc hai vùng.

### 4. Pixel trong cùng vùng có tính chất tương đồng

Với một predicate \(P\):

$$
P(R_i)=TRUE
$$

### 5. Hai vùng kề nhau phải khác nhau

Nếu \(R_i\) và \(R_j\) kề nhau thì:

$$
P(R_i\cup R_j)=FALSE
$$

Điều này ngăn việc tách một vùng đồng nhất thành nhiều vùng không cần thiết.

---

# SLIDE 5. TẠI SAO CẦN PHÂN ĐOẠN ẢNH?

### Phân đoạn là bước trung gian giữa ảnh và đối tượng

```text
Ảnh đầu vào
     ↓
Tiền xử lý
     ↓
Phân đoạn
     ↓
Các vùng/đối tượng
     ↓
Trích xuất đặc trưng
     ↓
Nhận dạng / Phân tích
```

### Ví dụ

Một ảnh CT có thể được phân đoạn thành:

* nền
* mô
* cơ quan
* vùng bất thường

Sau đó hệ thống mới thực hiện:

* đo kích thước
* xác định hình dạng
* phát hiện bất thường
* hỗ trợ chẩn đoán

---

# SLIDE 6. ỨNG DỤNG CỦA PHÂN ĐOẠN ẢNH

### Y tế

* Phân vùng khối u
* Phân vùng cơ quan
* Phân vùng mạch máu
* Phân tích tế bào

### Xe tự hành

* Đường giao thông
* Làn đường
* Người đi bộ
* Phương tiện
* Vỉa hè

### Công nghiệp

* Phát hiện lỗi sản phẩm
* Phân vùng linh kiện
* Kiểm tra bề mặt

### Thị giác máy tính

* Object detection
* Semantic segmentation
* Instance segmentation
* Tracking

---

# SLIDE 7. CÁC HƯỚNG TIẾP CẬN CHÍNH

Có thể chia các phương pháp phân đoạn thành các nhóm:

### 1. Dựa trên biên

Tìm nơi cường độ ảnh thay đổi mạnh.

**Ví dụ:**

* Sobel
* Canny
* LoG

### 2. Dựa trên ngưỡng

Tách pixel dựa trên cường độ hoặc màu sắc.

**Ví dụ:**

* Global Thresholding
* Otsu
* Adaptive Thresholding

### 3. Dựa trên vùng

Nhóm các pixel lân cận có tính chất tương đồng.

**Ví dụ:**

* Region Growing
* Split & Merge

### 4. Dựa trên phân cụm

Nhóm các pixel có đặc trưng gần nhau.

**Ví dụ:**

* K-Means
* Gaussian Mixture Model

### 5. Dựa trên Deep Learning

Học trực tiếp từ dữ liệu.

**Ví dụ:**

* U-Net
* Mask R-CNN
* SAM

---

# PHẦN 2

# PHÁT HIỆN ĐIỂM, ĐƯỜNG VÀ BIÊN

---

# SLIDE 8. ĐIỂM – ĐƯỜNG – BIÊN

### Điểm (Point)

Một pixel có giá trị khác biệt rõ rệt so với các pixel lân cận.

Ví dụ:

* điểm sáng trên nền tối
* điểm tối trên nền sáng
* nhiễu dạng đốm

### Đường (Line)

Một chuỗi pixel tạo thành cấu trúc kéo dài theo một hướng.

Ví dụ:

* đường kẻ
* dây điện
* cạnh dài của vật thể

### Biên (Edge)

Vị trí có sự thay đổi đáng kể về cường độ hoặc màu sắc.

Biên thường tương ứng với:

* ranh giới vật thể
* ranh giới giữa hai vùng
* sự thay đổi cấu trúc trong ảnh

---

# SLIDE 9. TỪ CƯỜNG ĐỘ ẢNH ĐẾN BIÊN

Xét ảnh một chiều:

```text
Cường độ

255 |             ┌──────────
    |            /
    |           /
    |          /
  0 |─────────┘
    +------------------------→ x
               ↑
              Edge
```

Ở vùng phẳng:

$$
\frac{df}{dx}\approx 0
$$

Tại biên:

$$
\left|\frac{df}{dx}\right|
$$

có giá trị lớn.

### Ý tưởng quan trọng

> **Biên có thể được phát hiện bằng cách tìm nơi cường độ ảnh thay đổi mạnh.**

Đây là cơ sở của các phương pháp dựa trên **gradient**.

---

# SLIDE 10. PHÁT HIỆN ĐIỂM BIỆT LẬP

### Mục tiêu

Phát hiện pixel có giá trị khác biệt rõ rệt so với vùng lân cận.

### Ý tưởng

Sử dụng mặt nạ Laplacian để đo sự thay đổi cục bộ.

Một mặt nạ điển hình:

$$
\begin{bmatrix}
-1&-1&-1\\
-1&8&-1\\
-1&-1&-1
\end{bmatrix}
$$

Pixel trung tâm được nhân với trọng số lớn \(8\), trong khi các pixel lân cận có trọng số \(-1\).

### Quy tắc phát hiện

Sau phép tích chập:

$$
R = w*f
$$

Một điểm được xem là điểm biệt lập nếu:

$$
|R|>T
$$

với \(T\) là ngưỡng phát hiện.

---

# SLIDE 11. TRỰC QUAN HÓA PHÁT HIỆN ĐIỂM

### Ví dụ

```text
Nền đồng nhất

0  0  0  0  0
0  0  0  0  0
0  0 255 0  0
0  0  0  0  0
0  0  0  0  0
```

Pixel trung tâm khác biệt mạnh so với các pixel xung quanh.

Sau khi tích chập với mặt nạ:

```text
Đáp ứng lớn
      ↓
     255
      ↓
Điểm được phát hiện
```

### Lưu ý

Phương pháp rất nhạy với:

* nhiễu
* các chi tiết nhỏ
* điểm sáng/tối bất thường

---

# SLIDE 12. PHÁT HIỆN ĐƯỜNG

### Mục tiêu

Phát hiện các đường có hướng xác định:

* ngang
* dọc
* chéo \(+45^\circ\)
* chéo \(-45^\circ\)

### Ý tưởng

Mỗi hướng sử dụng một mặt nạ riêng.

Ví dụ mặt nạ phát hiện đường ngang:

$$
\begin{bmatrix}
-1&-1&-1\\
2&2&2\\
-1&-1&-1
\end{bmatrix}
$$

Nếu vùng ảnh phù hợp với cấu trúc của mặt nạ, đáp ứng tích chập sẽ lớn.

### Quy tắc

$$
|R|>T
$$

→ phát hiện đường.

---

# SLIDE 13. TẠI SAO MẶT NẠ CÓ THỂ PHÁT HIỆN ĐƯỜNG?

Khi tích chập mặt nạ với ảnh:

* Pixel phù hợp với cấu trúc đường → đóng góp lớn.
* Pixel không phù hợp → các thành phần dương và âm triệt tiêu nhau.

Ví dụ:

```text
Ảnh                  Mặt nạ

████████              - - -
████████      ×       + + +
████████              - - -

       ↓

Đáp ứng lớn
```

### Ý nghĩa

Mặt nạ hoạt động giống một **bộ lọc chuyên biệt cho một hướng**.

---

# PHẦN 3

# PHÁT HIỆN BIÊN

---

# SLIDE 14. KHÁI NIỆM BIÊN

### Edge

Biên là vùng trong ảnh tại đó cường độ thay đổi nhanh trong một khoảng không gian nhỏ.

Biên thường xuất hiện tại:

* ranh giới giữa vật thể và nền
* ranh giới giữa hai vật thể
* thay đổi bề mặt
* thay đổi độ sâu
* thay đổi chiếu sáng

### Hai cách tiếp cận toán học chính

**Đạo hàm bậc nhất**

→ Gradient

**Đạo hàm bậc hai**

→ Laplacian

---

# SLIDE 15. GRADIENT CỦA ẢNH

Với ảnh \(f(x,y)\), gradient:

$$
\nabla f =
\begin{bmatrix}
G_x\\
G_y
\end{bmatrix}
=
\begin{bmatrix}
\frac{\partial f}{\partial x}\\
\frac{\partial f}{\partial y}
\end{bmatrix}
$$

Trong đó:

* \(G_x\): mức thay đổi theo hướng \(x\)
* \(G_y\): mức thay đổi theo hướng \(y\)

### Độ lớn gradient

$$
|\nabla f|
=
\sqrt{G_x^2+G_y^2}
$$

Đây là đại lượng thường được sử dụng để xác định độ mạnh của biên.

---

# SLIDE 16. HƯỚNG CỦA GRADIENT

Hướng gradient:

$$
\theta =
\tan^{-1}
\left(
\frac{G_y}{G_x}
\right)
$$

### Ý nghĩa

* **Magnitude** cho biết thay đổi mạnh hay yếu.
* **Direction** cho biết hướng thay đổi mạnh nhất.

### Quan sát quan trọng

Gradient vuông góc với hướng của biên.

```text
Biên
────────────────────

        ↑ Gradient
        │
        │
        │
```

Điều này rất quan trọng trong các thuật toán như **Canny**.

---

# SLIDE 17. TOÁN TỬ ROBERTS

### Đặc điểm

Roberts sử dụng các mặt nạ \(2\times2\) để xấp xỉ gradient.

$$
G_x =
\begin{bmatrix}
1&0\\
0&-1
\end{bmatrix}
$$

$$
G_y =
\begin{bmatrix}
0&1\\
-1&0
\end{bmatrix}
$$

### Ưu điểm

* Đơn giản
* Tính toán nhanh
* Phù hợp cho các bài toán đơn giản

### Nhược điểm

* Mặt nạ nhỏ
* Nhạy với nhiễu
* Khả năng ổn định kém hơn Sobel

---

# SLIDE 18. TOÁN TỬ PREWITT

Prewitt sử dụng mặt nạ \(3\times3\).

### Theo hướng \(x\)

$$
G_x=
\begin{bmatrix}
-1&0&1\\
-1&0&1\\
-1&0&1
\end{bmatrix}
$$

### Theo hướng \(y\)

$$
G_y=
\begin{bmatrix}
-1&-1&-1\\
0&0&0\\
1&1&1
\end{bmatrix}
$$

### Đặc điểm

* Xấp xỉ đạo hàm bậc nhất.
* Có khả năng làm trơn nhẹ nhờ kích thước mặt nạ.
* Đơn giản và dễ cài đặt.

---

# SLIDE 19. TOÁN TỬ SOBEL

Sobel tương tự Prewitt nhưng tăng trọng số ở hàng/cột trung tâm.

### Sobel \(x\)

$$
G_x=
\begin{bmatrix}
-1&0&1\\
-2&0&2\\
-1&0&1
\end{bmatrix}
$$

### Sobel \(y\)

$$
G_y=
\begin{bmatrix}
-1&-2&-1\\
0&0&0\\
1&2&1
\end{bmatrix}
$$

### Ý nghĩa

Sobel vừa:

* xấp xỉ đạo hàm
* vừa tạo hiệu ứng làm trơn theo một hướng

→ thường ổn định hơn Prewitt khi ảnh có nhiễu.

---

# SLIDE 20. SO SÁNH ROBERTS – PREWITT – SOBEL

| Toán tử |   Kích thước | Đặc điểm                      |
| ------- | -----------: | ----------------------------- |
| Roberts | \(2\times2\) | Nhanh, đơn giản, nhạy nhiễu   |
| Prewitt | \(3\times3\) | Đạo hàm + làm trơn nhẹ        |
| Sobel   | \(3\times3\) | Trọng số trung tâm lớn hơn    |
| Canny   |   Nhiều bước | Biên mảnh, liên tục, mạnh hơn |

### Ghi nhớ

Không có toán tử nào luôn tốt nhất.

Lựa chọn phụ thuộc vào:

* mức nhiễu
* yêu cầu về tốc độ
* chất lượng biên mong muốn
* đặc điểm ảnh

---

# SLIDE 21. TÍNH ẢNH BIÊN ĐỘ GRADIENT

Sau khi tính:

$$
G_x,\;G_y
$$

ta có thể tính:

$$
M(x,y)=\sqrt{G_x^2+G_y^2}
$$

Trong thực tế có thể sử dụng xấp xỉ:

$$
M(x,y)\approx |G_x|+|G_y|
$$

### Ý nghĩa

* \(M\) nhỏ → vùng tương đối đồng nhất.
* \(M\) lớn → có khả năng xuất hiện biên.

---

# SLIDE 22. PHÂN NGƯỠNG ẢNH GRADIENT

Sau khi tính magnitude:

$$
M(x,y)
$$

chọn ngưỡng \(T\):

$$
E(x,y)=
\begin{cases}
1,&M(x,y)>T\\
0,&M(x,y)\leq T
\end{cases}
$$

### Kết quả

* Giữ lại các biên mạnh.
* Loại bỏ các biến đổi nhỏ.
* Giảm ảnh hưởng của nhiễu.

### Vấn đề

Nếu \(T\) quá thấp:

→ nhiều nhiễu được giữ lại.

Nếu \(T\) quá cao:

→ có thể mất các biên yếu.

---

# SLIDE 23. THỰC HÀNH: SOBEL + THRESHOLD

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread(
    "sample.jpg",
    cv2.IMREAD_GRAYSCALE
)

sobelx = cv2.Sobel(
    img, cv2.CV_64F, 1, 0, ksize=5
)

sobely = cv2.Sobel(
    img, cv2.CV_64F, 0, 1, ksize=5
)

magnitude = np.sqrt(
    sobelx**2 + sobely**2
)

magnitude = np.uint8(
    magnitude / magnitude.max() * 255
)

_, edges = cv2.threshold(
    magnitude,
    50,
    255,
    cv2.THRESH_BINARY
)
```

### Yêu cầu

Hiển thị:

1. Ảnh gốc
2. Gradient \(G_x\)
3. Gradient \(G_y\)
4. Magnitude
5. Ảnh biên sau threshold

---

# SLIDE 24. LAPLACIAN VÀ PHÁT HIỆN BIÊN

Laplacian là đạo hàm bậc hai:

$$
\nabla^2 f
=
\frac{\partial^2f}{\partial x^2}
+
\frac{\partial^2f}{\partial y^2}
$$

### Đặc điểm

Laplacian không có hướng như gradient.

Biên thường tương ứng với vị trí:

$$
\nabla^2 f = 0
$$

hay còn gọi là **zero-crossing**.

### Nhược điểm

Đạo hàm bậc hai rất nhạy với nhiễu.

Do đó thường:

> **Làm trơn → Laplacian → tìm zero-crossing**

---

# SLIDE 25. LOG – LAPLACIAN OF GAUSSIAN

### Vấn đề

Laplacian nhạy với nhiễu.

### Giải pháp

Làm trơn bằng Gaussian trước:

$$
g_\sigma * f
$$

sau đó tính Laplacian:

$$
\nabla^2(g_\sigma*f)
$$

Đây là **LoG – Laplacian of Gaussian**.

### Quy trình

```text
Ảnh
 ↓
Gaussian Blur
 ↓
Laplacian
 ↓
Zero Crossing
 ↓
Edge
```

### Ý nghĩa

Gaussian giúp giảm nhiễu trước khi áp dụng đạo hàm bậc hai.

---

# PHẦN 4

# CANNY EDGE DETECTION

---

# SLIDE 26. CANNY EDGE DETECTOR

Canny là một quy trình phát hiện biên gồm nhiều bước.

### Mục tiêu

Tạo ra biên:

* mảnh
* rõ
* ít nhiễu
* liên tục

### Quy trình

```text
Ảnh
 ↓
Gaussian Blur
 ↓
Gradient
 ↓
Non-Maximum Suppression
 ↓
Double Threshold
 ↓
Hysteresis
 ↓
Biên cuối cùng
```

---

# SLIDE 27. BƯỚC 1 – LÀM TRƠN GAUSSIAN

Ảnh đầu tiên được làm trơn:

$$
I_s = G_\sigma * I
$$

### Mục đích

Giảm:

* nhiễu
* chi tiết rất nhỏ
* biến thiên không mong muốn

### Tham số quan trọng

$$
\sigma
$$

* \(\sigma\) nhỏ → giữ nhiều chi tiết.
* \(\sigma\) lớn → ảnh mượt hơn nhưng có thể mất biên nhỏ.

---

# SLIDE 28. BƯỚC 2 – TÍNH GRADIENT

Tính:

$$
G_x,\quad G_y
$$

Sau đó:

$$
M=\sqrt{G_x^2+G_y^2}
$$

và:

$$
\theta=
\tan^{-1}
\left(
\frac{G_y}{G_x}
\right)
$$

### Kết quả

Mỗi pixel có:

* độ mạnh của biên
* hướng gradient

Thông tin này được sử dụng ở bước tiếp theo.

---

# SLIDE 29. BƯỚC 3 – NON-MAXIMUM SUPPRESSION

### Vấn đề

Gradient thường tạo ra một vùng biên dày vài pixel.

Canny cần biến vùng đó thành **biên mảnh**.

### Ý tưởng

Theo hướng gradient, so sánh pixel hiện tại với hai pixel lân cận.

Chỉ giữ pixel nếu nó là **cực đại cục bộ**.

```text
      x
      ↑
      │ hướng gradient

   x  X  x

Nếu X lớn nhất
→ giữ X

Nếu không
→ loại X
```

### Kết quả

Biên trở nên mảnh hơn.

---

# SLIDE 30. BƯỚC 4 – DOUBLE THRESHOLD

Sử dụng hai ngưỡng:

* \(T_{high}\)
* \(T_{low}\)

Phân loại:

### Biên mạnh

$$
M>T_{high}
$$

→ chắc chắn là biên.

### Biên yếu

$$
T_{low}\leq M\leq T_{high}
$$

→ có khả năng là biên.

### Không phải biên

$$
M<T_{low}
$$

→ loại bỏ.

---

# SLIDE 31. BƯỚC 5 – HYSTERESIS

### Vấn đề

Biên yếu có thể:

* là biên thật
* hoặc là nhiễu

### Nguyên tắc

Một biên yếu được giữ lại nếu nó liên kết với biên mạnh.

```text
Strong ─ Weak ─ Weak ─ Strong
   │       │       │
   └───────┴───────┘
       giữ lại
```

Ngược lại:

```text
Strong

Weak

Weak

Weak
```

Nếu biên yếu không kết nối với biên mạnh:

→ loại bỏ.

### Kết quả

Biên cuối cùng:

* rõ hơn
* ít nhiễu hơn
* liên tục hơn

---

# SLIDE 32. THỰC HÀNH: CANNY

```python
import cv2
import matplotlib.pyplot as plt

img = cv2.imread(
    "sample.jpg",
    cv2.IMREAD_GRAYSCALE
)

edges = cv2.Canny(
    img,
    threshold1=100,
    threshold2=200
)

plt.figure(figsize=(10, 4))

plt.subplot(1, 2, 1)
plt.imshow(img, cmap="gray")
plt.title("Original")
plt.axis("off")

plt.subplot(1, 2, 2)
plt.imshow(edges, cmap="gray")
plt.title("Canny Edges")
plt.axis("off")

plt.show()
```

### Thử nghiệm

Thay đổi:

```python
threshold1
threshold2
```

và quan sát:

* số lượng biên
* mức nhiễu
* tính liên tục của biên

---

# SLIDE 33. NỐI CÁC ĐIỂM BIÊN

### Vấn đề

Sau khi phát hiện biên, các đoạn biên có thể bị:

* đứt
* nhiễu
* thiếu pixel

### Ý tưởng

Nối các điểm biên có:

* vị trí gần nhau
* hướng gradient tương tự
* đặc điểm tương đồng

### Hai hướng xử lý

**Cục bộ**

Dựa vào các pixel lân cận.

**Toàn cục**

Tìm cấu trúc hình học trong toàn ảnh.

Ví dụ:

**Hough Transform**

---

# SLIDE 34. HOUGH TRANSFORM

Hough Transform đặc biệt hiệu quả để phát hiện đường thẳng.

Đường thẳng được biểu diễn dưới dạng:

$$
\rho=x\cos\theta+y\sin\theta
$$

Trong đó:

* \(\rho\): khoảng cách từ gốc tọa độ đến đường thẳng.
* \(\theta\): góc của pháp tuyến.

### Ý tưởng

Mỗi điểm biên bỏ phiếu cho các đường có thể đi qua nó.

Các đường thực sự tồn tại:

→ nhận được nhiều phiếu.

### Quy trình

```text
Edge Image
    ↓
Các điểm biên
    ↓
Hough Space (ρ, θ)
    ↓
Accumulator
    ↓
Peak
    ↓
Đường thẳng
```

---

# PHẦN 5

# PHÂN NGƯỠNG

---

# SLIDE 35. KHÁI NIỆM PHÂN NGƯỠNG

**Thresholding** là kỹ thuật phân loại pixel dựa trên giá trị cường độ.

Với ảnh mức xám:

$$
I(x,y)
$$

chọn ngưỡng \(T\):

$$
B(x,y)=
\begin{cases}
1,&I(x,y)>T\\
0,&I(x,y)\leq T
\end{cases}
$$

### Kết quả

Ảnh mức xám

→ ảnh nhị phân.

```text
Ảnh xám
    ↓
So sánh với T
    ↓
Foreground / Background
```

---

# SLIDE 36. HISTOGRAM VÀ PHÂN NGƯỠNG

Nếu ảnh gồm:

* nền tối
* vật thể sáng

histogram có thể có hai đỉnh.

```text
Số pixel
   │       /\          /\
   │      /  \        /  \
   │     /    \      /    \
   │____/______\____/______\___
             ↑
             T
        Background  Object
```

### Ý tưởng

Chọn \(T\) nằm giữa hai nhóm.

### Nhưng thực tế

Histogram có thể bị ảnh hưởng bởi:

* nhiễu
* chiếu sáng không đều
* bóng
* phản xạ
* vật thể có nhiều mức sáng

---

# SLIDE 37. PHÂN NGƯỠNG TOÀN CỤC

### Global Thresholding

Sử dụng một ngưỡng duy nhất cho toàn bộ ảnh:

$$
T(x,y)=T
$$

### Ưu điểm

* đơn giản
* nhanh
* dễ cài đặt

### Phù hợp

Khi:

* nền tương đối đồng nhất
* ánh sáng đồng đều
* histogram có sự phân tách rõ

### Không phù hợp

Khi ảnh có:

* bóng
* ánh sáng không đều
* nền thay đổi mạnh

---

# SLIDE 38. PHÂN NGƯỠNG CỤC BỘ

### Adaptive Thresholding

Ngưỡng được tính riêng cho từng vùng lân cận.

$$
T=T(x,y)
$$

Một pixel được phân loại dựa trên:

* giá trị pixel
* đặc điểm vùng lân cận

### Phù hợp

* ảnh tài liệu
* ảnh có ánh sáng không đồng đều
* ảnh có nền thay đổi

### Ý tưởng

```text
┌────────┬────────┐
│ T₁     │ T₂     │
│        │        │
├────────┼────────┤
│ T₃     │ T₄     │
│        │        │
└────────┴────────┘

Mỗi vùng có thể có ngưỡng khác nhau.
```

---

# SLIDE 39. OTSU THRESHOLDING

### Mục tiêu

Tự động tìm ngưỡng \(T\) sao cho hai lớp:

* Background
* Foreground

được phân tách tốt nhất.

Otsu tối đa hóa **between-class variance**:

$$
\sigma_B^2
=
\omega_0\omega_1
(\mu_0-\mu_1)^2
$$

Trong đó:

* \(\omega_0,\omega_1\): xác suất của hai lớp.
* \(\mu_0,\mu_1\): trung bình mức xám của hai lớp.

### Ý tưởng

Thử các giá trị \(T\):

$$
T=0,1,\ldots,255
$$

và chọn:

$$
T^*=\arg\max_T \sigma_B^2(T)
$$

---

# SLIDE 40. KHI NÀO OTSU HOẠT ĐỘNG TỐT?

### Phù hợp

Histogram có hai nhóm tương đối rõ:

```text
Background       Object

    /\              /\
   /  \            /  \
__/    \__________/    \__
```

### Không lý tưởng

Khi:

* histogram không có hai nhóm rõ ràng
* chiếu sáng không đồng đều
* nhiều vật thể có mức xám chồng lấn
* ảnh có nhiều vùng phức tạp

### Ghi nhớ

> Otsu là **tự động chọn ngưỡng**, nhưng không có nghĩa là luôn cho kết quả tốt trên mọi ảnh.

---

# SLIDE 41. THỰC HÀNH: OTSU VÀ ADAPTIVE THRESHOLD

```python
import cv2
import matplotlib.pyplot as plt

img = cv2.imread(
    "sample.jpg",
    cv2.IMREAD_GRAYSCALE
)

_, otsu = cv2.threshold(
    img,
    0,
    255,
    cv2.THRESH_BINARY + cv2.THRESH_OTSU
)

adaptive = cv2.adaptiveThreshold(
    img,
    255,
    cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv2.THRESH_BINARY,
    11,
    2
)
```

### So sánh

Hiển thị:

1. Ảnh gốc
2. Global/Otsu
3. Adaptive

### Câu hỏi

* Phương pháp nào tốt hơn khi ánh sáng không đồng đều?
* Điều gì xảy ra khi thay đổi kích thước vùng lân cận?
* Điều gì xảy ra khi thay đổi \(C\)?

---

# SLIDE 42. ĐA NGƯỠNG

Khi ảnh chứa nhiều nhóm mức xám, một ngưỡng duy nhất có thể không đủ.

Ví dụ sử dụng hai ngưỡng:

$$
T_1<T_2
$$

Ta có:

$$
R_1: I<T_1
$$

$$
R_2: T_1\leq I<T_2
$$

$$
R_3: I\geq T_2
$$

### Ý nghĩa

Ảnh được chia thành nhiều lớp thay vì chỉ:

```text
Background / Object
```

### Hạn chế

Số ngưỡng tăng:

→ số khả năng cần xem xét tăng

→ chi phí tính toán tăng.

---

# PHẦN 6

# PHÂN ĐOẠN DỰA TRÊN VÙNG

---

# SLIDE 43. PHƯƠNG PHÁP DỰA TRÊN VÙNG

Các phương pháp dựa trên vùng không tập trung trực tiếp vào sự thay đổi tại biên.

Thay vào đó, chúng tìm các vùng:

> **có tính đồng nhất về một hoặc nhiều đặc trưng.**

Hai hướng chính:

### Region Growing

Bắt đầu từ một hoặc nhiều **seed** và phát triển vùng.

### Split & Merge

* Chia vùng lớn thành các vùng nhỏ.
* Sau đó hợp nhất các vùng tương đồng.

---

# SLIDE 44. REGION GROWING – Ý TƯỞNG

### Seed

Một hoặc nhiều pixel được chọn làm điểm bắt đầu.

```text
┌───────────────┐
│               │
│       ●       │ ← Seed
│               │
│               │
└───────────────┘
```

### Phát triển

Xét các pixel lân cận.

Nếu pixel đủ giống vùng hiện tại:

→ thêm vào vùng.

Tiếp tục cho đến khi không còn pixel phù hợp.

---

# SLIDE 45. TIÊU CHÍ PHÁT TRIỂN VÙNG

Có thể dựa trên:

### Cường độ

$$
|I(p)-I(seed)|<T
$$

### Màu sắc

$$
d(C_p,C_{region})<T
$$

### Texture

So sánh đặc trưng kết cấu của vùng.

### Kết nối

Chỉ xem xét các pixel:

* 4-lân cận
* hoặc 8-lân cận

---

# SLIDE 46. 4-CONNECTIVITY VÀ 8-CONNECTIVITY

### 4-lân cận

```text
    N
    |
W --P-- E
    |
    S
```

### 8-lân cận

```text
NW N NE
 W P  E
SW S SE
```

### Ý nghĩa

8-connectivity cho phép vùng phát triển theo đường chéo.

Do đó:

> 8-lân cận thường tạo vùng liên kết mạnh hơn 4-lân cận.

---

# SLIDE 47. THUẬT TOÁN REGION GROWING

### Quy trình

1. Chọn seed.
2. Đưa seed vào vùng hiện tại.
3. Xét các pixel lân cận.
4. Kiểm tra tiêu chí tương đồng.
5. Nếu phù hợp → thêm pixel vào vùng.
6. Đưa pixel mới vào danh sách cần xét.
7. Lặp lại cho đến khi không còn pixel phù hợp.

```text
Seed
 ↓
Neighbors
 ↓
Similarity test
 ↓
Add pixels
 ↓
New neighbors
 ↓
...
```

### Kết quả

Một vùng được tạo ra từ seed ban đầu.

---

# SLIDE 48. THỰC HÀNH: REGION GROWING

```python
import cv2
import numpy as np

def region_growing(
    img,
    seed,
    threshold=10
):
    height, width = img.shape

    segmented = np.zeros_like(img)

    seed_value = img[
        seed[1],
        seed[0]
    ]

    queue = [seed]

    segmented[
        seed[1],
        seed[0]
    ] = 255

    while queue:
        x, y = queue.pop(0)

        for dx in range(-1, 2):
            for dy in range(-1, 2):

                nx = x + dx
                ny = y + dy

                if (
                    0 <= nx < width
                    and 0 <= ny < height
                ):
                    if segmented[ny, nx] == 0:

                        difference = abs(
                            int(img[ny, nx])
                            - int(seed_value)
                        )

                        if difference <= threshold:
                            segmented[ny, nx] = 255
                            queue.append((nx, ny))

    return segmented
```

### Thử nghiệm

Thay đổi:

```python
seed
threshold
```

và quan sát kích thước vùng.

---

# SLIDE 49. ƯU VÀ NHƯỢC ĐIỂM REGION GROWING

### Ưu điểm

* Dễ hiểu
* Dễ cài đặt
* Có thể tạo vùng liên thông
* Phù hợp khi vùng có tính đồng nhất cao

### Nhược điểm

* Phụ thuộc vào seed
* Phụ thuộc vào tiêu chí tương đồng
* Nhạy với nhiễu
* Có thể phát triển sai sang vùng khác

### Vấn đề quan trọng

> **Chọn seed và tiêu chí dừng quyết định mạnh đến kết quả.**

---

# SLIDE 50. SPLIT & MERGE

### Ý tưởng

Thay vì bắt đầu từ seed:

1. Xét toàn bộ ảnh.
2. Nếu vùng không đồng nhất → **Split**.
3. Sau khi chia → tìm các vùng tương đồng.
4. Hợp nhất chúng → **Merge**.

```text
       Toàn ảnh
          │
      Không đồng nhất?
       /          \
     Yes           No
      ↓             ↓
    Split          Giữ
      ↓
 Các vùng nhỏ
      ↓
   Merge vùng
  tương đồng
```

---

# SLIDE 51. SPLIT – CHIA VÙNG

Sử dụng cấu trúc **quadtree**.

```text
┌──────────────┐
│              │
│   Ảnh        │
│              │
└──────────────┘

        ↓

┌───────┬───────┐
│       │       │
├───────┼───────┤
│       │       │
└───────┴───────┘
```

Nếu một vùng chưa đồng nhất:

→ chia thành 4 vùng con.

Tiếp tục đệ quy.

### Tiêu chí đồng nhất

Có thể sử dụng:

* phương sai
* độ lệch chuẩn
* khoảng cường độ
* đặc trưng màu

---

# SLIDE 52. MERGE – HỢP NHẤT VÙNG

Sau khi Split:

```text
┌───┬───┐
│ A │ B │
├───┼───┤
│ C │ D │
└───┴───┘
```

Nếu:

$$
P(A\cup B)=TRUE
$$

→ hợp nhất A và B.

### Mục tiêu

Tránh:

* quá nhiều vùng nhỏ
* phân đoạn quá mức
* các vùng tương đồng bị tách rời không cần thiết

---

# SLIDE 53. REGION GROWING VS SPLIT & MERGE

| Đặc điểm       | Region Growing      | Split & Merge          |
| -------------- | ------------------- | ---------------------- |
| Điểm bắt đầu   | Seed                | Toàn ảnh               |
| Hướng xử lý    | Từ nhỏ → lớn        | Lớn → nhỏ → hợp lại    |
| Phụ thuộc seed | Có                  | Không trực tiếp        |
| Cấu trúc       | Phát triển vùng     | Quadtree               |
| Tiêu chí       | Tương đồng với vùng | Đồng nhất / tương đồng |
| Nhược điểm     | Seed-sensitive      | Có thể tốn tính toán   |

### Ghi nhớ

Hai phương pháp đều dựa trên:

> **Tính đồng nhất của vùng**

nhưng bắt đầu và tổ chức quá trình phân đoạn khác nhau.

---

# PHẦN 7

# PHÂN ĐOẠN BẰNG PHÂN CỤM

---

# SLIDE 54. Ý TƯỞNG PHÂN CỤM

Thay vì xác định vùng trực tiếp trên ảnh:

> Xem mỗi pixel là một điểm trong **không gian đặc trưng**.

Ví dụ ảnh màu:

$$
p=(R,G,B)
$$

Có thể bổ sung tọa độ:

$$
p=(R,G,B,x,y)
$$

### Mục tiêu

Các pixel tương đồng:

→ cùng một cluster.

Các cluster:

→ được xem như các vùng ảnh.

---

# SLIDE 55. K-MEANS CHO PHÂN ĐOẠN ẢNH

### Ý tưởng

Cho \(K\) cụm.

Mỗi pixel được gán vào centroid gần nhất.

### Quy trình

1. Chọn \(K\) centroid ban đầu.
2. Gán pixel vào centroid gần nhất.
3. Tính lại centroid.
4. Lặp lại bước 2–3.
5. Dừng khi centroid ổn định.

```text
Pixels
  ↓
Initial centroids
  ↓
Assignment
  ↓
Update centroids
  ↓
Assignment
  ↓
...
  ↓
Converged
```

---

# SLIDE 56. HÀM MỤC TIÊU K-MEANS

K-Means tối thiểu hóa:

$$
J=
\sum_{k=1}^{K}
\sum_{x_i\in C_k}
\|x_i-\mu_k\|^2
$$

Trong đó:

* \(C_k\): cụm thứ \(k\)
* \(\mu_k\): centroid của cụm
* \(x_i\): một pixel/điểm dữ liệu

### Ý nghĩa

Pixel càng gần centroid:

→ càng có khả năng thuộc cụm đó.

---

# SLIDE 57. K-MEANS VỚI ẢNH MÀU

Ví dụ:

```python
pixel_values = img.reshape((-1, 3))
pixel_values = np.float32(pixel_values)
```

Từ:

$$
H\times W\times3
$$

chuyển thành:

$$
(HW)\times3
$$

Mỗi hàng tương ứng với một pixel:

```text
[R, G, B]
[R, G, B]
[R, G, B]
...
```

Sau khi phân cụm:

→ đưa nhãn trở lại kích thước ảnh ban đầu.

---

# SLIDE 58. THỰC HÀNH: PHÂN ĐOẠN ẢNH BẰNG K-MEANS

```python
import cv2
import numpy as np

img = cv2.imread("sample.jpg")
img = cv2.cvtColor(
    img,
    cv2.COLOR_BGR2RGB
)

pixels = img.reshape((-1, 3))
pixels = np.float32(pixels)

criteria = (
    cv2.TERM_CRITERIA_EPS
    + cv2.TERM_CRITERIA_MAX_ITER,
    100,
    0.2
)

K = 3

_, labels, centers = cv2.kmeans(
    pixels,
    K,
    None,
    criteria,
    10,
    cv2.KMEANS_RANDOM_CENTERS
)

labels = labels.reshape(
    img.shape[:2]
)

segmented = np.uint8(
    centers
)[labels]
```

### Thử nghiệm

Thay đổi:

```python
K = 2
K = 3
K = 5
K = 8
```

và so sánh kết quả.

---

# SLIDE 59. ẢNH HƯỞNG CỦA K

### K nhỏ

Ví dụ:

$$
K=2
$$

→ ít vùng màu.

### K lớn

Ví dụ:

$$
K=8
$$

→ nhiều vùng màu hơn.

### Quan sát

```text
K nhỏ
→ phân đoạn thô

K lớn
→ phân đoạn chi tiết hơn
```

Nhưng:

> K lớn không đồng nghĩa với phân đoạn tốt hơn.

Cần lựa chọn \(K\) phù hợp với mục tiêu bài toán.

---

# SLIDE 60. HẠN CHẾ CỦA K-MEANS

K-Means cơ bản:

* Không hiểu rõ cấu trúc không gian của ảnh.
* Có thể gom hai vùng xa nhau nhưng có màu giống nhau vào cùng cluster.
* Nhạy với centroid khởi tạo.
* Cần xác định \(K\) trước.
* Có thể bị ảnh hưởng bởi nhiễu và outlier.

Ví dụ:

```text
Vùng A                 Vùng B

██████                 ██████
██████                 ██████

Cùng màu
→ K-Means có thể xem chúng là cùng cluster
```

Điều này dẫn đến ý tưởng **superpixel**.

---

# PHẦN 8

# SUPERPIXELS

---

# SLIDE 61. SUPERPIXEL LÀ GÌ?

**Superpixel** là một nhóm pixel lân cận có đặc trưng tương đồng.

Thay vì xử lý:

$$
H\times W
$$

pixel riêng biệt, ảnh được biểu diễn bằng một số lượng nhỏ các superpixel.

Ví dụ:

```text
Ảnh 640 × 480
= 307,200 pixel

↓

~500 superpixels
```

### Ý tưởng

Một superpixel thường:

* chứa các pixel lân cận
* có màu sắc tương đồng
* bám tương đối tốt theo biên vật thể

---

# SLIDE 62. TẠI SAO DÙNG SUPERPIXEL?

### Giảm độ phức tạp

Thay vì xử lý hàng trăm nghìn pixel:

→ xử lý vài trăm hoặc vài nghìn superpixel.

### Giữ thông tin cấu trúc

Superpixel thường bám theo:

* biên
* hình dạng
* vùng màu

### Ứng dụng

* Tiền xử lý segmentation
* Object recognition
* Tracking
* Image analysis
* Graph-based vision

---

# SLIDE 63. K-MEANS VS SUPERPIXEL

### K-Means

Tập trung vào:

> **Độ tương đồng của đặc trưng**

### Superpixel

Tập trung đồng thời vào:

> **Đặc trưng + tính lân cận không gian**

Ví dụ:

```text
K-Means

Pixel giống màu
        ↓
Có thể ở xa nhau
        ↓
Cùng cluster
```

Trong khi superpixel:

```text
Giống màu
   +
Gần nhau
   +
Bám cấu trúc không gian
   ↓
Superpixel
```

---

# SLIDE 64. SLIC – SIMPLE LINEAR ITERATIVE CLUSTERING

SLIC là một thuật toán phổ biến để tạo superpixel.

### Ý tưởng

SLIC dựa trên tư tưởng của K-Means nhưng thêm thông tin **vị trí không gian**.

Với ảnh màu, thường chuyển sang không gian:

$$
CIELAB
$$

Mỗi pixel được biểu diễn bởi:

$$
[L,a,b,x,y]
$$

### Hai loại thông tin

* Màu sắc: \(L,a,b\)
* Vị trí: \(x,y\)

---

# SLIDE 65. KHOẢNG CÁCH TRONG SLIC

Khoảng cách màu:

$$
d_c=
\sqrt{
(L_i-L_j)^2+
(a_i-a_j)^2+
(b_i-b_j)^2
}
$$

Khoảng cách không gian:

$$
d_s=
\sqrt{
(x_i-x_j)^2+
(y_i-y_j)^2
}
$$

Sau đó kết hợp:

$$
D=
\sqrt{
d_c^2+
\left(
\frac{m}{S}
\right)^2d_s^2
}
$$

Trong đó:

* \(S\): khoảng cách lưới khởi tạo.
* \(m\): hệ số compactness.

---

# SLIDE 66. Ý NGHĨA CỦA COMPACTNESS

Tham số \(m\) cân bằng:

* độ tương đồng màu
* tính gọn về không gian

### \(m\) nhỏ

→ ưu tiên màu sắc.

Superpixel có thể bám biên phức tạp hơn.

### \(m\) lớn

→ ưu tiên vị trí.

Superpixel có xu hướng:

* đều hơn
* compact hơn
* gần dạng hình học đều đặn.

---

# SLIDE 67. QUY TRÌNH SLIC

```text
Ảnh màu
   ↓
Chuyển sang CIELAB
   ↓
Khởi tạo các centroid
   ↓
Xét vùng lân cận centroid
   ↓
Tính khoảng cách màu + không gian
   ↓
Gán pixel
   ↓
Cập nhật centroid
   ↓
Lặp lại
   ↓
Superpixels
```

### Điểm quan trọng

SLIC không cần so sánh mỗi pixel với mọi centroid.

Nó chỉ tìm kiếm trong vùng không gian lân cận.

→ giúp thuật toán hiệu quả hơn.

---

# SLIDE 68. THỰC HÀNH: SLIC SUPERPIXELS

```python
from skimage.segmentation import slic
from skimage import io
import matplotlib.pyplot as plt

img = io.imread("sample.jpg")

segments = slic(
    img,
    n_segments=100,
    compactness=10,
    sigma=1
)

plt.imshow(
    segments,
    cmap="nipy_spectral"
)

plt.title("SLIC Superpixels")
plt.axis("off")
plt.show()
```

### Thử nghiệm

Thay đổi:

```python
n_segments
compactness
sigma
```

và quan sát:

* số lượng superpixel
* kích thước superpixel
* khả năng bám biên

---

# PHẦN 9

# TỔNG KẾT CHƯƠNG

---

# SLIDE 69. BẢN ĐỒ KIẾN THỨC

```text
                 PHÂN ĐOẠN ẢNH
                       │
        ┌──────────────┼──────────────┐
        │              │              │
      Biên          Ngưỡng          Vùng
        │              │              │
  ┌─────┼─────┐    ┌───┼────┐    ┌───┴────┐
  │     │     │    │   │    │    │        │
Sobel Canny LoG Global Otsu Adaptive Growing
                                      │
                                 Split & Merge
        │
        └──────────────┐
                       │
                    Phân cụm
                       │
                   K-Means
                       │
                   Superpixel
                       │
                     SLIC
```

---

# SLIDE 70. SO SÁNH CÁC PHƯƠNG PHÁP

| Nhóm                     | Ý tưởng chính             | Ví dụ          |
| ------------------------ | ------------------------- | -------------- |
| Dựa trên điểm/đường      | Phát hiện cấu trúc cục bộ | Point, Line    |
| Dựa trên gradient        | Tìm thay đổi cường độ     | Sobel, Prewitt |
| Dựa trên đạo hàm bậc hai | Zero-crossing             | LoG            |
| Dựa trên biên nâng cao   | Kết hợp nhiều bước        | Canny          |
| Thresholding             | Phân loại theo mức xám    | Otsu           |
| Region-based             | Tính đồng nhất vùng       | Region Growing |
| Split & Merge            | Chia và hợp nhất vùng     | Quadtree       |
| Clustering               | Nhóm pixel theo đặc trưng | K-Means        |
| Superpixel               | Nhóm pixel lân cận        | SLIC           |

---

# SLIDE 71. LỰA CHỌN PHƯƠNG PHÁP

### Nếu cần tìm ranh giới vật thể

→ Edge Detection

Ví dụ:

**Canny**

### Nếu foreground/background khác nhau rõ về cường độ

→ Thresholding

Ví dụ:

**Otsu**

### Nếu vùng có tính đồng nhất cao

→ Region Growing

### Nếu muốn phân nhóm theo màu

→ K-Means

### Nếu muốn giảm số lượng pixel nhưng giữ cấu trúc không gian

→ Superpixel / SLIC

### Không có phương pháp duy nhất phù hợp cho mọi ảnh

Việc lựa chọn phụ thuộc vào:

* đặc điểm ảnh
* nhiễu
* chiếu sáng
* mục tiêu phân đoạn
* tài nguyên tính toán

---

# SLIDE 72. KẾT NỐI VỚI COMPUTER VISION

Các kỹ thuật trong chương này thường là **bước tiền xử lý hoặc bước trung gian** trong hệ thống Computer Vision.

Ví dụ:

```text
Image
  ↓
Preprocessing
  ↓
Edge / Threshold / Segmentation
  ↓
Region / Object
  ↓
Feature Extraction
  ↓
Recognition
```

Trong các hệ thống hiện đại:

```text
Image
  ↓
Deep Learning
  ↓
Detection / Segmentation
```

Tuy nhiên, các kỹ thuật truyền thống vẫn quan trọng vì chúng giúp hiểu:

* ảnh được cấu tạo như thế nào
* biên hình thành như thế nào
* vùng được xác định như thế nào
* đặc trưng ảnh có thể được sử dụng ra sao

---

# SLIDE 73. CÂU HỎI ÔN TẬP

### Câu 1

Biên ảnh là gì? Tại sao gradient có thể được sử dụng để phát hiện biên?

### Câu 2

So sánh Roberts, Prewitt và Sobel.

### Câu 3

Tại sao Canny cần bước Non-Maximum Suppression?

### Câu 4

Tại sao Canny sử dụng hai ngưỡng thay vì một ngưỡng?

### Câu 5

Otsu lựa chọn ngưỡng dựa trên nguyên tắc nào?

### Câu 6

Global Thresholding khác Adaptive Thresholding như thế nào?

### Câu 7

Region Growing phụ thuộc vào những yếu tố nào?

### Câu 8

Split & Merge khác Region Growing ở đâu?

### Câu 9

Tại sao K-Means có thể gom hai vùng xa nhau vào cùng một cluster?

### Câu 10

SLIC cải thiện ý tưởng K-Means cho ảnh như thế nào?

---

# SLIDE 74. BÀI TẬP TỔNG HỢP

Cho một ảnh màu bất kỳ.

Thực hiện các bước:

### Bài 1 – Edge Detection

So sánh:

* Sobel
* Canny

### Bài 2 – Thresholding

So sánh:

* Otsu
* Adaptive Thresholding

### Bài 3 – Clustering

Phân đoạn ảnh bằng:

* K-Means với \(K=2\)
* \(K=4\)
* \(K=6\)

### Bài 4 – Superpixel

Tạo:

* 50 superpixels
* 100 superpixels
* 200 superpixels

### Bài 5 – Phân tích

Trả lời:

* Phương pháp nào giữ biên tốt nhất?
* Phương pháp nào nhạy với nhiễu?
* Khi nào thresholding thất bại?
* K-Means có giữ được cấu trúc không gian không?
* SLIC giải quyết vấn đề gì?

---

# SLIDE 75. KẾT LUẬN CHƯƠNG

### Ba ý tưởng quan trọng nhất

**1. Biên**

> Tìm nơi ảnh thay đổi mạnh.

**2. Vùng**

> Tìm các pixel có tính chất tương đồng.

**3. Phân cụm / Superpixel**

> Nhóm các pixel dựa trên đặc trưng và/hoặc vị trí.

### Chuỗi tư duy

```text
Thay đổi cường độ
       ↓
     Biên

Tương đồng cường độ
       ↓
   Threshold

Tương đồng vùng
       ↓
 Region Growing
 Split & Merge

Tương đồng đặc trưng
       ↓
    K-Means

Tương đồng + lân cận không gian
       ↓
     SLIC
```

### Kết thúc chương

**Phát hiện biên và phân vùng là nền tảng để chuyển từ "ảnh" sang "cấu trúc có ý nghĩa", tạo tiền đề cho các bài toán nhận dạng, phát hiện và phân tích đối tượng trong Computer Vision.**
