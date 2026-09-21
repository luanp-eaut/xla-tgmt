---

marp: true
theme: eaut
paginate: true
--------------

<!--_class: cover-->

<div class="middle">

# XỬ LÝ ẢNH & THỊ GIÁC MÁY TÍNH

## CHƯƠNG 3 - NÉN ẢNH

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

# Slide 2. Mục tiêu học tập

Sau khi hoàn thành chương này, sinh viên có thể:

* Giải thích được **tại sao cần nén ảnh**.
* Phân biệt được **dữ liệu, thông tin và dư thừa dữ liệu**.
* Hiểu và tính được **Entropy** của một nguồn ảnh.
* Giải thích được sự khác nhau giữa:

  * Nén không tổn thất (Lossless).
  * Nén có tổn thất (Lossy).
* Mô tả được mô hình tổng quát của một hệ thống nén ảnh.
* Hiểu nguyên lý của các kỹ thuật:

  * Huffman.
  * Golomb / Golomb-Rice.
  * Arithmetic Coding.
  * LZW.
  * RLE.
  * DPCM.
  * DCT và Block Transform Coding.
  * Wavelet / DWT.
* Giải thích được quy trình cơ bản của **JPEG**.
* Đánh giá được ảnh sau nén bằng một số tiêu chí định lượng và định tính.

---

# Slide 3. Nội dung chương

## 1. Giới thiệu về nén ảnh

## 2. Đo lường thông tin và chất lượng ảnh

## 3. Nén không tổn thất (Lossless)

## 4. Nén có tổn thất (Lossy)

## 5. Một số chuẩn và kỹ thuật nén ảnh tiêu biểu

---

# Slide 4. Vì sao cần nén ảnh?

Ảnh số thường có kích thước dữ liệu rất lớn.

Ví dụ:

* Ảnh màu có kích thước **4000 × 3000 pixel**.
* Mỗi pixel gồm 3 kênh:

  * R: 8 bit.
  * G: 8 bit.
  * B: 8 bit.

Dung lượng dữ liệu thô:

$$
4000\times3000\times3\times8
=288\,000\,000\text{ bit}
$$

hay khoảng:

$$
36\,000\,000\text{ byte}\approx34.3\text{ MiB}
$$

Đây mới chỉ là dữ liệu pixel, chưa tính các thông tin bổ sung của file.

**→ Nếu lưu trữ hoặc truyền hàng triệu ảnh, lượng dữ liệu sẽ rất lớn.**

---

# Slide 5. Nén ảnh là gì?

**Nén ảnh (Image Compression)** là quá trình giảm số bit cần thiết để biểu diễn một ảnh.

Mục tiêu:

> **Giảm dung lượng dữ liệu nhưng vẫn đáp ứng yêu cầu về khả năng khôi phục và chất lượng ảnh.**

Tùy phương pháp, ảnh sau giải nén có thể:

* **Giống hệt ảnh gốc** → Lossless.
* **Khác ảnh gốc nhưng vẫn đạt chất lượng chấp nhận được** → Lossy.

```text
Ảnh gốc
   │
   ▼
[NÉN]
   │
   ▼
Dữ liệu nhỏ hơn
   │
   ▼
[GIẢI NÉN]
   │
   ▼
Ảnh khôi phục
```

---

# Slide 6. Tại sao dữ liệu ảnh có thể nén?

Một ảnh không phải là tập hợp các pixel hoàn toàn độc lập.

Trong ảnh thường tồn tại:

* Các giá trị pixel lặp lại.
* Các pixel lân cận có giá trị tương tự nhau.
* Một số giá trị xuất hiện thường xuyên hơn các giá trị khác.
* Một số chi tiết ít quan trọng đối với thị giác con người.

Những đặc điểm này tạo ra **dư thừa dữ liệu (redundancy)**.

> **Nén ảnh chủ yếu là quá trình khai thác và loại bỏ hoặc biểu diễn hiệu quả các dạng dư thừa này.**

---

# Slide 7. Dữ liệu và thông tin

### Dữ liệu (Data)

Là phương tiện dùng để biểu diễn và lưu trữ thông tin.

Ví dụ:

```text
128 129 130 130 131 131 131 ...
```

là dữ liệu pixel.

### Thông tin (Information)

Là nội dung có ý nghĩa được truyền tải bởi dữ liệu.

Ví dụ:

* Một vùng ảnh có màu xanh.
* Một đường biên.
* Một ký tự.
* Một khuôn mặt.

### Ý tưởng của nén

> **Giảm số bit dùng để biểu diễn dữ liệu mà vẫn bảo toàn thông tin cần thiết theo mục đích sử dụng.**

---

# Slide 8. Tỷ lệ nén

Gọi:

* \(B_o\): số bit của dữ liệu gốc.
* \(B_c\): số bit của dữ liệu sau nén.

### Tỷ lệ nén

$$
CR=\frac{B_o}{B_c}
$$

Ví dụ:

* Ảnh gốc: 10 MB.
* Ảnh sau nén: 2 MB.

$$
CR=\frac{10}{2}=5:1
$$

→ Dữ liệu được nén với tỷ lệ **5:1**.

### Tỷ lệ giảm dung lượng

$$
R=1-\frac{B_c}{B_o}
$$

Với ví dụ trên:

$$
R=1-\frac{2}{10}=80\%
$$

---

# Slide 9. Dư thừa dữ liệu

**Dư thừa dữ liệu (Redundancy)** là phần biểu diễn dữ liệu có thể được loại bỏ hoặc mã hóa hiệu quả hơn mà không làm mất thông tin cần thiết.

Có thể hình dung:

```text
Dữ liệu ảnh
│
├── Thông tin cần thiết
│
└── Dư thừa
      │
      ├── Dư thừa mã hóa
      ├── Dư thừa không gian
      └── Thông tin không liên quan
```

**Nén ảnh = khai thác dư thừa + biểu diễn dữ liệu hiệu quả hơn.**

---

# Slide 10. Các loại dư thừa trong ảnh

## 1. Dư thừa mã hóa

**Coding Redundancy**

Xảy ra khi dùng nhiều bit hơn mức cần thiết để biểu diễn các giá trị có xác suất xuất hiện khác nhau.

→ Khai thác bằng:

* Huffman.
* Arithmetic Coding.
* Golomb.

## 2. Dư thừa không gian

**Spatial Redundancy**

Các pixel lân cận thường có quan hệ mạnh.

→ Khai thác bằng:

* RLE.
* DPCM.
* Transform Coding.

## 3. Thông tin không liên quan

**Irrelevant Information**

Một số thông tin ít ảnh hưởng đến cảm nhận của con người hoặc không cần thiết cho ứng dụng.

→ Khai thác trong:

* Quantization.
* JPEG.
* Wavelet compression.

---

# Slide 11. Ba hướng tiếp cận chính

Có thể nhìn toàn bộ chương thông qua ba câu hỏi:

### 1. Có thể dùng ít bit hơn để biểu diễn cùng thông tin không?

→ **Coding**

Ví dụ: Huffman, Arithmetic.

### 2. Có thể biểu diễn phần thay đổi thay vì toàn bộ dữ liệu không?

→ **Prediction / Transform**

Ví dụ: DPCM, DCT.

### 3. Có thông tin nào ít quan trọng có thể bỏ qua không?

→ **Quantization**

Ví dụ: JPEG, JPEG 2000.

```text
              NÉN ẢNH
                 │
       ┌─────────┼─────────┐
       ▼         ▼         ▼
    Coding   Prediction  Quantization
       │         │         │
   Huffman      DPCM      JPEG
   Arithmetic            JPEG 2000
   Golomb
```

