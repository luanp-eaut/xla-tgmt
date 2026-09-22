---

marp: true
theme: eaut
paginate: true
--------------

<!--_class: cover-->

<div class="middle">

# XỬ LÝ ẢNH & THỊ GIÁC MÁY TÍNH

## CHƯƠNG 1 - GIỚI THIỆU TỔNG QUAN

</div>

### Giảng viên: Nguyễn Phồn Lữa

---
<!-- _class: toc -->

# NỘI DUNG

1. Giới thiệu học phần
2. Tổng quan về xử lý ảnh & thị giác máy tính
3. Từ thế giới thực đến ảnh số
4. Biểu diễn và các quan hệ trong ảnh
5. Các phép toán cơ bản trên ảnh
6. Công cụ xử lý ảnh trong Python
7. Môi trường thực hành

---
<!-- _class: section -->

# Giới thiệu học phần

---

# 1. GIỚI THIỆU HỌC PHẦN

### Tên học phần

>**Xử lý ảnh và Thị giác máy tính**

### Quy mô

* **3 tín chỉ**
* 2 TC lý thuyết
* 1 TC thực hành
* Khoảng **15 buổi học**
* Thời gian tự học: khoảng **75 giờ**

### Mục tiêu

* Nắm vững kiến thức nền tảng về xử lý ảnh và thị giác máy tính.
* Hiểu các kỹ thuật xử lý và phân tích ảnh cơ bản.
* Sử dụng công cụ lập trình để giải quyết các bài toán thực tế.

---

# 2. MỤC TIÊU HỌC TẬP

Sau học phần, sinh viên có thể:

### Hiểu

* Ảnh số được hình thành và biểu diễn như thế nào.
* Các khái niệm cơ bản của Image Processing và Computer Vision.
* Các kỹ thuật xử lý ảnh cơ bản.

### Thực hiện

* Đọc, hiển thị và biến đổi ảnh.
* Thực hiện các phép toán trên ảnh.
* Áp dụng các kỹ thuật lọc, phát hiện biên và phân vùng.

### Vận dụng

* Xây dựng pipeline xử lý ảnh.
* Sử dụng Python và các thư viện xử lý ảnh.
* Giải quyết các bài toán Computer Vision cơ bản.

---

# 3. PHƯƠNG PHÁP ĐÁNH GIÁ

| Thành phần            | Tỷ trọng |
| --------------------- | -------: |
| Chuyên cần            |  **10%** |
| Quá trình / giữa kỳ   |  **30%** |
| Cuối kỳ – Bài tập lớn |  **60%** |

### Bài tập lớn

* Làm việc theo nhóm **3–5 sinh viên**.
* Mỗi nhóm tự chọn đề tài.
* Các nhóm không trùng đề tài.
* Hoàn thành sản phẩm, báo cáo và vấn đáp.

---

# 4. BÀI TẬP LỚN

### Quy trình thực hiện

```text
Chọn bài toán
      ↓
Phân tích yêu cầu
      ↓
Thu thập / chọn dữ liệu
      ↓
Thiết kế phương pháp
      ↓
Cài đặt
      ↓
Thực nghiệm
      ↓
Đánh giá
      ↓
Báo cáo & vấn đáp
```

### Đánh giá

* Hình thức báo cáo: **10%**
* Nội dung báo cáo: **50%**
* Vấn đáp: **40%**

---

# 5. ROADMAP HỌC PHẦN

```text
CHƯƠNG 1
Nền tảng
   ↓
CHƯƠNG 2
Biến đổi ảnh
   ↓
CHƯƠNG 3
Nén ảnh
   ↓
CHƯƠNG 4
Phát hiện biên & phân vùng
   ↓
CHƯƠNG 5
Thị giác máy tính
```

### Câu hỏi xuyên suốt

> **Làm thế nào để biến một hình ảnh thành thông tin có ý nghĩa?**

---
<!--_class: section-->

# <!--fit-->Tổng quan về xử lý ảnh & thị giác máy tính

---

# 6. TỪ THẾ GIỚI THỰC ĐẾN MÁY TÍNH

Con người nhìn thấy:

* Người
* Xe
* Nhà
* Cây
* Chữ
* Khuôn mặt

Máy tính không "nhìn" ảnh theo cách con người nhìn.

Máy tính nhận được:

> **Dữ liệu số biểu diễn năng lượng ánh sáng hoặc các dạng tín hiệu khác.**

---

# 7. ẢNH LÀ GÌ?

Một cách mô hình hóa ảnh mức xám:

$$
f(x,y)
$$

Trong đó:

