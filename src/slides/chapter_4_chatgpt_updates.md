# CHƯƠNG 4 – CHUẨN HÓA CÔNG THỨC VÀ KÝ HIỆU

## SLIDE 4. ĐIỀU KIỆN CỦA MỘT PHÂN ĐOẠN ẢNH

Cho không gian ảnh \(R\), phân đoạn ảnh gồm \(n\) vùng:

$$
R_1,R_2,\ldots,R_n
$$

thỏa mãn:

### 1. Phân đoạn đầy đủ

$$
\bigcup_{i=1}^{n}R_i=R
$$

Mọi pixel trong ảnh đều thuộc một vùng.

### 2. Mỗi vùng liên thông

Mỗi \(R_i\) là một tập hợp liên thông theo một quy tắc lân cận đã chọn, chẳng hạn 4-liên thông hoặc 8-liên thông.

### 3. Các vùng đôi một rời nhau

$$
R_i\cap R_j=\varnothing,
\qquad i\ne j
$$

### 4. Các pixel trong cùng vùng thỏa mãn predicate

Với predicate \(P\):

$$
P(R_i)=TRUE,
\qquad i=1,\ldots,n
$$

### 5. Hai vùng kề nhau không thể hợp nhất mà vẫn đồng nhất

Nếu \(R_i\) và \(R_j\) là hai vùng kề nhau:

$$
P(R_i\cup R_j)=FALSE
$$

---

# PHÁT HIỆN ĐIỂM, ĐƯỜNG VÀ BIÊN

## SLIDE 10. PHÁT HIỆN ĐIỂM BIỆT LẬP

Cho ảnh mức xám \(I(x,y)\).

Sử dụng mặt nạ Laplacian:

$$
W=
\begin{bmatrix}
-1&-1&-1\\
-1&8&-1\\
-1&-1&-1
\end{bmatrix}
$$

Đáp ứng tại pixel \((x,y)\):

$$
R(x,y)=(W*I)(x,y)
$$

trong đó \(*\) là phép tích chập.

Một điểm biệt lập được phát hiện nếu:

$$
|R(x,y)|>T
$$

với \(T\) là ngưỡng phát hiện.

> Dùng \(R(x,y)\) cho **response**, tránh dùng \(R\) vừa cho response vừa cho region.

---

## SLIDE 12. PHÁT HIỆN ĐƯỜNG

Với mỗi hướng đường, sử dụng một mặt nạ tương ứng.

Ví dụ mặt nạ phát hiện đường ngang:

$$
W_h=
\begin{bmatrix}
-1&-1&-1\\
2&2&2\\
-1&-1&-1
\end{bmatrix}
$$

Đáp ứng:

$$
R_h(x,y)=(W_h*I)(x,y)
$$

Điểm thuộc đường ngang được phát hiện khi:

$$
|R_h(x,y)|>T
$$

Tương tự, có thể xây dựng các mặt nạ cho:

* đường dọc
* đường chéo \(+45^\circ\)
* đường chéo \(-45^\circ\)

---

# PHÁT HIỆN BIÊN

## SLIDE 15. GRADIENT CỦA ẢNH

Với ảnh mức xám \(I(x,y)\), gradient là:

$$
\nabla I(x,y)=
\begin{bmatrix}
G_x(x,y)\\
G_y(x,y)
\end{bmatrix}
$$

trong đó:

$$
G_x(x,y)=
\frac{\partial I(x,y)}{\partial x}
$$

$$
G_y(x,y)=
\frac{\partial I(x,y)}{\partial y}
$$

### Độ lớn gradient

$$
M(x,y)=
\|\nabla I(x,y)\|
=
\sqrt{G_x^2(x,y)+G_y^2(x,y)}
$$

### Hướng gradient

$$
\theta(x,y)=
\operatorname{atan2}
\left(G_y(x,y),G_x(x,y)\right)
$$