---

# Slide 12. Phân bố mức xám

Đối với ảnh mức xám, mỗi pixel có một giá trị:

$$
x\in\{0,1,\ldots,L-1\}
$$

với \(L\) là số mức xám.

Ví dụ ảnh 8 bit:

$$
L=256
$$

Mỗi mức xám có một xác suất xuất hiện:

$$
P(x_i)
$$

và:

$$
\sum_i P(x_i)=1
$$

Phân bố xác suất này là cơ sở để đánh giá **lượng thông tin** và thiết kế các mã nén.

---

# Slide 13. Lượng tin của một sự kiện

Giả sử một sự kiện \(x\) có xác suất:

$$
P(x)
$$

Lượng tin của sự kiện:

$$
I(x)=-\log_2 P(x)
$$

Đơn vị: **bit**.

### Ý nghĩa

* Sự kiện thường gặp → lượng tin nhỏ.
* Sự kiện hiếm gặp → lượng tin lớn.

Ví dụ:

$$
P(x)=0.5
$$

thì:

$$
I(x)=1\text{ bit}
$$

Nếu:

$$
P(x)=0.125
$$

thì:

$$
I(x)=3\text{ bit}
$$

**→ Một sự kiện càng khó dự đoán thì mang càng nhiều thông tin.**

---

# Slide 14. Entropy

**Entropy** biểu diễn lượng thông tin trung bình của một nguồn.

Với các giá trị \(x_1,x_2,\ldots,x_L\):

$$
H(X)
=
-\sum_{i=1}^{L}
P(x_i)\log_2P(x_i)
$$

Đơn vị thường dùng:

$$
\text{bit/symbol}
$$

Đối với ảnh, có thể xem symbol là:

* Một pixel.
* Một mức xám.
* Một ký hiệu sau biến đổi.

---

# Slide 15. Ý nghĩa của Entropy

Entropy phản ánh mức độ **không chắc chắn / khó dự đoán** của nguồn.

### Entropy cao

Các giá trị có xác suất tương đối đồng đều.

→ Khó dự đoán.

→ Khó nén bằng các phương pháp thống kê đơn giản.

### Entropy thấp

Một số giá trị xuất hiện áp đảo.

→ Dễ dự đoán.

→ Có khả năng mã hóa bằng ít bit hơn.

> **Entropy thấp thường tạo nhiều cơ hội cho nén thống kê.**

**Lưu ý:** Entropy của phân bố mức xám không phải là thước đo trực tiếp cho "chất lượng" hay "độ đẹp" của ảnh.

---

# Slide 16. Ví dụ tính Entropy

Giả sử ảnh chỉ có ba mức xám:

| Mức xám | Xác suất |
| ------- | -------: |
| \(x_1\) |      0.5 |
| \(x_2\) |      0.3 |
| \(x_3\) |      0.2 |

Entropy:

$$
H=
-(0.5\log_2 0.5
+0.3\log_2 0.3
+0.2\log_2 0.2)
$$

$$
H\approx1.485\text{ bit/pixel}
$$

Trong khi nếu ba mức xám xuất hiện bằng nhau:

$$
P(x_i)=\frac13
$$

thì:

$$
H=\log_2 3\approx1.585
$$

→ Phân bố đều hơn → entropy cao hơn.

---

# Slide 17. Entropy và giới hạn nén

Entropy cung cấp một **giới hạn lý thuyết** cho số bit trung bình cần thiết để mã hóa nguồn.

Theo lý thuyết thông tin của Shannon:

> Không thể xây dựng một mã prefix hiệu quả có độ dài trung bình thấp hơn entropy của nguồn, nếu các giả thiết của mô hình nguồn được thỏa mãn.

Ví dụ:

$$
H=1.5\text{ bit/symbol}
$$

thì một bộ mã tốt có thể hướng tới độ dài trung bình gần:

$$
1.5\text{ bit/symbol}
$$

**→ Entropy giúp trả lời câu hỏi:**

> "Nguồn dữ liệu này về mặt lý thuyết còn có thể nén đến mức nào?"

---

# Slide 18. Thực hành: Tính Entropy

```python
import math

def calculate_entropy(probabilities):
    entropy = 0

    for p in probabilities:
        if p > 0:
            entropy -= p * math.log2(p)

    return entropy


probs = [0.5, 0.3, 0.2]

print(
    f"Entropy: "
    f"{calculate_entropy(probs):.4f} bits/symbol"
)
```

### Yêu cầu

Thử thay đổi phân bố:

```python
[0.5, 0.3, 0.2]
[0.8, 0.1, 0.1]
[0.25, 0.25, 0.25, 0.25]
```

Quan sát sự thay đổi của entropy.

---

# Slide 19. Đánh giá chất lượng ảnh sau nén

Khi nén Lossy, ảnh giải nén có thể khác ảnh gốc.

Do đó cần đánh giá mức độ sai khác.

Có hai nhóm tiêu chí:

### Đánh giá khách quan

Dựa trên các đại lượng tính toán được:

* MSE.
* RMSE.
* SNR.
* PSNR.

### Đánh giá chủ quan

Dựa trên quan sát của con người:

* Độ sắc nét.
* Chi tiết.
* Nhiễu.
* Artifact.
* Khả năng nhận biết nội dung.

---

# Slide 20. Sai số bình phương trung bình – MSE

Với ảnh gốc \(f\) và ảnh khôi phục \(g\), có \(N\) pixel:

$$
MSE=
\frac{1}{N}
\sum_{i=1}^{N}
(f_i-g_i)^2
$$

MSE đo mức sai khác bình phương trung bình giữa hai ảnh.

### Ý nghĩa

* \(MSE=0\): Hai ảnh giống hệt nhau.
* MSE càng nhỏ: sai khác càng nhỏ.

Tuy nhiên, MSE không phản ánh hoàn toàn cảm nhận của con người.

---

# Slide 21. RMSE và SNR

### RMSE

$$
RMSE=\sqrt{MSE}
$$

RMSE có cùng đơn vị với giá trị pixel.

→ RMSE càng nhỏ → ảnh khôi phục càng gần ảnh gốc.

### SNR

$$
SNR=
10\log_{10}
\left(
\frac{P_{signal}}{P_{noise}}
\right)
$$

Trong đó:

$$
P_{noise}
=
\frac{1}{N}
\sum_i(f_i-g_i)^2
$$

SNR càng cao → tỷ lệ tín hiệu so với sai số càng lớn.

---

# Slide 22. PSNR

Một chỉ số rất phổ biến trong đánh giá nén ảnh là **PSNR – Peak Signal-to-Noise Ratio**.

Với ảnh \(B\) bit:

$$
MAX_I=2^B-1
$$

$$
PSNR=
10\log_{10}
\left(
\frac{MAX_I^2}{MSE}
\right)
$$

Với ảnh 8 bit:

$$
MAX_I=255
$$

### Ý nghĩa

* MSE càng nhỏ → PSNR càng lớn.
* PSNR lớn thường tương ứng với sai khác pixel nhỏ hơn.

**Lưu ý:** PSNR là chỉ số khách quan; không phải lúc nào cũng phản ánh chính xác cảm nhận thị giác.

---

# Slide 23. Đánh giá chủ quan

Hai ảnh có thể có MSE hoặc PSNR tương tự nhau nhưng cảm nhận của con người khác nhau.

Khi đánh giá trực quan, quan sát:

* Biên ảnh.
* Chi tiết nhỏ.
* Texture.
* Vùng chuyển sắc.
* Nhiễu.
* Blocking artifact.
* Ringing artifact.
* Mức độ dễ nhận biết của đối tượng.