* \(x, y\): tọa độ không gian.
* \(f(x,y)\): cường độ tại vị trí \((x,y)\).

### Có thể hiểu đơn giản

> **Ảnh là một hàm mô tả cường độ tại mỗi vị trí trong không gian.**

---

# 8. ẢNH SỐ

Ảnh số là ảnh mà:

* Tọa độ không gian được số hóa.
* Giá trị cường độ được số hóa.
* Các giá trị chỉ nhận một tập hữu hạn các giá trị rời rạc.

Có thể biểu diễn ảnh bằng **ma trận**:

$$
f(x,y) \rightarrow
\begin{bmatrix}
f(0,0)&f(0,1)&\cdots\\
f(1,0)&f(1,1)&\cdots\\
\vdots&\vdots&\ddots
\end{bmatrix}
$$

---

# 9. PIXEL – PHẦN TỬ ẢNH

**Pixel – Picture Element**

Là phần tử cơ bản cấu tạo nên ảnh số.

Mỗi pixel có:

* Một vị trí.
* Một giá trị.

Ví dụ ảnh mức xám:

```text
┌────┬────┬────┬────┐
│  12│  30│  45│  70│
├────┼────┼────┼────┤
│  18│  42│  80│ 100│
├────┼────┼────┼────┤
│  25│  60│ 110│ 150│
└────┴────┴────┴────┘
```

Giá trị càng lớn → pixel càng sáng.

---

# 10. ẢNH XÁM VÀ ẢNH MÀU

### Ảnh mức xám

Mỗi pixel thường có một giá trị:

$$
0 \leq f(x,y) \leq 255
$$

với ảnh 8-bit.

* 0 → đen
* 255 → trắng

### Ảnh màu

Mỗi pixel thường được biểu diễn bởi nhiều thành phần màu.

Ví dụ RGB:

$$
Pixel=(R,G,B)
$$

---

# 11. IMAGE PROCESSING LÀ GÌ?

**Image Processing – Xử lý ảnh**

Là tập hợp các phương pháp dùng để:

* Biến đổi ảnh.
* Cải thiện chất lượng ảnh.
* Khôi phục ảnh.
* Trích xuất thông tin từ ảnh.

Ví dụ:

```text
Ảnh tối
  ↓
Tăng độ sáng
  ↓
Ảnh sáng hơn
```

```text
Ảnh nhiễu
  ↓
Lọc nhiễu
  ↓
Ảnh ít nhiễu hơn
```

---

# 12. COMPUTER VISION LÀ GÌ?

**Computer Vision – Thị giác máy tính**

Là lĩnh vực nghiên cứu cách máy tính:

> **thu nhận, xử lý, phân tích và suy luận thông tin từ hình ảnh hoặc video.**

Ví dụ:

```text
Camera
   ↓
Image
   ↓
Object Detection
   ↓
┌───────────────┐
│ 2 người       │
│ 1 chiếc xe    │
│ 1 chiếc xe máy│
└───────────────┘
```

---

# 13. IMAGE PROCESSING vs COMPUTER VISION

| Image Processing    | Computer Vision     |
| ------------------- | ------------------- |
| Biến đổi ảnh        | Hiểu nội dung ảnh   |
| Cải thiện ảnh       | Nhận biết đối tượng |
| Lọc nhiễu           | Phát hiện đối tượng |
| Tăng tương phản     | Phân loại           |
| Sharpening          | Tracking            |
| Geometric transform | Recognition         |

### Tuy nhiên

> Hai lĩnh vực **không có ranh giới tuyệt đối**.

Computer Vision thường sử dụng nhiều kỹ thuật Image Processing làm nền tảng.

---

# 14. BA MỨC ĐỘ XỬ LÝ

### Low-level

**Input:** ảnh
**Output:** ảnh

Ví dụ:

* Denoising
* Enhancement
* Sharpening

### Mid-level

**Input:** ảnh
**Output:** đặc trưng / cấu trúc

Ví dụ:

* Segmentation
* Edge detection
* Feature extraction

### High-level

**Input:** thông tin hình ảnh
**Output:** hiểu biết / quyết định

Ví dụ:

* Object recognition
* Scene understanding
* Activity recognition

---

# 15. PIPELINE TỔNG QUÁT

```text
ẢNH / VIDEO / CAMERA
          │
          ▼
   Image Acquisition
          │
          ▼
    Pre-processing
          │
          ▼
Representation / Features
          │
          ▼
 ┌────────┼─────────┐
 ▼        ▼         ▼
Class.  Detection  Segmentation
 └────────┼─────────┘
          ▼
    Interpretation
          │
          ▼
       Decision
```

