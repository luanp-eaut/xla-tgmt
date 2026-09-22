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
<!--_class: toc-->

# NỘI DUNG CHƯƠNG

1. **Giới thiệu về nén ảnh**
   - Khái niệm, mục tiêu và lý do cần nén ảnh

2. **Đo lường thông tin và chất lượng ảnh**
   - Entropy, MSE, PSNR và các chỉ số đánh giá

3. **Nén không tổn thất (Lossless)**
   - Huffman, Arithmetic, LZW, RLE, Golomb-Rice

4. **Nén có tổn thất (Lossy)**
   - DCT, JPEG, Wavelet, DPCM

5. **Một số chuẩn và kỹ thuật nén ảnh tiêu biểu**
   - JPEG, JPEG 2000, JBIG2 và ứng dụng thực tế

---

# MỤC TIÊU HỌC TẬP

Sau khi hoàn thành chương này, sinh viên có thể:

**Kiến thức cơ bản:**
- Giải thích được tại sao cần nén ảnh
- Phân biệt được dữ liệu, thông tin và dư thừa dữ liệu
- Hiểu và tính được Entropy của một nguồn ảnh

**Phân loại và mô hình:**
- Giải thích được sự khác nhau giữa nén không tổn thất (Lossless) và nén có tổn thất (Lossy)
- Mô tả được mô hình tổng quát của một hệ thống nén ảnh

**Kỹ thuật nén:**
- Hiểu nguyên lý của các kỹ thuật: Huffman, Golomb/Golomb-Rice, Arithmetic Coding, LZW, RLE, DPCM, DCT và Block Transform Coding, Wavelet/DWT
- Giải thích được quy trình cơ bản của JPEG

**Đánh giá:**
- Đánh giá được ảnh sau nén bằng một số tiêu chí định lượng và định tính

---
<!--_class: section-->

# Giới thiệu về nén ảnh

---

# VÌ SAO CẦN NÉN ẢNH?

**Vấn đề:** Ảnh số thường có kích thước dữ liệu rất lớn

**Ví dụ minh họa:**
- Ảnh màu có kích thước 4000 × 3000 pixel
- Mỗi pixel gồm 3 kênh màu:
  - R (Red): 8 bit
  - G (Green): 8 bit
  - B (Blue): 8 bit

**Tính toán dung lượng dữ liệu thô:**

$$4000 \times 3000 \times 3 \times 8 = 288,000,000 \text{ bit}$$

hay khoảng:

$$36,000,000 \text{ byte} \approx 34.3 \text{ MiB}$$

**Lưu ý quan trọng:** Đây mới chỉ là dữ liệu pixel, chưa tính các thông tin bổ sung của file (metadata, header, v.v.)

**Hệ quả:** Nếu lưu trữ hoặc truyền hàng triệu ảnh, lượng dữ liệu sẽ rất lớn, gây tốn kém về dung lượng lưu trữ và băng thông truyền tải.

---

# NÉN ẢNH LÀ GÌ?

**Định nghĩa:** Nén ảnh (Image Compression) là quá trình giảm số bit cần thiết để biểu diễn một ảnh.

**Mục tiêu:**
- Giảm dung lượng dữ liệu
- Vẫn đáp ứng yêu cầu về khả năng khôi phục và chất lượng ảnh

**Phân loại theo khả năng khôi phục:**

**1. Nén không tổn thất (Lossless):**
- Ảnh sau giải nén giống hệt ảnh gốc
- Không mất bất kỳ thông tin nào

**2. Nén có tổn thất (Lossy):**
- Ảnh sau giải nén khác ảnh gốc
- Vẫn đạt chất lượng chấp nhận được
- Một phần thông tin bị loại bỏ

**Quy trình tổng quát:**

```
Ảnh gốc → [NÉN] → Dữ liệu nhỏ hơn → [GIẢI NÉN] → Ảnh khôi phục
```

---

# TẠI SAO DỮ LIỆU ẢNH CÓ THỂ NÉN?

**Nguyên lý cơ bản:** Một ảnh không phải là tập hợp các pixel hoàn toàn độc lập.

**Các đặc điểm tạo ra khả năng nén:**

**1. Sự lặp lại:**
- Các giá trị pixel lặp lại trong ảnh
- Ví dụ: Vùng trời xanh có nhiều pixel cùng giá trị

**2. Tương quan không gian:**
- Các pixel lân cận thường có giá trị tương tự nhau
- Ví dụ: Pixel ở giữa vùng da người có giá trị gần giống pixel xung quanh

**3. Phân bố không đều:**
- Một số giá trị xuất hiện thường xuyên hơn các giá trị khác
- Ví dụ: Trong ảnh văn bản, màu trắng xuất hiện nhiều hơn màu đen

**4. Giới hạn của thị giác:**
- Một số chi tiết ít quan trọng đối với thị giác con người
- Mắt người không nhận biết được mọi thay đổi nhỏ

**Kết luận:** Những đặc điểm này tạo ra **dư thừa dữ liệu (redundancy)**. Nén ảnh chủ yếu là quá trình khai thác và loại bỏ hoặc biểu diễn hiệu quả các dạng dư thừa này.

---
<!--_class: section-->

# Đo lường thông tin và chất lượng ảnh

---

# DỮ LIỆU VÀ THÔNG TIN

**Dữ liệu (Data):**
- Là phương tiện dùng để biểu diễn và lưu trữ thông tin
- Mang tính kỹ thuật, có thể đo đếm được

**Ví dụ về dữ liệu:**
```
128 129 130 130 131 131 131 ...
```
Đây là dãy giá trị pixel của một vùng ảnh.

**Thông tin (Information):**
- Là nội dung có ý nghĩa được truyền tải bởi dữ liệu
- Mang tính ngữ nghĩa, phụ thuộc vào ngữ cảnh

**Ví dụ về thông tin:**
- Một vùng ảnh có màu xanh
- Một đường biên giữa hai đối tượng
- Một ký tự trong văn bản
- Một khuôn mặt trong ảnh chân dung

**Ý tưởng cốt lõi của nén ảnh:**
- Giảm số bit dùng để biểu diễn dữ liệu
- Vẫn bảo toàn thông tin cần thiết theo mục đích sử dụng
- Có thể loại bỏ dữ liệu dư thừa mà không mất thông tin quan trọng

---

# TỶ LỆ NÉN

**Định nghĩa các đại lượng:**
- $B_o$: số bit của dữ liệu gốc
- $B_c$: số bit của dữ liệu sau nén

**Tỷ lệ nén (Compression Ratio - CR):**

$$CR = \frac{B_o}{B_c}$$

**Ví dụ minh họa:**
- Ảnh gốc: 10 MB
- Ảnh sau nén: 2 MB

$$CR = \frac{10}{2} = 5:1$$

**Ý nghĩa:** Dữ liệu được nén với tỷ lệ 5:1, tức là dung lượng giảm đi 5 lần.

**Tỷ lệ giảm dung lượng (Space Savings - R):**

$$R = 1 - \frac{B_c}{B_o}$$

**Với ví dụ trên:**

$$R = 1 - \frac{2}{10} = 0.8 = 80\%$$

**Ý nghĩa:** Dung lượng đã giảm 80% so với ban đầu.

---

# DƯ THỪA DỮ LIỆU

**Định nghĩa:** Dư thừa dữ liệu (Redundancy) là phần biểu diễn dữ liệu có thể được loại bỏ hoặc mã hóa hiệu quả hơn mà không làm mất thông tin cần thiết.

**Cấu trúc của dữ liệu ảnh:**

```
Dữ liệu ảnh
├── Thông tin cần thiết (giữ lại)
└── Dư thừa (có thể loại bỏ hoặc mã hóa hiệu quả)
    ├── Dư thừa mã hóa (Coding Redundancy)
    ├── Dư thừa không gian (Spatial Redundancy)
    └── Thông tin không liên quan (Irrelevant Information)
```

**Nguyên lý nén ảnh:**
- Khai thác các dạng dư thừa
- Biểu diễn dữ liệu hiệu quả hơn
- Giảm số bit cần thiết mà vẫn giữ được thông tin quan trọng

**Ví dụ:** Thay vì lưu từng pixel riêng lẻ, có thể lưu "100 pixel màu trắng liên tiếp" chỉ bằng một cặp giá trị (màu, số lượng).

---

# CÁC LOẠI DƯ THỪA TRONG ẢNH

**1. Dư thừa mã hóa (Coding Redundancy)**

**Định nghĩa:** Xảy ra khi dùng nhiều bit hơn mức cần thiết để biểu diễn các giá trị có xác suất xuất hiện khác nhau.

**Ví dụ:** Nếu giá trị "0" xuất hiện 80% thời gian nhưng vẫn được mã hóa bằng 8 bit như các giá trị khác.

**Kỹ thuật khai thác:**
- Huffman Coding
- Arithmetic Coding
- Golomb Coding

**2. Dư thừa không gian (Spatial Redundancy)**

**Định nghĩa:** Các pixel lân cận thường có quan hệ mạnh với nhau.

**Ví dụ:** Trong vùng trời xanh, các pixel liên tiếp có giá trị gần giống nhau.

**Kỹ thuật khai thác:**
- RLE (Run-Length Encoding)
- DPCM (Differential Pulse Code Modulation)
- Transform Coding

**3. Thông tin không liên quan (Irrelevant Information)**

**Định nghĩa:** Một số thông tin ít ảnh hưởng đến cảm nhận của con người hoặc không cần thiết cho ứng dụng.

**Ví dụ:** Các chi tiết rất nhỏ mà mắt người không nhận ra.

**Kỹ thuật khai thác:**
- Quantization (Lượng tử hóa)
- JPEG
- Wavelet compression

---

# BA HƯỚNG TIẾP CẬN CHÍNH

Có thể nhìn toàn bộ chương thông qua ba câu hỏi cốt lõi:

**Câu hỏi 1: Có thể dùng ít bit hơn để biểu diễn cùng thông tin không?**

**Hướng tiếp cận:** Coding (Mã hóa thống kê)

**Ví dụ:** Huffman, Arithmetic Coding, Golomb

**Nguyên lý:** Gán mã ngắn cho ký hiệu xuất hiện thường xuyên, mã dài cho ký hiệu hiếm.

**Câu hỏi 2: Có thể biểu diễn phần thay đổi thay vì toàn bộ dữ liệu không?**

**Hướng tiếp cận:** Prediction / Transform (Dự đoán / Biến đổi)

**Ví dụ:** DPCM, DCT (Discrete Cosine Transform)

**Nguyên lý:** Chỉ mã hóa sự khác biệt hoặc biến đổi, không mã hóa toàn bộ giá trị.

**Câu hỏi 3: Có thông tin nào ít quan trọng có thể bỏ qua không?**

**Hướng tiếp cận:** Quantization (Lượng tử hóa)

**Ví dụ:** JPEG, JPEG 2000

**Nguyên lý:** Loại bỏ hoặc làm mịn các chi tiết không quan trọng.

**Sơ đồ tổng quát:**

```
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

# PHÂN BỐ MỨC XÁM

**Định nghĩa:** Đối với ảnh mức xám, mỗi pixel có một giá trị trong khoảng từ 0 đến L-1.

**Ký hiệu:**
- $x \in \{0, 1, \ldots, L-1\}$
- $L$ là số mức xám

**Ví dụ:** Ảnh 8 bit có $L = 256$ mức xám (từ 0 đến 255).

**Xác suất xuất hiện:**
- Mỗi mức xám $x_i$ có xác suất xuất hiện $P(x_i)$
- Tổng xác suất: $\sum_i P(x_i) = 1$

**Ý nghĩa:**
- Phân bố xác suất này là cơ sở để đánh giá lượng thông tin
- Là nền tảng để thiết kế các mã nén hiệu quả
- Giúp xác định mức độ dư thừa trong ảnh

**Ví dụ thực tế:**
- Trong ảnh văn bản: Mức xám 255 (trắng) có xác suất cao, mức xám 0 (đen) có xác suất thấp
- Trong ảnh bầu trời: Các mức xám xanh dương có xác suất cao

---

# LƯỢNG TIN CỦA MỘT SỰ KIỆN

**Định nghĩa:** Lượng tin (Information Content) đo lượng thông tin mà một sự kiện mang lại.

**Công thức:** Giả sử một sự kiện $x$ có xác suất $P(x)$, lượng tin của sự kiện là:

$$I(x) = -\log_2 P(x)$$

**Đơn vị:** bit

**Ý nghĩa:**
- Sự kiện thường gặp (xác suất cao) → lượng tin nhỏ
- Sự kiện hiếm gặp (xác suất thấp) → lượng tin lớn

**Ví dụ minh họa:**

**Ví dụ 1:** $P(x) = 0.5$

$$I(x) = -\log_2 0.5 = 1 \text{ bit}$$

**Ví dụ 2:** $P(x) = 0.125$

$$I(x) = -\log_2 0.125 = 3 \text{ bit}$$

**Giải thích:** Một sự kiện càng khó dự đoán (xác suất thấp) thì khi xảy ra, nó mang càng nhiều thông tin. Ngược lại, sự kiện dễ dự đoán mang ít thông tin hơn.

---

# ENTROPY

**Định nghĩa:** Entropy biểu diễn lượng thông tin trung bình của một nguồn dữ liệu.

**Công thức:** Với các giá trị $x_1, x_2, \ldots, x_L$:

$$H(X) = -\sum_{i=1}^{L} P(x_i) \log_2 P(x_i)$$

**Đơn vị:** bit/symbol (bit trên mỗi ký hiệu)

**Đối với ảnh:**
- Symbol có thể là một pixel
- Hoặc một mức xám
- Hoặc một ký hiệu sau biến đổi

**Ý nghĩa:**
- Entropy đo mức độ không chắc chắn của nguồn
- Là giới hạn lý thuyết cho việc nén dữ liệu
- Cho biết số bit trung bình tối thiểu cần thiết để mã hóa nguồn

**Ví dụ:** Nếu entropy là 2.5 bit/pixel, thì về lý thuyết, ta có thể nén ảnh xuống còn trung bình 2.5 bit cho mỗi pixel.

---

# Ý NGHĨA CỦA ENTROPY

Entropy phản ánh mức độ không chắc chắn / khó dự đoán của nguồn dữ liệu.

**Trường hợp 1: Entropy cao**

**Đặc điểm:**
- Các giá trị có xác suất tương đối đồng đều
- Khó dự đoán giá trị tiếp theo
- Khó nén bằng các phương pháp thống kê đơn giản

**Ví dụ:** Ảnh nhiễu ngẫu nhiên, các mức xám xuất hiện với xác suất gần bằng nhau.

**Trường hợp 2: Entropy thấp**

**Đặc điểm:**
- Một số giá trị xuất hiện áp đảo
- Dễ dự đoán giá trị tiếp theo
- Có khả năng mã hóa bằng ít bit hơn

**Ví dụ:** Ảnh văn bản, vùng ảnh đồng nhất, các pixel có giá trị tương tự nhau.

**Kết luận:** Entropy thấp thường tạo nhiều cơ hội cho nén thống kê.

**Lưu ý quan trọng:** Entropy của phân bố mức xám không phải là thước đo trực tiếp cho "chất lượng" hay "độ đẹp" của ảnh. Một ảnh có entropy cao không có nghĩa là ảnh đó xấu hoặc ngược lại.

---

# VÍ DỤ TÍNH ENTROPY

**Bài toán:** Giả sử ảnh chỉ có ba mức xám với xác suất như sau:

| Mức xám | Xác suất |
|---------|----------|
| $x_1$   | 0.5      |
| $x_2$   | 0.3      |
| $x_3$   | 0.2      |

**Tính entropy:**

$$H = -(0.5 \log_2 0.5 + 0.3 \log_2 0.3 + 0.2 \log_2 0.2)$$

**Tính toán từng thành phần:**
- $0.5 \log_2 0.5 = 0.5 \times (-1) = -0.5$
- $0.3 \log_2 0.3 = 0.3 \times (-1.737) = -0.521$
- $0.2 \log_2 0.2 = 0.2 \times (-2.322) = -0.464$

$$H = -(-0.5 - 0.521 - 0.464) = 1.485 \text{ bit/pixel}$$

**So sánh với phân bố đều:**
Nếu ba mức xám xuất hiện bằng nhau ($P(x_i) = \frac{1}{3}$):

$$H = \log_2 3 \approx 1.585 \text{ bit/pixel}$$

**Nhận xét:** Phân bố đều hơn → entropy cao hơn. Khi một mức xám chiếm ưu thế (xác suất cao), entropy giảm xuống.

---

# THỰC HÀNH: TÍNH ENTROPY

**Đoạn mã Python:**

```python
import math