```text
Ảnh gốc
   │
   ├── Chỉ số khách quan
   │       ├── MSE
   │       ├── RMSE
   │       └── PSNR
   │
   └── Đánh giá chủ quan
           ├── Chi tiết
           ├── Biên
           └── Artifact
```

---

# Slide 24. Nén không tổn thất và nén có tổn thất

Có hai nhóm chính:

## Lossless

Sau giải nén:

$$
Ảnh_{reconstructed}=Ảnh_{original}
$$

theo từng pixel.

## Lossy

Sau giải nén:

$$
Ảnh_{reconstructed}\approxẢnh_{original}
$$

một phần thông tin đã bị loại bỏ.

---

# Slide 25. Nén không tổn thất – Lossless

### Nguyên lý

Loại bỏ hoặc biểu diễn hiệu quả **dư thừa**, nhưng không loại bỏ thông tin cần thiết.

### Đặc điểm

* Khôi phục chính xác ảnh gốc.
* Không tạo sai số do quá trình nén.
* Tỷ lệ nén thường thấp hơn Lossy.
* Có thể nén và giải nén nhiều lần mà không tích lũy sai số.

### Ứng dụng

* Ảnh y tế.
* Tài liệu.
* Đồ họa.
* Logo.
* Dữ liệu cần bảo toàn tuyệt đối.

Ví dụ:

* PNG.
* Một số chế độ của JPEG 2000.

---

# Slide 26. Nén có tổn thất – Lossy

### Nguyên lý

Chấp nhận loại bỏ một phần thông tin để đạt tỷ lệ nén cao hơn.

Có thể khai thác:

* Đặc điểm của hệ thống thị giác con người.
* Thành phần tần số ít quan trọng.
* Những chi tiết khó nhận biết.

### Đặc điểm

* Ảnh khôi phục không hoàn toàn giống ảnh gốc.
* Tỷ lệ nén cao.
* Chất lượng phụ thuộc mức độ nén.

### Ứng dụng

* Ảnh chụp.
* Web.
* Streaming.
* Multimedia.

Ví dụ:

* JPEG.
* JPEG 2000.

---

# Slide 27. So sánh Lossless và Lossy

| Đặc điểm            | Lossless        | Lossy          |
| ------------------- | --------------- | -------------- |
| Mất thông tin       | Không           | Có             |
| Khôi phục chính xác | Có              | Không          |
| Tỷ lệ nén           | Thường thấp hơn | Thường cao hơn |
| Chất lượng ảnh      | Giữ nguyên      | Có thể giảm    |
| Ảnh y tế            | Phù hợp         | Cần cân nhắc   |
| Ảnh web             | Có thể dùng     | Rất phổ biến   |
| JPEG                | Không           | Có             |
| PNG                 | Có              | Không          |

**Không có phương pháp nào luôn tốt nhất.**

→ Lựa chọn phụ thuộc vào **mục đích sử dụng**.

---

# Slide 28. Mô hình hệ thống nén ảnh tổng quát

Một hệ thống nén ảnh gồm hai phần:

```text
             ENCODER
Ảnh gốc ───────────────────► Bitstream
                                │
                                │
                         Kênh lưu trữ /
                         truyền dữ liệu
                                │
                                ▼
                             DECODER
                       Bitstream ───► Ảnh
```

Encoder:

> Biến dữ liệu ảnh thành biểu diễn ngắn gọn hơn.

Decoder:

> Khôi phục ảnh từ biểu diễn đã nén.

---

# Slide 29. Các thành phần của Encoder

Một mô hình tổng quát:

```text
Ảnh
 │
 ▼
Mapper / Transform
 │
 ▼
Quantizer
 │
 ▼
Symbol Coder
 │
 ▼
Bitstream
```

### Mapper / Transform

Biến đổi dữ liệu để làm giảm hoặc tập trung dư thừa.

### Quantizer

Giảm số mức biểu diễn.

→ Có thể gây mất mát.

### Symbol Coder

Mã hóa các ký hiệu hiệu quả hơn.

→ Thường là bước Lossless.

---

# Slide 30. Decoder

Quá trình giải nén thực hiện ngược lại:

```text
Bitstream
   │
   ▼
Symbol Decoder
   │
   ▼
Inverse Quantizer
   │
   ▼
Inverse Mapper
   │
   ▼
Ảnh khôi phục
```

Đối với Lossless:

```text
Encoder ───────────────► Decoder
   │                         │
   └────── Không mất ────────┘
```

Đối với Lossy:

```text
Encoder ── Quantization ──► Decoder
               │
               ▼
          Mất thông tin
```

**Quantization là một điểm quan trọng gây tổn thất.**

---

# Slide 31. NÉN KHÔNG TỔN THẤT

## LOSSLESS IMAGE COMPRESSION

Các kỹ thuật tiêu biểu:

* Huffman Coding.
* Golomb / Golomb-Rice.
* Arithmetic Coding.
* LZW.
* Run-Length Encoding.
* JBIG2.
* Bit-plane coding.

---

# Slide 32. Huffman Coding

**Huffman Coding** là phương pháp mã hóa độ dài thay đổi.

Nguyên tắc:

> Ký hiệu xuất hiện càng thường xuyên → mã càng ngắn.

> Ký hiệu hiếm → mã dài hơn.

Ví dụ:

```text
Ký hiệu       Tần suất       Mã
 A              cao          0
 B              trung        10
 C              thấp         110
 D              rất thấp     111
```

→ Giảm số bit trung bình.

---

# Slide 33. Xây dựng cây Huffman

Quy trình:

### Bước 1

Tính tần suất hoặc xác suất của các ký hiệu.

### Bước 2

Sắp xếp theo tần suất tăng dần.

### Bước 3

Chọn hai nút có tần suất nhỏ nhất.

### Bước 4

Gộp chúng thành một nút mới.

### Bước 5

Lặp lại cho đến khi còn một nút gốc.

### Bước 6

Gán:

```text
Nhánh trái  → 0
Nhánh phải  → 1
```

Mã của ký hiệu là đường đi từ gốc đến nút lá.

---

# Slide 34. Ví dụ Huffman

Giả sử:

| Ký hiệu | Tần suất |
| ------- | -------: |
| A       |       50 |
| B       |       25 |
| C       |       15 |
| D       |       10 |

Hai nút nhỏ nhất:

$$
10+15=25
$$

Sau đó:

$$
25+25=50
$$

Cuối cùng:

$$
50+50=100
$$

Một cây Huffman có thể cho:

```text
             100
            /   \
          50     50
         / \     / \
        A   ?   B   ?
           ...     ...
```

Điểm quan trọng:

> **Ký hiệu có xác suất cao nằm gần gốc hơn và có mã ngắn hơn.**

---

# Slide 35. Huffman – Mã hóa và giải mã

### Mã hóa

```text
Ký hiệu
   │
   ▼
Tra bảng mã
   │
   ▼
Chuỗi bit
```

Ví dụ:

```text
A → 0
B → 10
C → 110
```

Chuỗi:

```text
ABCA
```

được thay bằng:

```text
0 10 110 0
```

### Giải mã

Đọc từng bit:

```text
Root
 │
 ├─0 ──► A
 │
 └─1 ──► tiếp tục
```

Khi đến **leaf** → thu được một ký hiệu.

---

# Slide 36. Huffman trong nén ảnh

Đối với ảnh mức xám:

```text
Ảnh
 │
 ▼
Phân tích tần suất mức xám
 │
 ▼
Xây dựng Huffman Tree
 │
 ▼
Tạo bảng mã
 │
 ▼
Mã hóa pixel
 │
 ▼
Bitstream
```