### Mục tiêu cuối cùng

> **Biến dữ liệu hình ảnh thành thông tin hữu ích.**

---

# 16. ỨNG DỤNG

### Y tế

* X-quang
* CT
* MRI
* Phân tích ảnh y tế

### Công nghiệp

* Kiểm tra lỗi sản phẩm
* Đếm sản phẩm
* Đo kích thước

### Giao thông

* Nhận dạng biển số
* Phát hiện phương tiện
* Giám sát giao thông

### An ninh

* Nhận dạng khuôn mặt
* Theo dõi đối tượng

### Viễn thám

* Ảnh vệ tinh
* Theo dõi môi trường
* Phân tích đất đai

---

# 17. ẢNH KHÔNG CHỈ LÀ ÁNH SÁNG KHẢ KIẾN

Con người chủ yếu quan sát vùng ánh sáng khả kiến.

Máy móc có thể thu nhận nhiều loại tín hiệu hơn:

```text
Gamma
  │
X-ray
  │
UV
  │
Visible
  │
Infrared
  │
Microwave
  │
Radio
```

Ngoài phổ điện từ còn có:

* Siêu âm
* Kính hiển vi điện tử
* Các hệ thống cảm biến chuyên dụng

---

# 18. LỊCH SỬ PHÁT TRIỂN

```text
1920s
Truyền ảnh
   ↓
1960s
Computer + Space Imaging
   ↓
1970s
Medical Imaging
   ↓
1980s–1990s
Digital Image Processing
   ↓
2000s
Computer Vision
   ↓
2010s
Deep Learning
   ↓
2020s
Vision + AI + Multimodal Systems
```

### Ý tưởng chính

> Sự phát triển của xử lý ảnh gắn chặt với sự phát triển của **cảm biến, máy tính và AI**.

---
<!--_class: section-->

# Từ thế giới thực đến ảnh số

---

# 19. THỊ GIÁC CON NGƯỜI

Mắt người là một hệ thống thu nhận và xử lý thông tin quang học phức tạp.

Một số thành phần chính:

* **Cornea:** giác mạc
* **Iris:** mống mắt
* **Lens:** thủy tinh thể
* **Retina:** võng mạc
* **Rods:** tế bào hình que
* **Cones:** tế bào hình nón

### Ý nghĩa đối với Computer Vision

Nghiên cứu thị giác người giúp chúng ta hiểu:

* Ánh sáng
* Độ sáng
* Độ tương phản
* Màu sắc
* Nhận thức thị giác

---

# 20. ÁNH SÁNG VÀ ĐỘ SÁNG

Khả năng cảm nhận của mắt không đơn giản là:

> "Giá trị pixel lớn → luôn cảm thấy sáng hơn."

Nhận thức phụ thuộc vào:

* Cường độ ánh sáng.
* Nền xung quanh.
* Tương phản.
* Điều kiện quan sát.

### Ví dụ

Một vùng xám giống nhau có thể được cảm nhận khác nhau khi đặt trên:

* Nền sáng.
* Nền tối.

---

# 21. PHỔ ĐIỆN TỪ

Sóng điện từ được mô tả bởi:

$$
c=\lambda\nu
$$

Trong đó:

* $c$: tốc độ ánh sáng.
* $\lambda$: bước sóng.
* $\nu$: tần số.

Năng lượng photon:

$$
E=h\nu
$$

### Ánh sáng khả kiến

Nằm trong một khoảng hẹp của phổ điện từ.

---

# 22. THU NHẬN ẢNH

Một hệ thống thu nhận ảnh có thể được mô hình hóa:

```text
Nguồn năng lượng
       ↓
     Vật thể
       ↓
  Phản xạ / truyền qua
       ↓
     Cảm biến
       ↓
   Tín hiệu điện
       ↓
    Số hóa
       ↓
     Ảnh số
```

---

# 23. CẢM BIẾN ẢNH

Ba mô hình cảm biến cơ bản:

### 1. Single sensor

Một cảm biến duy nhất.

→ Cần chuyển động để quét ảnh.

### 2. Sensor strip

Một dải cảm biến.

→ Cần chuyển động theo một chiều.

### 3. Sensor array

Mảng cảm biến 2D.

→ Thu nhận toàn bộ ảnh trong một lần chụp.

Ví dụ:

**CCD, CMOS**

---

# 24. MÔ HÌNH HÌNH THÀNH ẢNH

Một mô hình đơn giản:

$$
f(x,y)=i(x,y)r(x,y)
$$

Trong đó:

* $i(x,y)$: **Illumination** – thành phần chiếu sáng.
* *r(x,y)*: **Reflectance** – thành phần phản xạ.