def calculate_entropy(probabilities):
    entropy = 0
    for p in probabilities:
        if p > 0:
            entropy -= p * math.log2(p)
    return entropy

# Ví dụ 1
probs = [0.5, 0.3, 0.2]
print(f"Entropy: {calculate_entropy(probs):.4f} bits/symbol")
```

**Bài tập thực hành:**

Thử thay đổi phân bố và quan sát sự thay đổi của entropy:

**Phân bố 1:** `[0.5, 0.3, 0.2]`
- Một giá trị chiếm ưu thế
- Entropy thấp

**Phân bố 2:** `[0.8, 0.1, 0.1]`
- Một giá trị chiếm đa số
- Entropy càng thấp hơn

**Phân bố 3:** `[0.25, 0.25, 0.25, 0.25]`
- Các giá trị đồng đều
- Entropy cao nhất

**Mục tiêu:** Hiểu mối quan hệ giữa phân bố xác suất và entropy.

---

# ĐÁNH GIÁ CHẤT LƯỢNG ẢNH SAU NÉN

**Vấn đề:** Khi nén Lossy, ảnh giải nén có thể khác ảnh gốc. Do đó cần đánh giá mức độ sai khác.

**Hai nhóm tiêu chí đánh giá:**

**1. Đánh giá khách quan (Objective Assessment)**

**Đặc điểm:** Dựa trên các đại lượng tính toán được từ dữ liệu

**Các chỉ số phổ biến:**
- **MSE** (Mean Squared Error): Sai số bình phương trung bình
- **RMSE** (Root Mean Squared Error): Căn bậc hai của MSE
- **SNR** (Signal-to-Noise Ratio): Tỷ lệ tín hiệu trên nhiễu
- **PSNR** (Peak Signal-to-Noise Ratio): Tỷ lệ tín hiệu đỉnh trên nhiễu

**Ưu điểm:** Khách quan, có thể tự động tính toán
**Nhược điểm:** Không phải lúc nào cũng phản ánh chính xác cảm nhận thị giác

**2. Đánh giá chủ quan (Subjective Assessment)**

**Đặc điểm:** Dựa trên quan sát và cảm nhận của con người

**Các yếu tố đánh giá:**
- Độ sắc nét của ảnh
- Chi tiết được giữ lại
- Mức độ nhiễu
- Artifact (các biến dạng do nén)
- Khả năng nhận biết nội dung

**Ưu điểm:** Phản ánh cảm nhận thực tế
**Nhược điểm:** Chủ quan, tốn thời gian, khó tự động hóa

---

# SAI SỐ BÌNH PHƯƠNG TRUNG BÌNH - MSE

**Định nghĩa:** MSE (Mean Squared Error) đo mức sai khác bình phương trung bình giữa hai ảnh.

**Công thức:** Với ảnh gốc $f$ và ảnh khôi phục $g$, có $N$ pixel:

$$MSE = \frac{1}{N} \sum_{i=1}^{N} (f_i - g_i)^2$$

**Trong đó:**
- $f_i$: giá trị pixel thứ $i$ của ảnh gốc
- $g_i$: giá trị pixel thứ $i$ của ảnh khôi phục
- $N$: tổng số pixel

**Ý nghĩa:**
- $MSE = 0$: Hai ảnh giống hệt nhau
- MSE càng nhỏ: sai khác càng nhỏ, chất lượng càng cao
- MSE càng lớn: sai khác càng lớn, chất lượng càng thấp

**Ưu điểm:**
- Dễ tính toán
- Được sử dụng rộng rãi

**Nhược điểm:**
- Không phản ánh hoàn toàn cảm nhận của con người
- Hai ảnh có cùng MSE có thể có chất lượng thị giác khác nhau

---

# RMSE VÀ SNR

**RMSE (Root Mean Squared Error):**

**Công thức:**

$$RMSE = \sqrt{MSE}$$

**Đặc điểm:**
- Có cùng đơn vị với giá trị pixel
- RMSE càng nhỏ → ảnh khôi phục càng gần ảnh gốc
- Dễ hiểu hơn MSE vì cùng đơn vị với dữ liệu gốc

**Ví dụ:** Nếu RMSE = 5, nghĩa là sai số trung bình khoảng 5 đơn vị mức xám.

**SNR (Signal-to-Noise Ratio):**

**Công thức:**

$$SNR = 10 \log_{10} \left( \frac{P_{signal}}{P_{noise}} \right)$$

**Trong đó:**

$$P_{noise} = \frac{1}{N} \sum_i (f_i - g_i)^2 = MSE$$

**Ý nghĩa:**
- SNR càng cao → tỷ lệ tín hiệu so với sai số càng lớn
- Chất lượng ảnh càng tốt
- Đơn vị: dB (decibel)

**So sánh:**
- MSE/RMSE: Đo sai số tuyệt đối
- SNR: Đo tỷ lệ giữa tín hiệu và nhiễu
- Cả hai đều là chỉ số khách quan

---

# PSNR

**Định nghĩa:** PSNR (Peak Signal-to-Noise Ratio) là một chỉ số rất phổ biến trong đánh giá nén ảnh.

**Công thức:** Với ảnh $B$ bit:

$$MAX_I = 2^B - 1$$

$$PSNR = 10 \log_{10} \left( \frac{MAX_I^2}{MSE} \right)$$

**Ví dụ:** Với ảnh 8 bit:

$$MAX_I = 2^8 - 1 = 255$$

**Ý nghĩa:**
- MSE càng nhỏ → PSNR càng lớn
- PSNR lớn thường tương ứng với sai khác pixel nhỏ hơn
- Đơn vị: dB (decibel)

**Ngưỡng tham khảo:**
- PSNR > 40 dB: Chất lượng rất tốt, khó nhận biết sai khác
- PSNR 30-40 dB: Chất lượng tốt
- PSNR 20-30 dB: Chất lượng chấp nhận được
- PSNR < 20 dB: Chất lượng kém, có thể nhận biết rõ sai khác

**Lưu ý quan trọng:** PSNR là chỉ số khách quan, không phải lúc nào cũng phản ánh chính xác cảm nhận thị giác. Hai ảnh có cùng PSNR có thể có chất lượng thị giác khác nhau do phân bố sai khác khác nhau.

---

# ĐÁNH GIÁ CHỦ QUAN

**Vấn đề:** Hai ảnh có thể có MSE hoặc PSNR tương tự nhau nhưng cảm nhận của con người khác nhau.

**Các yếu tố cần quan sát khi đánh giá trực quan:**

**1. Biên ảnh (Edges):**
- Biên có bị mờ không?
- Biên có bị răng cưa không?

**2. Chi tiết nhỏ:**
- Các chi tiết nhỏ có được giữ lại không?
- Texture có bị mất không?

**3. Vùng chuyển sắc:**
- Các vùng chuyển màu có mượt mà không?
- Có xuất hiện hiện tượng banding không?

**4. Nhiễu và Artifact:**
- **Blocking artifact:** Các khối 8×8 trở nên rõ rệt (trong JPEG)
- **Ringing artifact:** Dao động hoặc viền quanh các cạnh mạnh
- **Blurring:** Ảnh bị mờ, mất chi tiết

**5. Khả năng nhận biết:**
- Đối tượng chính có dễ nhận biết không?
- Nội dung ảnh có còn rõ ràng không?

**Kết luận:** Đánh giá chủ quan bổ sung cho đánh giá khách quan, giúp hiểu rõ hơn về chất lượng thực tế của ảnh nén.

---

# NÉN KHÔNG TỔN THẤT VÀ NÉN CÓ TỔN THẤT

**Hai nhóm phương pháp nén chính:**

**1. Lossless (Không tổn thất)**

**Định nghĩa:** Sau giải nén, ảnh khôi phục giống hệt ảnh gốc theo từng pixel.

**Công thức:**

$$\text{Ảnh}_{reconstructed} = \text{Ảnh}_{original}$$

**Đặc điểm:**
- Không mất bất kỳ thông tin nào
- Tỷ lệ nén thường thấp hơn
- Phù hợp với dữ liệu cần bảo toàn tuyệt đối

**2. Lossy (Có tổn thất)**

**Định nghĩa:** Sau giải nén, ảnh khôi phục chỉ xấp xỉ ảnh gốc, một phần thông tin đã bị loại bỏ.

**Công thức:**

$$\text{Ảnh}_{reconstructed} \approx \text{Ảnh}_{original}$$

**Đặc điểm:**
- Có mất thông tin
- Tỷ lệ nén cao hơn
- Chất lượng phụ thuộc vào mức độ nén

**Lựa chọn phương pháp:**
- Cần bảo toàn tuyệt đối → Lossless
- Chấp nhận mất một phần để đạt tỷ lệ nén cao → Lossy

---

# NÉN KHÔNG TỔN THẤT - LOSSLESS

**Nguyên lý:**
- Loại bỏ hoặc biểu diễn hiệu quả dư thừa
- Không loại bỏ thông tin cần thiết
- Mọi thông tin đều được giữ lại

**Đặc điểm:**

**Ưu điểm:**
- Khôi phục chính xác ảnh gốc
- Không tạo sai số do quá trình nén
- Có thể nén và giải nén nhiều lần mà không tích lũy sai số

**Nhược điểm:**
- Tỷ lệ nén thường thấp hơn Lossy
- Thường chỉ đạt 2:1 đến 5:1

**Ứng dụng:**
- **Ảnh y tế:** Cần bảo toàn mọi chi tiết để chẩn đoán
- **Tài liệu:** Văn bản, hợp đồng cần giữ nguyên
- **Đồ họa:** Logo, icon cần biên sắc nét
- **Dữ liệu khoa học:** Cần độ chính xác tuyệt đối

**Ví dụ định dạng:**
- **PNG:** Phổ biến cho đồ họa web
- **Một số chế độ của JPEG 2000:** Hỗ trợ lossless
- **GIF:** Cho ảnh đơn giản
- **TIFF:** Cho ảnh chất lượng cao

---

# NÉN CÓ TỔN THẤT - LOSSY

**Nguyên lý:**
- Chấp nhận loại bỏ một phần thông tin
- Đạt tỷ lệ nén cao hơn
- Khai thác giới hạn của thị giác con người

**Các nguồn thông tin có thể loại bỏ:**

**1. Đặc điểm của hệ thống thị giác:**
- Mắt người không nhạy với mọi thay đổi nhỏ
- Không nhận biết được một số chi tiết rất nhỏ

**2. Thành phần tần số:**
- Thành phần tần số cao ít quan trọng hơn tần số thấp
- Có thể loại bỏ hoặc làm mịn

**3. Chi tiết khó nhận biết:**
- Các chi tiết nhỏ trong vùng phức tạp
- Thay đổi màu sắc rất nhỏ

**Đặc điểm:**

**Ưu điểm:**
- Tỷ lệ nén cao (có thể đạt 10:1, 20:1 hoặc hơn)
- Giảm đáng kể dung lượng lưu trữ

**Nhược điểm:**
- Ảnh khôi phục không hoàn toàn giống ảnh gốc
- Chất lượng phụ thuộc mức độ nén
- Nén nhiều lần có thể tích lũy sai số

**Ứng dụng:**
- Ảnh chụp (photography)
- Ảnh web, multimedia
- Streaming video
- Các ứng dụng không yêu cầu độ chính xác tuyệt đối

**Ví dụ định dạng:**
- **JPEG:** Phổ biến nhất cho ảnh chụp
- **JPEG 2000:** Chuẩn mới hơn
- **WebP:** Cho web hiện đại

---

# SO SÁNH LOSSLESS VÀ LOSSY

| Đặc điểm | Lossless | Lossy |
|----------|----------|-------|
| **Mất thông tin** | Không | Có |
| **Khôi phục chính xác** | Có | Không |
| **Tỷ lệ nén** | Thường thấp hơn (2:1 - 5:1) | Thường cao hơn (10:1 - 50:1) |
| **Chất lượng ảnh** | Giữ nguyên 100% | Có thể giảm tùy mức nén |
| **Ảnh y tế** | Phù hợp | Cần cân nhắc kỹ |
| **Ảnh web** | Có thể dùng | Rất phổ biến |
| **JPEG** | Không (thông thường) | Có |
| **PNG** | Có | Không |

**Kết luận:**

Không có phương pháp nào luôn tốt nhất trong mọi trường hợp.

**Lựa chọn phụ thuộc vào:**
- Mục đích sử dụng
- Yêu cầu về chất lượng
- Giới hạn về dung lượng
- Loại nội dung ảnh

**Ví dụ:**
- Ảnh y tế chẩn đoán → Lossless
- Ảnh đăng Facebook → Lossy (JPEG)
- Logo công ty → Lossless (PNG)
- Ảnh du lịch → Lossy (JPEG)

---

# MÔ HÌNH HỆ THỐNG NÉN ẢNH TỔNG QUÁT

**Một hệ thống nén ảnh gồm hai phần chính:**

**1. Encoder (Bộ mã hóa):**
- Biến dữ liệu ảnh thành biểu diễn ngắn gọn hơn
- Thực hiện quá trình nén

**2. Decoder (Bộ giải mã):**
- Khôi phục ảnh từ biểu diễn đã nén
- Thực hiện quá trình giải nén

**Sơ đồ khối:**

```
             ENCODER