> Dùng \(\operatorname{atan2}\) thay cho \(\tan^{-1}(G_y/G_x)\) để xác định hướng đúng trong cả bốn góc phần tư và tránh trường hợp \(G_x=0\).

---

## SLIDE 17. TOÁN TỬ ROBERTS

Có thể xấp xỉ gradient bằng hai mặt nạ Roberts:

$$
G_x=
\begin{bmatrix}
1&0\\
0&-1
\end{bmatrix}
*I
$$

$$
G_y=
\begin{bmatrix}
0&1\\
-1&0
\end{bmatrix}
*I
$$

Sau đó:

$$
M=
\sqrt{G_x^2+G_y^2}
$$

---

## SLIDE 18. TOÁN TỬ PREWITT

Hai mặt nạ Prewitt:

$$
G_x=
\begin{bmatrix}
-1&0&1\\
-1&0&1\\
-1&0&1
\end{bmatrix}
*I
$$

$$
G_y=
\begin{bmatrix}
-1&-1&-1\\
0&0&0\\
1&1&1
\end{bmatrix}
*I
$$

Sau đó tính:

$$
M=
\sqrt{G_x^2+G_y^2}
$$

---

## SLIDE 19. TOÁN TỬ SOBEL

Hai mặt nạ Sobel:

$$
G_x=
\begin{bmatrix}
-1&0&1\\
-2&0&2\\
-1&0&1
\end{bmatrix}
*I
$$

$$
G_y=
\begin{bmatrix}
-1&-2&-1\\
0&0&0\\
1&2&1
\end{bmatrix}
*I
$$

Độ lớn gradient:

$$
M=
\sqrt{G_x^2+G_y^2}
$$

Trong thực tế có thể sử dụng xấp xỉ:

$$
M\approx |G_x|+|G_y|
$$

---

## SLIDE 21. ĐỘ LỚN GRADIENT

Sau khi tính \(G_x\) và \(G_y\):

$$
M(x,y)=
\sqrt{
G_x^2(x,y)+G_y^2(x,y)
}
$$

Trong đó:

* \(M(x,y)\) lớn → khả năng xuất hiện biên cao.
* \(M(x,y)\) nhỏ → vùng ảnh tương đối đồng nhất.

---

## SLIDE 22. KẾT HỢP GRADIENT VỚI PHÂN NGƯỠNG

Ảnh gradient \(M(x,y)\) được chuyển thành ảnh biên nhị phân:

$$
E(x,y)=
\begin{cases}
1,&M(x,y)>T\\
0,&M(x,y)\leq T
\end{cases}
$$

Trong đó:

* \(E(x,y)=1\): pixel được xem là biên.
* \(E(x,y)=0\): pixel không được xem là biên.
* \(T\): ngưỡng biên.

### Lưu ý

Nếu ảnh cần hiển thị bằng OpenCV:

$$
0\rightarrow0,\qquad
1\rightarrow255
$$

tức là ảnh nhị phân thường được biểu diễn bằng:

```text
0   → nền
255 → biên
```

---

# LAPLACIAN

## SLIDE 24. LAPLACIAN VÀ PHÁT HIỆN BIÊN

Laplacian của ảnh \(I(x,y)\):

$$
\nabla^2 I
=
\frac{\partial^2 I}{\partial x^2}
+
\frac{\partial^2 I}{\partial y^2}
$$

Biên thường được xác định tại vị trí **zero-crossing**, tức là nơi đáp ứng Laplacian đổi dấu.

Ví dụ:

$$
\nabla^2I(x_1,y_1)>0
$$

và

$$
\nabla^2I(x_2,y_2)<0
$$

trong vùng lân cận

→ có khả năng xuất hiện zero-crossing giữa hai vị trí.

---

## SLIDE 25. LOG – LAPLACIAN OF GAUSSIAN

Làm trơn ảnh bằng Gaussian:

$$
I_s=G_\sigma*I
$$

Sau đó tính Laplacian:

$$
L=
\nabla^2I_s
=
\nabla^2(G_\sigma*I)
$$