### Ý nghĩa

Độ sáng quan sát được phụ thuộc cả:

> **nguồn sáng + đặc tính bề mặt vật thể**

---

# 25. VÍ DỤ: CHIẾU SÁNG VÀ PHẢN XẠ

Hai vật thể có cùng màu nhưng dưới điều kiện chiếu sáng khác nhau có thể tạo ra ảnh rất khác nhau.

```text
        Nguồn sáng
            ↓
      ┌───────────┐
      │  Vật thể  │
      └───────────┘
            ↓
       Ánh sáng phản xạ
            ↓
         Camera
```

Do đó:

> Một hệ thống Computer Vision phải quan tâm đến **điều kiện ánh sáng**.

---

# 26. TỪ ẢNH LIÊN TỤC ĐẾN ẢNH SỐ

Ảnh thực tế có thể được xem là tín hiệu liên tục.

Để máy tính xử lý, cần số hóa:

```text
Ảnh liên tục
     │
     ├──────────────┐
     ▼              ▼
 Sampling       Quantization
     │              │
     ▼              ▼
Tọa độ rời rạc   Mức cường độ rời rạc
     └──────────────┘
             │
             ▼
          Ảnh số
```

---

# 27. SAMPLING

**Sampling – Lấy mẫu**

Là quá trình số hóa **tọa độ không gian**.

Nó quyết định:

> **Độ phân giải không gian của ảnh.**

Sampling nhiều:

```text
● ● ● ● ● ● ●
● ● ● ● ● ● ●
● ● ● ● ● ● ●
```

Sampling ít:

```text
●     ●     ●
      
●     ●     ●
```

### Sampling thấp → ít pixel → mất chi tiết không gian.

---

# 28. QUANTIZATION

**Quantization – Lượng tử hóa**

Là quá trình số hóa **biên độ cường độ**.

Ví dụ:

### Nhiều mức xám

```text
0  20  40  60  80  100 ... 255
```

### Ít mức xám

```text
0      85      170      255
```

### Quantization thấp

→ ít mức cường độ
→ dễ xuất hiện **false contouring**.

---

# 29. SAMPLING vs QUANTIZATION

|           | Sampling                | Quantization         |
| --------- | ----------------------- | -------------------- |
| Số hóa    | Tọa độ                  | Cường độ             |
| Ảnh hưởng | Spatial resolution      | Intensity resolution |
| Quá thấp  | Mất chi tiết không gian | Mất chi tiết mức xám |
| Liên quan | Số pixel                | Số mức xám           |

### Ghi nhớ

> **Sampling → Where?**
> **Quantization → How much?**

---

# 30. ĐỘ PHÂN GIẢI

### Spatial Resolution

Khả năng biểu diễn chi tiết **không gian**.

Liên quan đến:

* Kích thước ảnh.
* Mật độ pixel.
* Kích thước pixel.

### Intensity Resolution

Khả năng phân biệt các mức cường độ.

Ví dụ ảnh 8-bit:

$$
L=2^8=256
$$

mức xám.

---

# 31. BITS VÀ MỨC XÁM

Nếu sử dụng \(k\) bit cho mỗi pixel:

$$
L=2^k
$$

Ví dụ:

|    Bit |    Mức |
| -----: | -----: |
|  1-bit |      2 |
|  2-bit |      4 |
|  4-bit |     16 |
|  8-bit |    256 |
| 16-bit | 65,536 |

### Ảnh 8-bit thường dùng trong các bài toán xử lý ảnh mức xám cơ bản.

---

# 32. NỘI SUY ẢNH

Khi thay đổi kích thước hoặc biến đổi hình học, ta thường cần ước lượng giá trị tại vị trí mới.

**Interpolation – Nội suy**

Ba phương pháp phổ biến:

### Nearest Neighbor

* Nhanh.
* Đơn giản.
* Có thể tạo răng cưa.

### Bilinear

* Sử dụng các pixel lân cận.
* Kết quả mượt hơn.

### Bicubic

* Sử dụng nhiều điểm lân cận hơn.
* Kết quả thường mượt và giữ chi tiết tốt hơn.

---
<!--_class: section-->

# Biểu diễn và các quan hệ trong ảnh

---
# 33. ẢNH NHƯ MỘT MA TRẬN

Một ảnh xám có thể biểu diễn:

$$
I\in R^{M\times N}
$$

Ví dụ:

```text
        x →
      0   1   2   3
    ┌───┬───┬───┬───┐
 y 0│12 │30 │45 │70 │
 ↓  ├───┼───┼───┼───┤
   1│18 │42 │80 │100│
    ├───┼───┼───┼───┤
   2│25 │60 │110│150│
    └───┴───┴───┴───┘
```

### Đây là nền tảng để sử dụng NumPy.

---

# 34. LÁNG GIỀNG CỦA PIXEL

Với pixel \(p(x,y)\):

### 4-láng giềng

$$
N_4(p)=
\{(x-1,y),(x+1,y),(x,y-1),(x,y+1)\}
$$

### Láng giềng chéo

Gồm bốn pixel theo đường chéo.

### 8-láng giềng

Kết hợp:

> **4-láng giềng + láng giềng chéo**

---

# 35. TÍNH KỀ VÀ LIÊN THÔNG

Các pixel có thể được xem là kề nhau dựa trên:

* 4-connectivity
* 8-connectivity
* m-connectivity

### Tại sao cần?

Để xác định:

* Pixel nào thuộc cùng một đối tượng.
* Đường đi giữa các pixel.
* Một vùng ảnh gồm những pixel nào.

---

# 36. ĐƯỜNG ĐI VÀ VÙNG

### Path – Đường đi

Một chuỗi các pixel liên tiếp thỏa mãn điều kiện kề nhau.

### Region – Vùng

Một tập các pixel **liên thông**.

### Boundary – Biên

Tập các pixel thuộc vùng nhưng có ít nhất một láng giềng nằm ngoài vùng.

```text
████████
██    ██
██    ██
████████
```

Phần bao quanh → boundary.

---

# 37. KHOẢNG CÁCH GIỮA CÁC PIXEL

Ba khoảng cách phổ biến:

### Euclidean

$$
D_E(p,q)=
\sqrt{(x-s)^2+(y-t)^2}
$$

### City-block

$$
D_4(p,q)=|x-s|+|y-t|
$$

### Chessboard

$$
D_8(p,q)=
\max(|x-s|,|y-t|)
$$

---

# 38. SO SÁNH CÁC KHOẢNG CÁCH

```text
Euclidean
    ○

City-block
    ◇

Chessboard
    □
```

### Ý nghĩa

Cách định nghĩa khoảng cách phụ thuộc vào:

> **mô hình láng giềng và bài toán cần giải.**

Các khái niệm này sẽ được sử dụng trong:

* Segmentation
* Morphology
* Connected components
* Feature extraction

---
<!--_class: section-->

# Các phép toán cơ bản trên ảnh

---

# 39. CÁC PHÉP TOÁN TRÊN ẢNH

Vì ảnh có thể biểu diễn dưới dạng ma trận nên ta có thể thực hiện:

### Arithmetic

* Addition
* Subtraction
* Multiplication
* Division

### Logical

* AND
* OR
* NOT
* XOR

Các phép toán có thể thực hiện:

> **theo từng pixel – element-wise.**

---

# 40. CỘNG ẢNH – IMAGE AVERAGING

Giả sử có nhiều ảnh của cùng một cảnh:

$$
g_k(x,y)=f(x,y)+n_k(x,y)
$$

Có thể lấy trung bình:

$$
\bar g(x,y)=
\frac{1}{K}\sum_{k=1}^{K}g_k(x,y)
$$

Nếu nhiễu độc lập có trung bình bằng 0:

$$
\sigma_{\bar n}^2=
\frac{\sigma_n^2}{K}
$$

### Kết luận

> Tăng số lượng ảnh trung bình → giảm ảnh hưởng của nhiễu.

---

# 41. TRỪ ẢNH

Phép trừ ảnh có thể được sử dụng để:

### Phát hiện thay đổi

```text
Ảnh trước ─┐
           ├── Difference ──→ Vùng thay đổi
Ảnh sau  ──┘
```

### Một số ứng dụng

* Background subtraction.
* Change detection.
* Phân tích chuyển động.
* So sánh ảnh.

---

# 42. PHÉP TOÁN LOGIC VÀ MASK

Ảnh nhị phân hoặc **mask** thường được sử dụng để xác định vùng quan tâm.

Ví dụ:

```text
Image
  AND
Mask
  ↓
ROI
```

### ROI – Region of Interest

Chỉ xử lý vùng cần thiết thay vì toàn bộ ảnh.

---

# 43. PHÉP TOÁN KHÔNG GIAN

Trong phép toán không gian, giá trị đầu ra có thể phụ thuộc vào:

> **một pixel hoặc một vùng lân cận của pixel.**

### Single-pixel operation

$$
g(x,y)=T(f(x,y))
$$

Ví dụ:

* Negative.
* Brightness adjustment.
* Threshold.