Ảnh gốc ───────────────────► Bitstream
                                │
                                │
                         Kênh lưu trữ /
                         truyền dữ liệu
                                │
                                ▼
                             DECODER
                       Bitstream ───► Ảnh khôi phục
```

**Các thành phần trong Encoder:**
- Mapper/Transform: Biến đổi dữ liệu
- Quantizer: Lượng tử hóa (chỉ trong Lossy)
- Symbol Coder: Mã hóa ký hiệu

**Các thành phần trong Decoder:**
- Symbol Decoder: Giải mã ký hiệu
- Inverse Quantizer: Lượng tử hóa ngược (chỉ trong Lossy)
- Inverse Mapper: Biến đổi ngược

---

# CÁC THÀNH PHẦN CỦA ENCODER

**Mô hình tổng quát của Encoder:**

```
Ảnh gốc
  │
  ▼
Mapper / Transform (Bộ biến đổi)
  │
  ▼
Quantizer (Bộ lượng tử hóa)
  │
  ▼
Symbol Coder (Bộ mã hóa ký hiệu)
  │
  ▼
Bitstream (Dòng bit)
```

**1. Mapper / Transform (Bộ biến đổi):**

**Chức năng:** Biến đổi dữ liệu để làm giảm hoặc tập trung dư thừa

**Ví dụ:**
- Biến đổi từ miền không gian sang miền tần số (DCT, DWT)
- Dự đoán giá trị pixel dựa trên pixel lân cận

**Mục tiêu:** Tạo ra dữ liệu dễ nén hơn

**2. Quantizer (Bộ lượng tử hóa):**

**Chức năng:** Giảm số mức biểu diễn

**Ví dụ:** Thay vì 256 mức xám, chỉ dùng 64 mức

**Đặc điểm:**
- Có thể gây mất mát thông tin
- Là bước chính gây tổn thất trong nén Lossy
- Không có trong nén Lossless

**3. Symbol Coder (Bộ mã hóa ký hiệu):**

**Chức năng:** Mã hóa các ký hiệu hiệu quả hơn

**Ví dụ:** Huffman, Arithmetic Coding

**Đặc điểm:**
- Thường là bước Lossless
- Gán mã ngắn cho ký hiệu phổ biến

---

# DECODER

**Quá trình giải nén thực hiện ngược lại với mã hóa:**

```
Bitstream
   │
   ▼
Symbol Decoder (Bộ giải mã ký hiệu)
   │
   ▼
Inverse Quantizer (Bộ lượng tử hóa ngược)
   │
   ▼
Inverse Mapper (Bộ biến đổi ngược)
   │
   ▼
Ảnh khôi phục
```

**So sánh Lossless và Lossy:**

**Đối với Lossless:**

```
Encoder ───────────────► Decoder
   │                         │
   └────── Không mất ────────┘
```

- Không có Quantizer
- Khôi phục chính xác 100%

**Đối với Lossy:**

```
Encoder ── Quantization ──► Decoder
               │
               ▼
          Mất thông tin
```

- Có Quantizer trong Encoder
- Inverse Quantizer không thể khôi phục chính xác
- Thông tin đã mất không thể lấy lại

**Điểm quan trọng:** Quantization là một điểm quan trọng gây tổn thất. Đây là bước duy nhất trong quy trình nén JPEG gây mất thông tin.

---

# NÉN KHÔNG TỔN THẤT - CÁC KỸ THUẬT TIÊU BIỂU

**Các kỹ thuật Lossless phổ biến:**

**1. Huffman Coding**
- Mã hóa độ dài thay đổi
- Gán mã ngắn cho ký hiệu phổ biến

**2. Golomb / Golomb-Rice**
- Phù hợp với số nguyên có phân bố lệch
- Hiệu quả với dữ liệu có nhiều giá trị nhỏ

**3. Arithmetic Coding**
- Mã hóa chuỗi bằng khoảng số thực
- Đạt hiệu quả gần giới hạn entropy

**4. LZW (Lempel-Ziv-Welch)**
- Sử dụng từ điển chuỗi
- Khai thác chuỗi lặp lại

**5. Run-Length Encoding (RLE)**
- Mã hóa chuỗi giá trị giống nhau
- Hiệu quả với vùng đồng nhất

**6. JBIG2**
- Chuyên cho ảnh nhị phân
- Phù hợp với tài liệu

**7. Bit-plane coding**
- Tách ảnh thành các mặt phẳng bit
- Xử lý từng mặt phẳng riêng

**Nguyên lý chung:** Tất cả các kỹ thuật này đều khai thác các dạng dư thừa khác nhau để giảm số bit mà không mất thông tin.

---

# HUFFMAN CODING

**Định nghĩa:** Huffman Coding là phương pháp mã hóa độ dài thay đổi (variable-length coding).

**Nguyên tắc:**
- Ký hiệu xuất hiện càng thường xuyên → mã càng ngắn
- Ký hiệu hiếm → mã dài hơn

**Ví dụ minh họa:**

| Ký hiệu | Tần suất | Mã Huffman |
|---------|----------|------------|
| A       | Cao      | 0          |
| B       | Trung bình | 10       |
| C       | Thấp     | 110        |
| D       | Rất thấp | 111        |

**Lợi ích:**
- Giảm số bit trung bình cần thiết
- Tối ưu hóa theo phân bố xác suất

**Đặc điểm quan trọng:**
- Mã prefix: Không có mã nào là tiền tố của mã khác
- Có thể giải mã duy nhất
- Không cần dấu phân cách giữa các ký hiệu

**Ví dụ:** Chuỗi "ABCA" được mã hóa thành "0 10 110 0" và có thể giải mã ngược lại mà không cần biết ranh giới giữa các ký hiệu.

---

# XÂY DỰNG CÂY HUFFMAN

**Quy trình xây dựng cây Huffman:**

**Bước 1: Tính tần suất**
- Đếm tần suất hoặc xác suất của các ký hiệu

**Bước 2: Sắp xếp**
- Sắp xếp các ký hiệu theo tần suất tăng dần

**Bước 3: Chọn hai nút nhỏ nhất**
- Chọn hai nút có tần suất nhỏ nhất

**Bước 4: Gộp nút**
- Gộp hai nút thành một nút mới
- Tần suất nút mới = tổng tần suất hai nút con

**Bước 5: Lặp lại**
- Lặp lại bước 3-4 cho đến khi còn một nút gốc

**Bước 6: Gán mã**
- Nhánh trái → 0
- Nhánh phải → 1
- Mã của ký hiệu là đường đi từ gốc đến nút lá

**Ví dụ:** Với 4 ký hiệu A, B, C, D có tần suất khác nhau, ta xây dựng cây nhị phân từ dưới lên, gán mã 0/1 cho mỗi nhánh, và đọc mã từ gốc đến lá.

---

# VÍ DỤ HUFFMAN

**Bài toán:** Giả sử có 4 ký hiệu với tần suất:

| Ký hiệu | Tần suất |
|---------|----------|
| A       | 50       |
| B       | 25       |
| C       | 15       |
| D       | 10       |

**Xây dựng cây Huffman:**

**Bước 1:** Hai nút nhỏ nhất là C(15) và D(10)
- Gộp thành nút mới: 15 + 10 = 25

**Bước 2:** Hai nút nhỏ nhất tiếp theo là B(25) và nút mới(25)
- Gộp thành nút mới: 25 + 25 = 50

**Bước 3:** Hai nút còn lại là A(50) và nút mới(50)
- Gộp thành nút gốc: 50 + 50 = 100

**Cây Huffman:**

```
             100
            /   \
          50     50
         / \     / \
        A   ?   B   ?
           ...     ...
```

**Kết quả mã hóa:**
- A: mã ngắn nhất (vì tần suất cao nhất)
- D: mã dài nhất (vì tần suất thấp nhất)

**Điểm quan trọng:** Ký hiệu có xác suất cao nằm gần gốc hơn và có mã ngắn hơn.

---

# HUFFMAN - MÃ HÓA VÀ GIẢI MÃ

**Quá trình mã hóa:**

```
Ký hiệu
   │
   ▼
Tra bảng mã
   │
   ▼
Chuỗi bit
```

**Ví dụ:**
- A → 0
- B → 10
- C → 110

Chuỗi "ABCA" được thay bằng: "0 10 110 0"

**Quá trình giải mã:**

**Sử dụng cây Huffman:**

```
Root
 │
 ├─0 ──► A (ký hiệu)
 │
 └─1 ──► tiếp tục
      │
      ├─0 ──► B (ký hiệu)
      │
      └─1 ──► tiếp tục
           │
           ├─0 ──► C (ký hiệu)
           │
           └─1 ──► ...
```

**Cách giải mã:**
- Bắt đầu từ gốc cây
- Đọc từng bit:
  - Bit 0: đi sang nhánh trái
  - Bit 1: đi sang nhánh phải
- Khi đến nút lá → thu được một ký hiệu
- Quay lại gốc và tiếp tục

**Ưu điểm:** Giải mã duy nhất, không cần dấu phân cách

---

# HUFFMAN TRONG NÉN ẢNH

**Áp dụng cho ảnh mức xám:**

**Quy trình:**

```
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

**Hạn chế:**
- Nếu pixel được xem độc lập, hiệu quả có thể hạn chế
- Không khai thác được tương quan không gian

**Giải pháp trong thực tế:**
- Huffman thường được áp dụng sau các bước biến đổi hoặc dự đoán
- Tạo ra dữ liệu có phân bố thuận lợi hơn
- Ví dụ: Trong JPEG, Huffman được áp dụng sau DCT và lượng tử hóa

**Ví dụ:**
- Ảnh có vùng đồng nhất → nhiều pixel cùng giá trị → Huffman hiệu quả
- Ảnh nhiễu ngẫu nhiên → phân bố đều → Huffman kém hiệu quả

**Kết luận:** Huffman là công cụ mạnh nhưng cần kết hợp với các kỹ thuật khác để đạt hiệu quả tối ưu.

---

# THỰC HÀNH HUFFMAN

**Đoạn mã Python xây dựng cây Huffman:**

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

def build_huffman_tree(text):
    # Đếm tần suất
    freq = {}
    for char in text:
        freq[char] = freq.get(char, 0) + 1
    
    # Tạo heap
    heap = [Node(char, f) for char, f in freq.items()]
    heapq.heapify(heap)
    
    # Xây dựng cây
    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)
        
        merged = Node(None, left.freq + right.freq)
        merged.left = left
        merged.right = right
        
        heapq.heappush(heap, merged)
    
    return heap[0]