Sau cùng tìm các zero-crossing của \(L\).

### Quy trình

$$
I
\rightarrow
G_\sigma*I
\rightarrow
\nabla^2I_s
\rightarrow
Zero\text{-}crossing
\rightarrow
Edge
$$

---

# CANNY

## SLIDE 27. BƯỚC 1 – GAUSSIAN BLUR

Ảnh sau khi làm trơn:

$$
I_s(x,y)
=
G_\sigma(x,y)*I(x,y)
$$

Trong đó:

* \(G_\sigma\): Gaussian kernel.
* \(\sigma\): tham số điều khiển mức độ làm trơn.

---

## SLIDE 28. BƯỚC 2 – TÍNH GRADIENT

Từ ảnh đã làm trơn \(I_s\):

$$
G_x=
\frac{\partial I_s}{\partial x}
$$

$$
G_y=
\frac{\partial I_s}{\partial y}
$$

Độ lớn:

$$
M=
\sqrt{G_x^2+G_y^2}
$$

Hướng:

$$
\theta=
\operatorname{atan2}(G_y,G_x)
$$

---

## SLIDE 29. BƯỚC 3 – NON-MAXIMUM SUPPRESSION

Với mỗi pixel, xét theo hướng gradient \(\theta\).

Chỉ giữ pixel nếu:

$$
M(x,y)
$$

là cực đại cục bộ theo hướng gradient.

Các pixel không phải cực đại:

$$
M(x,y)\rightarrow0
$$

### Mục tiêu

Biến các vùng biên dày thành các đường biên mảnh, thường gần một pixel.

---

## SLIDE 30. BƯỚC 4 – DOUBLE THRESHOLD

Sử dụng hai ngưỡng:

$$
T_L<T_H
$$

### Biên mạnh

$$
M>T_H
$$

### Biên yếu

$$
T_L\leq M\leq T_H
$$

### Không phải biên

$$
M<T_L
$$

---

## SLIDE 31. BƯỚC 5 – HYSTERESIS

Biên mạnh được giữ lại.

Biên yếu chỉ được giữ nếu có liên kết với một biên mạnh thông qua các pixel biên lân cận.

Có thể biểu diễn:

$$
E(x,y)=
\begin{cases}
1,&M(x,y)>T_H\\
1,&T_L\le M(x,y)\le T_H
\text{ và liên thông với biên mạnh}\\
0,&M(x,y)<T_L\\
0,&\text{biên yếu không liên thông với biên mạnh}
\end{cases}
$$

> Trong Canny, \(T_L\) và \(T_H\) phải được dùng thống nhất ở tất cả các slide; không dùng lúc thì \(T_{low},T_{high}\), lúc thì \(T_1,T_2\).

---

# THRESHOLDING

## SLIDE 35. PHÂN NGƯỠNG

Với ảnh mức xám \(I(x,y)\), ảnh nhị phân:

$$
B(x,y)=
\begin{cases}
1,&I(x,y)>T\\
0,&I(x,y)\leq T
\end{cases}
$$

Trong đó:

* \(T\): ngưỡng.
* \(B(x,y)=1\): foreground.
* \(B(x,y)=0\): background.

### Nếu sử dụng quy ước OpenCV

Có thể biểu diễn:

$$
B(x,y)=
\begin{cases}
255,&I(x,y)>T\\
0,&I(x,y)\leq T
\end{cases}
$$

Hai cách biểu diễn **0/1** và **0/255** đều hợp lệ, nhưng trong cùng một phần thực hành nên chọn một quy ước. Với OpenCV, nên dùng **0/255**.

---

## SLIDE 37. GLOBAL THRESHOLDING

Ngưỡng giống nhau trên toàn ảnh:

$$
T(x,y)=T
$$

Kết quả:

$$
B(x,y)=
\begin{cases}
1,&I(x,y)>T\\
0,&I(x,y)\leq T
\end{cases}
$$

### Ý nghĩa