### Neighborhood operation

Giá trị đầu ra phụ thuộc vào các pixel xung quanh.

Ví dụ:

* Blur.
* Sharpening.
* Edge detection.

---

# 44. CONVOLUTION – Ý TƯỞNG CỐT LÕI

Một trong những công cụ quan trọng nhất của xử lý ảnh là **kernel / filter**.

```text
      Kernel
     ┌───┬───┬───┐
     │   │   │   │
     ├───┼───┼───┤
     │   │ X │   │
     ├───┼───┼───┤
     │   │   │   │
     └───┴───┴───┘
            │
            ▼
       tính tổng có trọng số
            │
            ▼
        pixel đầu ra
```

Một dạng biểu diễn:

$$
g(x,y)=
\sum_m\sum_n
h(m,n)f(x-m,y-n)
$$

Trong đó:

* \(f\): ảnh đầu vào.
* \(h\): kernel.
* \(g\): ảnh đầu ra.

---

# 45. VÍ DỤ KERNEL

### Mean filter

$$
\frac{1}{9}
\begin{bmatrix}
1&1&1\\
1&1&1\\
1&1&1
\end{bmatrix}
$$

→ Làm mượt / giảm nhiễu.

### Edge filter

Một kernel có thể nhấn mạnh sự thay đổi cường độ:

$$
\begin{bmatrix}
-1&-1&-1\\
-1& 8&-1\\
-1&-1&-1
\end{bmatrix}
$$

→ Nhấn mạnh các vùng có thay đổi cường độ mạnh.

---

# 46. BIẾN ĐỔI HÌNH HỌC

Biến đổi hình học thay đổi **vị trí của pixel**.

Các phép biến đổi phổ biến:

* Translation – Tịnh tiến
* Rotation – Xoay
* Scaling – Co giãn
* Shearing – Trượt
* Perspective transformation

```text
Ảnh gốc
   ↓
Geometric Transformation
   ↓
Ảnh mới
   ↓
Interpolation
```

---

# 47. THỐNG KÊ CƯỜNG ĐỘ

Cường độ pixel có thể được xem như một biến ngẫu nhiên.

### Mean

$$
\mu=
\frac{1}{N}\sum_{i=1}^{N}x_i
$$

Cho biết:

> **mức cường độ trung bình của ảnh.**

### Variance

$$
\sigma^2=
\frac{1}{N}
\sum_{i=1}^{N}(x_i-\mu)^2
$$

Cho biết mức độ phân tán của cường độ.

→ Liên quan đến **độ tương phản**.

---

# 48. HISTOGRAM

Histogram mô tả:

> **số lượng pixel tương ứng với từng mức cường độ.**

Ví dụ ảnh 8-bit:

```text
Số pixel
  │
  │       ███
  │   ███████
  │ ██████████
  │████████████
  └────────────────→
   0            255
       Intensity
```

Histogram giúp phân tích:

* Độ sáng.
* Độ tương phản.
* Phân bố cường độ.

---
<!--_class: section-->

# Công cụ xử lý ảnh trong Python

---
# 49. HỆ SINH THÁI PYTHON

Python được sử dụng rộng rãi trong Image Processing và Computer Vision nhờ:

* Cú pháp đơn giản.
* Hệ sinh thái thư viện phong phú.
* Tích hợp tốt với Machine Learning / Deep Learning.
* Hỗ trợ nghiên cứu và triển khai ứng dụng.

### Các thư viện chính

```text
                 Python
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
    NumPy        OpenCV      scikit-image
       │            │            │
       └────────────┼────────────┘
                    ▼
              Image Processing
```

---

# 50. NUMPY – NỀN TẢNG DỮ LIỆU

NumPy cung cấp:

* Mảng đa chiều.
* Phép toán vector / ma trận.
* Các hàm toán học.
* Boolean masking.
* Slicing.

### Biểu diễn ảnh

Ảnh xám:

$$
H\times W
$$

Ảnh màu RGB:

$$
H\times W\times3
$$

Ví dụ:

```python
image.shape
```

có thể cho:

```text
(480, 640, 3)
```

---

# 51. OPENCV

**OpenCV – Open Source Computer Vision Library**

Là thư viện mã nguồn mở được sử dụng rộng rãi cho:

* Image Processing.
* Computer Vision.
* Video processing.
* Real-time applications.
* AI model inference.

### Một số chức năng

* Đọc / ghi ảnh.
* Resize / rotate / flip.
* Color conversion.
* Filtering.
* Edge detection.
* Thresholding.
* Morphology.
* Contours.
* Object detection.
* Video processing.

---