```

**Cách sử dụng:**

```python
text = "ABRACADABRA"
root = build_huffman_tree(text)
```

**Bài tập:**
- Viết hàm tạo bảng mã từ cây Huffman
- Viết hàm mã hóa chuỗi
- Viết hàm giải mã chuỗi

---

# GOLOMB CODING

**Định nghĩa:** Golomb Coding đặc biệt phù hợp với các số nguyên không âm có phân bố lệch về các giá trị nhỏ.

**Nguyên lý:**

Với số nguyên $n$, chọn tham số $M$:

$$q = \left\lfloor \frac{n}{M} \right\rfloor$$

$$r = n \bmod M$$

**Trong đó:**
- $q$: thương (quotient)
- $r$: số dư (remainder)

**Mã hóa:**
- $q$ được mã hóa bằng unary code (một mã unary)
- $r$ được mã hóa bằng nhị phân phù hợp

**Unary code cho $q$:**
- $q = 0$: mã "0"
- $q = 1$: mã "10"
- $q = 2$: mã "110"
- $q = 3$: mã "1110"

**Ví dụ:** Với $n = 13, M = 4$:
- $q = 13 // 4 = 3$ → mã "1110"
- $r = 13 \bmod 4 = 1$ → mã "01"
- Kết quả: "111001"

**Ứng dụng:** Hiệu quả với dữ liệu có nhiều giá trị nhỏ, như sai số dự đoán trong DPCM.

---

# GOLOMB-RICE CODING

**Định nghĩa:** Golomb-Rice là trường hợp đặc biệt của Golomb khi $M = 2^k$.

**Ưu điểm:** Khi $M$ là lũy thừa của 2, không cần phép chia thông thường.

**Công thức:**

$$q = n >> k$$

$$r = n \ \& \ (2^k - 1)$$

**Trong đó:**
- $>>$: phép dịch phải (right shift)
- $\&$: phép AND bit

**Ví dụ:** Với $n = 13, k = 2$:

$$M = 2^2 = 4$$

$$q = 13 >> 2 = 3$$

$$r = 13 \ \& \ (4 - 1) = 13 \ \& \ 3 = 1$$

**Biểu diễn:**
- $q = 3$ → unary: "0001"
- $r = 1$ → nhị phân 2 bit: "01"
- Mã cuối cùng: "000101"

**Giải mã:**

$$n = q \times M + r = 3 \times 4 + 1 = 13$$

**Ưu điểm của Golomb-Rice:**
- Thực hiện rất nhanh bằng các phép toán bit
- Không cần phép chia/chia lấy dư
- Đặc biệt hữu ích khi dữ liệu có nhiều giá trị nhỏ

**Ứng dụng:** JPEG-LS, nén ảnh y tế, nén sai số dự đoán.

---

# ARITHMETIC CODING

**Định nghĩa:** Arithmetic Coding khác Huffman ở chỗ không ánh xạ từng ký hiệu thành một chuỗi bit độc lập.

**Nguyên lý:**
- Toàn bộ chuỗi ký hiệu được biểu diễn bởi một số nằm trong một khoảng số thực
- Ban đầu: khoảng $[0, 1)$
- Mỗi ký hiệu làm thu hẹp khoảng hiện tại

**Ví dụ minh họa:**

Giả sử có 3 ký hiệu với xác suất:
- $P(A) = 0.5$
- $P(B) = 0.3$
- $P(C) = 0.2$

**Các khoảng ban đầu:**
- A → $[0.0, 0.5)$
- B → $[0.5, 0.8)$
- C → $[0.8, 1.0)$

**Mã hóa chuỗi "AB":**

**Bước 1:** Xử lý A
- Khoảng hiện tại: $[0, 0.5)$

**Bước 2:** Xử lý B
- Chia khoảng $[0, 0.5)$ theo xác suất
- B chiếm 30% khoảng hiện tại
- Khoảng mới: $[0.25, 0.40)$

**Kết quả:** Bất kỳ số nào trong khoảng $[0.25, 0.40)$ đều có thể đại diện cho chuỗi "AB".

---

# VÍ DỤ ARITHMETIC CODING

**Bài toán:** Mã hóa chuỗi "AB" với:
- $P(A) = 0.5$
- $P(B) = 0.3$
- $P(C) = 0.2$

**Các khoảng ban đầu:**
- A → $[0.0, 0.5)$
- B → $[0.5, 0.8)$
- C → $[0.8, 1.0)$

**Quá trình mã hóa:**

**Bước 1: Xử lý ký hiệu A**
- Khoảng ban đầu: $[0, 1)$
- A chiếm khoảng $[0.0, 0.5)$
- Khoảng hiện tại: $[0, 0.5)$

**Bước 2: Xử lý ký hiệu B**
- Khoảng hiện tại: $[0, 0.5)$, độ rộng = 0.5
- Chia khoảng này theo xác suất:
  - A: $0.5 \times 0.5 = 0.25$ → $[0.0, 0.25)$
  - B: $0.5 \times 0.3 = 0.15$ → $[0.25, 0.40)$
  - C: $0.5 \times 0.2 = 0.10$ → $[0.40, 0.50)$
- B chiếm khoảng $[0.25, 0.40)$
- Khoảng cuối cùng: $[0.25, 0.40)$

**Kết quả:** Có thể chọn bất kỳ số nào trong $[0.25, 0.40)$ để đại diện cho "AB", ví dụ: 0.3

**Giải mã:** Bộ giải mã biết mô hình xác suất và quy tắc kết thúc sẽ khôi phục được chuỗi gốc.

---

# GIẢI MÃ ARITHMETIC CODING

**Thông tin cần biết:**
- Giá trị mã hóa (một số trong khoảng $[0, 1)$)
- Bảng xác suất của các ký hiệu
- Quy tắc kết thúc hoặc độ dài chuỗi

**Quy trình giải mã:**

```
Khởi tạo khoảng [0, 1)
   │
   ▼
Chia khoảng theo xác suất
   │
   ▼
Xác định giá trị mã hóa thuộc khoảng của ký hiệu nào
   │
   ▼
Xuất ký hiệu đó
   │
   ▼
Thu hẹp khoảng
   │
   ▼
Lặp lại cho đến khi kết thúc
```

**Ví dụ:** Giải mã giá trị 0.3 với bảng xác suất:
- A: $[0.0, 0.5)$
- B: $[0.5, 0.8)$
- C: $[0.8, 1.0)$

**Bước 1:** 0.3 thuộc $[0.0, 0.5)$ → ký hiệu A
- Thu hẹp khoảng: $[0.0, 0.5)$
- Chia lại: A=$[0.0, 0.25)$, B=$[0.25, 0.40)$, C=$[0.40, 0.50)$

**Bước 2:** 0.3 thuộc $[0.25, 0.40)$ → ký hiệu B
- Tiếp tục cho đến khi kết thúc

**Kết quả:** Chuỗi "AB"

---

# SO SÁNH ARITHMETIC CODING VÀ HUFFMAN

| Đặc điểm | Huffman | Arithmetic |
|----------|---------|------------|
| **Đơn vị mã hóa** | Từng ký hiệu | Toàn bộ chuỗi |
| **Mã** | Chuỗi bit | Khoảng số thực |
| **Độ dài mã** | Thường là số nguyên bit/ký hiệu | Có thể không nguyên, tiệm cận entropy tốt hơn |
| **Mô hình xác suất** | Cần biết trước | Cần biết trước |
| **Độ phức tạp** | Thấp hơn | Cao hơn |
| **Khả năng thích nghi** | Có thể | Có thể |

**Ưu điểm của Arithmetic Coding:**
- Có thể đạt hiệu quả gần giới hạn entropy hơn
- Đặc biệt hiệu quả khi xác suất không phù hợp với mã độ dài nguyên của Huffman
- Ví dụ: Nếu $P(A) = 0.9$, Huffman cần ít nhất 1 bit, nhưng Arithmetic có thể đạt 0.15 bit/ký hiệu

**Nhược điểm:**
- Phức tạp hơn về mặt tính toán
- Tốc độ chậm hơn Huffman
- Khó triển khai chính xác với độ chính xác hữu hạn

**Ứng dụng:** JPEG 2000, H.264/AVC, các chuẩn nén hiện đại.

---

# LZW (LEMPEL-ZIV-WELCH)

**Định nghĩa:** LZW là thuật toán nén sử dụng từ điển (dictionary-based compression).

**Nguyên lý:**
- Thay vì mã hóa từng ký hiệu độc lập, LZW tìm các chuỗi ký hiệu lặp lại
- Đưa các chuỗi này vào từ điển
- Thay thế chuỗi bằng mã số tham chiếu

**Ví dụ minh họa:**

Chuỗi: "ABABABAB..."

**Cách thông thường:** Lưu từng ký tự
```
A B A B A B A B
```

**Cách LZW:** Xây dựng từ điển
```
AB → mã 256
BA → mã 257
ABA → mã 258
...
```

Sau đó thay thế:
```
AB AB AB AB → 256 256 256 256
```

**Ưu điểm:**
- Hiệu quả với dữ liệu có nhiều chuỗi lặp
- Không cần gửi từ điển đi kèm (bộ giải nén tự xây dựng)
- Được sử dụng rộng rãi (GIF, TIFF, PDF)

**Ứng dụng:**
- Định dạng GIF cho ảnh đồ họa
- File PDF
- Nén file nói chung (ZIP, RAR sử dụng biến thể)

---

# NGUYÊN LÝ LZW

**Khởi tạo:**
- Từ điển chứa các ký hiệu cơ bản
- Ví dụ: A → 65, B → 66 (mã ASCII)

**Trong quá trình nén:**

**Bước 1:** Đọc ký hiệu tiếp theo

**Bước 2:** Kiểm tra chuỗi hiện tại
- Nếu đã có trong từ điển → tiếp tục mở rộng chuỗi
- Nếu chưa có trong từ điển:
  - Xuất mã của chuỗi trước
  - Thêm chuỗi mới vào từ điển
  - Bắt đầu chuỗi mới

**Ví dụ chi tiết:**

Chuỗi: "ABAABABA"

**Từ điển ban đầu:**
- A → 65
- B → 66

**Quá trình:**
1. "A" → có trong từ điển
2. "AB" → chưa có → xuất mã của "A" (65), thêm "AB" → 256
3. "B" → có trong từ điển
4. "BA" → chưa có → xuất mã của "B" (66), thêm "BA" → 257
5. "AAB" → chưa có → xuất mã của "A" (65), thêm "AA" → 258
6. Tiếp tục...

**Đặc điểm quan trọng:**
- Bộ nén và bộ giải nén có thể tự xây dựng cùng một từ điển
- Không cần gửi từ điển đi kèm
- Từ điển động, phát triển theo dữ liệu

---

# VÍ DỤ LZW

**Bài toán:** Mã hóa chuỗi "ABAABABA"

**Từ điển ban đầu:**
- A → 65
- B → 66
- Mã mới bắt đầu từ 256

**Quá trình mã hóa:**

| Bước | Chuỗi hiện tại | Trong từ điển? | Hành động |
|------|----------------|----------------|-----------|
| 1    | A              | Có             | Tiếp tục  |
| 2    | AB             | Không          | Xuất 65, thêm AB→256 |
| 3    | B              | Có             | Tiếp tục  |
| 4    | BA             | Không          | Xuất 66, thêm BA→257 |
| 5    | A              | Có             | Tiếp tục  |
| 6    | AA             | Không          | Xuất 65, thêm AA→258 |
| 7    | B              | Có             | Tiếp tục  |
| 8    | BA             | Có             | Tiếp tục  |
| 9    | BAB            | Không          | Xuất 257, thêm BAB→259 |
| 10   | A              | Có             | Xuất 65 |

**Kết quả:** 65, 66, 65, 257, 65

**Nhận xét:**
- Chuỗi lặp được thay thế bởi các mã từ điển
- Càng về sau, từ điển càng phong phú
- Hiệu quả cao với dữ liệu có nhiều chuỗi lặp

---

# GIẢI MÃ LZW

**Nguyên lý:** Bộ giải nén cũng tự xây dựng từ điển giống bộ nén.

**Quy trình giải mã:**

**Bước 1:** Khởi tạo từ điển với các ký hiệu cơ bản

**Bước 2:** Đọc mã đầu tiên
- Xuất chuỗi tương ứng

**Bước 3:** Đọc mã tiếp theo
- Nếu mã đã có trong từ điển:
  - Lấy chuỗi tương ứng
  - Xuất chuỗi
- Nếu mã chưa có (trường hợp đặc biệt):
  - Xử lý theo quy tắc LZW
- Thêm mục mới vào từ điển

**Bước 4:** Lặp lại cho đến hết

**Trường hợp đặc biệt:**
- Khi mã đọc được chưa có trong từ điển
- Xảy ra khi chuỗi mới vừa được thêm vào từ điển bởi bộ nén
- Giải pháp: Chuỗi = chuỗi trước + ký tự đầu của chuỗi trước

**Ưu điểm:**
- Không cần gửi từ điển đi kèm
- Bộ giải nén tự đồng bộ với bộ nén
- Tiết kiệm băng thông

**Ứng dụng:** GIF, TIFF, PDF, các định dạng file phổ biến.

---

# RUN-LENGTH ENCODING - RLE

**Định nghĩa:** RLE (Run-Length Encoding) khai thác các chuỗi giá trị giống nhau liên tiếp.

**Nguyên lý:**
- Thay vì lưu từng giá trị, lưu cặp (giá trị, số lần lặp)
- Công thức: $(Value, Length)$

**Ví dụ minh họa:**

Chuỗi: "AAAAAAABBBCC"

**Cách thông thường:**
```
A A A A A A A B B B C C
```
(12 ký tự)

**Cách RLE:**
```
(A, 7), (B, 3), (C, 2)
```
(3 cặp giá trị)

**Áp dụng cho ảnh:**

Dãy pixel: "11111111000000001111"

**RLE:**
```
(1, 8), (0, 8), (1, 4)
```

**Ưu điểm:**
- Đơn giản, dễ cài đặt
- Hiệu quả với vùng đồng nhất
- Tốc độ nhanh

**Hạn chế:**
- Nếu ảnh chứa nhiều thay đổi: "101101001011010..."
- RLE có thể không giúp giảm kích thước
- Thậm chí làm dữ liệu lớn hơn do phải lưu cả độ dài

---

# RLE TRÊN ẢNH

**RLE đặc biệt hiệu quả khi ảnh có:**

**1. Vùng lớn cùng màu:**
- Bầu trời xanh
- Tường trắng
- Nền đồng nhất

**2. Nhiều pixel giống nhau liên tiếp:**
- Ảnh nhị phân (đen/trắng)
- Tài liệu scan
- Logo, icon

**Ví dụ:**

Ảnh có vùng trắng lớn:
```
████████████
████████████
████████████
```

Có thể biểu diễn rất ngắn bằng RLE:
```
(Trắng, 36)
```

**Ứng dụng thực tế:**
- Ảnh fax
- Tài liệu văn bản scan
- Ảnh đồ họa đơn giản
- Định dạng BMP (tùy chọn)

**Hạn chế:**

Nếu ảnh chứa nhiều thay đổi:
```
101101001011010...
```

**Kết quả:**
- RLE không giúp giảm kích thước
- Thậm chí làm dữ liệu lớn hơn
- Mỗi pixel cần 2 giá trị (giá trị + độ dài)

**Kết luận:** RLE chỉ hiệu quả với dữ liệu có nhiều chuỗi lặp dài.

---

# JBIG2

**Định nghĩa:** JBIG2 là kỹ thuật nén ảnh nhị phân, đặc biệt phù hợp với tài liệu.

**Ý tưởng cốt lõi:**
- Phát hiện các ký hiệu hoặc mẫu hình giống nhau
- Lưu một phiên bản trong từ điển
- Chỉ lưu vị trí và mã tham chiếu

**Ví dụ với tài liệu:**

Chuỗi ký tự: "A A A B A A C A ..."

**Cách thông thường:** Lưu từng hình ảnh ký tự độc lập
```
Hình A₁, Hình A₂, Hình A₃, Hình B, ...
```

**Cách JBIG2:**
```
Từ điển:
  A → mẫu 1
  B → mẫu 2
  C → mẫu 3

Dữ liệu:
  Vị trí 1: mẫu 1
  Vị trí 2: mẫu 1
  Vị trí 3: mẫu 1
  Vị trí 4: mẫu 2
  ...