Chỉ có **một giá trị \(T\)** cho toàn bộ ảnh.

---

## SLIDE 38. ADAPTIVE THRESHOLDING

Trong phân ngưỡng thích nghi:

$$
T=T(x,y)
$$

Ngưỡng tại mỗi pixel được xác định từ vùng lân cận.

Ví dụ dạng tổng quát:

$$
B(x,y)=
\begin{cases}
1,&I(x,y)>T(x,y)\\
0,&I(x,y)\leq T(x,y)
\end{cases}
$$

Trong OpenCV, các phương pháp thường gặp:

* Mean adaptive threshold
* Gaussian adaptive threshold

Ví dụ Gaussian:

$$
T(x,y)=
\text{WeightedMean}(N(x,y))-C
$$

trong đó:

* \(N(x,y)\): vùng lân cận.
* \(C\): hằng số điều chỉnh.

---

# OTSU

## SLIDE 39. OTSU THRESHOLDING

Với một ngưỡng \(T\), histogram được chia thành hai lớp:

$$
C_0=\{I(x,y)\le T\}
$$

$$
C_1=\{I(x,y)>T\}
$$

Gọi:

* \(\omega_0(T)\): xác suất lớp \(C_0\)
* \(\omega_1(T)\): xác suất lớp \(C_1\)
* \(\mu_0(T)\): trung bình lớp \(C_0\)
* \(\mu_1(T)\): trung bình lớp \(C_1\)

Phương sai giữa hai lớp:

$$
\sigma_B^2(T)
=
\omega_0(T)\omega_1(T)
\left[
\mu_0(T)-\mu_1(T)
\right]^2
$$

Ngưỡng Otsu:

$$
T^*
=
\arg\max_T
\sigma_B^2(T)
$$

### Ý nghĩa

Chọn ngưỡng làm cho hai lớp có sự khác biệt thống kê lớn nhất.

---

## SLIDE 40. ĐIỀU KIỆN CỦA OTSU

Otsu thường hoạt động tốt khi histogram có hai lớp tương đối rõ.

### Phù hợp

$$
\text{Background}\quad|\quad\text{Object}
$$

có sự phân tách rõ về mức xám.

### Có thể kém hiệu quả khi

* histogram không hai đỉnh rõ ràng
* chiếu sáng không đồng đều
* các lớp có mức xám chồng lấn mạnh

> **Otsu là phương pháp tự động chọn \(T\), không phải phương pháp bảo đảm phân đoạn tối ưu cho mọi ảnh.**

---

## SLIDE 42. MULTI-THRESHOLDING

Với \(K\) mức phân đoạn, cần \(K-1\) ngưỡng:

$$
T_1<T_2<\cdots<T_{K-1}
$$

Ảnh được chia thành:

$$
R_1=\{I\le T_1\}
$$

$$
R_2=\{T_1<I\le T_2\}
$$

$$
\vdots
$$

$$
R_K=\{I>T_{K-1}\}
$$

### Lưu ý

Không nên gọi vector ngưỡng là \(T\) nếu ở các slide khác \(T\) đã được dùng cho **một ngưỡng**.

Quy ước:

$$
\mathbf{T}=
(T_1,T_2,\ldots,T_{K-1})
$$

là vector các ngưỡng.

---

# REGION GROWING

## SLIDE 45. TIÊU CHÍ PHÁT TRIỂN VÙNG

Gọi:

* \(S\): seed ban đầu.
* \(R\): vùng đang phát triển.
* \(p\): pixel ứng viên.

Một tiêu chí đơn giản:

$$
|I(p)-I(S)|\le T
$$

thì pixel \(p\) được thêm vào vùng.

### Lưu ý về thuật toán

Đây là phiên bản đơn giản, trong đó mức xám được so sánh với **giá trị seed ban đầu**.

Một phiên bản khác có thể so sánh với:

$$
\mu_R
$$

là giá trị trung bình của vùng hiện tại:

$$
|I(p)-\mu_R|\le T
$$

Hai cách **không giống nhau**, vì vậy slide thực hành phải ghi rõ đang sử dụng cách nào.

---

## SLIDE 47. THUẬT TOÁN REGION GROWING

Quy ước:

* \(I(x,y)\): ảnh đầu vào.
* \(S\): seed.
* \(R\): vùng kết quả.
* \(T\): ngưỡng tương đồng.

### Thuật toán

1. Khởi tạo:

$$
R=\{S\}
$$

2. Đưa các pixel lân cận của \(R\) vào tập ứng viên.

3. Với mỗi pixel ứng viên \(p\), kiểm tra:

$$
|I(p)-I(S)|\le T
$$

4. Nếu đúng:

$$
R\leftarrow R\cup\{p\}
$$

5. Tiếp tục xét các pixel lân cận mới.

6. Dừng khi không còn pixel nào thỏa điều kiện.

---

# K-MEANS

## SLIDE 54. BIỂU DIỄN PIXEL TRONG KHÔNG GIAN ĐẶC TRƯNG

Không nên dùng trực tiếp \(x_i\) để vừa chỉ tọa độ ảnh vừa chỉ vector đặc trưng.

Quy ước:

Pixel thứ \(i\) được biểu diễn bởi vector đặc trưng:

$$
\mathbf{x}_i\in\mathbb{R}^d
$$

Ví dụ ảnh màu:

$$
\mathbf{x}_i=
[R_i,G_i,B_i]^T
$$

Nếu bổ sung tọa độ:

$$
\mathbf{x}_i=
[R_i,G_i,B_i,x_i,y_i]^T
$$

Trong đó \(x_i,y_i\) là tọa độ không gian.

---

## SLIDE 55. K-MEANS

Cho:

$$
K
$$

cụm và các centroid:

$$
\boldsymbol{\mu}_1,
\boldsymbol{\mu}_2,
\ldots,
\boldsymbol{\mu}_K
$$

### Bước 1 – Assignment

Mỗi vector \(\mathbf{x}_i\) được gán vào cụm gần nhất:

$$
c_i=
\arg\min_{k}
\|\mathbf{x}_i-\boldsymbol{\mu}_k\|^2
$$

### Bước 2 – Update

Cập nhật centroid:

$$
\boldsymbol{\mu}_k=
\frac{1}{|C_k|}
\sum_{\mathbf{x}_i\in C_k}
\mathbf{x}_i
$$

### Bước 3

Lặp Assignment → Update cho đến khi hội tụ.

---

## SLIDE 56. HÀM MỤC TIÊU K-MEANS

K-Means tối thiểu hóa:

$$
J=
\sum_{k=1}^{K}
\sum_{\mathbf{x}_i\in C_k}
\left\|
\mathbf{x}_i-\boldsymbol{\mu}_k
\right\|^2
$$

Trong đó:

* \(C_k\): tập các điểm thuộc cụm \(k\).
* \(\boldsymbol{\mu}_k\): centroid của cụm \(k\).
* \(K\): số cụm.
* \(\mathbf{x}_i\): vector đặc trưng của pixel \(i\).

> Dùng chữ đậm cho vector giúp phân biệt rõ \(\mathbf{x}_i\), \(\boldsymbol{\mu}_k\) với các đại lượng vô hướng.

---

# SLIC

## SLIDE 64. SLIC – BIỂU DIỄN ĐẶC TRƯNG

Với ảnh màu, SLIC thường sử dụng không gian CIELAB.

Pixel \(i\) được biểu diễn:

$$
\mathbf{z}_i=
[L_i,a_i,b_i,x_i,y_i]
$$

Trong đó:

* \(L_i,a_i,b_i\): thành phần màu.
* \(x_i,y_i\): tọa độ không gian.

### Khoảng cách màu

$$
d_c=
\sqrt{
(L_i-L_j)^2+
(a_i-a_j)^2+
(b_i-b_j)^2
}
$$