Tuy nhiên, nếu pixel được xem độc lập, hiệu quả có thể hạn chế.

→ Trong các hệ thống thực tế, Huffman thường được áp dụng sau các bước biến đổi hoặc dự đoán để tạo ra dữ liệu có phân bố thuận lợi hơn.

---

# Slide 37. Thực hành Huffman

```python
import heapq

class Node:
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None

    def __lt__(self, other):
        return self.freq < other.freq
```

Xây dựng cây:

```python
def build_huffman_tree(text):
    freq = {}

    for char in text:
        freq[char] = freq.get(char, 0) + 1

    heap = [
        Node(char, f)
        for char, f in freq.items()
    ]

    heapq.heapify(heap)

    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)

        merged = Node(
            None,
            left.freq + right.freq
        )

        merged.left = left
        merged.right = right

        heapq.heappush(heap, merged)

    return heap[0]
```

---

# Slide 38. Golomb Coding

Golomb Coding đặc biệt phù hợp với các số nguyên không âm có phân bố lệch về các giá trị nhỏ.

Với số nguyên \(n\), chọn tham số \(M\):

$$
q=\left\lfloor\frac{n}{M}\right\rfloor
$$

$$
r=n\bmod M
$$

Trong đó:

* \(q\): thương.
* \(r\): số dư.

Sau đó mã hóa:

* \(q\) bằng một mã unary.
* \(r\) bằng một mã nhị phân phù hợp.

---

# Slide 39. Golomb-Rice Coding

Golomb-Rice là trường hợp đặc biệt của Golomb khi:

$$
M=2^k
$$

Khi đó:

$$
q=n>>k
$$

và:

$$
r=n\ \&\ (2^k-1)
$$

Do \(M\) là lũy thừa của 2 nên không cần phép chia thông thường.

→ Có thể thực hiện rất nhanh bằng các phép toán bit.

Golomb-Rice đặc biệt hữu ích khi dữ liệu có nhiều giá trị nhỏ.

---

# Slide 40. Ví dụ Golomb-Rice

Giả sử:

$$
n=13,\quad k=2
$$

Khi đó:

$$
M=2^2=4
$$

$$
q=13//4=3
$$

$$
r=13\bmod4=1
$$

Biểu diễn:

```text
q = 3 → 0001
r = 1 → 01
```

Mã:

```text
000101
```

Giải mã:

$$
n=qM+r
$$

$$
n=3\times4+1=13
$$

---

# Slide 41. Arithmetic Coding

Arithmetic Coding khác Huffman ở chỗ:

> Không ánh xạ từng ký hiệu thành một chuỗi bit độc lập.

Thay vào đó:

> **Toàn bộ chuỗi ký hiệu được biểu diễn bởi một số nằm trong một khoảng số thực.**

Ban đầu:

$$
[0,1)
$$

Mỗi ký hiệu làm thu hẹp khoảng hiện tại.

```text
[0, 1)
   │
   ├── A
   ├── B
   └── C
        │
        ▼
   khoảng nhỏ hơn
        │
        ▼
   khoảng nhỏ hơn nữa
```

---

# Slide 42. Ví dụ Arithmetic Coding

Giả sử:

$$
P(A)=0.5
$$

$$
P(B)=0.3
$$

$$
P(C)=0.2
$$

Các khoảng:

```text
A → [0.0, 0.5)
B → [0.5, 0.8)
C → [0.8, 1.0)
```

Mã hóa chuỗi:

```text
AB
```

Sau khi xử lý A:

$$
[0,0.5)
$$

Sau đó chia khoảng này theo xác suất.

B chiếm 30% khoảng hiện tại:

$$
[0.25,0.40)
$$

Bất kỳ số nào trong khoảng cuối đều có thể đại diện cho chuỗi `AB`, với điều kiện bộ giải mã biết mô hình xác suất và quy tắc kết thúc.

---

# Slide 43. Giải mã Arithmetic Coding

Bộ giải mã biết:

* Giá trị mã hóa.
* Bảng xác suất.
* Quy tắc kết thúc hoặc độ dài chuỗi.

Quy trình:

1. Khởi tạo khoảng \([0,1)\).
2. Chia khoảng theo xác suất.
3. Xác định giá trị mã hóa thuộc khoảng của ký hiệu nào.
4. Xuất ký hiệu.
5. Thu hẹp khoảng.
6. Lặp lại.

```text
Giá trị mã hóa
      │
      ▼
Xác định khoảng
      │
      ▼
Ký hiệu
      │
      ▼
Thu hẹp khoảng
      │
      └──────► lặp lại
```

---

# Slide 44. Arithmetic Coding và Huffman

| Đặc điểm            | Huffman                         | Arithmetic                      |
| ------------------- | ------------------------------- | ------------------------------- |
| Đơn vị mã hóa       | Ký hiệu                         | Chuỗi                           |
| Mã                  | Chuỗi bit                       | Khoảng số                       |
| Độ dài mã           | Thường là số nguyên bit/ký hiệu | Có thể tiệm cận entropy tốt hơn |
| Mô hình xác suất    | Có                              | Có                              |
| Độ phức tạp         | Thấp hơn                        | Cao hơn                         |
| Khả năng thích nghi | Có thể                          | Có thể                          |

Điểm quan trọng:

> Arithmetic Coding có thể đạt hiệu quả gần giới hạn entropy hơn trong nhiều trường hợp, đặc biệt khi xác suất không phù hợp với mã độ dài nguyên của Huffman.

---

# Slide 45. LZW

**LZW – Lempel-Ziv-Welch**

Thay vì mã hóa từng ký hiệu độc lập, LZW tìm các **chuỗi ký hiệu lặp lại** và đưa chúng vào từ điển.

Ví dụ:

```text
ABABABAB...
```

thay vì lưu từng ký tự:

```text
A B A B A B A B
```

có thể xây dựng các mục từ điển:

```text
AB
BA
ABA
...
```

và thay chúng bằng mã số.

---

# Slide 46. Nguyên lý LZW

### Khởi tạo

Từ điển chứa các ký hiệu cơ bản.

Ví dụ:

```text
A → 65
B → 66
```

### Trong quá trình nén

Nếu chuỗi hiện tại đã có trong từ điển:

→ tiếp tục mở rộng.

Nếu chuỗi mới chưa có:

→ xuất mã của chuỗi trước.

→ thêm chuỗi mới vào từ điển.

→ bắt đầu chuỗi mới.

**Đặc điểm quan trọng:**

> Bộ nén và bộ giải nén có thể tự xây dựng cùng một từ điển.

---

# Slide 47. Ví dụ LZW

Chuỗi:

```text
ABAABABA
```

Từ điển ban đầu:

```text
A → 65
B → 66
```

Mã mới bắt đầu từ 256.

Một số bước:

```text
A       → có
AB      → chưa có
          xuất A
          thêm AB → 256

B       → có
BA      → chưa có
          xuất B
          thêm BA → 257
```

Tiếp tục quá trình cho đến hết chuỗi.

→ Chuỗi lặp được thay thế bởi các mã từ điển.

---

# Slide 48. Giải mã LZW

Bộ giải nén cũng xây dựng từ điển.

Quy trình:

1. Khởi tạo từ điển.
2. Đọc mã đầu tiên.
3. Xuất chuỗi tương ứng.
4. Đọc mã tiếp theo.
5. Nếu mã đã có:

   * lấy chuỗi tương ứng.
6. Nếu mã chưa có:

   * xử lý trường hợp đặc biệt của LZW.
7. Thêm mục mới vào từ điển.
8. Lặp lại.

Điểm quan trọng:

> **Không nhất thiết phải gửi toàn bộ từ điển đi kèm dữ liệu.**