```

**Ưu điểm:**
- Tỷ lệ nén rất cao cho tài liệu
- Hiệu quả với ký tự lặp lại
- Chất lượng tốt cho văn bản

**Ứng dụng:**
- Tài liệu scan
- Sách điện tử
- Fax chất lượng cao
- Lưu trữ tài liệu

**So sánh với các chuẩn khác:**
- Tốt hơn Group 3/4 fax cho tài liệu
- Cạnh tranh với PDF cho lưu trữ tài liệu

---

# BIT-PLANE CODING

**Định nghĩa:** Ảnh 8 bit có thể được tách thành 8 mặt phẳng bit (bit-plane).

**Nguyên lý:**
- Mỗi pixel 8 bit có 8 bit: bit 7 (MSB) đến bit 0 (LSB)
- Tách từng bit tạo thành một mặt phẳng bit

**Ví dụ:** Pixel có giá trị 173

$$173 = (10101101)_2$$

**Tách thành 8 bit-plane:**
- Bit 7 (MSB): 1
- Bit 6: 0
- Bit 5: 1
- Bit 4: 0
- Bit 3: 1
- Bit 2: 1
- Bit 1: 0
- Bit 0 (LSB): 1

**Cấu trúc:**

```
Ảnh 8 bit
    │
    ├── Plane 7 (MSB) - Quan trọng nhất
    ├── Plane 6
    ├── Plane 5
    ├── Plane 4
    ├── Plane 3
    ├── Plane 2
    ├── Plane 1
    └── Plane 0 (LSB) - Ít quan trọng nhất
```

**Ý nghĩa:** Mỗi bit-plane có thể được phân tích, nén riêng, hoặc truyền theo thứ tự ưu tiên.

---

# Ý NGHĨA CỦA BIT-PLANE

**Các bit có mức độ ảnh hưởng khác nhau đến giá trị pixel:**

**1. MSB - Most Significant Bit (Bit quan trọng nhất):**

**Đặc điểm:**
- Có ảnh hưởng lớn đến giá trị pixel
- Bit 7 có trọng số 128 (trong ảnh 8 bit)
- Thay đổi MSB làm thay đổi lớn giá trị pixel

**Ví dụ:** Pixel = 100, nếu đổi MSB từ 0 sang 1 → Pixel = 228 (thay đổi 128 đơn vị)

**Nội dung:**
- Thường chứa cấu trúc chính của ảnh
- Thông tin quan trọng nhất
- Tương tự như ảnh mức xám thấp hơn

**2. LSB - Least Significant Bit (Bit ít quan trọng nhất):**

**Đặc điểm:**
- Ảnh hưởng nhỏ đến giá trị pixel
- Bit 0 có trọng số 1
- Thay đổi LSB chỉ làm thay đổi nhỏ

**Ví dụ:** Pixel = 100, nếu đổi LSB từ 0 sang 1 → Pixel = 101 (thay đổi 1 đơn vị)

**Nội dung:**
- Có thể chứa các chi tiết nhỏ
- Thường chứa nhiễu
- Ít quan trọng về mặt thị giác

**Ứng dụng:**
- Các bit-plane có thể được nén riêng với mức độ khác nhau
- Truyền theo thứ tự ưu tiên (MSB trước, LSB sau)
- Watermarking (nhúng thông tin vào LSB)

---

# TỔNG KẾT LOSSLESS

**Các phương pháp Lossless khai thác các loại dư thừa khác nhau:**

```
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

**Phân loại theo loại dư thừa khai thác:**

**1. Dư thừa thống kê (Statistical Redundancy):**
- Huffman: Mã hóa theo tần suất
- Arithmetic: Mã hóa theo xác suất
- Golomb-Rice: Mã hóa số nguyên nhỏ

**2. Dư thừa lặp lại (Repetition Redundancy):**
- LZW: Từ điển chuỗi lặp
- RLE: Chuỗi giá trị giống nhau
- JBIG2: Mẫu hình lặp lại

**3. Cấu trúc bit (Bit Structure):**
- Bit-plane coding: Tách theo mức quan trọng

**Điểm chung:**
- Sau giải nén phải khôi phục chính xác dữ liệu gốc
- Không mất bất kỳ thông tin nào
- Tỷ lệ nén thường thấp hơn Lossy

**Lựa chọn phương pháp:**
- Phụ thuộc vào loại dữ liệu
- Phụ thuộc vào phân bố xác suất
- Phụ thuộc vào yêu cầu ứng dụng

---

# NÉN CÓ TỔN THẤT - LOSSY

**Mục tiêu:** Đạt tỷ lệ nén cao bằng cách loại bỏ những thông tin ít quan trọng hoặc khó nhận biết.

**Các hướng tiếp cận chính:**

**1. Transform Coding (Mã hóa biến đổi):**
- Biến đổi dữ liệu sang miền khác
- Tập trung năng lượng vào ít hệ số
- Ví dụ: DCT, DWT

**2. Quantization (Lượng tử hóa):**
- Giảm số mức biểu diễn
- Loại bỏ chi tiết nhỏ
- Là bước chính gây mất mát

**3. Predictive Coding (Mã hóa dự đoán):**
- Dự đoán giá trị pixel
- Chỉ mã hóa sai số
- Ví dụ: DPCM

**4. Wavelet Coding (Mã hóa wavelet):**
- Phân tích đa phân giải
- Biểu diễn ở nhiều mức chi tiết
- Ví dụ: JPEG 2000

**Nguyên lý chung:**
- Khai thác giới hạn của thị giác con người
- Loại bỏ thông tin không quan trọng
- Đánh đổi chất lượng để đạt tỷ lệ nén cao

---

# TẠI SAO CÓ THỂ LOẠI BỎ THÔNG TIN?

**Cơ sở sinh học:** Hệ thống thị giác con người không nhạy như nhau với mọi loại thông tin.

**Các giới hạn của thị giác:**

**1. Nhạy cảm với thay đổi màu sắc:**
- Khó nhận ra một số thay đổi rất nhỏ về màu sắc
- Đặc biệt trong vùng tối hoặc vùng quá sáng

**2. Thành phần tần số:**
- Thành phần tần số cao (chi tiết nhỏ) ít quan trọng hơn tần số thấp (cấu trúc lớn)
- Mắt người nhạy với tần số trung bình hơn

**3. Độ phân giải:**
- Một số chi tiết nhỏ có thể bị bỏ qua trong ảnh có độ phân giải thấp
- Không nhận biết được chi tiết nhỏ hơn ngưỡng

**4. Vùng quan tâm:**
- Mắt tập trung vào vùng trung tâm
- Vùng ngoại vi ít được chú ý

**Kết luận:**

```
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

**Đây là cơ sở của nén Lossy:** Loại bỏ thông tin mà mắt người không nhận ra hoặc không quan tâm.

---

# BLOCK TRANSFORM CODING

**Ý tưởng:** Biến đổi dữ liệu ảnh từ miền không gian sang một miền biểu diễn thuận lợi hơn cho nén.

**Quy trình tổng quát:**

```
Ảnh gốc
  │
  ▼
Chia block (ví dụ: 8×8)
  │
  ▼
Transform (Biến đổi, ví dụ: DCT)
  │
  ▼
Quantization (Lượng tử hóa)
  │
  ▼
Entropy Coding (Mã hóa entropy, ví dụ: Huffman)
  │
  ▼
Bitstream
```

**Hệ thống điển hình (JPEG):**

$$8 \times 8 \rightarrow DCT \rightarrow Quantization \rightarrow Zigzag \rightarrow RLE \rightarrow Huffman$$

**Tại sao chia block?**
- Giảm độ phức tạp tính toán
- Dễ xử lý song song
- Phù hợp với đặc tính cục bộ của ảnh

**Tại sao biến đổi?**
- Tập trung năng lượng vào ít hệ số
- Tạo ra dữ liệu dễ nén hơn
- Tách thành phần quan trọng và ít quan trọng

**Ứng dụng:** JPEG, MPEG, H.264, và nhiều chuẩn nén khác.

---

# CHIA ẢNH THÀNH BLOCK

**Cách tiếp cận của JPEG:** Chia ảnh thành các block nhỏ để xử lý.

**Kích thước block:**
- Thường là $8 \times 8$ pixel
- Mỗi block chứa $64$ pixel

**Ví dụ minh họa:**

```
Ảnh
┌──────┬──────┬──────┐
│ 8×8  │ 8×8  │ 8×8  │
├──────┼──────┼──────┤
│ 8×8  │ 8×8  │ 8×8  │
├──────┼──────┼──────┤
│ 8×8  │ 8×8  │ 8×8  │
└──────┴──────┴──────┘
```

**Quy trình:**
1. Chia ảnh thành các block $8 \times 8$
2. Xử lý từng block độc lập
3. Áp dụng DCT cho mỗi block
4. Lượng tử hóa từng block
5. Mã hóa từng block

**Ưu điểm:**
- Giảm độ phức tạp tính toán
- Dễ cài đặt
- Phù hợp với phần cứng

**Nhược điểm:**
- Có thể tạo ra blocking artifact
- Không khai thác được tương quan giữa các block

**Lưu ý:** Nếu kích thước ảnh không chia hết cho 8, cần padding (thêm pixel giả).

---

# DCT - DISCRETE COSINE TRANSFORM

**Định nghĩa:** DCT (Discrete Cosine Transform) biến đổi dữ liệu từ miền không gian sang miền tần số.

**So sánh hai miền:**

**Miền không gian (Spatial Domain):**
- Biểu diễn bằng giá trị pixel
- Mỗi pixel có giá trị mức xám hoặc màu
- Trực quan, dễ hiểu

**Miền tần số (Frequency Domain):**
- Biểu diễn bằng các hệ số tần số
- Hệ số DC: thành phần tần số thấp nhất
- Hệ số AC: các thành phần tần số cao hơn

**Đặc tính quan trọng của DCT:**
- Tập trung năng lượng của ảnh vào một số hệ số quan trọng
- Hầu hết năng lượng nằm ở các hệ số tần số thấp
- Các hệ số tần số cao thường có giá trị nhỏ

**Ví dụ:** Một block $8 \times 8$ sau DCT:
- Hệ số DC (góc trên trái): giá trị lớn, đại diện cho mức sáng trung bình
- Các hệ số AC: giá trị giảm dần khi ra xa góc trên trái
- Nhiều hệ số tần số cao có giá trị gần 0

**Tại sao hữu ích cho nén?**
- Có thể loại bỏ hoặc lượng tử hóa mạnh các hệ số tần số cao
- Giữ lại các hệ số tần số thấp (quan trọng)
- Tạo ra nhiều giá trị 0, dễ nén bằng RLE

---

# HỆ SỐ DC VÀ AC

**Cấu trúc của block DCT $8 \times 8$:**

```
┌────┬────┬────┬────┬────┬────┬────┬────┐
│ DC │ AC │ AC │ AC │ AC │ AC │ AC │ AC │
├────┼────┼────┼────┼────┼────┼────┼────┤
│ AC │ AC │ AC │ AC │ AC │ AC │ AC │ AC │
├────┼────┼────┼────┼────┼────┼────┼────┤
│ AC │ AC │ AC │ AC │ AC │ AC │ AC │ AC │
├────┼────┼────┼────┼────┼────┼────┼────┤
│ AC │ AC │ AC │ AC │ AC │ AC │ AC │ AC │
├────┼────┼────┼────┼────┼────┼────┼────┤
│ AC │ AC │ AC │ AC │ AC │ AC │ AC │ AC │
├────┼────┼────┼────┼────┼────┼────┼────┤
│ AC │ AC │ AC │ AC │ AC │ AC │ AC │ AC │
├────┼────┼────┼────┼────┼────┼────┼────┤
│ AC │ AC │ AC │ AC │ AC │ AC │ AC │ AC │
└────┴────┴────┴────┴────┴────┴────┴────┘
```

**Hệ số DC (Direct Current):**
- Vị trí: Góc trên bên trái (0,0)
- Đặc điểm: Thành phần tần số thấp nhất
- Ý nghĩa: Liên quan đến mức sáng trung bình của block
- Giá trị: Thường lớn nhất trong block

**Hệ số AC (Alternating Current):**
- Vị trí: 63 hệ số còn lại
- Đặc điểm: Đại diện cho các thành phần biến thiên / chi tiết
- Ý nghĩa: Các tần số khác nhau từ thấp đến cao
- Giá trị: Thường nhỏ dần khi ra xa góc trên trái

**Quy luật:**
- Thành phần tần số thấp chứa phần lớn năng lượng của ảnh tự nhiên
- Thành phần tần số cao thường có giá trị nhỏ
- Có thể lượng tử hóa mạnh hệ số tần số cao mà ít ảnh hưởng đến chất lượng

---

# LƯỢNG TỬ HÓA - QUANTIZATION

**Định nghĩa:** Đây là bước gây mất mát thông tin quan trọng trong JPEG.

**Nguyên lý:**
- Mỗi hệ số DCT được chia cho một giá trị trong ma trận lượng tử $Q(u,v)$
- Sau đó làm tròn đến số nguyên gần nhất

**Công thức lượng tử hóa:**

$$\hat{F}(u,v) = round \left( \frac{F(u,v)}{Q(u,v)} \right)$$

**Công thức khôi phục (Inverse Quantization):**

$$F'(u,v) = \hat{F}(u,v) \times Q(u,v)$$

**Tại sao gây mất mát?**
- Do phép làm tròn: $F'(u,v) \neq F(u,v)$
- Thông tin đã mất và không thể khôi phục chính xác
- Sai số không thể sửa chữa

**Ví dụ:**
- Hệ số gốc: $F = 12.7$
- Ma trận lượng tử: $Q = 8$
- Sau lượng tử: $\hat{F} = round(12.7 / 8) = round(1.5875) = 2$
- Khôi phục: $F' = 2 \times 8 = 16$
- Sai số: $16 - 12.7 = 3.3$

**Ma trận lượng tử:**
- Xác định mức độ nén
- Giá trị $Q$ càng lớn → nén càng mạnh → chất lượng càng giảm
- Thường khác nhau cho các tần số khác nhau

---

# VÌ SAO QUANTIZATION GIÚP NÉN?

**Ví dụ minh họa:**

**Các hệ số DCT trước lượng tử hóa:**
```
120   8   3   1
  7   2   1   0
  3   1   0   0
  1   0   0   0
```

**Sau lượng tử hóa (với ma trận Q phù hợp):**
```
15   1   0   0
 1   0   0   0
 0   0   0   0
 0   0   0   0