# 52. OPENCV – CÁC HÀM CƠ BẢN

### Đọc / ghi

```python
cv2.imread()
cv2.imwrite()
```

### Biến đổi

```python
cv2.resize()
cv2.flip()
cv2.rotate()
cv2.cvtColor()
```

### Vẽ

```python
cv2.line()
cv2.rectangle()
cv2.circle()
```

### Hiển thị

```python
cv2.imshow()
cv2.waitKey()
```

---

# 53. OPENCV – FILTERING & ENHANCEMENT

### Làm mờ / giảm nhiễu

```python
cv2.blur()
cv2.medianBlur()
cv2.bilateralFilter()
```

### Phát hiện biên

```python
cv2.Canny()
```

### Thresholding

```python
cv2.threshold()
cv2.adaptiveThreshold()
```

### Morphology

```python
cv2.erode()
cv2.dilate()
```

### Contours

```python
cv2.findContours()
cv2.drawContours()
```

---

# 54. CÁC THƯ VIỆN KHÁC

### Pillow

Phù hợp với:

* Đọc / ghi ảnh.
* Chuyển đổi định dạng.
* Các thao tác ảnh cơ bản.
* Ứng dụng web và xử lý ảnh đơn giản.

### scikit-image

Phù hợp với:

* Giáo dục.
* Nghiên cứu.
* Các thuật toán xử lý ảnh khoa học.
* Segmentation, restoration, feature extraction...

### Mahotas

Tập trung vào:

* Image processing.
* Morphology.
* Một số thao tác xử lý ảnh hiệu năng cao.

---

# 55. NÊN DÙNG THƯ VIỆN NÀO?

| Thư viện         | Điểm mạnh                          |
| ---------------- | ---------------------------------- |
| **NumPy**        | Ma trận và tính toán số            |
| **OpenCV**       | Image Processing & Computer Vision |
| **Pillow**       | Thao tác ảnh cơ bản                |
| **scikit-image** | Thuật toán nghiên cứu              |
| **Matplotlib**   | Hiển thị và trực quan hóa          |

### Trong học phần

> **NumPy + OpenCV + Matplotlib** sẽ là bộ công cụ chính.

Các thư viện khác được sử dụng khi phù hợp.

---
<!--_class: section-->

# Môi trường thực hành

---

# 56. MÔI TRƯỜNG THỰC HÀNH

### Phần mềm

* Python **3.11+**
* VS Code
* Jupyter Notebook

### VS Code Extensions

* Python
* Jupyter

### Python packages

```text
numpy
opencv-python
matplotlib
scikit-image
pillow
ipykernel
```

### Lưu ý

**SciPy không bắt buộc để sử dụng OpenCV.**

SciPy chỉ cần khi bài toán sử dụng các chức năng khoa học / tính toán số phù hợp của thư viện này.

---

# 57. TỔ CHỨC PROJECT

```text
projects/
│
├── images/
│   └── input images
│
├── output/
│   └── processed images
│
├── notebooks/
│   └── *.ipynb
│
├── src/
│   └── Python source code
│
└── pyproject.toml
```

### Nguyên tắc

```text
images/
   ↓
Input
   ↓
Processing
   ↓
output/
```

Không ghi đè dữ liệu đầu vào trong quá trình thực hành nếu không cần thiết.

---

# 58. MINI WORKFLOW ĐẦU TIÊN

Một pipeline xử lý ảnh đơn giản:

```text
          input.jpg
              │
              ▼
        Read Image
              │
              ▼
           Resize
              │
              ▼
       Convert to Gray
              │
              ▼
            Blur
              │
              ▼
      Edge Detection
              │
              ▼
        Save Result
              │
              ▼
         output.jpg
```

### Đây chính là cầu nối

> **Kiến thức Chương 1 → Thực hành Python**

---

# 59. VÍ DỤ PYTHON ĐẦU TIÊN

```python
import cv2
import matplotlib.pyplot as plt

image = cv2.imread("images/input.jpg")

gray = cv2.cvtColor(
    image,
    cv2.COLOR_BGR2GRAY
)

edges = cv2.Canny(
    gray,
    100,
    200
)

plt.imshow(edges, cmap="gray")
plt.axis("off")
plt.show()
```

### Pipeline

```text
Image
  ↓
Grayscale
  ↓
Canny
  ↓
Edges
```

---

# 60. TỔNG KẾT CHƯƠNG

Sau chương này, cần nắm được:

### 1. Khái niệm

* Image
* Digital Image
* Pixel
* Image Processing
* Computer Vision

### 2. Hình thành ảnh