---

# Slide 49. Run-Length Encoding – RLE

RLE khai thác các chuỗi giá trị giống nhau liên tiếp.

Ví dụ:

```text
AAAAAAABBBCC
```

thay vì:

```text
A A A A A A A B B B C C
```

có thể biểu diễn:

```text
(A,7)
(B,3)
(C,2)
```

### Nguyên lý

$$
(Value,Length)
$$

Trong ảnh:

```text
11111111000000001111
```

→

```text
(1,8)(0,8)(1,4)
```

---

# Slide 50. RLE trên ảnh

RLE đặc biệt hiệu quả khi ảnh có:

* Vùng lớn cùng màu.
* Nhiều pixel giống nhau liên tiếp.
* Ảnh nhị phân.
* Tài liệu scan.

Ví dụ:

```text
████████████
████████████
████████████
```

có thể biểu diễn rất ngắn bằng số lần lặp.

### Hạn chế

Nếu ảnh chứa nhiều thay đổi:

```text
101101001011010...
```

thì RLE có thể:

* Không giúp giảm kích thước.
* Thậm chí làm dữ liệu lớn hơn do phải lưu cả độ dài.

---

# Slide 51. JBIG2

**JBIG2** là kỹ thuật nén ảnh nhị phân, đặc biệt phù hợp với tài liệu.

Ý tưởng:

> Phát hiện các ký hiệu hoặc mẫu hình giống nhau và lưu một phiên bản trong từ điển.

Ví dụ tài liệu:

```text
A A A B A A C A ...
```

Thay vì lưu từng hình ảnh ký tự độc lập:

```text
A → mẫu 1
B → mẫu 2
C → mẫu 3
```

Sau đó chỉ cần lưu vị trí và mã tham chiếu.

→ Hiệu quả với:

* Tài liệu.
* Văn bản scan.
* Các ký hiệu lặp lại.

---

# Slide 52. Bit-plane Coding

Ảnh 8 bit có thể được tách thành 8 mặt phẳng bit:

```text
Bit 7
Bit 6
Bit 5
Bit 4
Bit 3
Bit 2
Bit 1
Bit 0
```

Ví dụ:

$$
Pixel=173
$$

$$
173=(10101101)_2
$$

Mỗi bit tạo thành một **bit-plane**.

```text
Ảnh 8 bit
    │
    ├── Plane 7
    ├── Plane 6
    ├── Plane 5
    ├── Plane 4
    ├── Plane 3
    ├── Plane 2
    ├── Plane 1
    └── Plane 0
```

---

# Slide 53. Ý nghĩa của Bit-plane

Các bit có mức độ ảnh hưởng khác nhau.

### MSB – Most Significant Bit

Có ảnh hưởng lớn đến giá trị pixel.

→ Thường chứa cấu trúc chính của ảnh.

### LSB – Least Significant Bit

Ảnh hưởng nhỏ hơn.

→ Có thể chứa các chi tiết nhỏ hoặc nhiễu.

Các bit-plane có thể được:

* Phân tích riêng.
* Nén riêng.
* Truyền theo thứ tự ưu tiên.

---

# Slide 54. Tổng kết Lossless

Các phương pháp Lossless khai thác các loại dư thừa khác nhau:

```text
                 LOSSLESS
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
    Thống kê      Lặp lại     Cấu trúc
        │           │           │
    Huffman       LZW          RLE
    Arithmetic                  JBIG2
    Golomb
```

Điểm chung:

> **Sau giải nén phải khôi phục chính xác dữ liệu gốc.**

---

# Slide 55. NÉN CÓ TỔN THẤT

## LOSSY IMAGE COMPRESSION

Mục tiêu:

> **Đạt tỷ lệ nén cao bằng cách loại bỏ những thông tin ít quan trọng hoặc khó nhận biết.**

Các hướng chính:

* Transform Coding.
* Quantization.
* Predictive Coding.
* Wavelet Coding.

---

# Slide 56. Tại sao có thể loại bỏ thông tin?

Hệ thống thị giác con người không nhạy như nhau với mọi loại thông tin.

Ví dụ:

* Có thể khó nhận ra một số thay đổi rất nhỏ về màu sắc.
* Một số thành phần tần số cao ít quan trọng hơn các thành phần tần số thấp.
* Một số chi tiết nhỏ có thể bị bỏ qua trong ảnh có độ phân giải thấp.

Do đó:

```text
Thông tin ảnh
      │
      ├── Quan trọng
      │      ↓
      │    Giữ lại
      │
      └── Ít quan trọng
             ↓
          Có thể giảm/bỏ
```

**→ Đây là cơ sở của nén Lossy.**

---

# Slide 57. Block Transform Coding

Ý tưởng:

> Biến đổi dữ liệu ảnh từ miền không gian sang một miền biểu diễn thuận lợi hơn cho nén.

Quy trình:

```text
Ảnh
 │
 ▼
Chia block
 │
 ▼
Transform
 │
 ▼
Quantization
 │
 ▼
Entropy Coding
 │
 ▼
Bitstream
```

Một hệ thống điển hình:

$$
8\times8
\rightarrow DCT
\rightarrow Quantization
\rightarrow Zigzag
\rightarrow RLE
\rightarrow Huffman
$$

Đây là cơ sở quan trọng của **JPEG**.

---

# Slide 58. Chia ảnh thành block

JPEG thường chia ảnh thành các block:

$$
8\times8
$$

Mỗi block chứa:

$$
64
$$

pixel.

Ví dụ:

```text
Ảnh
┌──────┬──────┬──────┐
│ 8×8  │ 8×8  │ 8×8  │
├──────┼──────┼──────┤
│ 8×8  │ 8×8  │ 8×8  │
├──────┼──────┼──────┤
│ 8×8  │ 8×8  │ 8×8  │
└──────┴──────┴──────┘
```

Sau đó xử lý từng block độc lập.

---

# Slide 59. DCT – Discrete Cosine Transform

DCT biến đổi dữ liệu từ:

> **Miền không gian → miền tần số**

Trong miền không gian:

```text
Pixel
Pixel
Pixel
...
```

Trong miền tần số:

```text
Hệ số DC
Hệ số AC
Hệ số AC
...
```

DCT có xu hướng tập trung năng lượng của ảnh vào một số hệ số quan trọng.

→ Đây là đặc tính rất hữu ích cho nén.

---

# Slide 60. Hệ số DC và AC

Trong block DCT:

```text
┌────┬────┬────┬────┐
│ DC │ AC │ AC │ AC │
├────┼────┼────┼────┤
│ AC │ AC │ AC │ AC │
├────┼────┼────┼────┤
│ AC │ AC │ AC │ AC │
├────┼────┼────┼────┤
│ AC │ AC │ AC │ AC │
└────┴────┴────┴────┘
```

### DC

Góc trên bên trái.

→ Thành phần tần số thấp nhất.

→ Liên quan đến mức sáng trung bình của block.

### AC

Các hệ số còn lại.

→ Đại diện cho các thành phần biến thiên / chi tiết với các tần số khác nhau.

Thông thường:

> Thành phần tần số thấp chứa phần lớn năng lượng của ảnh tự nhiên.

---

# Slide 61. Lượng tử hóa – Quantization

Đây là **bước gây mất mát thông tin quan trọng trong JPEG**.

Mỗi hệ số DCT được chia cho một giá trị trong ma trận lượng tử:

$$
Q(u,v)
$$

sau đó làm tròn:

$$
\hat{F}(u,v)
=
round
\left(
\frac{F(u,v)}{Q(u,v)}
\right)
$$

Khi giải mã:

$$
F'(u,v)
=
\hat{F}(u,v)\times Q(u,v)
$$

Do phép làm tròn:

$$
F'(u,v)\neq F(u,v)
$$

→ Thông tin đã mất và không thể khôi phục chính xác.

---

# Slide 62. Vì sao Quantization giúp nén?

Giả sử các hệ số DCT:

```text
120   8   3   1
 7    2   1   0
 3    1   0   0
 1    0   0   0
```

Sau lượng tử hóa có thể trở thành:

```text
15   1   0   0
 1   0   0   0
 0   0   0   0
 0   0   0   0
```

Rất nhiều hệ số trở thành:

$$
0
$$

→ tạo ra các chuỗi zero dài.

→ RLE hoạt động hiệu quả.

→ Huffman tiếp tục giảm số bit.

---

# Slide 63. Zigzag Scan

Sau lượng tử hóa, các hệ số thường được quét theo thứ tự zigzag:

```text
 1 →  2 →  6 →  7
       ↘
 3 →  5 →  8 → ...
```

Mục tiêu:

> Đưa các hệ số tần số thấp lên đầu và gom các hệ số bằng 0 về cuối chuỗi.

Kết quả thường có dạng:

```text
DC, AC, AC, AC, ..., 0, 0, 0, 0
```

→ thuận lợi cho RLE.

---

# Slide 64. RLE + Huffman trong JPEG

Sau zigzag:

```text
10  2  1  0  0  0  0  0  ...
```

Có thể biểu diễn các số 0 bằng run-length.

Ví dụ:

```text
(2,1)
(1,1)
(0,5)
...
```

Sau đó:

```text
Zigzag
   ↓
RLE
   ↓
Huffman
   ↓
Bitstream
```

**→ JPEG kết hợp nhiều kỹ thuật, không phải chỉ sử dụng DCT.**

---

# Slide 65. Quy trình nén JPEG

```text
Ảnh
 │
 ▼
Chuyển đổi không gian màu
 │
 ▼
Chia block 8×8
 │
 ▼
DCT
 │
 ▼
Quantization
 │
 ▼
Zigzag Scan
 │
 ▼
RLE
 │
 ▼
Huffman / Entropy Coding
 │
 ▼
Bitstream JPEG
```

Trong chuỗi này:

> **Quantization là bước Lossy.**

Các bước mã hóa còn lại chủ yếu nhằm biểu diễn dữ liệu hiệu quả hơn.

---

# Slide 66. Giải mã JPEG

Quy trình ngược:

```text
Bitstream
   │
   ▼
Entropy Decoding
   │
   ▼
Inverse Zigzag
   │
   ▼
Inverse Quantization
   │
   ▼
IDCT
   │
   ▼
Ghép các block
   │
   ▼
Ảnh khôi phục
```

Lưu ý:

> Inverse Quantization không thể khôi phục chính xác các hệ số DCT ban đầu vì thông tin đã bị mất trong bước Quantization.

---

# Slide 67. Artifact trong JPEG

Khi nén quá mạnh, có thể xuất hiện:

### Blocking Artifact

Các block 8×8 trở nên dễ nhìn thấy.

### Ringing Artifact

Xuất hiện dao động hoặc viền quanh các cạnh mạnh.

### Mất chi tiết

Texture và chi tiết nhỏ bị làm mờ.

```text
Nén thấp
    ↓
Chất lượng cao
    ↓
Dung lượng lớn

Nén cao
    ↓
Chất lượng giảm
    ↓
Dung lượng nhỏ
```

→ Luôn tồn tại sự đánh đổi giữa **dung lượng và chất lượng**.

---

# Slide 68. Predictive Coding – DPCM

Ý tưởng:

> Các pixel lân cận thường tương quan với nhau.

Do đó không nhất thiết phải truyền toàn bộ giá trị pixel.

Thay vào đó:

> Dự đoán pixel tiếp theo và chỉ mã hóa **sai số dự đoán**.

$$
e(n)=x(n)-\hat{x}(n)
$$

Trong đó:

* \(x(n)\): giá trị thực.
* \(\hat{x}(n)\): giá trị dự đoán.
* \(e(n)\): sai số dự đoán.

---

# Slide 69. Ví dụ DPCM

Dãy pixel:

```text
150   152   149   151
```

Dự đoán đơn giản:

$$
\hat{x}(n)=x(n-1)
$$

Ta có:

```text
Pixel thực:
150   152   149   151

Dự đoán:
      150   152   149

Sai số:
150    2    -3     2
```

So sánh:

```text
Giá trị pixel:
150, 152, 149, 151

Sai số:
150, 2, -3, 2
```

Các sai số thường nhỏ hơn nhiều so với giá trị pixel.

→ Có thể mã hóa hiệu quả hơn.

---

# Slide 70. DPCM Lossless và Lossy

### Lossless DPCM

Chỉ dự đoán và mã hóa sai số.

Nếu sai số được biểu diễn chính xác:

$$
x(n)=\hat{x}(n)+e(n)
$$

→ Khôi phục chính xác.

### Lossy DPCM

Thêm lượng tử hóa:

```text
Pixel
  │
  ▼
Predictor
  │
  ▼
Prediction Error
  │
  ▼
Quantizer
  │
  ▼
Encoder
```

→ Sai số bị lượng tử hóa.

→ Có mất thông tin.

---

# Slide 71. Giải mã DPCM

Bộ giải mã thực hiện:

1. Nhận sai số.
2. Tính giá trị dự đoán.
3. Cộng sai số vào giá trị dự đoán.

$$
x(n)=\hat{x}(n)+e(n)
$$

Ví dụ:

```text
Giá trị đầu:
150

Sai số:
2   -3   2

Giải mã:
150
150 + 2     = 152
152 - 3     = 149
149 + 2     = 151
```

→ Khôi phục:

```text
150 152 149 151
```

---

# Slide 72. Thực hành DPCM

```python
def dpcm_encode(signal):
    encoded = [signal[0]]

    for i in range(1, len(signal)):
        predicted = signal[i - 1]
        error = signal[i] - predicted
        encoded.append(error)

    return encoded
```

Giải mã:

```python
def dpcm_decode(encoded):
    decoded = [encoded[0]]

    for i in range(1, len(encoded)):
        predicted = decoded[i - 1]
        decoded.append(predicted + encoded[i])

    return decoded
```

Thử nghiệm:

```python
signal = [150, 152, 149, 151]

encoded = dpcm_encode(signal)
decoded = dpcm_decode(encoded)

print("DPCM :", encoded)
print("Decode:", decoded)
```

---

# Slide 73. Wavelet Coding

Một hướng tiếp cận khác là sử dụng:

**Discrete Wavelet Transform – DWT**

Khác với DCT theo block:

> DWT có thể phân tích toàn ảnh theo nhiều mức phân giải.

Ảnh được phân tách thành các sub-band:

```text
          DWT
           │
     ┌─────┼─────┐
     ▼     ▼     ▼
    LL    LH    HL
           │
           ▼
          HH
```

Trong đó:

* LL: thành phần tần số thấp.
* LH, HL, HH: các thành phần chi tiết theo các hướng.

---

# Slide 74. Đa phân giải với Wavelet

Wavelet cho phép biểu diễn ảnh ở nhiều mức:

```text
Ảnh gốc
   │
   ▼
Mức 1
   │
   ├── LL
   ├── LH
   ├── HL
   └── HH
          │
          ▼
      Tiếp tục DWT
      trên LL
```

→ Tạo ra biểu diễn **multiresolution**.

Điều này hữu ích cho:

* Nén.
* Phân tích ảnh.
* Truyền ảnh tiến triển.
* Xử lý ở nhiều độ phân giải.