```

**Nhận xét:**
- Rất nhiều hệ số trở thành 0
- Tạo ra các chuỗi zero dài
- Dễ nén bằng RLE

**Cơ chế:**
1. Lượng tử hóa làm giảm độ chính xác của hệ số
2. Các hệ số nhỏ trở thành 0
3. Tạo ra nhiều giá trị 0 liên tiếp
4. RLE mã hóa hiệu quả chuỗi 0
5. Huffman tiếp tục giảm số bit

**Kết quả:**
- Số bit cần thiết giảm đáng kể
- Tỷ lệ nén cao
- Chất lượng vẫn chấp nhận được (nếu chọn Q phù hợp)

**Đây là bước Lossy duy nhất trong JPEG:**
- Các bước khác (DCT, Zigzag, RLE, Huffman) là Lossless
- Quantization quyết định mức độ nén và chất lượng

---

# ZIGZAG SCAN

**Định nghĩa:** Sau lượng tử hóa, các hệ số thường được quét theo thứ tự zigzag.

**Mục đích:**
- Đưa các hệ số tần số thấp lên đầu
- Gom các hệ số bằng 0 về cuối chuỗi
- Tạo điều kiện cho RLE hoạt động hiệu quả

**Thứ tự zigzag trong block $8 \times 8$:**

```
 1 →  2 →  6 →  7 → 15 → 16 → ...
      ↗    ↙    ↗    ↙
 3 →  5 →  8 → 14 → 17 → ...
      ↗    ↙    ↗
 4 →  9 → 13 → 18 → ...
      ↗    ↙
10 → 12 → 19 → ...
      ↗
11 → 20 → ...
      .
      .
```

**Kết quả sau zigzag:**
```
DC, AC, AC, AC, ..., 0, 0, 0, 0
```

**Lợi ích:**
- Hệ số DC (quan trọng nhất) ở đầu
- Hệ số AC quan trọng (tần số thấp) ở giữa
- Hệ số 0 (tần số cao) ở cuối
- RLE mã hóa hiệu quả chuỗi 0 dài

**Ví dụ:**
Trước zigzag:
```
15  1  0  0
 1  0  0  0
 0  0  0  0
 0  0  0  0
```

Sau zigzag:
```
15, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
```

RLE: (15,1), (1,1), (0,14) → rất ngắn gọn!

---

# RLE + HUFFMAN TRONG JPEG

**Quy trình sau zigzag:**

**Dữ liệu sau zigzag:**
```
10  2  1  0  0  0  0  0  ...
```

**Áp dụng RLE:**
- Biểu diễn các số 0 bằng run-length
- Ví dụ:
  - (2,1): giá trị 2, lặp 1 lần
  - (1,1): giá trị 1, lặp 1 lần
  - (0,5): giá trị 0, lặp 5 lần

**Kết quả RLE:**
```
(10,1), (2,1), (1,1), (0,5), ...
```

**Áp dụng Huffman:**
- Mã hóa các cặp (giá trị, độ dài) bằng Huffman
- Gán mã ngắn cho cặp phổ biến
- Gán mã dài cho cặp hiếm

**Quy trình hoàn chỉnh:**

```
Zigzag
   ↓
RLE (biểu diễn chuỗi 0)
   ↓
Huffman (mã hóa hiệu quả)
   ↓
Bitstream JPEG
```

**Kết luận:** JPEG kết hợp nhiều kỹ thuật, không phải chỉ sử dụng DCT:
1. DCT: Biến đổi sang miền tần số
2. Quantization: Giảm số mức (Lossy)
3. Zigzag: Sắp xếp lại thứ tự
4. RLE: Nén chuỗi 0
5. Huffman: Mã hóa hiệu quả

Mỗi bước đóng vai trò riêng, cùng nhau đạt tỷ lệ nén cao.

---

# QUY TRÌNH NÉN JPEG

**Các bước trong quy trình nén JPEG:**

```
Ảnh gốc
  │
  ▼
Chuyển đổi không gian màu (RGB → YCbCr)
  │
  ▼
Chia block 8×8
  │
  ▼
DCT (Discrete Cosine Transform)
  │
  ▼
Quantization (Lượng tử hóa) ← BƯỚC LOSSY
  │
  ▼
Zigzag Scan
  │
  ▼
RLE (Run-Length Encoding)
  │
  ▼
Huffman / Entropy Coding
  │
  ▼
Bitstream JPEG
```

**Giải thích từng bước:**

**1. Chuyển đổi không gian màu:**
- RGB → YCbCr
- Y: độ sáng (luminance)
- Cb, Cr: độ màu (chrominance)
- Có thể lấy mẫu giảm Cb, Cr (4:2:0)

**2. Quantization:**
- Bước Lossy duy nhất
- Quyết định chất lượng ảnh
- Tham số Q càng lớn → nén càng mạnh

**3. Các bước còn lại:**
- Chủ yếu Lossless
- Nhằm biểu diễn dữ liệu hiệu quả hơn
- Không mất thêm thông tin

---

# GIẢI MÃ JPEG

**Quy trình giải mã thực hiện ngược lại với mã hóa:**

```
Bitstream JPEG
    │
    ▼
Entropy Decoding (Huffman)
    │
    ▼
Inverse Zigzag
    │
    ▼
Inverse Quantization
    │
    ▼
IDCT (Inverse DCT)
    │
    ▼
Ghép các block
    │
    ▼
Chuyển đổi không gian màu (YCbCr → RGB)
    │
    ▼
Ảnh khôi phục
```

**Lưu ý quan trọng:**

**Inverse Quantization không thể khôi phục chính xác:**
- Thông tin đã bị mất trong bước Quantization
- Không thể lấy lại độ chính xác ban đầu
- Sai số là vĩnh viễn

**Ví dụ:**
- Hệ số gốc: 12.7
- Sau lượng tử: 2
- Khôi phục: 16
- Sai số: 3.3 (không thể sửa)

**Các bước khác:**
- Huffman, Zigzag, IDCT: Lossless
- Khôi phục chính xác từ bitstream
- Không tạo thêm sai số

**Kết luận:** Chất lượng ảnh JPEG phụ thuộc vào bước Quantization. Các bước khác chỉ khôi phục lại những gì còn lại sau lượng tử hóa.

---

# ARTIFACT TRONG JPEG

**Vấn đề:** Khi nén quá mạnh, có thể xuất hiện các biến dạng (artifact).

**Các loại artifact phổ biến:**

**1. Blocking Artifact:**

**Định nghĩa:** Các block $8 \times 8$ trở nên dễ nhìn thấy

**Nguyên nhân:**
- Lượng tử hóa quá mạnh
- Các block được xử lý độc lập
- Biên giữa các block trở nên rõ rệt

**Ví dụ:** Ảnh có các ô vuông rõ ràng, đặc biệt ở vùng chuyển渐变

**2. Ringing Artifact:**

**Định nghĩa:** Xuất hiện dao động hoặc viền quanh các cạnh mạnh

**Nguyên nhân:**
- DCT không biểu diễn tốt các cạnh sắc nét
- Hiện tượng Gibbs
- Các hệ số tần số cao bị loại bỏ

**Ví dụ:** Văn bản có viền mờ quanh chữ, cạnh vật thể có dao động

**3. Mất chi tiết:**

**Định nghĩa:** Texture và chi tiết nhỏ bị làm mờ

**Nguyên nhân:**
- Lượng tử hóa mạnh các hệ số tần số cao
- Mất thông tin chi tiết
- Ảnh trở nên mờ, thiếu sắc nét

**Ví dụ:** Tóc, lông thú, vải vóc mất chi tiết

**Sự đánh đổi:**

```
Nén thấp → Chất lượng cao → Dung lượng lớn
Nén cao → Chất lượng giảm → Dung lượng nhỏ
```

**Kết luận:** Luôn tồn tại sự đánh đổi giữa dung lượng và chất lượng. Cần chọn mức nén phù hợp với ứng dụng.

---

# PREDICTIVE CODING - DPCM

**Định nghĩa:** DPCM (Differential Pulse Code Modulation) là kỹ thuật mã hóa dự đoán.

**Ý tưởng:**
- Các pixel lân cận thường tương quan với nhau
- Không nhất thiết phải truyền toàn bộ giá trị pixel
- Chỉ mã hóa sai số dự đoán

**Công thức:**

$$e(n) = x(n) - \hat{x}(n)$$

**Trong đó:**
- $x(n)$: giá trị thực của pixel thứ $n$
- $\hat{x}(n)$: giá trị dự đoán
- $e(n)$: sai số dự đoán

**Ví dụ minh họa:**

**Dãy pixel:**
```
150   152   149   151
```

**Dự đoán đơn giản:** $\hat{x}(n) = x(n-1)$

**Tính toán:**

| Pixel | Giá trị thực | Dự đoán | Sai số |
|-------|--------------|---------|--------|
| 1     | 150          | -       | 150    |
| 2     | 152          | 150     | 2      |
| 3     | 149          | 152     | -3     |
| 4     | 151          | 149     | 2      |

**So sánh:**
- Giá trị pixel: 150, 152, 149, 151 (dao động lớn)
- Sai số: 150, 2, -3, 2 (dao động nhỏ hơn nhiều)

**Lợi ích:**
- Sai số thường nhỏ hơn giá trị pixel
- Dễ mã hóa hiệu quả hơn
- Giảm số bit cần thiết

---

# VÍ DỤ DPCM

**Bài toán:** Mã hóa dãy pixel bằng DPCM

**Dãy pixel gốc:**
```
150   152   149   151
```

**Bộ dự đoán:** $\hat{x}(n) = x(n-1)$ (dùng pixel trước để dự đoán pixel hiện tại)

**Quá trình mã hóa:**

| Bước | Pixel | Giá trị thực $x(n)$ | Dự đoán $\hat{x}(n)$ | Sai số $e(n)$ |
|------|-------|---------------------|----------------------|---------------|
| 1    | 1     | 150                 | -                    | 150           |
| 2    | 2     | 152                 | 150                  | 2             |
| 3    | 3     | 149                 | 152                  | -3            |
| 4    | 4     | 151                 | 149                  | 2             |

**Kết quả mã hóa:**
- Pixel đầu: 150 (giá trị thực)
- Các pixel sau: 2, -3, 2 (sai số)

**So sánh phạm vi giá trị:**
- Giá trị pixel: 149-152 (phạm vi 3)
- Sai số: -3 đến 150 (nhưng thường nhỏ)

**Tại sao sai số dễ nén hơn?**
- Sai số thường có giá trị tuyệt đối nhỏ
- Phân bố tập trung quanh 0
- Có thể mã hóa bằng ít bit hơn

**Ứng dụng:**
- Nén ảnh y tế (lossless)
- Nén video
- JPEG-LS

---

# DPCM LOSSLESS VÀ LOSSY

**1. Lossless DPCM:**

**Nguyên lý:**
- Chỉ dự đoán và mã hóa sai số
- Không lượng tử hóa sai số
- Khôi phục chính xác

**Công thức khôi phục:**

$$x(n) = \hat{x}(n) + e(n)$$

**Ví dụ:**
- Pixel 1: 150 (giá trị thực)
- Pixel 2: dự đoán 150, sai số 2 → khôi phục: 150 + 2 = 152 ✓
- Pixel 3: dự đoán 152, sai số -3 → khôi phục: 152 + (-3) = 149 ✓

**Đặc điểm:**
- Khôi phục chính xác 100%
- Tỷ lệ nén thấp hơn Lossy
- Phù hợp với ứng dụng cần độ chính xác

**2. Lossy DPCM:**

**Nguyên lý:**
- Thêm lượng tử hóa sai số
- Chấp nhận mất mát

**Quy trình:**

```
Pixel
  │
  ▼
Predictor (Bộ dự đoán)
  │
  ▼
Prediction Error (Sai số dự đoán)
  │
  ▼
Quantizer (Bộ lượng tử hóa) ← LOSSY
  │
  ▼
Encoder (Bộ mã hóa)
```

**Đặc điểm:**
- Sai số bị lượng tử hóa
- Có mất thông tin
- Tỷ lệ nén cao hơn
- Chất lượng phụ thuộc vào mức lượng tử hóa

**So sánh:**
- Lossless: Chính xác nhưng tỷ lệ nén thấp
- Lossy: Tỷ lệ nén cao nhưng có sai số

---

# GIẢI MÃ DPCM

**Quy trình giải mã:**

**Bộ giải mã thực hiện:**
1. Nhận sai số $e(n)$
2. Tính giá trị dự đoán $\hat{x}(n)$
3. Cộng sai số vào giá trị dự đoán

**Công thức:**

$$x(n) = \hat{x}(n) + e(n)$$

**Ví dụ chi tiết:**

**Dữ liệu mã hóa:**
- Pixel đầu: 150
- Các sai số: 2, -3, 2

**Quá trình giải mã:**

| Bước | Sai số $e(n)$ | Dự đoán $\hat{x}(n)$ | Khôi phục $x(n)$ |
|------|---------------|----------------------|------------------|
| 1    | -             | -                    | 150              |
| 2    | 2             | 150                  | 150 + 2 = 152    |
| 3    | -3            | 152                  | 152 - 3 = 149    |
| 4    | 2             | 149                  | 149 + 2 = 151    |

**Kết quả khôi phục:**
```
150  152  149  151
```

**Giống hệt dữ liệu gốc!**

**Lưu ý:**
- Lossless DPCM: Khôi phục chính xác
- Lossy DPCM: Có sai số do lượng tử hóa
- Bộ giải mã và bộ mã hóa phải dùng cùng bộ dự đoán

---

# THỰC HÀNH DPCM

**Đoạn mã Python:**

**Mã hóa DPCM:**

```python
def dpcm_encode(signal):
    encoded = [signal[0]]  # Pixel đầu giữ nguyên
    for i in range(1, len(signal)):
        predicted = signal[i - 1]  # Dự đoán = pixel trước
        error = signal[i] - predicted  # Sai số
        encoded.append(error)
    return encoded
```

**Giải mã DPCM:**

```python
def dpcm_decode(encoded):
    decoded = [encoded[0]]  # Pixel đầu
    for i in range(1, len(encoded)):
        predicted = decoded[i - 1]  # Dự đoán = pixel trước
        decoded.append(predicted + encoded[i])  # Khôi phục
    return decoded
```

**Thử nghiệm:**

```python
signal = [150, 152, 149, 151]
encoded = dpcm_encode(signal)
decoded = dpcm_decode(encoded)