### Khoảng cách không gian

$$
d_s=
\sqrt{
(x_i-x_j)^2+
(y_i-y_j)^2
}
$$

---

## SLIDE 65. KHOẢNG CÁCH SLIC

Khoảng cách tổng hợp được chuẩn hóa:

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

* \(d_c\): khoảng cách màu.
* \(d_s\): khoảng cách không gian.
* \(S\): khoảng cách giữa các centroid khởi tạo.
* \(m\): tham số compactness.

### Ý nghĩa

$$
m\uparrow
\Rightarrow
\text{tăng ảnh hưởng của khoảng cách không gian}
$$

$$
m\downarrow
\Rightarrow
\text{tăng ảnh hưởng tương đối của màu sắc}
$$

---

## SLIDE 66. Ý NGHĨA CỦA COMPACTNESS

Với công thức:

$$
D=
\sqrt{
d_c^2+
\left(
\frac{m}{S}
\right)^2d_s^2
}
$$

### \(m\) nhỏ

Khoảng cách màu đóng vai trò tương đối lớn.

→ superpixel có xu hướng bám theo thay đổi màu/biên tốt hơn.

### \(m\) lớn

Khoảng cách không gian có trọng số lớn hơn.

→ superpixel có xu hướng compact và đều hơn.

---

# QUY ƯỚC CHUNG CHO TOÀN BỘ CHƯƠNG

## 1. Ảnh

Luôn dùng:

$$
I(x,y)
$$

không dùng xen kẽ \(I\) và \(f\).

---

## 2. Gradient

Luôn dùng:

$$
G_x,\quad G_y
$$

và:

$$
M=\sqrt{G_x^2+G_y^2}
$$

$$
\theta=\operatorname{atan2}(G_y,G_x)
$$

---

## 3. Threshold

Một ngưỡng:

$$
T
$$

Hai ngưỡng Canny:

$$
T_L<T_H
$$

Nhiều ngưỡng:

$$
\mathbf T=(T_1,T_2,\ldots,T_{K-1})
$$

---

## 4. Ảnh nhị phân

Dùng:

$$
B(x,y)\in\{0,1\}
$$

trong phần lý thuyết.

Khi triển khai OpenCV:

$$
B(x,y)\in\{0,255\}
$$

---

## 5. Region

Dùng:

$$
R_i
$$

cho vùng thứ \(i\).

Không dùng \(R\) cho response của bộ lọc.

Response của bộ lọc dùng:

$$
R(x,y)
$$

chỉ trong phần phát hiện điểm/đường.

---

## 6. K-Means

Dùng:

$$
\mathbf{x}_i
$$

cho vector đặc trưng của pixel.

Dùng:

$$
\boldsymbol{\mu}_k
$$

cho centroid.

Dùng:

$$
C_k
$$

cho cluster.

---

## 7. SLIC

Dùng:

$$
d_c,\quad d_s,\quad D,\quad S,\quad m
$$

theo đúng ý nghĩa:

$$
d_c=\text{khoảng cách màu}
$$

$$
d_s=\text{khoảng cách không gian}
$$

$$
D=\text{khoảng cách tổng hợp}
$$

$$
S=\text{khoảng cách lưới}
$$

$$
m=\text{compactness}
$$

---

## 8. Quan hệ giữa các đại lượng

```text
ẢNH
I(x,y)
 │
 ├── Đạo hàm
 │     ├── Gx
 │     └── Gy
 │          ↓
 │       Gradient
 │          ├── M
 │          └── θ
 │
 ├── Threshold
 │      └── B(x,y)
 │
 ├── Region
 │      └── R1, R2, ..., Rn
 │
 └── Clustering
        ├── xi
        ├── Ck
        └── μk
```

Cách quy ước này giúp sinh viên nhìn thấy rõ mối quan hệ giữa **ảnh → đặc trưng → biên/vùng → phân đoạn** và tránh phải học lại ký hiệu ở từng phần.