---

# Slide 75. Wavelet và JPEG 2000

**JPEG 2000** là một chuẩn nén ảnh sử dụng Wavelet.

Đặc điểm:

* Sử dụng DWT.
* Không chia ảnh thành các block 8×8 như JPEG truyền thống.
* Hỗ trợ Lossy.
* Hỗ trợ Lossless trong các chế độ phù hợp.
* Hỗ trợ biểu diễn đa phân giải.
* Có thể hỗ trợ truyền ảnh tiến triển.

Một ưu điểm đáng chú ý:

> Có thể giảm hiện tượng **blocking artifact** đặc trưng của phương pháp DCT theo block.

---

# Slide 76. Quy trình nén Wavelet

```text
Ảnh
 │
 ▼
DWT
 │
 ▼
Các sub-band
 │
 ▼
Quantization
 │
 ▼
Bit-plane / Entropy Coding
 │
 ▼
Bitstream
```

Các kỹ thuật mã hóa có thể kết hợp:

* Bit-plane coding.
* Arithmetic Coding.
* EZW.
* SPIHT.
* EBCOT.

---

# Slide 77. Giải mã Wavelet

Quy trình:

```text
Bitstream
   │
   ▼
Entropy Decoding
   │
   ▼
Inverse Quantization
   │
   ▼
Các sub-band
   │
   ▼
IDWT
   │
   ▼
Ảnh khôi phục
```

Trong trường hợp Lossy:

> Thông tin đã bị mất trong bước lượng tử hóa không thể khôi phục chính xác.

Trong trường hợp Lossless phù hợp:

> Có thể khôi phục chính xác ảnh ban đầu.

---

# Slide 78. DCT và Wavelet

| Đặc điểm         | DCT / JPEG                          | Wavelet / JPEG 2000       |
| ---------------- | ----------------------------------- | ------------------------- |
| Phân tích        | Theo block                          | Toàn ảnh / đa phân giải   |
| Kích thước block | Thường 8×8                          | Không phụ thuộc block 8×8 |
| Artifact         | Có thể có blocking                  | Giảm blocking             |
| Đa phân giải     | Hạn chế                             | Tốt                       |
| Lossless         | Không trong JPEG Lossy thông thường | Có hỗ trợ trong JPEG 2000 |
| Độ phổ biến      | Rất cao                             | Thấp hơn JPEG             |

Không nên hiểu rằng Wavelet luôn "tốt hơn" trong mọi ứng dụng.

→ Mỗi phương pháp có mục tiêu, độ phức tạp và môi trường sử dụng khác nhau.

---

# Slide 79. Bức tranh tổng thể của nén ảnh

```text
                         NÉN ẢNH
                            │
          ┌─────────────────┴─────────────────┐
          │                                   │
      LOSSLESS                              LOSSY
          │                                   │
   ┌──────┼───────┐                 ┌─────────┼─────────┐
   │      │       │                 │         │         │
Huffman  LZW     RLE              DCT       DPCM      DWT
   │      │       │                 │         │         │
Arithmetic       JBIG2            JPEG      Predictive JPEG 2000
Golomb
```

Ba ý tưởng nền tảng:

```text
Coding redundancy
       ↓
Statistical coding

Spatial redundancy
       ↓
Prediction / RLE

Irrelevant information
       ↓
Quantization
```

---

# Slide 80. So sánh các kỹ thuật tiêu biểu

| Kỹ thuật    | Lossless | Lossy | Ý tưởng chính         |
| ----------- | :------: | :---: | --------------------- |
| Huffman     |     ✓    |       | Mã độ dài biến đổi    |
| Arithmetic  |     ✓    |       | Mã hóa theo khoảng    |
| Golomb-Rice |     ✓    |       | Mã hóa số nguyên      |
| LZW         |     ✓    |       | Từ điển chuỗi         |
| RLE         |     ✓    |       | Chuỗi lặp             |
| DPCM        |     ✓    |   ✓   | Mã hóa sai số dự đoán |
| DCT         |          |   ✓   | Biến đổi miền tần số  |
| DWT         |    ✓*    |   ✓   | Biến đổi wavelet      |

* Tùy cách triển khai và chế độ mã hóa.

---

# Slide 81. Đánh đổi trong nén ảnh

Nén ảnh luôn liên quan đến sự đánh đổi:

```text
              Tỷ lệ nén
                 ▲
                 │
                 │
                 │
                 │
                 └──────────────►
                         Chất lượng
```

### Lossless

```text
Chất lượng: 100%
Tỷ lệ nén: thường thấp hơn
```

### Lossy

```text
Tỷ lệ nén: cao
Chất lượng: phụ thuộc mức nén
```

Mục tiêu thực tế:

> **Tìm mức nén phù hợp với yêu cầu của ứng dụng.**

---

# Slide 82. Ví dụ lựa chọn phương pháp

### Ảnh chụp dùng trên website

Có thể ưu tiên:

→ Lossy như JPEG.

Lý do:

* Cần giảm dung lượng.
* Có thể chấp nhận một mức sai khác.

### Ảnh tài liệu / logo

Có thể ưu tiên:

→ Lossless.

Lý do:

* Cần giữ chính xác cạnh và ký tự.

### Ảnh y tế

Cần xem xét yêu cầu của hệ thống:

* Dữ liệu có cần bảo toàn tuyệt đối không?
* Có được phép mất thông tin không?
* Mức sai số chấp nhận được là bao nhiêu?

**→ Không lựa chọn thuật toán chỉ dựa trên tỷ lệ nén.**

---

# Slide 83. Thực hành tổng hợp

Cho một ảnh bất kỳ:

### Bước 1

Đọc ảnh.

### Bước 2

Tính:

* Kích thước ảnh.
* Số bit dữ liệu thô.
* Histogram.
* Entropy.

### Bước 3

Lưu ảnh với các mức chất lượng JPEG khác nhau.

### Bước 4

Tính:

* Dung lượng file.
* MSE.
* RMSE.
* PSNR.

### Bước 5

Quan sát trực quan:

* Chi tiết.
* Biên.
* Blocking artifact.
* Mức độ thay đổi màu.

---

# Slide 84. Thực hành: Đánh đổi dung lượng – chất lượng

Ví dụ thử:

```python
qualities = [95, 75, 50, 25, 10]
```

Với mỗi mức:

1. Lưu ảnh JPEG.
2. Đọc lại ảnh.
3. Tính kích thước file.
4. Tính MSE.
5. Tính PSNR.
6. Hiển thị ảnh.

Tạo bảng:

| Quality | Size | MSE | PSNR |
| ------: | ---: | --: | ---: |
|      95 |  ... | ... |  ... |
|      75 |  ... | ... |  ... |
|      50 |  ... | ... |  ... |
|      25 |  ... | ... |  ... |
|      10 |  ... | ... |  ... |

**Mục tiêu:** quan sát trực tiếp quan hệ giữa:

> **Compression Ratio ↔ File Size ↔ Image Quality**

---

# Slide 85. Những điểm cần nhớ

### 1. Nén ảnh

> Giảm số bit cần thiết để biểu diễn ảnh.

### 2. Dư thừa

Là cơ sở để nén:

* Coding redundancy.
* Spatial redundancy.
* Irrelevant information.

### 3. Entropy

Đo lượng thông tin trung bình và cung cấp giới hạn lý thuyết cho mã hóa nguồn.

### 4. Lossless

> Không mất thông tin.

### 5. Lossy

> Chấp nhận mất thông tin để đạt tỷ lệ nén cao.

---

# Slide 86. Những điểm cần nhớ – các thuật toán