print("Gốc    :", signal)
print("Mã hóa :", encoded)
print("Giải mã:", decoded)
```

**Kết quả:**
```
Gốc    : [150, 152, 149, 151]
Mã hóa : [150, 2, -3, 2]
Giải mã: [150, 152, 149, 151]
```

**Bài tập:**
- Thử với tín hiệu khác
- Thêm lượng tử hóa để tạo Lossy DPCM
- So sánh tỷ lệ nén

---

# WAVELET CODING

**Định nghĩa:** Một hướng tiếp cận khác là sử dụng DWT (Discrete Wavelet Transform).

**So sánh với DCT:**

**DCT (trong JPEG):**
- Phân tích theo block $8 \times 8$
- Xử lý cục bộ
- Có thể tạo blocking artifact

**DWT (trong JPEG 2000):**
- Phân tích toàn ảnh
- Đa phân giải (multiresolution)
- Không có blocking artifact

**Nguyên lý DWT:**
- Phân tách ảnh thành các sub-band (dải con)
- Mỗi sub-band đại diện cho một dải tần số

**Cấu trúc sub-band:**

```
          DWT
           │
     ┌─────┼─────┐
     ▼     ▼     ▼
    LL    LH    HL
           │
           ▼
          HH
```

**Các sub-band:**
- **LL (Low-Low):** Thành phần tần số thấp, chứa thông tin chính
- **LH (Low-High):** Chi tiết theo hướng ngang
- **HL (High-Low):** Chi tiết theo hướng dọc
- **HH (High-High):** Chi tiết theo hướng chéo

**Ưu điểm:**
- Biểu diễn đa phân giải
- Không có blocking artifact
- Hỗ trợ cả Lossless và Lossy
- Phù hợp cho truyền ảnh tiến triển

---

# ĐA PHÂN GIẢI VỚI WAVELET

**Định nghĩa:** Wavelet cho phép biểu diễn ảnh ở nhiều mức phân giải khác nhau.

**Quy trình phân tích đa phân giải:**

```
Ảnh gốc
   │
   ▼
Mức 1 (Level 1)
   │
   ├── LL₁ (xấp xỉ)
   ├── LH₁ (chi tiết ngang)
   ├── HL₁ (chi tiết dọc)
   └── HH₁ (chi tiết chéo)
          │
          ▼
      Tiếp tục DWT trên LL₁
          │
          ▼
      Mức 2 (Level 2)
          │
          ├── LL₂
          ├── LH₂
          ├── HL₂
          └── HH₂
```

**Đặc điểm:**
- LL: Chứa thông tin quan trọng nhất
- LH, HL, HH: Chứa chi tiết
- Tiếp tục phân tích LL để có nhiều mức hơn

**Ứng dụng của biểu diễn đa phân giải:**

**1. Nén ảnh:**
- Lượng tử hóa khác nhau cho các mức
- Mức cao (chi tiết nhỏ) có thể lượng tử hóa mạnh

**2. Phân tích ảnh:**
- Phân tích ở nhiều độ phân giải
- Phát hiện đặc trưng ở các mức khác nhau

**3. Truyền ảnh tiến triển:**
- Truyền LL trước (ảnh thô)
- Truyền các mức chi tiết sau
- Người xem thấy ảnh dần rõ nét

**4. Xử lý đa phân giải:**
- Xử lý ở độ phân giải thấp cho nhanh
- Chỉ xử lý chi tiết khi cần

---

# WAVELET VÀ JPEG 2000

**Định nghĩa:** JPEG 2000 là một chuẩn nén ảnh sử dụng Wavelet.

**Đặc điểm nổi bật:**

**1. Sử dụng DWT:**
- Thay vì DCT theo block
- Phân tích toàn ảnh
- Đa phân giải

**2. Không chia block $8 \times 8$:**
- Xử lý toàn ảnh hoặc tile lớn
- Không có blocking artifact
- Chất lượng tốt hơn ở tỷ lệ nén cao

**3. Hỗ trợ cả Lossy và Lossless:**
- Lossy: Lượng tử hóa các hệ số wavelet
- Lossless: Không lượng tử hóa hoặc lượng tử hóa đặc biệt

**4. Biểu diễn đa phân giải:**
- Có thể giải mã ở nhiều độ phân giải
- Hữu ích cho xem ảnh thumbnail

**5. Truyền ảnh tiến triển:**
- SNR progressive: Chất lượng tăng dần
- Resolution progressive: Độ phân giải tăng dần

**Ưu điểm so với JPEG:**
- Giảm hiện tượng blocking artifact
- Chất lượng tốt hơn ở tỷ lệ nén cao
- Linh hoạt hơn trong ứng dụng

**Nhược điểm:**
- Phức tạp hơn về mặt tính toán
- Ít phổ biến hơn JPEG
- Hỗ trợ phần cứng hạn chế

**Ứng dụng:**
- Ảnh y tế chất lượng cao
- Ảnh vệ tinh
- Lưu trữ dài hạn
- Ứng dụng yêu cầu chất lượng cao

---

# QUY TRÌNH NÉN WAVELET

**Các bước trong quy trình nén Wavelet:**

```
Ảnh gốc
  │
  ▼
DWT (Discrete Wavelet Transform)
  │
  ▼
Các sub-band (LL, LH, HL, HH ở nhiều mức)
  │
  ▼
Quantization (Lượng tử hóa)
  │
  ▼
Bit-plane / Entropy Coding
  │
  ▼
Bitstream
```

**Các kỹ thuật mã hóa có thể kết hợp:**

**1. Bit-plane coding:**
- Mã hóa theo mặt phẳng bit
- Ưu tiên bit quan trọng (MSB)

**2. Arithmetic Coding:**
- Mã hóa hiệu quả cao
- Tiệm cận entropy

**3. EZW (Embedded Zero-tree Wavelet):**
- Khai thác cấu trúc cây của hệ số wavelet
- Mã hóa nhúng (embedded)

**4. SPIHT (Set Partitioning in Hierarchical Trees):**
- Cải tiến của EZW
- Hiệu quả cao

**5. EBCOT (Embedded Block Coding with Optimized Truncation):**
- Sử dụng trong JPEG 2000
- Tối ưu hóa cắt ngắn
- Hỗ trợ tiến triển

**Đặc điểm:**
- Kết hợp nhiều kỹ thuật
- Đạt hiệu quả nén cao
- Linh hoạt trong ứng dụng

---

# GIẢI MÃ WAVELET

**Quy trình giải mã thực hiện ngược lại:**

```
Bitstream
    │
    ▼
Entropy Decoding (Giải mã entropy)
    │
    ▼
Inverse Quantization (Lượng tử hóa ngược)
    │
  0
    │
    ▼
Các sub-band (LL, LH, HL, HH)
    │
    ▼
IDWT (Inverse DWT - Biến đổi wavelet ngược)
    │
    ▼
Ảnh khôi phục
```

**So sánh Lossy và Lossless:**

**Trong trường hợp Lossy:**
- Thông tin đã bị mất trong bước lượng tử hóa
- Không thể khôi phục chính xác
- Ảnh khôi phục chỉ xấp xỉ ảnh gốc
- Chất lượng phụ thuộc vào mức lượng tử hóa

**Trong trường hợp Lossless phù hợp:**
- Có thể khôi phục chính xác ảnh ban đầu
- Không mất thông tin
- Tỷ lệ nén thấp hơn Lossy
- Phù hợp với ứng dụng yêu cầu độ chính xác

**Các bước giải mã:**
- Entropy Decoding: Khôi phục các hệ số từ bitstream
- Inverse Quantization: Khôi phục giá trị hệ số (có sai số trong Lossy)
- IDWT: Biến đổi ngược từ miền wavelet sang miền không gian

**Kết luận:** Wavelet cung cấp cả hai chế độ Lossy và Lossless, linh hoạt cho nhiều ứng dụng.

---

# SO SÁNH DCT VÀ WAVELET

| Đặc điểm | DCT / JPEG | Wavelet / JPEG 2000 |
|----------|------------|---------------------|
| **Phân tích** | Theo block $8 \times 8$ | Toàn ảnh / đa phân giải |
| **Kích thước block** | Thường $8 \times 8$ | Không phụ thuộc block $8 \times 8$ |
| **Artifact** | Có thể có blocking artifact | Giảm blocking artifact |
| **Đa phân giải** | Hạn chế | Tốt, hỗ trợ tự nhiên |
| **Lossless** | Không trong JPEG Lossy thông thường | Có hỗ trợ trong JPEG 2000 |
| **Độ phổ biến** | Rất cao, chuẩn công nghiệp | Thấp hơn JPEG |
| **Độ phức tạp** | Thấp hơn | Cao hơn |
| **Chất lượng ở tỷ lệ nén cao** | Giảm nhanh | Tốt hơn |

**Nhận xét:**

**Không nên hiểu rằng Wavelet luôn "tốt hơn" trong mọi ứng dụng.**

**JPEG (DCT) phù hợp khi:**
- Cần tương thích rộng rãi
- Độ phức tạp tính toán thấp
- Ứng dụng web, mobile thông thường

**JPEG 2000 (Wavelet) phù hợp khi:**
- Yêu cầu chất lượng cao
- Cần hỗ trợ đa phân giải
- Ứng dụng y tế, khoa học
- Lưu trữ dài hạn

**Mỗi phương pháp có mục tiêu, độ phức tạp và môi trường sử dụng khác nhau.**

---

# BỨC TRANH TỔNG THỂ CỦA NÉN ẢNH

**Sơ đồ phân loại các kỹ thuật nén:**

```
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

**Ba ý tưởng nền tảng:**

**1. Coding Redundancy (Dư thừa mã hóa):**
- Khai thác phân bố xác suất không đều
- Phương pháp: Statistical coding (Huffman, Arithmetic, Golomb)
- Nguyên lý: Gán mã ngắn cho ký hiệu phổ biến

**2. Spatial Redundancy (Dư thừa không gian):**
- Khai thác tương quan giữa các pixel lân cận
- Phương pháp: Prediction / RLE (DPCM, RLE)
- Nguyên lý: Chỉ mã hóa sự khác biệt

**3. Irrelevant Information (Thông tin không liên quan):**
- Loại bỏ thông tin ít quan trọng
- Phương pháp: Quantization (JPEG, JPEG 2000)
- Nguyên lý: Đánh đổi chất lượng để đạt tỷ lệ nén cao

**Kết luận:** Mọi kỹ thuật nén đều dựa trên ba ý tưởng này, kết hợp theo cách khác nhau.

---

# SO SÁNH CÁC KỸ THUẬT TIÊU BIỂU

| Kỹ thuật | Lossless | Lossy | Ý tưởng chính |
|----------|----------|-------|---------------|
| **Huffman** | ✓ | | Mã độ dài biến đổi theo tần suất |
| **Arithmetic** | ✓ | | Mã hóa chuỗi bằng khoảng số thực |
| **Golomb-Rice** | ✓ | | Mã hóa số nguyên nhỏ hiệu quả |
| **LZW** | ✓ | | Từ điển chuỗi lặp lại |
| **RLE** | ✓ | | Chuỗi giá trị giống nhau liên tiếp |
| **DPCM** | ✓ | ✓ | Mã hóa sai số dự đoán |
| **DCT** | | ✓ | Biến đổi sang miền tần số |
| **DWT** | ✓* | ✓ | Biến đổi wavelet đa phân giải |

**Ghi chú:**
- DWT có thể Lossless (*) tùy cách triển khai và chế độ mã hóa
- DPCM có thể cả Lossless và Lossy tùy có lượng tử hóa hay không

**Phân nhóm theo mục đích:**

**Chỉ Lossless:**
- Huffman, Arithmetic, Golomb-Rice, LZW, RLE
- Phù hợp với dữ liệu cần bảo toàn tuyệt đối

**Cả Lossless và Lossy:**
- DPCM, DWT
- Linh hoạt, tùy ứng dụng

**Chủ yếu Lossy:**
- DCT (trong JPEG)
- Tối ưu cho tỷ lệ nén cao

**Lựa chọn kỹ thuật:**
- Phụ thuộc vào yêu cầu ứng dụng
- Phụ thuộc vào loại dữ liệu
- Phụ thuộc vào giới hạn tính toán

---

# ĐÁNH ĐỔI TRONG NÉN ẢNH

**Nguyên lý cơ bản:** Nén ảnh luôn liên quan đến sự đánh đổi.

**Mối quan hệ:**

```
              Tỷ lệ nén
                 ▲
                 │
                 │
                 │
                 │
                 └──────────────►
                         Chất lượng
```

**So sánh Lossless và Lossy:**

**Lossless:**
- Chất lượng: 100% (không mất thông tin)
- Tỷ lệ nén: thường thấp hơn (2:1 - 5:1)
- Phù hợp: dữ liệu cần bảo toàn tuyệt đối

**Lossy:**
- Tỷ lệ nén: cao (10:1 - 50:1 hoặc hơn)
- Chất lượng: phụ thuộc mức nén
- Phù hợp: ứng dụng chấp nhận mất mát

**Mục tiêu thực tế:**

**Tìm mức nén phù hợp với yêu cầu của ứng dụng:**

**Ví dụ:**
- Ảnh y tế chẩn đoán → Lossless, chất lượng 100%
- Ảnh đăng Facebook → Lossy, tỷ lệ nén cao, chất lượng chấp nhận được
- Ảnh thumbnail → Lossy, tỷ lệ nén rất cao, chất lượng thấp hơn

**Nguyên tắc:**
- Không có "tốt nhất" tuyệt đối
- Chỉ có "phù hợp nhất" cho từng ứng dụng
- Cần cân nhắc giữa dung lượng, chất lượng, và tốc độ

---

# VÍ DỤ LỰA CHỌN PHƯƠNG PHÁP

**Tình huống 1: Ảnh chụp dùng trên website**

**Lựa chọn:** Lossy như JPEG

**Lý do:**
- Cần giảm dung lượng để tải nhanh
- Có thể chấp nhận một mức sai khác nhỏ
- Mắt người không nhận ra sai khác ở chất lượng cao
- Tương thích rộng rãi với trình duyệt

**Tình huống 2: Ảnh tài liệu / logo**

**Lựa chọn:** Lossless (PNG)

**Lý do:**
- Cần giữ chính xác cạnh và ký tự
- Biên sắc nét, không bị mờ
- Vùng màu đồng nhất, nén Lossless hiệu quả
- Không chấp nhận artifact

**Tình huống 3: Ảnh y tế**

**Lựa chọn:** Cần xem xét yêu cầu của hệ thống

**Câu hỏi cần trả lời:**
- Dữ liệu có cần bảo toàn tuyệt đối không?
- Có được phép mất thông tin không?
- Mức sai số chấp nhận được là bao nhiêu?
- Mục đích sử dụng là gì (chẩn đoán, lưu trữ, truyền tải)?

**Kết luận:**
- Không lựa chọn thuật toán chỉ dựa trên tỷ lệ nén
- Cần hiểu rõ yêu cầu ứng dụng
- Cân nhắc nhiều yếu tố: chất lượng, dung lượng, tốc độ, tương thích