* Light
* Sensor
* Image acquisition
* Illumination / Reflectance

### 3. Số hóa

* Sampling
* Quantization
* Spatial resolution
* Intensity resolution
* Interpolation

---

# 61. TỔNG KẾT – BIỂU DIỄN ẢNH

```text
Digital Image
     │
     ├── Pixel
     │
     ├── Matrix
     │
     ├── Neighborhood
     │
     ├── Connectivity
     │
     ├── Region / Boundary
     │
     └── Distance
```

### Các khái niệm này là nền tảng cho:

* Filtering
* Segmentation
* Morphology
* Feature extraction
* Computer Vision

---

# 62. TỔNG KẾT – TOÀN BỘ HỆ THỐNG

```text
THẾ GIỚI THỰC
      │
      ▼
ÁNH SÁNG / TÍN HIỆU
      │
      ▼
CẢM BIẾN
      │
      ▼
     ẢNH
      │
      ▼
   SỐ HÓA
      │
      ▼
  PIXEL / MATRIX
      │
      ▼
IMAGE PROCESSING
      │
      ▼
COMPUTER VISION
      │
      ▼
THÔNG TIN / QUYẾT ĐỊNH
```

---

# 63. CÂU HỎI ÔN TẬP

1. Ảnh số khác ảnh liên tục như thế nào?
2. Pixel là gì?
3. Sampling và quantization khác nhau như thế nào?
4. Spatial resolution và intensity resolution là gì?
5. 4-neighborhood và 8-neighborhood khác nhau như thế nào?
6. Euclidean, City-block và Chessboard distance khác nhau như thế nào?
7. Image Processing và Computer Vision có quan hệ như thế nào?
8. Convolution được sử dụng để làm gì?
9. Histogram biểu diễn thông tin gì?
10. NumPy và OpenCV có vai trò gì trong xử lý ảnh bằng Python?

---

# 64. BÀI TẬP THỰC HÀNH

### Bài 1 – Khám phá ảnh số

* Đọc một ảnh bằng OpenCV.
* Hiển thị ảnh.
* In kích thước ảnh.
* In số kênh màu.
* Truy cập một pixel.

### Bài 2 – Biến đổi ảnh

Thực hiện:

* Resize.
* Flip.
* Rotate.
* Grayscale.

### Bài 3 – Pixel operations

Thực hiện:

* Brightness adjustment.
* Negative image.
* Image addition.
* Image subtraction.

---

# 65. BÀI TẬP THỰC HÀNH – FILTERING

Với một ảnh có nhiễu:

1. Áp dụng Mean filter.
2. Áp dụng Median filter.
3. Áp dụng Gaussian filter.
4. So sánh kết quả.
5. Nhận xét ảnh hưởng đến biên.

### Câu hỏi

> Tại sao Median filter thường phù hợp với **salt-and-pepper noise**?

---

# 66. BÀI TẬP THỰC HÀNH – EDGE

Pipeline:

```text
Original
   ↓
Grayscale
   ↓
Gaussian Blur
   ↓
Canny
   ↓
Edge Image
```

Sinh viên thay đổi tham số Canny và quan sát:

* Số lượng biên.
* Biên yếu / mạnh.
* Nhiễu.

---

# 67. CHUẨN BỊ CHO CHƯƠNG 2

## CHƯƠNG 2 – BIẾN ĐỔI ẢNH

Từ nền tảng:

```text
Pixel
  ↓
Image as Matrix
  ↓
Image Operations
```

chúng ta sẽ đi sâu vào:

* Point transformation.
* Histogram processing.
* Spatial transformation.
* Frequency-domain transformation.
* Các kỹ thuật biến đổi ảnh.

### Câu hỏi dẫn nhập

> **Có thể biến đổi một ảnh như thế nào để làm nổi bật thông tin mà chúng ta quan tâm?**

---

# 68. THÔNG ĐIỆP CỐT LÕI

> ### Máy tính không nhìn thấy "con mèo".
>
> Nó nhận được **dữ liệu số**.
>
> Nhiệm vụ của Image Processing và Computer Vision là biến dữ liệu đó thành:
>
> **đặc trưng → thông tin → hiểu biết → quyết định.**

---

# 69. KẾT THÚC CHƯƠNG 1

## TỪ PIXEL ĐẾN COMPUTER VISION

```text
Pixel
  ↓
Image
  ↓
Processing
  ↓
Features
  ↓
Objects
  ↓
Understanding
```

### Chương 1 cung cấp nền tảng.

### Các chương tiếp theo sẽ trả lời:

> **Làm thế nào để xử lý và biến đổi ảnh hiệu quả?**