```text
Huffman
→ Mã độ dài biến đổi

Arithmetic
→ Mã hóa chuỗi bằng khoảng

Golomb-Rice
→ Mã hóa số nguyên nhỏ

LZW
→ Từ điển chuỗi lặp

RLE
→ Chuỗi giá trị lặp

DPCM
→ Mã hóa sai số dự đoán

DCT
→ Biến đổi sang miền tần số

DWT
→ Biến đổi wavelet đa phân giải
```

---

# Slide 87. JPEG – kiến thức trọng tâm

Cần nhớ chuỗi:

```text
Ảnh
 ↓
Block 8×8
 ↓
DCT
 ↓
Quantization   ← LOSSY
 ↓
Zigzag
 ↓
RLE
 ↓
Huffman
 ↓
JPEG Bitstream
```

Và khi giải mã:

```text
Bitstream
 ↓
Huffman Decode
 ↓
Inverse Zigzag
 ↓
Inverse Quantization
 ↓
IDCT
 ↓
Ảnh
```

**Điểm quan trọng nhất:**

> **Quantization là bước làm mất thông tin.**

---

# Slide 88. Câu hỏi ôn tập

### Câu 1

Tại sao ảnh số có thể nén?

### Câu 2

Dư thừa mã hóa và dư thừa không gian khác nhau như thế nào?

### Câu 3

Entropy có ý nghĩa gì trong nén dữ liệu?

### Câu 4

Tại sao Huffman có thể giảm số bit trung bình?

### Câu 5

Tại sao Arithmetic Coding có thể đạt hiệu quả gần entropy?

### Câu 6

LZW khai thác dạng dư thừa nào?

### Câu 7

Khi nào RLE hoạt động hiệu quả?

### Câu 8

Tại sao DPCM chỉ cần mã hóa sai số?

### Câu 9

Trong JPEG, bước nào gây mất thông tin?

### Câu 10

DCT và DWT khác nhau như thế nào?

---

# Slide 89. Bài tập vận dụng

### Bài 1 – Entropy

Cho histogram:

| Mức xám | Xác suất |
| ------- | -------: |
| 0       |      0.5 |
| 1       |     0.25 |
| 2       |    0.125 |
| 3       |    0.125 |

Tính entropy.

---

### Bài 2 – Huffman

Cho các ký hiệu:

```text
A: 40
B: 30
C: 20
D: 10
```

1. Xây dựng cây Huffman.
2. Tạo bảng mã.
3. Tính độ dài mã trung bình.
4. So sánh với mã cố định.

---

# Slide 90. Bài tập vận dụng

### Bài 3 – RLE

Cho chuỗi:

```text
AAAABBBBBCCCCCCCCAA
```

1. Mã hóa bằng RLE.
2. Tính số ký tự trước nén.
3. Tính số phần tử sau nén.
4. Nhận xét hiệu quả.

### Bài 4 – DPCM

Cho:

```text
100, 102, 101, 103, 105, 104
```

Dùng:

$$
\hat{x}(n)=x(n-1)
$$

để:

1. Tính sai số.
2. Khôi phục dữ liệu.
3. Giải thích tại sao sai số dễ nén hơn giá trị pixel.

---

# Slide 91. Bài tập vận dụng

### Bài 5 – JPEG

Giải thích vai trò của từng bước:

```text
8×8
→ DCT
→ Quantization
→ Zigzag
→ RLE
→ Huffman
```

Đặc biệt:

> Nếu bỏ bước Quantization thì JPEG còn Lossy hay không?

---

### Bài 6 – Thực nghiệm

Với một ảnh màu:

1. Lưu PNG.
2. Lưu JPEG quality = 95.
3. Lưu JPEG quality = 50.
4. Lưu JPEG quality = 10.

So sánh:

* Dung lượng.
* MSE.
* RMSE.
* PSNR.
* Chất lượng trực quan.

---

# Slide 92. Tổng kết chương

Nén ảnh không chỉ là:

> "Làm cho file ảnh nhỏ hơn."

Mà là quá trình:

```text
Hiểu dữ liệu
     ↓
Phát hiện dư thừa
     ↓
Biểu diễn hiệu quả hơn
     ↓
Loại bỏ thông tin ít quan trọng
     ↓
Mã hóa
     ↓
Giảm dung lượng
```

Hai chiến lược lớn:

```text
LOSSLESS
Không mất thông tin

LOSSY
Đánh đổi chất lượng
để đạt tỷ lệ nén cao
```

---

# Slide 93. Kết nối với các chương tiếp theo

Kiến thức về nén ảnh là nền tảng cho nhiều ứng dụng xử lý ảnh và thị giác máy tính:

```text
Nén ảnh
   │
   ├── Lưu trữ ảnh
   │
   ├── Truyền ảnh
   │
   ├── Multimedia
   │
   ├── Web / Mobile
   │
   ├── Camera
   │
   └── Computer Vision
           │
           ├── Video
           ├── Streaming
           ├── Edge AI
           └── Image Dataset
```

Trong các hệ thống Computer Vision thực tế:

> **Chất lượng dữ liệu đầu vào và chi phí lưu trữ/truyền tải có ảnh hưởng trực tiếp đến hiệu quả của toàn hệ thống.**

---

# Slide 94. Kết luận

## NÉN ẢNH

**Giảm dữ liệu – giữ lại thông tin cần thiết**

Ba câu hỏi quan trọng cần ghi nhớ:

### 1.

**Dữ liệu có dư thừa ở đâu?**

### 2.

**Có thể biểu diễn phần dư thừa bằng ít bit hơn như thế nào?**

### 3.

**Có thể loại bỏ phần thông tin nào mà ứng dụng vẫn chấp nhận được?**

> **Hiểu được ba câu hỏi này là hiểu được nền tảng của nén ảnh.**

### Một vài điểm tôi chủ động điều chỉnh so với file gốc

* Tôi đã đưa **MSE và PSNR** vào cùng hệ thống đánh giá để sinh viên không chỉ gặp RMSE/SNR mà còn nhận biết chỉ số rất phổ biến khi đánh giá ảnh nén.
* Tôi tách rõ **DCT ≠ bước gây mất mát chính**; trong quy trình JPEG, **Quantization** mới là bước làm mất thông tin.
* Tôi tổ chức Huffman, Arithmetic, LZW, RLE... theo **nguyên lý dư thừa mà chúng khai thác**, thay vì tạo cảm giác đây chỉ là một danh sách thuật toán.
* Tôi làm rõ mối liên hệ **DPCM → sai số dự đoán → sai số nhỏ → dễ mã hóa**, vốn đang hơi ngắn trong bản gốc.
* Tôi mở rộng phần JPEG để sinh viên thấy đầy đủ chuỗi **DCT → Quantization → Zigzag → RLE → Huffman**, thay vì chỉ ghi tên các bước.
* Tôi giữ **Golomb-Rice, LZW, JBIG2, Bit-plane và Wavelet** vì chúng đã có trong tài liệu gốc, nhưng đặt chúng vào đúng bức tranh tổng thể thay vì để chúng xuất hiện khá rời rạc. 

**Một lưu ý về cấu trúc:** bản này có **94 slide**, tức dài hơn đáng kể so với 44 slide gốc. Đây là chủ ý để giải quyết vấn đề mà thầy đã nêu ở Chương 1: nội dung trước đây hơi vắn tắt và một số khái niệm chưa được giải thích đủ. Khi chuyển sang Marp thực tế, tôi khuyến nghị **không nhất thiết phải giữ đúng 94 slide**; có thể gộp các slide thực hành, ví dụ hoặc tổng kết tùy thời lượng giảng dạy.