---

# THỰC HÀNH TỔNG HỢP

**Bài tập:** Phân tích và đánh giá nén ảnh

**Cho một ảnh bất kỳ, thực hiện các bước:**

**Bước 1: Đọc ảnh**
- Tải ảnh từ file
- Hiển thị thông tin cơ bản

**Bước 2: Tính toán thống kê**
- Kích thước ảnh (width × height)
- Số bit dữ liệu thô (width × height × 3 × 8 cho ảnh màu)
- Histogram (phân bố mức xám/màu)
- Entropy (lượng thông tin trung bình)

**Bước 3: Nén với các mức chất lượng khác nhau**
- Lưu ảnh với các mức chất lượng JPEG khác nhau
- Ví dụ: quality = 95, 75, 50, 25, 10

**Bước 4: Tính toán chỉ số đánh giá**
- Dung lượng file sau nén
- MSE (Mean Squared Error)
- RMSE (Root Mean Squared Error)
- PSNR (Peak Signal-to-Noise Ratio)

**Bước 5: Quan sát trực quan**
- Chi tiết được giữ lại
- Biên có bị mờ không
- Blocking artifact có xuất hiện không
- Mức độ thay đổi màu sắc

**Mục tiêu:** Hiểu mối quan hệ giữa chất lượng nén và các chỉ số đánh giá.

---

# THỰC HÀNH: ĐÁNH ĐỔI DUNG LƯỢNG - CHẤT LƯỢNG

**Đoạn mã Python minh họa:**

```python
from PIL import Image
import numpy as np

# Các mức chất lượng
qualities = [95, 75, 50, 25, 10]

# Mở ảnh gốc
img = Image.open("input.jpg")

# Tạo bảng kết quả
results = []

for q in qualities:
    # Lưu ảnh JPEG với chất lượng q
    img.save(f"output_q{q}.jpg", quality=q)
    
    # Đọc lại ảnh
    img_compressed = Image.open(f"output_q{q}.jpg")
    
    # Tính kích thước file
    size = os.path.getsize(f"output_q{q}.jpg")
    
    # Tính MSE
    mse = np.mean((np.array(img) - np.array(img_compressed)) ** 2)
    
    # Tính PSNR
    psnr = 10 * np.log10(255**2 / mse) if mse > 0 else float('inf')
    
    results.append({
        'Quality': q,
        'Size': size,
        'MSE': mse,
        'PSNR': psnr
    })

# Hiển thị bảng
print("| Quality | Size | MSE | PSNR |")
print("|---------|------|-----|------|")
for r in results:
    print(f"| {r['Quality']} | {r['Size']} | {r['MSE']:.2f} | {r['PSNR']:.2f} |")
```

**Mục tiêu:**
- Quan sát trực tiếp quan hệ giữa:
  - Compression Ratio ↔ File Size
  - File Size ↔ Image Quality
  - MSE ↔ PSNR

**Nhận xét:**
- Quality càng cao → Size càng lớn → MSE càng nhỏ → PSNR càng cao
- Quality 95: Chất lượng gần như gốc, dung lượng lớn
- Quality 10: Dung lượng rất nhỏ, chất lượng giảm rõ rệt

---

# NHỮNG ĐIỂM CẦN NHỚ

**1. Nén ảnh**
- Giảm số bit cần thiết để biểu diễn ảnh
- Khai thác dư thừa dữ liệu
- Đánh đổi giữa dung lượng và chất lượng

**2. Dư thừa (Redundancy)**
- Là cơ sở để nén
- Ba loại chính:
  - Coding redundancy: Phân bố xác suất không đều
  - Spatial redundancy: Tương quan không gian
  - Irrelevant information: Thông tin không quan trọng

**3. Entropy**
- Đo lượng thông tin trung bình của nguồn
- Cung cấp giới hạn lý thuyết cho mã hóa nguồn
- Entropy thấp → dễ nén

**4. Lossless (Không tổn thất)**
- Không mất thông tin
- Khôi phục chính xác 100%
- Tỷ lệ nén thấp hơn

**5. Lossy (Có tổn thất)**
- Chấp nhận mất thông tin
- Đạt tỷ lệ nén cao
- Chất lượng phụ thuộc mức nén

**Kết luận:** Hiểu rõ các khái niệm này là nền tảng để nắm bắt các kỹ thuật nén ảnh.

---

# NHỮNG ĐIỂM CẦN NHỚ - CÁC THUẬT TOÁN

**Tóm tắt các thuật toán nén:**

**Huffman**
→ Mã độ dài biến đổi
→ Gán mã ngắn cho ký hiệu phổ biến

**Arithmetic Coding**
→ Mã hóa chuỗi bằng khoảng số thực
→ Tiệm cận entropy tốt hơn Huffman

**Golomb-Rice**
→ Mã hóa số nguyên nhỏ hiệu quả
→ Phù hợp với dữ liệu có phân bố lệch

**LZW**
→ Từ điển chuỗi lặp
→ Hiệu quả với dữ liệu có chuỗi lặp lại

**RLE**
→ Chuỗi giá trị lặp
→ Đơn giản, nhanh, hiệu quả với vùng đồng nhất

**DPCM**
→ Mã hóa sai số dự đoán
→ Khai thác tương quan không gian

**DCT**
→ Biến đổi sang miền tần số
→ Tập trung năng lượng, dễ lượng tử hóa

**DWT**
→ Biến đổi wavelet đa phân giải
→ Không có blocking artifact, linh hoạt

**Kết luận:** Mỗi thuật toán có ưu nhược điểm riêng, phù hợp với từng loại dữ liệu và ứng dụng cụ thể.

---

# JPEG - KIẾN THỨC TRỌNG TÂM

**Quy trình nén JPEG:**

```
Ảnh gốc
 ↓
Chuyển đổi màu (RGB → YCbCr)
 ↓
Chia block 8×8
 ↓
DCT (Discrete Cosine Transform)
 ↓
Quantization (Lượng tử hóa)   ← BƯỚC LOSSY DUY NHẤT
 ↓
Zigzag Scan
 ↓
RLE (Run-Length Encoding)
 ↓
Huffman (Entropy Coding)
 ↓
JPEG Bitstream
```

**Quy trình giải mã JPEG:**

```
JPEG Bitstream
 ↓
Huffman Decode
 ↓
Inverse Zigzag
 ↓
Inverse Quantization
 ↓
IDCT (Inverse DCT)
 ↓
Ghép block
 ↓
Chuyển đổi màu (YCbCr → RGB)
 ↓
Ảnh khôi phục
```

**Điểm quan trọng nhất:**

**Quantization là bước làm mất thông tin.**

- Các bước khác (DCT, Zigzag, RLE, Huffman) đều Lossless
- Chỉ có Quantization gây mất mát
- Mức độ lượng tử hóa quyết định chất lượng ảnh
- Ma trận lượng tử Q càng lớn → nén càng mạnh → chất lượng càng giảm

**Hiểu rõ quy trình này là chìa khóa để nắm bắt JPEG.**

---

# CÂU HỎI ÔN TẬP

**Câu 1:** Tại sao ảnh số có thể nén?

**Câu 2:** Dư thừa mã hóa và dư thừa không gian khác nhau như thế nào?

**Câu 3:** Entropy có ý nghĩa gì trong nén dữ liệu?

**Câu 4:** Tại sao Huffman có thể giảm số bit trung bình?

**Câu 5:** Tại sao Arithmetic Coding có thể đạt hiệu quả gần entropy?

**Câu 6:** LZW khai thác dạng dư thừa nào?

**Câu 7:** Khi nào RLE hoạt động hiệu quả?

**Câu 8:** Tại sao DPCM chỉ cần mã hóa sai số?

**Câu 9:** Trong JPEG, bước nào gây mất thông tin?

**Câu 10:** DCT và DWT khác nhau như thế nào?

**Gợi ý trả lời:**
- Câu 1: Do có dư thừa dữ liệu (coding, spatial, irrelevant)
- Câu 2: Coding: phân bố xác suất; Spatial: tương quan pixel
- Câu 3: Giới hạn lý thuyết cho nén
- Câu 4: Mã ngắn cho ký hiệu phổ biến
- Câu 5: Mã hóa cả chuỗi, không từng ký hiệu
- Câu 6: Dư thừa lặp lại (chuỗi)
- Câu 7: Khi có chuỗi giá trị giống nhau dài
- Câu 8: Sai số nhỏ hơn giá trị pixel, dễ nén
- Câu 9: Quantization
- Câu 10: DCT theo block, DWT toàn ảnh/đa phân giải

---

# BÀI TẬP VẬN DỤNG

**Bài 1 - Entropy:**

Cho histogram:

| Mức xám | Xác suất |
|---------|----------|
| 0       | 0.5      |
| 1       | 0.25     |
| 2       | 0.125    |
| 3       | 0.125    |

**Yêu cầu:** Tính entropy.

**Bài 2 - Huffman:**

Cho các ký hiệu:
- A: 40
- B: 30
- C: 20
- D: 10

**Yêu cầu:**
- Xây dựng cây Huffman
- Tạo bảng mã
- Tính độ dài mã trung bình
- So sánh với mã cố định

**Bài 3 - RLE:**

Cho chuỗi: "AAAABBBBBCCCCCCCCAA"

**Yêu cầu:**
- Mã hóa bằng RLE
- Tính số ký tự trước nén
- Tính số phần tử sau nén
- Nhận xét hiệu quả

**Bài 4 - DPCM:**

Cho: 100, 102, 101, 103, 105, 104

Dùng bộ dự đoán: $\hat{x}(n) = x(n-1)$

**Yêu cầu:**
- Tính sai số
- Khôi phục dữ liệu
- Giải thích tại sao sai số dễ nén hơn giá trị pixel

---

# BÀI TẬP VẬN DỤNG (TIẾP)

**Bài 5 - JPEG:**

**Yêu cầu:** Giải thích vai trò của từng bước:
- 8×8 block
- DCT
- Quantization
- Zigzag
- RLE
- Huffman

**Câu hỏi đặc biệt:**
Nếu bỏ bước Quantization thì JPEG còn Lossy hay không?

**Bài 6 - Thực nghiệm:**

Với một ảnh màu:
- Lưu PNG (Lossless)
- Lưu JPEG quality = 95
- Lưu JPEG quality = 50
- Lưu JPEG quality = 10

**So sánh:**
- Dung lượng file
- MSE
- RMSE
- PSNR
- Chất lượng trực quan

**Nhận xét:**
- PNG: Dung lượng lớn nhất, chất lượng 100%
- JPEG 95: Dung lượng nhỏ, chất lượng rất tốt
- JPEG 50: Dung lượng nhỏ hơn, chất lượng tốt
- JPEG 10: Dung lượng nhỏ nhất, chất lượng giảm rõ rệt

**Mục tiêu:** Hiểu rõ sự đánh đổi giữa dung lượng và chất lượng trong thực tế.

---

# TỔNG KẾT CHƯƠNG

**Nén ảnh không chỉ là:**
"Làm cho file ảnh nhỏ hơn."

**Mà là quá trình:**

```
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

**Hai chiến lược lớn:**

**LOSSLESS:**
- Không mất thông tin
- Khôi phục chính xác 100%
- Tỷ lệ nén thấp hơn
- Phù hợp với dữ liệu quan trọng

**LOSSY:**
- Đánh đổi chất lượng để đạt tỷ lệ nén cao
- Chấp nhận mất một phần thông tin
- Phù hợp với ứng dụng multimedia

**Kết luận:** Nén ảnh là sự kết hợp giữa lý thuyết thông tin, tâm lý học thị giác, và kỹ thuật mã hóa để đạt được mục tiêu giảm dung lượng mà vẫn đáp ứng yêu cầu ứng dụng.

---

# KẾT NỐI VỚI CÁC CHƯƠNG TIẾP THEO

**Kiến thức về nén ảnh là nền tảng cho nhiều ứng dụng:**

```
Nén ảnh
    │
    ├── Lưu trữ ảnh
    │       → Giảm chi phí lưu trữ
    │
    ├── Truyền ảnh
    │       → Tiết kiệm băng thông
    │
    ├── Multimedia
    │       → Video, audio streaming
    │
    ├── Web / Mobile
    │       → Tải nhanh, tiết kiệm dữ liệu
    │
    ├── Camera
    │       → Lưu nhiều ảnh hơn
    │
    └── Computer Vision
            │
            ├── Video
            │       → Xử lý video hiệu quả
            │
            ├── Streaming
            │       → Real-time processing
            │
            ├── Edge AI
            │       → Giảm tài nguyên tính toán
            │
            └── Image Dataset
                    → Lưu trữ dataset lớn
```

**Trong các hệ thống Computer Vision thực tế:**
- Chất lượng dữ liệu đầu vào ảnh hưởng đến hiệu quả mô hình
- Chi phí lưu trữ/truyền tải ảnh hưởng đến khả năng triển khai
- Cần cân nhắc giữa chất lượng và hiệu suất

**Kết luận:** Nén ảnh không chỉ là kỹ thuật xử lý ảnh, mà là công cụ quan trọng trong hệ thống thị giác máy tính hiện đại.

---

# KẾT LUẬN

**NÉN ẢNH**
**Giảm dữ liệu - giữ lại thông tin cần thiết**

**Ba câu hỏi quan trọng cần ghi nhớ:**

**1. Dữ liệu có dư thừa ở đâu?**
- Coding redundancy: Phân bố xác suất không đều
- Spatial redundancy: Tương quan giữa các pixel
- Irrelevant information: Thông tin không quan trọng

**2. Có thể biểu diễn phần dư thừa bằng ít bit hơn như thế nào?**
- Huffman, Arithmetic: Mã hóa thống kê
- LZW, RLE: Khai thác chuỗi lặp
- DPCM: Mã hóa sai số dự đoán

**3. Có thể loại bỏ phần thông tin nào mà ứng dụng vẫn chấp nhận được?**
- Quantization: Giảm số mức biểu diễn
- JPEG, JPEG 2000: Kết hợp nhiều kỹ thuật

**Thông điệp cuối cùng:**

Hiểu được ba câu hỏi này là hiểu được nền tảng của nén ảnh. Mọi kỹ thuật nén đều xoay quanh việc trả lời ba câu hỏi này theo cách khác nhau.

**Chúc các em học tốt!**