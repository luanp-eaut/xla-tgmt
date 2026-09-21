---
marp: true
theme: eaut
paginate: true
transition: zoom
---
<!-- _class: cover -->

<div class="middle">

# XỬ LÝ ẢNH & THỊ GIÁC MÁY TÍNH

## Chương 1: Giới thiệu tổng quan

</div>

### Giảng viên: Nguyễn Phồn Lữa

---
<!-- _class: toc -->

# MỤC LỤC

1. Giới thiệu học phần
2. Tổng quan về xử lý ảnh & thị giác máy tính
3. Từ thế giới thực đến ảnh số
4. Biểu diễn và các quan hệ trong ảnh
5. Các phép toán cơ bản trên ảnh
6. Công cụ xử lý ảnh trong Python
7. Môi trường thực hành

---
<!-- _class: section -->

# GIỚI THIỆU HỌC PHẦN

---

# Giới thiệu học phần

### Tên học phần
- **Xử lý ảnh và Thị giác máy tính** (Image Processing & Computer Vision)

### Quy mô học phần
- **3 tín chỉ**, trong đó:
  - 2 tín chỉ lý thuyết
  - 1 tín chỉ thực hành
- **Khoảng 15 buổi học** trên lớp
- **Thời gian tự học:** khoảng 75 giờ (đọc tài liệu, làm bài tập, thực hành code)

### Mục tiêu tổng quát của học phần
- Nắm vững **kiến thức nền tảng** về xử lý ảnh và thị giác máy tính
- Hiểu rõ các **kỹ thuật xử lý và phân tích ảnh** cơ bản
- Biết cách **sử dụng công cụ lập trình** (Python) để giải quyết các bài toán thực tế


---
<!--_class: text-sm-->

# Mục tiêu học tập

Sau khi hoàn thành học phần, sinh viên cần đạt được **3 mức độ nhận thức** theo thang Bloom:

### HIỂU
- Ảnh số được **hình thành và biểu diễn** như thế nào (từ ánh sáng → cảm biến → ma trận số)?
- Phân biệt được các khái niệm cốt lõi: **Image Processing** vs **Computer Vision**
- Nắm được các kỹ thuật xử lý ảnh cơ bản: lọc nhiễu, phát hiện biên, phân vùng

### THỰC HIỆN
- **Đọc, hiển thị và biến đổi ảnh** bằng code
- Thực hiện các **phép toán trên ảnh**: cộng, trừ, AND, OR, convolution
- Áp dụng các kỹ thuật: **lọc (filtering), phát hiện biên (edge detection), phân vùng (segmentation)**

### VẬN DỤNG
- Tự **xây dựng một pipeline xử lý ảnh** hoàn chỉnh
- Sử dụng thành thạo **Python** và các thư viện chuyên dụng (OpenCV, NumPy, Matplotlib)
- **Giải quyết các bài toán Computer Vision** cơ bản trong thực tế

---

# Phương pháp đánh giá

### Tỷ trọng các thành phần đánh giá

| Thành phần | Tỷ trọng | Hình thức |
| --- | --- | --- |
| **Chuyên cần** | 10% | Điểm danh, thái độ tham gia giờ học |
| **Quá trình / Giữa kỳ** | 30% | Bài tập nhỏ, quiz, kiểm tra giữa kỳ |
| **Cuối kỳ – Bài tập lớn** | 60% | Đồ án nhóm + Báo cáo + Vấn đáp |

### Bài tập lớn (60% - thành phần quan trọng nhất)
- Làm việc theo **nhóm 3–5 sinh viên**
- Mỗi nhóm **tự chọn đề tài** 
- **Các nhóm không được trùng đề tài**
- Yêu cầu: Hoàn thành **sản phẩm demo**, viết **báo cáo khoa học**, và **bảo vệ trước giảng viên** (vấn đáp)
---

# Bài tập lớn - Quy trình thực hiện

### Quy trình 8 bước tiêu chuẩn

```
1. Chọn bài toán          → Ví dụ: "Nhận diện khẩu trang trên ảnh"
         ↓
2. Phân tích yêu cầu      → Input là gì? Output mong muốn? Độ chính xác?
         ↓
3. Thu thập / chọn dữ liệu → Tìm dataset công khai hoặc tự chụp
         ↓
4. Thiết kế phương pháp   → Dùng thuật toán gì? Pipeline ra sao?
         ↓
5. Cài đặt                → Viết code Python
         ↓
6. Thực nghiệm            → Chạy thử trên nhiều ảnh khác nhau
         ↓
7. Đánh giá               → Đo accuracy, precision, recall, FPS...
         ↓
8. Báo cáo & vấn đáp      → Viết báo cáo + thuyết trình + trả lời câu hỏi
```
---

# Bài tập lớn - Quy trình thực hiện

### Cách chấm điểm bài tập lớn

| Tiêu chí | Tỷ trọng | Mô tả |
|:---|:---:|:---|
| **Hình thức báo cáo** | 10% | Cấu trúc, chính tả, hình ảnh, trích dẫn |
| **Nội dung báo cáo** | 50% | Phân tích bài toán, phương pháp, kết quả, đánh giá |
| **Vấn đáp** | 40% | Khả năng giải thích, bảo vệ phương án, trả lời câu hỏi |

---

# Roadmap học phần - 5 chương

```
CHƯƠNG 1: NỀN TẢNG
   │  → Ảnh là gì? Pixel, sampling, quantization
   ↓
CHƯƠNG 2: BIẾN ĐỔI ẢNH
   │  → Tăng cường chất lượng, histogram, biến đổi không gian/tần số
   ↓
CHƯƠNG 3: NÉN ẢNH
   │  → Giảm dung lượng: JPEG, wavelet, DCT
   ↓
CHƯƠNG 4: PHÁT HIỆN BIÊN & PHÂN VÙNG
   │  → Tách vật thể ra khỏi nền: Canny, watershed, region growing
   ↓
CHƯƠNG 5: THỊ GIÁC MÁY TÍNH
      → Nhận dạng, phân loại, hiểu nội dung ảnh
```

### Câu hỏi xuyên suốt
> **"Làm thế nào để biến một hình ảnh thành thông tin có ý nghĩa?"**

---
<!--_class: section-->

# <!--fit-->TỔNG QUAN VỀ XỬ LÝ ẢNH & THỊ GIÁC MÁY TÍNH

---

# 🌍 Slide 6: Từ thế giới thực đến máy tính

### Con người nhìn thấy gì?
Khi nhìn vào một bức ảnh đường phố, não bộ chúng ta **ngay lập tức** nhận ra:
- 👤 **Người** đang đi bộ
- 🚗 **Xe** đang chạy
- 🏠 **Nhà** cửa hai bên đường
- 🌳 **Cây** xanh
- 🔤 **Chữ** trên biển quảng cáo
- 😊 **Khuôn mặt** quen thuộc

### Máy tính "nhìn" thấy gì?
Máy tính **KHÔNG** nhìn ảnh theo cách con người nhìn. Những gì nó nhận được chỉ là:
> **Dữ liệu số biểu diễn năng lượng ánh sáng** (hoặc các dạng tín hiệu khác như sóng âm, tia X...)

### 💡 Ví dụ cụ thể
Khi camera chụp một bức ảnh con mèo:
- **Con người:** "Đây là con mèo tam thể, đang nằm ngủ"
- **Máy tính:** Một ma trận kích thước 1080×1920×3, chứa khoảng **6 triệu con số** trong khoảng [0, 255]

> 🎯 **Thông điệp quan trọng:** Nhiệm vụ của chúng ta trong học phần này là **xây dựng cầu nối** giữa "ma trận số" và "ý nghĩa thực tế" — đó chính là bản chất của Computer Vision.

---

# 🖼️ Slide 7: Ảnh là gì?

### Định nghĩa toán học
Một ảnh mức xám được mô hình hóa bằng hàm hai biến:

$$f(x, y)$$

Trong đó:
- $(x, y)$: **tọa độ không gian** (vị trí điểm ảnh)
- $f(x, y)$: **cường độ sáng** (độ xám) tại vị trí $(x, y)$

### Giá trị của hàm $f(x,y)$
- Phụ thuộc vào **nguồn sáng chiếu vào** cảnh vật
- Phụ thuộc vào **đặc tính phản xạ** của vật thể
- Luôn nằm trong khoảng: $0 < f(x,y) < \infty$ (trong thực tế)

### Cách hiểu đơn giản
> **Ảnh là một hàm mô tả cường độ sáng tại mỗi vị trí trong không gian 2 chiều.**

### 💡 Ví dụ minh họa
Hãy tưởng tượng một bức ảnh chụp tờ giấy trắng dưới bóng đèn:
- Tại vị trí $(100, 200)$ - ngay dưới đèn: $f(100, 200) = 240$ (rất sáng)
- Tại vị trí $(500, 800)$ - góc xa, bị khuất: $f(500, 800) = 80$ (tối hơn)

Cùng một vật (tờ giấy trắng) nhưng do vị trí khác nhau so với nguồn sáng, nên giá trị $f(x,y)$ khác nhau. Đây là lý do tại sao xử lý ảnh phải quan tâm đến **điều kiện chiếu sáng**.

---

# 🔢 Slide 8: Ảnh số (Digital Image)

### Định nghĩa
**Ảnh số** là ảnh mà cả **tọa độ không gian** lẫn **giá trị cường độ** đều đã được **số hóa** (rời rạc hóa).

Nói cách khác:
- Tọa độ $(x, y)$ chỉ nhận các giá trị **nguyên** (0, 1, 2, ...)
- Giá trị $f(x,y)$ chỉ nhận một **tập hữu hạn** các mức (ví dụ: 0, 1, 2, ..., 255)

### Biểu diễn dưới dạng ma trận
Ảnh số được lưu trữ trong máy tính dưới dạng **ma trận 2 chiều**:

$$f(x,y) \rightarrow \begin{bmatrix} f(0,0) & f(0,1) & \cdots & f(0,N-1) \\ f(1,0) & f(1,1) & \cdots & f(1,N-1) \\ \vdots & \vdots & \ddots & \vdots \\ f(M-1,0) & f(M-1,1) & \cdots & f(M-1,N-1) \end{bmatrix}$$

### 💡 Ví dụ thực tế
Một ảnh xám nhỏ 4×4 pixel có thể được lưu như sau:

$$\begin{bmatrix} 12 & 30 & 45 & 70 \\ 18 & 42 & 80 & 100 \\ 25 & 60 & 110 & 150 \\ 40 & 90 & 180 & 220 \end{bmatrix}$$

- Góc trên-trái $(0,0)$ có giá trị **12** → rất tối (gần đen)
- Góc dưới-phải $(3,3)$ có giá trị **220** → rất sáng (gần trắng)

> 🎯 **Ghi nhớ:** Ma trận này chính là thứ mà Python (thư viện NumPy) sẽ làm việc khi các em xử lý ảnh!

---

# 🟦 Slide 9: Pixel - Phần tử ảnh

### Định nghĩa
**Pixel** (viết tắt của **Pic**ture **El**ement) là **phần tử nhỏ nhất** cấu tạo nên ảnh số.

### Mỗi pixel có 2 thuộc tính
1. **Vị trí:** tọa độ $(x, y)$ trong ma trận ảnh
2. **Giá trị:** cường độ sáng (mức xám) tại vị trí đó

### Ví dụ minh họa - Ảnh mức xám 3×4

```
┌────┬────┬────┬────┐
│  12│  30│  45│  70│   ← Hàng 0
├────┼────┼────┼────┤
│  18│  42│  80│ 100│   ← Hàng 1
├────┼────┼────┼────┤
│  25│  60│ 110│ 150│   ← Hàng 2
└────┴────┴────┴────┘
   ↑    ↑    ↑    ↑
  Cột 0  1    2    3
```

### Quy tắc đọc giá trị
- **Giá trị càng LỚN** → pixel càng **SÁNG** (gần trắng)
- **Giá trị càng NHỎ** → pixel càng **TỐI** (gần đen)

### 💡 Ví dụ thực tế
Khi các em zoom vào một bức ảnh trên điện thoại, các em sẽ thấy các **ô vuông nhỏ** xuất hiện — mỗi ô vuông đó chính là **một pixel**. Ảnh có **càng nhiều pixel** (độ phân giải cao) thì càng **mịn và rõ nét**.

> 📌 **Thuật ngữ liên quan:**
> - **Độ phân giải (Resolution):** số lượng pixel theo chiều ngang × dọc (ví dụ: 1920×1080)
> - **Megapixel (MP):** 1 triệu pixel. Camera 12MP = 12 triệu pixel

---

# 🎨 Slide 10: Ảnh xám và ảnh màu

### 🔘 Ảnh mức xám (Grayscale Image)
- Mỗi pixel chỉ có **MỘT giá trị** duy nhất
- Thông dụng nhất: **8-bit** → giá trị trong khoảng $[0, 255]$
  - $0$ → **đen hoàn toàn**
  - $255$ → **trắng hoàn toàn**
  - $128$ → **xám trung bình**

**Ví dụ:** Ảnh chụp X-quang, ảnh đen trắng cũ

### 🌈 Ảnh màu (Color Image)
- Mỗi pixel được biểu diễn bởi **NHIỀU thành phần màu**
- Phổ biến nhất: **RGB** (Red - Green - Blue)

$$Pixel = (R, G, B)$$

Mỗi kênh màu thường là 8-bit → mỗi pixel cần **3 byte** (24 bit)

### 💡 Ví dụ minh họa

| Màu sắc | Giá trị (R, G, B) | Giải thích |
|:---|:---:|:---|
| Đen | (0, 0, 0) | Không có ánh sáng |
| Trắng | (255, 255, 255) | Đủ cả 3 màu ở mức tối đa |
| Đỏ thuần | (255, 0, 0) | Chỉ có kênh đỏ |
| Vàng | (255, 255, 0) | Đỏ + Lục = Vàng |
| Xám trung bình | (128, 128, 128) | 3 kênh bằng nhau → xám |

### 🔄 Chuyển đổi giữa ảnh màu và ảnh xám
Công thức phổ biến (luminance):
$$Gray = 0.299 \times R + 0.587 \times G + 0.114 \times B$$

> 💡 **Tại sao hệ số khác nhau?** Mắt người nhạy cảm nhất với màu **xanh lục** (G), kém nhạy nhất với màu **xanh lam** (B).

---

# 🔧 Slide 11: Image Processing là gì?

### Định nghĩa
**Image Processing (Xử lý ảnh)** là tập hợp các phương pháp dùng để:
- ✨ **Biến đổi ảnh** (từ dạng này sang dạng khác)
- 🌟 **Cải thiện chất lượng ảnh** (làm rõ hơn, đẹp hơn)
- 🔁 **Khôi phục ảnh** (sửa ảnh bị hỏng, bị mờ)
- 📊 **Trích xuất thông tin** từ ảnh (đo đạc, đếm, phân tích)

### 💡 Ví dụ minh họa

**Ví dụ 1: Tăng độ sáng**
```
Ảnh tối (tối om, không thấy gì)
    ↓  [Áp dụng: Brightness Adjustment]
Ảnh sáng hơn (nhìn rõ chi tiết)
```

**Ví dụ 2: Lọc nhiễu**
```
Ảnh bị nhiễu hạt (lấm tấm trắng đen)
    ↓  [Áp dụng: Gaussian Blur / Median Filter]
Ảnh mịn hơn (giảm nhiễu, giữ biên)
```

**Ví dụ 3: Khôi phục ảnh cũ**
```
Ảnh scan bị ố vàng, rách
    ↓  [Áp dụng: Inpainting, Color Correction]
Ảnh sạch sẽ, màu sắc tự nhiên
```

### 🎯 Đặc điểm cốt lõi của Image Processing
> **Input là ẢNH → Output cũng là ẢNH** (hoặc các đặc trưng trích xuất từ ảnh)

Mục tiêu là **cải thiện dữ liệu ảnh** để con người xem dễ hơn, HOẶC để máy tính xử lý tiếp ở bước sau.

---

# 🤖 Slide 12: Computer Vision là gì?

### Định nghĩa
**Computer Vision (Thị giác máy tính)** là lĩnh vực nghiên cứu cách máy tính:
- 📷 **Thu nhận** hình ảnh/video
- 🔍 **Xử lý và phân tích** dữ liệu ảnh
- 🧠 **Suy luận** để rút ra thông tin có ý nghĩa

### 💡 Ví dụ minh họa

**Ví dụ: Hệ thống camera giao thông thông minh**
```
Camera thu nhận video
        ↓
    Ảnh / Frame
        ↓
  Object Detection (Phát hiện vật thể)
        ↓
  ┌────────────────────────┐
  │ Kết luận:              │
  │  • 2 người đi bộ       │
  │  • 1 chiếc xe ô tô     │
  │  • 1 chiếc xe máy      │
  │  • 1 xe đang vượt đèn  │
  └────────────────────────┘
        ↓
  → Phạt nguội / Thống kê giao thông
```

### 🎯 Đặc điểm cốt lõi của Computer Vision
> **Input là ẢNH → Output là THÔNG TIN / QUYẾT ĐỊNH**

Máy tính không chỉ "nhìn" mà còn **"hiểu"** nội dung ảnh, từ đó đưa ra hành động.

### So sánh nhanh với con người
| | Con người | Máy tính (CV) |
|:---|:---|:---|
| Đầu vào | Ánh sáng qua mắt | Ma trận số |
| Xử lý | Não bộ (sinh học) | Thuật toán (toán + code) |
| Đầu ra | Nhận thức, hành động | Thông tin, quyết định tự động |

---

# ⚖️ Slide 13: Image Processing vs Computer Vision

### Bảng so sánh chi tiết

| Tiêu chí | Image Processing (XLẢ) | Computer Vision (CGMT) |
|:---|:---|:---|
| **Mục tiêu** | Biến đổi ảnh | Hiểu nội dung ảnh |
| **Đầu ra** | Ảnh mới (cải thiện) | Thông tin / quyết định |
| **Ví dụ điển hình** | Lọc nhiễu, tăng tương phản | Nhận diện vật thể, phân loại |
| **Tác vụ cụ thể** | Sharpening, Geometric transform | Detection, Tracking, Recognition |
| **Góc nhìn** | "Làm đẹp dữ liệu" | "Hiểu ý nghĩa dữ liệu" |

### 🔗 Mối quan hệ giữa hai lĩnh vực
> **Hai lĩnh vực KHÔNG có ranh giới tuyệt đối.**

Thực tế, chúng **bổ trợ cho nhau**:
- **Computer Vision thường sử dụng Image Processing làm bước tiền xử lý** (pre-processing)
- Ví dụ: Trước khi nhận diện khuôn mặt (CV), ta cần **lọc nhiễu, cân bằng ánh sáng, phát hiện biên** (IP)

### 💡 Ví dụ minh họa mối quan hệ

```
Ảnh chụp biển số xe bị mờ, tối
        ↓
[BƯỚC 1 - IMAGE PROCESSING]
  • Tăng độ tương phản
  • Lọc nhiễu
  • Cân bằng ánh sáng
        ↓
Ảnh biển số rõ nét
        ↓
[BƯỚC 2 - COMPUTER VISION]
  • Phát hiện vùng biển số
  • Cắt ký tự
  • Nhận dạng ký tự (OCR)
        ↓
Kết quả: "30A-12345"
```

> 🎯 **Thông điệp:** Image Processing là **công cụ**, Computer Vision là **mục tiêu**. Học tốt IP sẽ giúp các em làm CV hiệu quả hơn rất nhiều.

---

# 📊 Slide 14: Ba mức độ xử lý ảnh

### 🔹 Mức 1: Low-level (Mức thấp)
- **Input:** Ảnh → **Output:** Ảnh
- Thực hiện các thao tác **cơ bản, tầm thấp** trên pixel
- **Ví dụ:**
  - Denoising (lọc nhiễu)
  - Enhancement (tăng cường chất lượng)
  - Sharpening (làm sắc nét)

### 🔹 Mức 2: Mid-level (Mức trung bình)
- **Input:** Ảnh → **Output:** Đặc trưng / Cấu trúc
- Bắt đầu **trích xuất thông tin có ý nghĩa** từ ảnh
- **Ví dụ:**
  - Segmentation (phân vùng - tách vật thể)
  - Edge detection (phát hiện biên)
  - Feature extraction (trích xuất đặc trưng)

### 🔹 Mức 3: High-level (Mức cao)
- **Input:** Thông tin hình ảnh → **Output:** Hiểu biết / Quyết định
- **Suy luận ở mức trừu tượng**, giống nhận thức con người
- **Ví dụ:**
  - Object recognition (nhận dạng vật thể: "đây là con mèo")
  - Scene understanding (hiểu ngữ cảnh: "bữa tiệc sinh nhật")
  - Activity recognition (nhận diện hành vi: "người đang chạy")

### 💡 Ví dụ tổng hợp - Hệ thống camera an ninh

```
[LOW-LEVEL]
  Ảnh camera bị nhiễu, tối
      ↓ Lọc nhiễu, tăng sáng
  Ảnh sạch, rõ hơn
      ↓
[MID-LEVEL]
      ↓ Phát hiện biên, phân vùng
  Tách được các vùng "người" ra khỏi nền
      ↓
[HIGH-LEVEL]
      ↓ Nhận dạng khuôn mặt, hành vi
  "Đây là ông A, đang đi vào khu vực cấm lúc 2h sáng"
      ↓
  → Gửi cảnh báo cho bảo vệ
```

> 🎯 **Học phần này tập trung chủ yếu vào LOW và MID level.** High-level (nhận dạng, AI) sẽ được đề cập ở Chương 5 và các học phần chuyên sâu sau.

---

# 🔄 Slide 15: Pipeline tổng quát của một hệ thống Computer Vision

```
┌─────────────────────────────────┐
│ ẢNH / VIDEO / CAMERA            │  ← Dữ liệu thô từ thế giới thực
└─────────────┬───────────────────┘
              ↓
┌─────────────────────────────────┐
│ IMAGE ACQUISITION               │  ← Thu nhận ảnh (camera, sensor)
└─────────────┬───────────────────┘
              ↓
┌─────────────────────────────────┐
│ PRE-PROCESSING                  │  ← Tiền xử lý: lọc nhiễu, chuẩn hóa
└─────────────┬───────────────────┘
              ↓
┌─────────────────────────────────┐
│ REPRESENTATION / FEATURES       │  ← Biểu diễn đặc trưng (biên, màu, shape)
└─────────────┬───────────────────┘
              ↓
    ┌─────────┼─────────┐
    ↓         ↓         ↓
┌────────┐ ┌──────────┐ ┌─────────────┐
│Classif.│ │Detection │ │Segmentation │  ← 3 tác vụ chính
└────┬───┘ └────┬─────┘ └──────┬──────┘
     └──────────┼──────────────┘
                ↓
┌─────────────────────────────────┐
│ INTERPRETATION                  │  ← Diễn giải kết quả
└─────────────┬───────────────────┘
              ↓
┌─────────────────────────────────┐
│ DECISION                        │  ← Ra quyết định cuối cùng
└─────────────────────────────────┘
```

### 🎯 Mục tiêu cuối cùng
> **Biến dữ liệu hình ảnh thô thành thông tin hữu ích, phục vụ ra quyết định.**

### 💡 Ví dụ thực tế: Hệ thống đếm sản phẩm trên băng chuyền

| Giai đoạn | Mô tả |
|:---|:---|
| **Acquisition** | Camera chụp ảnh băng chuyền |
| **Pre-processing** | Lọc nhiễu, cân bằng ánh sáng |
| **Features** | Phát hiện biên, tìm vùng đối tượng |
| **Segmentation** | Tách từng sản phẩm ra khỏi nền |
| **Detection** | Đếm số lượng sản phẩm |
| **Interpretation** | "Có 15 sản phẩm, 2 sản phẩm lỗi" |
| **Decision** | "Băng chuyền chạy bình thường, loại 2 sản phẩm lỗi" |

---

# 🌐 Slide 16: Ứng dụng của Xử lý ảnh & Thị giác máy tính

### 🏥 Y tế
- **X-quang, CT, MRI:** Hỗ trợ bác sĩ phát hiện khối u, gãy xương
- **Phân tích ảnh y tế:** Đếm tế bào, phát hiện tế bào ung thư
- **Phẫu thuật nội soi:** Hỗ trợ định vị vị trí phẫu thuật

> 💡 *Ví dụ:* Hệ thống AI phát hiện ung thư phổi từ ảnh CT với độ chính xác >95%

### 🏭 Công nghiệp
- **Kiểm tra lỗi sản phẩm (Defect Detection):** Phát hiện vết xước, móp méo
- **Đếm sản phẩm tự động** trên băng chuyền
- **Đo kích thước** chi tiết máy với độ chính xác micromet

### 🚦 Giao thông
- **Nhận dạng biển số xe** (Vietnam LPR)
- **Phát hiện phương tiện** vi phạm (vượt đèn đỏ, đi sai làn)
- **Giám sát giao thông** thông minh, đếm lưu lượng xe

### 🔒 An ninh
- **Nhận dạng khuôn mặt** (Face ID, mở khóa điện thoại)
- **Theo dõi đối tượng** (tracking) trong camera an ninh
- **Phát hiện hành vi bất thường** (đánh nhau, trộm cắp)

### 🛰️ Viễn thám
- **Ảnh vệ tinh:** Theo dõi biến đổi rừng, đô thị hóa
- **Giám sát môi trường:** Phát hiện cháy rừng, tràn dầu
- **Phân tích đất đai:** Phân loại cây trồng, dự báo năng suất

### 🎮 Và nhiều lĩnh vực khác
- **Thực tế ảo / tăng cường (VR/AR)**
- **Xe tự hành (Autonomous Driving)**
- **Robot thị giác (Robot Vision)**
- **Nghệ thuật số, filter ảnh (Instagram, TikTok)**

---

# 🌈 Slide 17: Ảnh không chỉ là ánh sáng khả kiến

### 👁️ Con người
Chỉ quan sát được vùng **ánh sáng khả kiến** (visible light) - bước sóng khoảng **380nm - 750nm**

### 🤖 Máy móc
Có thể thu nhận **nhiều loại tín hiệu hơn** rất nhiều, trải dài trên toàn bộ **phổ điện từ**:

```
Năng lượng CAO ←────────────────────────────→ Năng lượng THẤP
Bước sóng NGẮN ←───────────────────────────→ Bước sóng DÀI

Gamma → X-ray → UV → [VISIBLE] → Infrared → Microwave → Radio
  │        │       │       │          │           │          │
  │        │       │       │          │           │          │
Ứng dụng:
Chụp PET   Chụp    Tiệt   Mắt       Camera      Lò vi    Radio,
y tế      X-quang  trùng  người     nhiệt,      sóng     WiFi
                  thực phẩm          nhìn đêm
```

### 📡 Ngoài phổ điện từ còn có
- **Siêu âm (Ultrasound):** Ảnh thai nhi, chẩn đoán nội tạng
- **Kính hiển vi điện tử (Electron Microscopy):** Quan sát cấu trúc nano, virus
- **Cảm biến chuyên dụng:** Cảm biến áp suất, nhiệt độ, từ trường...

### 💡 Ví dụ minh họa

| Loại ảnh | Bước sóng / Tín hiệu | Ứng dụng |
|:---|:---|:---|
| Ảnh chụp thường | Visible (khả kiến) | Chụp ảnh sinh hoạt |
| Ảnh X-quang | X-ray | Chẩn đoán gãy xương |
| Ảnh nhiệt | Infrared (hồng ngoại) | Nhìn đêm, đo thân nhiệt |
| Ảnh vệ tinh | Đa phổ (Multi-spectral) | Phân tích vegetration |
| Ảnh MRI | Sóng radio + từ trường | Chẩn đoán mô mềm |

> 🎯 **Thông điệp:** "Ảnh" trong xử lý ảnh KHÔNG chỉ là ảnh chụp bằng mắt thường. Bất kỳ dữ liệu 2D nào biểu diễn thông tin không gian đều có thể được xử lý bằng các kỹ thuật của học phần này.

---

# 📜 Slide 18: Lịch sử phát triển

### Các mốc quan trọng

| Thập kỷ | Cột mốc | Ý nghĩa |
|:---:|:---|:---|
| **1920s** | Truyền ảnh (传真) | Lần đầu tiên ảnh được truyền đi xa qua dây tín hiệu |
| **1960s** | Computer + Space Imaging | Máy tính bắt đầu xử lý ảnh từ vệ tinh, tàu vũ trụ |
| **1970s** | Medical Imaging | Ra đời CT scan (Hounsfield, 1972), mở ra kỷ nguyên ảnh y tế |
| **1980s-1990s** | Digital Image Processing | Phát triển mạnh các thuật toán toán học: morphological, frequency domain |
| **2000s** | Computer Vision | Các bài toán nhận dạng bắt đầu được giải quyết thực tế |
| **2010s** | Deep Learning | Cách mạng hóa CV với CNN, AlexNet (2012), vượt mức con người |
| **2020s** | Vision + AI + Multimodal | Kết hợp ảnh + văn bản + âm thanh (GPT-4V, Gemini...) |

### 💡 Bài học rút ra
> **Sự phát triển của xử lý ảnh gắn chặt với 3 yếu tố:**
> 1. **Cảm biến** (sensor) - thu nhận dữ liệu tốt hơn
> 2. **Máy tính** (hardware) - xử lý nhanh hơn
> 3. **Thuật toán / AI** (software) - thông minh hơn

### 🔮 Xu hướng hiện tại
- **Multimodal AI:** Mô hình hiểu được cả ảnh, văn bản, âm thanh
- **Generative AI:** Tạo ảnh từ văn bản (DALL-E, Midjourney, Stable Diffusion)
- **Edge AI:** Xử lý ảnh trực tiếp trên thiết bị (điện thoại, camera)
- **Real-time CV:** Thị giác máy tính thời gian thực cho xe tự hành, robot

---

# 🔄 PHẦN 3: TỪ THẾ GIỚI THỰC ĐẾN ẢNH SỐ

---

# 👁️ Slide 19: Thị giác con người

### Cấu tạo mắt người - Hệ thống thu nhận quang học phức tạp

```
        ┌─────────────────────────────────┐
Ánh sáng│  Cornea (Giác mạc)              │ → Hội tụ sơ bộ
  ↓     │  Iris (Mống mắt)                │ → Điều chỉnh lượng ánh sáng
        │  Lens (Thủy tinh thể)           │ → Hội tụ chính xác
        │  Retina (Võng mạc)              │ → Thu nhận ảnh
        │    ├── Rods (Tế bào que)        │ → Nhạy sáng, nhìn đêm
        │    └── Cones (Tế bào nón)       │ → Nhận biết màu sắc
        └─────────────────────────────────┘
                    ↓
              Dây thần kinh thị giác
                    ↓
                  Não bộ
```

### Các thành phần chính và chức năng

| Bộ phận | Tên tiếng Việt | Chức năng |
|:---|:---|:---|
| **Cornea** | Giác mạc | Lớp trong suốt bên ngoài, bảo vệ và hội tụ sơ bộ ánh sáng |
| **Iris** | Mống mắt | Điều chỉnh kích thước đồng tử, kiểm soát lượng ánh sáng vào |
| **Lens** | Thủy tinh thể | Hội tụ ánh sáng lên võng mạc, điều tiết tiêu cự |
| **Retina** | Võng mạc | Chứa các tế bào cảm quang, chuyển ánh sáng thành tín hiệu thần kinh |
| **Rods** | Tế bào hình que | ~120 triệu, nhạy sáng, giúp nhìn trong điều kiện tối |
| **Cones** | Tế bào hình nón | ~6 triệu, nhận biết màu sắc (đỏ, lục, lam), nhìn chi tiết |

### 🎯 Ý nghĩa đối với Computer Vision
Nghiên cứu thị giác người giúp chúng ta hiểu về:
- **Ánh sáng** - cách mắt cảm nhận cường độ
- **Độ sáng** - cảm nhận chủ quan, không tuyến tính
- **Độ tương phản** - khả năng phân biệt các vùng sáng/tối
- **Màu sắc** - cách mắt phối hợp 3 loại tế bào nón
- **Nhận thức thị giác** - não bộ "diễn giải" thông tin như thế nào

> 💡 **Ví dụ:** Các thuật toán **Histogram Equalization** (cân bằng giản đồ) được lấy cảm hứng từ cách mắt người tự điều chỉnh để nhìn rõ trong điều kiện thiếu sáng.

---

# 💡 Slide 20: Ánh sáng và độ sáng

### ❗ Nhận thức của mắt người KHÔNG đơn giản
> **"Giá trị pixel lớn → luôn cảm thấy sáng hơn"** là **SAI**

Thực tế, cảm nhận độ sáng của mắt người **phụ thuộc vào nhiều yếu tố**:
1. **Cường độ ánh sáng** tuyệt đối
2. **Nền xung quanh** (bối cảnh)
3. **Độ tương phản** tương đối
4. **Điều kiện quan sát** (môi trường, thời gian thích nghi)

### 💡 Ví dụ minh họa - Hiện tượng tương phản đồng thời

Hãy tưởng tượng **CÙNG MỘT màu xám** (giá trị = 128):

```
Trường hợp 1: Đặt trên nền ĐEN
┌───────────────────────┐
│ █████████████████████ │  ← Nền đen (0)
│ ████┌───────┐████     │
│ ████│  128  │████     │  ← Hình vuông xám 128
│ ████└───────┘████     │
│ █████████████████████ │
└───────────────────────┘
→ Cảm nhận: Xám này có vẻ SÁNG

Trường hợp 2: Đặt trên nền TRẮNG
┌───────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░ │  ← Nền trắng (255)
│ ░░░░┌───────┐░░░░     │
│ ░░░░│  128  │░░░░     │  ← Cùng hình vuông xám 128
│ ░░░░└───────┘░░░░     │
│ ░░░░░░░░░░░░░░░░░░░░░ │
└───────────────────────┘
→ Cảm nhận: Xám này có vẻ TỐI
```

**Cùng một giá trị pixel (128), nhưng mắt người cảm nhận khác nhau!**

### 🎯 Ý nghĩa trong xử lý ảnh
- Các thuật toán xử lý ảnh phải **tính đến yếu tố ngữ cảnh**
- Không thể chỉ dựa vào giá trị pixel tuyệt đối
- Đây là lý do các kỹ thuật như **Adaptive Thresholding** (ngưỡng thích nghi) ra đời

> 📌 **Hiện tượng này gọi là "Simultaneous Contrast" (Tương phản đồng thời)** - một trong những ảo giác thị giác kinh điển, được nghiên cứu từ thế kỷ 19.

---

# 🌊 Slide 21: Phổ điện từ

### Sóng điện từ được mô tả bởi 2 công thức cơ bản

**Công thức 1: Quan hệ giữa tốc độ, bước sóng và tần số**
$$c = \lambda \cdot \nu$$

Trong đó:
- $c$: tốc độ ánh sáng ($\approx 3 \times 10^8$ m/s)
- $\lambda$ (lambda): **bước sóng** (mét)
- $\nu$ (nu): **tần số** (Hz)

**Công thức 2: Năng lượng photon**
$$E = h \cdot \nu$$

Trong đó:
- $E$: năng lượng photon (Joule)
- $h$: hằng số Planck ($\approx 6.626 \times 10^{-34}$ J·s)
- $\nu$: tần số

### 💡 Hệ quả quan trọng
> **Tần số càng CAO → Bước sóng càng NGẮN → Năng lượng càng LỚN**

### 🌈 Ánh sáng khả kiến - chỉ là một phần rất nhỏ

```
Gamma │ X-ray │  UV  │  VISIBLE  │  IR   │ Micro │ Radio
 <0.01nm  0.01-10nm 10-400nm │ 380-750nm │ 750nm-1mm │ ...
      Năng lượng CAO ←─────────────────────→ Năng lượng THẤP
```

**Ánh sáng khả kiến** chỉ nằm trong khoảng hẹp **380nm - 750nm**:
- **Tím (380-450nm)** - năng lượng cao nhất trong vùng khả kiến
- **Đỏ (620-750nm)** - năng lượng thấp nhất trong vùng khả kiến

### 🎯 Ý nghĩa trong xử lý ảnh
- Camera thông thường chỉ thu nhận được **ánh sáng khả kiến**
- Các loại camera đặc biệt có thể thu nhận **hồng ngoại, tử ngoại, tia X**
- Lựa chọn dải phổ phù hợp tùy theo **ứng dụng** (y tế, an ninh, viễn thám...)

---

# 📷 Slide 22: Thu nhận ảnh

### Mô hình hình thành ảnh - Từ nguồn sáng đến ảnh số

```
┌─────────────────────────┐
│ 1. NGUỒN NĂNG LƯỢNG     │  ← Mặt trời, đèn, tia X...
└───────────┬─────────────┘
            ↓ Chiếu sáng
┌─────────────────────────┐
│ 2. VẬT THỂ              │  ← Phản xạ / Hấp thụ / Truyền qua
└───────────┬─────────────┘
            ↓ Ánh sáng mang thông tin vật thể
┌─────────────────────────┐
│ 3. CẢM BIẾN (Sensor)    │  ← CCD, CMOS, film...
└───────────┬─────────────┘
            ↓ Tín hiệu tương tự (analog)
┌─────────────────────────┐
│ 4. SỐ HÓA (Digitizer)   │  ← ADC (Analog-to-Digital Converter)
└───────────┬─────────────┘
            ↓ Dữ liệu số
┌─────────────────────────┐
│ 5. ẢNH SỐ               │  ← Ma trận các pixel
└─────────────────────────┘
```

### 💡 Ví dụ minh họa - Quy trình chụp ảnh bằng điện thoại

| Bước | Mô tả | Thiết bị |
|:---:|:---|:---|
| 1 | Ánh sáng mặt trời chiếu vào cảnh vật | Mặt trời |
| 2 | Vật thể phản xạ ánh sáng theo đặc tính riêng | Cảnh vật |
| 3 | Ánh sáng đi qua ống kính vào cảm biến | Ống kính + CMOS sensor |
| 4 | Tín hiệu điện được chuyển thành số | ADC trong chip xử lý ảnh |
| 5 | File ảnh JPEG được lưu vào bộ nhớ | Điện thoại |

### 🎯 Các yếu tố ảnh hưởng đến chất lượng ảnh thu nhận
- **Chất lượng nguồn sáng** (tự nhiên, nhân tạo, cường độ)
- **Đặc tính vật thể** (màu sắc, bề mặt, hình dáng)
- **Chất lượng cảm biến** (độ phân giải, kích thước pixel, dynamic range)
- **Điều kiện môi trường** (sương mù, mưa, bụi)

---

# 🔬 Slide 23: Cảm biến ảnh - 3 mô hình cơ bản

### 🔹 Mô hình 1: Single sensor (Cảm biến đơn)
- **Cấu tạo:** Chỉ **1 cảm biến duy nhất**
- **Cách hoạt động:** Cảm biến di chuyển để **quét** từng điểm ảnh
- **Ví dụ:** Máy quét (scanner) phẳng, máy fax cũ

```
  Cảm biến ● ──→ di chuyển
              ┌─────────────┐
              │ ███████████ │  ← Vật thể / tài liệu
              └─────────────┘
```

### 🔹 Mô hình 2: Sensor strip (Dải cảm biến)
- **Cấu tạo:** Một **dải** gồm nhiều cảm biến xếp thành hàng
- **Cách hoạt động:** Dải cảm biến quét theo **một chiều**, vật thể di chuyển theo chiều còn lại
- **Ví dụ:** Máy scan cuốn, máy photocopy

```
        ┌──────────┐
        │ ●●●●●●●● │  ← Dải cảm biến (1 hàng)
        └──────────┘
              ↓ quét
        ┌─────────────┐
        │ ███████████ │  ← Vật thể di chuyển
        └─────────────┘
```

### 🔹 Mô hình 3: Sensor array (Mảng cảm biến 2D)
- **Cấu tạo:** **Mảng 2 chiều** gồm hàng triệu cảm biến
- **Cách hoạt động:** Thu nhận **toàn bộ ảnh trong MỘT lần chụp**
- **Ví dụ:** Camera điện thoại, máy ảnh số (CCD, CMOS)

```
        ┌──────────────────┐
        │ ●●●●●●●●●●●●●●● │
        │ ●●●●●●●●●●●●●●● │  ← Mảng 2D
        │ ●●●●●●●●●●●●●●● │     (ví dụ: 4000×3000 pixel)
        │ ●●●●●●●●●●●●●●● │
        └──────────────────┘
              ↓
         Chụp 1 lần → có ảnh ngay
```

### 🎯 So sánh 3 mô hình

| Mô hình | Tốc độ | Chất lượng | Ứng dụng |
|:---|:---:|:---:|:---|
| Single sensor | Chậm nhất | Cao | Scanner, fax |
| Sensor strip | Trung bình | Cao | Máy scan cuốn |
| Sensor array | Nhanh nhất | Phụ thuộc | Camera, điện thoại |

> 💡 **Hầu hết các thiết bị hiện đại ngày nay đều dùng Sensor array (CCD/CMOS)** vì tốc độ nhanh, giá thành rẻ, chất lượng ngày càng cao.

---

# 🎨 Slide 24: Mô hình hình thành ảnh

### Công thức cơ bản
Một bức ảnh được hình thành từ **2 thành phần nhân với nhau**:

$$f(x,y) = i(x,y) \times r(x,y)$$

Trong đó:
- $i(x,y)$ - **Illumination (Chiếu sáng):** Lượng ánh sáng chiếu tới cảnh vật
  - Giá trị: $0 < i(x,y) < \infty$
  - Phụ thuộc vào **nguồn sáng** (mặt trời, đèn...)
- $r(x,y)$ - **Reflectance (Phản xạ):** Đặc tính bề mặt vật thể
  - Giá trị: $0 < r(x,y) < 1$
  - Phụ thuộc vào **vật lý của vật thể** (màu sắc, chất liệu)

### 💡 Ví dụ minh họa

**Tình huống:** Chụp một tờ giấy trắng và một tờ giấy đen trong cùng điều kiện ánh sáng

| Vật thể | $r(x,y)$ (Phản xạ) | $i(x,y)$ (Chiếu sáng) | $f(x,y)$ (Kết quả) |
|:---|:---:|:---:|:---:|
| Giấy trắng | 0.9 (phản xạ mạnh) | 100 | 90 (sáng) |
| Giấy đen | 0.1 (hấp thụ mạnh) | 100 | 10 (tối) |

**Tình huống 2:** Cùng tờ giấy trắng nhưng ở 2 điều kiện sáng khác nhau

| Điều kiện | $r(x,y)$ | $i(x,y)$ | $f(x,y)$ |
|:---|:---:|:---:|:---:|
| Ngoài nắng | 0.9 | 200 | 180 (rất sáng) |
| Trong phòng tối | 0.9 | 30 | 27 (tối) |

### 🎯 Ý nghĩa quan trọng
> **Độ sáng quan sát được = Nguồn sáng × Đặc tính vật thể**

- Một vật **TRẮNG** trong bóng tối vẫn cho ảnh **TỐI**
- Một vật **ĐEN** dưới ánh mạnh vẫn có thể cho ảnh **SÁNG**

### ⚠️ Thách thức cho Computer Vision
Hệ thống CV phải **phân biệt được** đâu là do chiếu sáng, đâu là do đặc tính vật thể. Nếu không, sẽ dễ nhận diện sai:
- Nhầm tờ giấy trắng trong bóng tối với tờ giấy đen ngoài nắng
- Nhầm khuôn mặt trong bóng râm với khuôn mặt khác

> 💡 Đây là lý do các kỹ thuật **Illumination Normalization** (chuẩn hóa ánh sáng) rất quan trọng trong nhận dạng khuôn mặt.

---

# ☀️ Slide 25: Ví dụ - Chiếu sáng và phản xạ

### Minh họa quy trình hình thành ảnh

```
        ☀️ Nguồn sáng
            ↓
      ┌───────────┐
      │  Vật thể  │  ← Phản xạ một phần, hấp thụ một phần
      └───────────┘
            ↓
       Ánh sáng phản xạ
       (mang thông tin vật thể)
            ↓
         📷 Camera
            ↓
         Ảnh số
```

### 💡 Ví dụ thực tế 1: Chụp ảnh chân dung

**Trường hợp A: Chụp ngoài trời nắng**
- Nguồn sáng mạnh: $i(x,y)$ cao
- Da người phản xạ trung bình: $r(x,y) \approx 0.5$
- Kết quả: $f(x,y)$ cao → ảnh sáng, có thể **cháy sáng** (overexposed)

**Trường hợp B: Chụp trong phòng thiếu sáng**
- Nguồn sáng yếu: $i(x,y)$ thấp
- Cùng da người: $r(x,y) \approx 0.5$
- Kết quả: $f(x,y)$ thấp → ảnh tối, **thiếu sáng** (underexposed)

### 💡 Ví dụ thực tế 2: Nhận dạng biển số xe

**Vấn đề:** Cùng một biển số xe, nhưng:
- Buổi trưa nắng: ảnh rất sáng, có thể lóa
- Buổi tối có đèn pha: ảnh bị lóa cục bộ
- Trời mưa: ảnh tối, tương phản thấp

→ **Hệ thống nhận dạng phải hoạt động được trong MỌI điều kiện ánh sáng!**

### 🎯 Giải pháp trong xử lý ảnh
1. **Histogram Equalization** - cân bằng ánh sáng
2. **Adaptive Thresholding** - ngưỡng thích nghi theo vùng
3. **Illumination normalization** - chuẩn hóa ánh sáng
4. **HDR imaging** - chụp nhiều ảnh với các mức phơi sáng khác nhau

> 📌 **Kết luận:** Một hệ thống Computer Vision thực tế **PHẢI** quan tâm đến điều kiện ánh sáng. Đây là một trong những thách thức lớn nhất của lĩnh vực này.

---

# 🔢 Slide 26: Từ ảnh liên tục đến ảnh số

### Ảnh thực tế là tín hiệu LIÊN TỤC
- Tọa độ $(x, y)$: liên tục trong không gian
- Cường độ $f(x,y)$: liên tục về giá trị

### Máy tính chỉ xử lý được tín hiệu RỜI RẠC
→ Cần **SỐ HÓA** (Digitization) qua 2 bước:

```
┌─────────────────┐
│  ẢNH LIÊN TỤC   │  ← f(x,y) liên tục cả về (x,y) và giá trị
│  (Continuous)   │
└────────┬────────┘
         │
         ├───► SAMPLING (Lấy mẫu)      → Số hóa TỌA ĐỘ
         │                              (x, y rời rạc)
         │
         └───► QUANTIZATION (Lượng tử) → Số hóa CƯỜNG ĐỘ
                                        (f(x,y) rời rạc)
         │
         ↓
┌─────────────────┐
│    ẢNH SỐ       │  ← f(x,y) rời rạc cả về (x,y) và giá trị
│  (Digital)      │
└─────────────────┘
```

### 💡 Ví dụ minh họa - Chuyển ảnh vẽ tay sang ảnh số

**Bước 1: Ảnh liên tục**
- Một bức vẽ trên giấy, nét bút mượt mà
- Tọa độ và cường độ đều liên tục

**Bước 2: Sampling**
- Chia tờ giấy thành lưới ô vuông (ví dụ: 100×100 ô)
- Mỗi ô sẽ trở thành 1 pixel
- **Kết quả:** Ảnh có 10.000 pixel, nhưng giá trị vẫn liên tục

**Bước 3: Quantization**
- Làm tròn giá trị mỗi ô về các mức rời rạc (ví dụ: 256 mức xám)
- **Kết quả:** Ảnh số hoàn chỉnh, mỗi pixel có giá trị nguyên từ 0-255

### 🎯 Ghi nhớ quan trọng
| Quá trình | Số hóa cái gì? | Quyết định cái gì? |
|:---|:---|:---|
| **Sampling** | Tọa độ không gian $(x,y)$ | Độ phân giải không gian |
| **Quantization** | Cường độ $f(x,y)$ | Độ phân giải mức xám |

---

# 📍 Slide 27: Sampling (Lấy mẫu)

### Định nghĩa
**Sampling** là quá trình **số hóa tọa độ không gian** - chia ảnh liên tục thành một lưới các điểm rời rạc.

### Sampling quyết định
> **Độ phân giải không gian (Spatial Resolution)** của ảnh

### 💡 Minh họa trực quan

**Sampling CAO (nhiều điểm mẫu):**
```
● ● ● ● ● ● ● ●
● ● ● ● ● ● ● ●
● ● ● ● ● ● ● ●
● ● ● ● ● ● ● ●
● ● ● ● ● ● ● ●
```
→ Ảnh **mịn, rõ nét**, giữ được nhiều chi tiết

**Sampling THẤP (ít điểm mẫu):**
```
●       ●       ●
                        
●       ●       ●
                        
●       ●       ●
```
→ Ảnh **thô, răng cưa**, mất nhiều chi tiết

### 💡 Ví dụ thực tế

| Độ phân giải | Số pixel | Chất lượng | Ứng dụng |
|:---|:---:|:---|:---|
| 640×480 | ~300K | Thấp | Camera cũ, video call |
| 1920×1080 (Full HD) | ~2M | Trung bình | TV, màn hình |
| 3840×2160 (4K) | ~8M | Cao | TV cao cấp, nhiếp ảnh |
| 8192×4320 (8K) | ~33M | Rất cao | Chuyên nghiệp |

### ⚠️ Hiện tượng Moire và Aliasing
Khi sampling quá thấp, xuất hiện các **hiệu ứng giả**:
- **Răng cưa (Jagged edge):** Đường chéo bị vỡ thành bậc thang
- **Moire pattern:** Vân sọc giả khi chụp vải, lưới

### 🎯 Nguyên tắc Nyquist
> Để không mất thông tin, **tần số lấy mẫu phải ≥ 2 lần tần số cao nhất** của tín hiệu.

Trong ảnh: Nếu ảnh có chi tiết nhỏ nhất là 2 pixel, thì cần ít nhất 4 pixel để lấy mẫu đúng.

> 💡 **Khi các em zoom vào một bức ảnh và thấy các ô vuông** - đó chính là các pixel. Ảnh có **sampling càng cao** (nhiều pixel) thì khi zoom càng **ít thấy răng cưa**.

---

# 📊 Slide 28: Quantization (Lượng tử hóa)

### Định nghĩa
**Quantization** là quá trình **số hóa biên độ cường độ** - làm tròn giá trị liên tục về các mức rời rạc.

### Quantization quyết định
> **Độ phân giải mức xám (Intensity Resolution)** của ảnh

### 💡 Minh họa trực quan

**Quantization CAO (nhiều mức xám):**
```
0   20   40   60   80  100  ...  255
│    │    │    │    │    │         │
└────┴────┴────┴────┴────┴─────────┘
     256 mức xám (8-bit)
```
→ Ảnh **mượt**, chuyển màu **tinh tế**

**Quantization THẤP (ít mức xám):**
```
0        85        170        255
│         │          │          │
└─────────┴──────────┴──────────┘
     4 mức xám (2-bit)
```
→ Ảnh **thô**, xuất hiện **các đường gợn sóng giả**

### ⚠️ Hiện tượng False Contouring
Khi quantization quá thấp, các vùng đáng lẽ chuyển màu mượt sẽ xuất hiện **các đường viền giả** (giống đường đồng mức trên bản đồ địa hình).

**Ví dụ:** Chụp bầu trời chuyển màu từ xanh đậm sang xanh nhạt
- 256 mức xám: Bầu trời mượt mà, tự nhiên
- 4 mức xám: Xuất hiện 3-4 "vệt" màu rõ rệt, trông rất giả

### 💡 Ví dụ thực tế - So sánh ảnh

| Số bit | Số mức xám | Chất lượng | Kích thước file |
|:---:|:---:|:---|:---|
| 1-bit | 2 | Đen trắng (binary) | Rất nhỏ |
| 2-bit | 4 | Rất thô, false contouring | Nhỏ |
| 4-bit | 16 | Chấp nhận được | Trung bình |
| **8-bit** | **256** | **Đủ tốt cho hầu hết ứng dụng** | **Phổ biến** |
| 16-bit | 65,536 | Rất mịn (y tế, khoa học) | Lớn |

> 🎯 **Kết luận:** 8-bit (256 mức xám) là **tiêu chuẩn vàng** cho ảnh mức xám thông thường, cân bằng giữa chất lượng và dung lượng.

---

# 📋 Slide 29: Sampling vs Quantization - So sánh

### Bảng so sánh chi tiết

| Tiêu chí | Sampling (Lấy mẫu) | Quantization (Lượng tử hóa) |
|:---|:---|:---|
| **Số hóa cái gì?** | Tọa độ không gian $(x,y)$ | Cường độ $f(x,y)$ |
| **Ảnh hưởng đến** | Spatial Resolution (độ phân giải không gian) | Intensity Resolution (độ phân giải mức xám) |
| **Quá thấp thì sao?** | Mất chi tiết không gian, răng cưa | Mất chi tiết mức xám, false contouring |
| **Liên quan đến** | Số lượng pixel (kích thước ảnh) | Số mức xám (độ sâu bit) |
| **Đơn vị** | Pixel (ví dụ: 1920×1080) | Bit (ví dụ: 8-bit = 256 mức) |

### 💡 Ví dụ minh họa phân biệt

**Ảnh gốc:** Bức chân dung 1000×1000 pixel, 8-bit

**Thí nghiệm 1: Giảm Sampling** (giữ nguyên 8-bit)
- Từ 1000×1000 → 100×100 pixel
- **Kết quả:** Ảnh vẫn có đủ 256 mức xám, nhưng **bị vỡ hạt**, không thấy chi tiết mắt, mũi

**Thí nghiệm 2: Giảm Quantization** (giữ nguyên 1000×1000)
- Từ 8-bit (256 mức) → 2-bit (4 mức)
- **Kết quả:** Ảnh vẫn đủ 1 triệu pixel, nhưng da mặt xuất hiện **các vệt màu giả**, chuyển màu không mượt

### 🎯 Mẹo ghi nhớ

| Câu hỏi | Câu trả lời |
|:---|:---|
| Sampling trả lời câu hỏi gì? | **"Ở ĐÂU?"** (Where?) - Vị trí các điểm mẫu |
| Quantization trả lời câu hỏi gì? | **"BAO NHIÊU?"** (How much?) - Giá trị cường độ |

### 💡 Ví dụ đời thường
Hãy tưởng tượng các em đang vẽ bản đồ địa hình:
- **Sampling** = Các em chọn bao nhiêu điểm đo độ cao (ít điểm → bản đồ thô)
- **Quantization** = Các em làm tròn độ cao đến mét hay đến 100m (làm tròn nhiều → đường đồng mức thưa)

---

# 📏 Slide 30: Độ phân giải

### 🔹 Spatial Resolution (Độ phân giải không gian)
**Định nghĩa:** Khả năng biểu diễn **chi tiết không gian** của ảnh

**Liên quan đến:**
- Kích thước ảnh (số pixel theo ngang × dọc)
- Mật độ pixel (PPI - Pixels Per Inch)
- Kích thước vật lý của pixel

### 💡 Ví dụ minh họa Spatial Resolution

| Ảnh | Kích thước | Spatial Resolution | Chất lượng |
|:---|:---:|:---:|:---|
| Thumbnail | 100×100 | Thấp | Thấy được nội dung tổng quát |
| Ảnh web | 800×600 | Trung bình | Xem rõ trên màn hình |
| Ảnh in A4 | 3000×2400 | Cao | In rõ nét ở kích thước lớn |
| Ảnh billboard | 10000×8000 | Rất cao | Phóng to không vỡ |

### 🔹 Intensity Resolution (Độ phân giải mức xám)
**Định nghĩa:** Khả năng **phân biệt các mức cường độ** khác nhau

**Liên quan đến:**
- Số bit dùng để biểu diễn mỗi pixel
- Số mức xám có thể có

### 💡 Ví dụ - Ảnh 8-bit
$$L = 2^8 = 256 \text{ mức xám}$$

- Mức 0: đen tuyệt đối
- Mức 128: xám trung bình
- Mức 255: trắng tuyệt đối

### 🔍 So sánh 2 loại độ phân giải

| | Spatial Resolution | Intensity Resolution |
|:---|:---|:---|
| **Đo cái gì?** | Chi tiết không gian | Chi tiết cường độ |
| **Đơn vị** | Pixel, PPI | Bit, số mức xám |
| **Quá thấp** | Ảnh vỡ hạt, răng cưa | Ảnh bị false contouring |
| **Ví dụ** | 4K vs Full HD | 8-bit vs 16-bit |

### 🎯 Ứng dụng thực tế
- **Ảnh y tế (CT, MRI):** Cần intensity resolution cao (16-bit) để phân biệt các mô mềm
- **Ảnh vệ tinh:** Cần spatial resolution cao để thấy chi tiết nhỏ trên mặt đất
- **Ảnh chụp thông thường:** 8-bit + Full HD là đủ

---

# 🔢 Slide 31: Bits và mức xám

### Công thức cơ bản
Nếu sử dụng $k$ bit cho mỗi pixel, số mức xám có thể biểu diễn là:

$$L = 2^k$$

### Bảng quy đổi chi tiết

| Số bit ($k$) | Số mức xám ($L = 2^k$) | Tên gọi | Ứng dụng |
|:---:|:---:|:---|:---|
| 1 | 2 | Binary (nhị phân) | Văn bản, chữ ký, barcode |
| 2 | 4 | Rất thấp | Ảnh thumbnail, icon đơn giản |
| 4 | 16 | Thấp | Ảnh GIF cũ, game 8-bit |
| **8** | **256** | **Tiêu chuẩn** | **Ảnh xám thông thường, JPEG** |
| 10 | 1,024 | Cao | Ảnh RAW cao cấp |
| 12 | 4,096 | Rất cao | Camera chuyên nghiệp |
| 16 | 65,536 | Cực cao | Ảnh y tế (DICOM), khoa học |
| 24 | 16,777,216 | True Color | Ảnh màu RGB (8 bit/kênh) |

### 💡 Ví dụ minh họa

**Ví dụ 1: Ảnh 1-bit (đen trắng)**
```
0 0 0 1 1 1 0 0
0 0 1 1 1 1 1 0
0 1 1 0 0 0 1 1
```
→ Chỉ có 2 giá trị: đen (0) và trắng (1)
→ Thích hợp cho: quét chữ, mã vạch

**Ví dụ 2: Ảnh 8-bit (mức xám tiêu chuẩn)**
```
  0  32  64  96 128 160 192 224 255
  │   │   │   │   │   │   │   │   │
  └───┴───┴───┴───┴───┴───┴───┴───┘
         256 mức, chuyển màu mượt
```

### 🎯 Ghi nhớ quan trọng
> **8-bit là tiêu chuẩn vàng** cho ảnh xám thông thường vì:
> - 256 mức đủ để mắt người không phân biệt được sự khác biệt
> - Dung lượng file hợp lý (1 byte/pixel)
> - Được hỗ trợ bởi hầu hết các phần mềm, thiết bị

> 💡 **Fun fact:** Mắt người chỉ phân biệt được khoảng **30-50 mức xám** trong điều kiện bình thường. Vì vậy, 8-bit (256 mức) là **dư thừa** cho hầu hết ứng dụng thông thường!

---

# 🔍 Slide 32: Nội suy ảnh (Interpolation)

### Định nghĩa
**Interpolation (Nội suy)** là kỹ thuật **ước lượng giá trị pixel** tại các vị trí mới khi:
- Thay đổi kích thước ảnh (phóng to, thu nhỏ)
- Biến đổi hình học (xoay, bóp méo)
- Ánh xạ ảnh từ hệ tọa độ này sang hệ tọa độ khác

### 3 phương pháp nội suy phổ biến

### 🔹 1. Nearest Neighbor (Láng giềng gần nhất)
- **Cách hoạt động:** Lấy giá trị của pixel **gần nhất**
- **Ưu điểm:** Nhanh, đơn giản
- **Nhược điểm:** Ảnh bị **răng cưa**

```
Ảnh gốc 2×2          Phóng to 4×4
┌──┬──┐              ┌──┬──┬──┬──┐
│ A│ B│              │ A│ A│ B│ B│
├──┼──┤    →         │ A│ A│ B│ B│
│ C│ D│              │ C│ C│ D│ D│
└──┴──┘              │ C│ C│ D│ D│
                     └──┴──┴──┴──┘
```

### 🔹 2. Bilinear (Tuyến tính kép)
- **Cách hoạt động:** Nội suy theo **hàng ngang** rồi **hàng dọc**, dùng trọng số khoảng cách
- **Ưu điểm:** Ảnh **mượt hơn** nearest neighbor
- **Nhược điểm:** Vẫn có thể hơi mờ

### 🔹 3. Bicubic (Bậc ba)
- **Cách hoạt động:** Xét **16 pixel lân cận** (4×4), dùng hàm bậc 3
- **Ưu điểm:** Ảnh **mượt nhất**, giữ chi tiết tốt
- **Nhược điểm:** Chậm hơn, tính toán phức tạp hơn

### 💡 So sánh 3 phương pháp

| Phương pháp | Tốc độ | Chất lượng | Ứng dụng |
|:---|:---:|:---:|:---|
| Nearest Neighbor | Nhanh nhất | Thấp (răng cưa) | Pixel art, ảnh binary |
| Bilinear | Trung bình | Khá | Ảnh thông thường, real-time |
| Bicubic | Chậm nhất | Cao | In ấn, nhiếp ảnh |

### 💡 Ví dụ thực tế
Khi các em **zoom vào một bức ảnh** trên điện thoại:
- Zoom nhanh: Thường dùng **Nearest Neighbor** (nhanh nhưng răng cưa)
- Zoom chậm / chất lượng cao: Dùng **Bicubic** (mượt mà hơn)

> 🎯 **Trong OpenCV:**
> ```python
> cv2.resize(img, new_size, interpolation=cv2.INTER_LINEAR)   # Bilinear
> cv2.resize(img, new_size, interpolation=cv2.INTER_CUBIC)    # Bicubic
> cv2.resize(img, new_size, interpolation=cv2.INTER_NEAREST)  # Nearest
> ```

---

# 🧩 PHẦN 4: BIỂU DIỄN VÀ CÁC QUAN HỆ TRONG ẢNH

---

# 🔢 Slide 33: Ảnh như một ma trận

### Biểu diễn toán học
Một ảnh xám kích thước $M \times N$ có thể biểu diễn bằng ma trận:

$$I \in \mathbb{R}^{M \times N}$$

### 💡 Ví dụ cụ thể - Ảnh xám 3×4

```
        x →
      0   1   2   3
    ┌───┬───┬───┬───┐
y 0 │ 12│ 30│ 45│ 70│
↓   ├───┼───┼───┼───┤
  1 │ 18│ 42│ 80│100│
    ├───┼───┼───┼───┤
  2 │ 25│ 60│110│150│
    └───┴───┴───┴───┘
```

**Cách đọc:**
- Pixel tại $(x=0, y=0)$ có giá trị **12** (rất tối)
- Pixel tại $(x=3, y=2)$ có giá trị **150** (khá sáng)
- Pixel tại $(x=2, y=1)$ có giá trị **80** (xám trung bình)

### 🎯 Tại sao biểu diễn ma trận lại quan trọng?

1. **Phù hợp với Python/NumPy:**
   ```python
   import numpy as np
   image = np.array([[12, 30, 45, 70],
                     [18, 42, 80,100],
                     [25, 60,110,150]])
   ```

2. **Áp dụng được đại số tuyến tính:**
   - Cộng, trừ, nhân ma trận
   - Biến đổi tuyến tính
   - Tích chập (convolution)

3. **Tối ưu tính toán:**
   - Các phép toán vectorized (toàn ma trận) nhanh hơn vòng lặp
   - Tận dụng được GPU để tăng tốc

### 💡 Ví dụ - Truy cập pixel trong Python
```python
# Đọc giá trị pixel tại (x=2, y=1)
value = image[1, 2]  # = 80

# Thay đổi giá trị pixel
image[1, 2] = 200  # Pixel (2,1) giờ sáng hơn

# Truy cập một vùng (ROI)
roi = image[0:2, 1:3]  # Lấy vùng 2×2 từ góc trên-phải
```

> 📌 **Ghi nhớ:** Toàn bộ xử lý ảnh trong Python thực chất là **thao tác trên ma trận NumPy**. Hiểu ma trận = hiểu xử lý ảnh!

---

# 👥 Slide 34: Láng giềng của pixel

### Định nghĩa
Một pixel $p$ tại tọa độ $(x, y)$ có các **pixel láng giềng** (neighbors) xung quanh.

### 🔹 4-láng giềng ($N_4$)
Gồm 4 pixel nằm **trên, dưới, trái, phải** (tạo thành dấu ➕):

$$N_4(p) = \{(x-1,y), (x+1,y), (x,y-1), (x,y+1)\}$$

```
      ┌───┐
      │ • │  ← (x, y-1) - trên
  ┌───┼───┼───┐
  │ • │ p │ • │  ← (x-1,y), (x+1,y) - trái, phải
  └───┼───┼───┘
      │ • │  ← (x, y+1) - dưới
      └───┘
```

### 🔹 Láng giềng chéo ($N_D$)
Gồm 4 pixel ở **4 góc chéo**:

$$N_D(p) = \{(x-1,y-1), (x-1,y+1), (x+1,y-1), (x+1,y+1)\}$$

```
  ┌───┐   ┌───┐
  │ • │   │ • │  ← 4 pixel chéo
  └───┘   └───┘
      ┌───┐
      │ p │
      └───┘
  ┌───┐   ┌───┐
  │ • │   │ • │
  └───┘   └───┘
```

### 🔹 8-láng giềng ($N_8$)
Kết hợp của 4-láng giềng và láng giềng chéo:

$$N_8(p) = N_4(p) \cup N_D(p)$$

```
  ┌───┬───┬───┐
  │ • │ • │ • │
  ├───┼───┼───┤
  │ • │ p │ • │  ← 8 pixel xung quanh
  ├───┼───┼───┤
  │ • │ • │ • │
  └───┴───┴───┘
```

### 💡 Ví dụ thực tế

**Ví dụ 1: Pixel ở giữa ảnh**
- Pixel $(5, 5)$ có đầy đủ 4-láng giềng và 8-láng giềng

**Ví dụ 2: Pixel ở góc ảnh**
- Pixel $(0, 0)$ (góc trên-trái) chỉ có:
  - 2 láng giềng trong $N_4$: $(1,0)$ và $(0,1)$
  - 1 láng giềng chéo: $(1,1)$
  - → Chỉ có 3 láng giềng (thay vì 4 hoặc 8)

### 🎯 Ứng dụng của khái niệm láng giềng
- **Lọc ảnh (Filtering):** Dùng các pixel láng giềng để tính giá trị mới
- **Phát hiện biên:** So sánh pixel với láng giềng
- **Phân vùng (Segmentation):** Xác định các pixel "thuộc cùng một vật thể"

---

# 🔗 Slide 35: Tính kề và liên thông

### Định nghĩa - Các loại liên thông (Connectivity)

Hai pixel $p$ và $q$ có giá trị thuộc tập $V$ (ví dụ: $V = \{1\}$ cho ảnh nhị phân) được gọi là:

### 🔹 4-liên thông (4-connectivity)
$q \in N_4(p)$ và cả $p, q$ đều có giá trị thuộc $V$

### 🔹 8-liên thông (8-connectivity)
$q \in N_8(p)$ và cả $p, q$ đều có giá trị thuộc $V$

### 🔹 m-liên thông (mixed connectivity)
$q \in N_8(p)$ và **không tồn tại** pixel $s \in N_4(p) \cap N_4(q)$ có giá trị thuộc $V$

> 💡 m-liên thông là cách "thông minh" để tránh **tính mơ hồ** (ambiguity) khi dùng 8-liên thông.

### 💡 Ví dụ minh họa - Tại sao cần m-liên thông?

**Xét ảnh nhị phân sau (1 = trắng, 0 = đen):**

```
Sử dụng 8-liên thông:
┌───┬───┬───┐
│ 0 │ 1 │ 0 │
├───┼───┼───┤
│ 1 │ 0 │ 1 │  ← 2 pixel 1 ở 2 góc chéo có "liên thông"
├───┼───┼───┤     → Nhưng điều này tạo ra "đường chéo" không tự nhiên
│ 0 │ 1 │ 0 │
└───┴───┴───┘

Sử dụng m-liên thông:
→ 2 pixel 1 ở góc chéo KHÔNG liên thông
→ Kết quả "sạch" hơn, tránh ambiguity
```

### 🎯 Tại sao khái niệm liên thông quan trọng?

1. **Xác định vật thể:** Các pixel liên thông tạo thành **một vật thể**
2. **Xác định vùng (Region):** Tập hợp các pixel liên thông
3. **Xác định biên (Boundary):** Pixel của vùng có láng giềng ngoài vùng
4. **Đếm vật thể:** Đếm số thành phần liên thông (connected components)

### 💡 Ví dụ thực tế - Đếm tế bào

```
Ảnh hiển vi sau khi threshold:
┌──────────────────┐
│  ███    ████     │  ← 2 tế bào riêng biệt
│ █████  ██████    │     (2 thành phần liên thông)
│  ███    ████     │
│                  │
│      ████████    │  ← 1 tế bào khác
│      ████████    │
└──────────────────┘
```

→ Thuật toán **Connected Components Labeling** sẽ đánh nhãn mỗi tế bào một mã số khác nhau, từ đó đếm được có **3 tế bào**.

---

# 🛤️ Slide 36: Đường đi và vùng

### 🔹 Path - Đường đi
**Định nghĩa:** Một chuỗi các pixel liên tiếp thỏa mãn điều kiện kề nhau

**Ví dụ:** Đường đi từ $p(x_0, y_0)$ đến $q(x_n, y_n)$:
$$(x_0, y_0), (x_1, y_1), ..., (x_n, y_n)$$

Trong đó:
- Pixel $(x_i, y_i)$ kề với pixel $(x_{i-1}, y_{i-1})$
- Tất cả các pixel đều có giá trị thuộc tập $V$

**Độ dài đường đi:** $n$ (số bước)

### 🔹 Region - Vùng
**Định nghĩa:** Một tập hợp các pixel **liên thông** với nhau

**Ví dụ:** Tất cả các pixel màu đen tạo thành chữ "A" → đó là **một vùng**

### 🔹 Boundary - Biên
**Định nghĩa:** Tập các pixel **thuộc vùng** nhưng có **ít nhất một láng giềng nằm ngoài vùng**

### 💡 Minh họa trực quan

```
Xét một vùng hình chữ nhật (các pixel •):

  ░░░░░░░░░░░░░░░
  ░░███████████░░
  ░░█ • • • • █░░  ← Các pixel • tạo thành REGION
  ░░█ • • • • █░░
  ░░█ • • • • █░░
  ░░███████████░░
  ░░░░░░░░░░░░░░░

  █ = Boundary (biên của vùng)
  • = Interior (bên trong vùng)
  ░ = Nền (ngoài vùng)
```

### 💡 Ví dụ thực tế

**Ví dụ 1: Phân vùng ảnh y tế**
```
Ảnh X-quang phổi:
┌─────────────────┐
│ ░░░░░░░░░░░░░░░ │  ← Nền (màu đen)
│ ░░███████████░░ │
│ ░░█▓▓▓▓▓▓▓█░░░ │  ← ▓ = Vùng phổi
│ ░░█▓▓▓▓▓▓▓█░░░ │     █ = Biên của phổi
│ ░░███████████░░ │
│ ░░░░░░░░░░░░░░░ │
└─────────────────┘
```

→ Bác sĩ có thể đo **diện tích vùng phổi**, phát hiện **vùng bất thường** (khối u)

**Ví dụ 2: Nhận dạng chữ viết tay**
```
Chữ "A" viết tay:
  ░░░░▓▓░░░░
  ░░░▓░░▓░░░
  ░░▓░░░░▓░░
  ░▓▓▓▓▓▓▓▓░
  ░▓░░░░░░▓░
  ░▓░░░░░░▓░

→ 1 vùng liên thông (chữ A)
→ Có 1 "lỗ" (hole) ở giữa (vùng nền bên trong)
→ Đặc trưng này giúp phân biệt "A" với "B", "O"...
```

### 🎯 Ứng dụng của khái niệm Region/Boundary
- **Segmentation:** Tách vật thể khỏi nền
- **Morphological operations:** Giãn nở, co rút vùng
- **Feature extraction:** Đo diện tích, chu vi, độ compact
- **Object recognition:** Nhận dạng dựa trên hình dạng vùng

---

# 📏 Slide 37: Khoảng cách giữa các pixel

### Định nghĩa
Khoảng cách giữa 2 pixel $p(x, y)$ và $q(s, t)$ là một hàm $D(p, q)$ thỏa mãn:
1. $D(p, q) \geq 0$ (không âm)
2. $D(p, p) = 0$ (khoảng cách tới chính nó = 0)
3. $D(p, q) = D(q, p)$ (đối xứng)
4. $D(p, q) \leq D(p, r) + D(r, q)$ (bất đẳng thức tam giác)

### 3 loại khoảng cách phổ biến

### 🔹 1. Euclidean Distance ($D_E$) - Khoảng cách đường chim bay
$$D_E(p, q) = \sqrt{(x-s)^2 + (y-t)^2}$$

**Ví dụ:** $p(0,0)$ đến $q(3,4)$: $D_E = \sqrt{3^2 + 4^2} = 5$

### 🔹 2. City-block Distance ($D_4$) - Khoảng cách Manhattan
$$D_4(p, q) = |x-s| + |y-t|$$

**Ví dụ:** $p(0,0)$ đến $q(3,4)$: $D_4 = |3| + |4| = 7$

### 🔹 3. Chessboard Distance ($D_8$) - Khoảng cách bàn cờ
$$D_8(p, q) = \max(|x-s|, |y-t|)$$

**Ví dụ:** $p(0,0)$ đến $q(3,4)$: $D_8 = \max(3, 4) = 4$

### 💡 Minh họa trực quan - Từ A(0,0) đến B(3,4)

```
Euclidean (đường chim bay):
A •───────────────• B
  ╲               ╱
   ╲             ╱    → D_E = 5
    ╲           ╱
     ╲         ╱
      •───────•

City-block (đường thành phố):
A •───→───→───→───•
                  │    → D_4 = 3 + 4 = 7
                  │
                  │
                  ↓
                  • B

Chessboard (đường chéo):
A •───────────────•
   ╲              │
    ╲             │    → D_8 = max(3,4) = 4
     ╲            │
      ╲           │
       •─────────• B
```

### 💡 Ví dụ đời thường

| Loại khoảng cách | Ví dụ đời thường |
|:---|:---|
| **Euclidean** | Con chim bay từ A đến B (đường thẳng) |
| **City-block** | Xe ô tô ở Manhattan (chỉ đi theo đường phố, không đi xuyên nhà) |
| **Chessboard** | Con Vua trong cờ vua (có thể đi chéo, ngang, dọc) |

---

# 📐 Slide 38: So sánh các khoảng cách

### Minh họa hình dạng "đường đẳng cự" (đường có cùng khoảng cách đến gốc)

```
Euclidean (D_E):          City-block (D_4):        Chessboard (D_8):
      ○                        ◇                        □
    ╱   ╲                    ╱   ╲                    ┌───┐
   │  D=2│                  │  D=2│                  │D=2│
    ╲   ╱                    ╲   ╱                    └───┘
      ○                        ◇                        □
   (Hình tròn)             (Hình thoi)             (Hình vuông)
```

### 💡 So sánh chi tiết

| Khoảng cách | Công thức | Hình dạng | Ứng dụng |
|:---|:---|:---:|:---|
| **Euclidean** | $\sqrt{(x-s)^2 + (y-t)^2}$ | ○ Tròn | Khoảng cách thực, hình học |
| **City-block** | $|x-s| + |y-t|$ | ◇ Thoi | Lưới 4-hướng, robot đi theo lưới |
| **Chessboard** | $\max(|x-s|, |y-t|)$ | □ Vuông | Lưới 8-hướng, trò chơi board game |

### 🎯 Khi nào dùng loại nào?

**Dùng Euclidean khi:**
- Cần khoảng cách **thực tế, chính xác**
- Tính diện tích, bán kính
- Các bài toán hình học

**Dùng City-block khi:**
- Đối tượng chỉ di chuyển theo **4 hướng** (lên/xuống/trái/phải)
- Robot trong nhà kho chỉ đi theo lối
- Morphological operations với structuring element 4-hướng

**Dùng Chessboard khi:**
- Đối tượng có thể di chuyển theo **8 hướng** (kể cả chéo)
- Trò chơi cờ vua, cờ caro
- Morphological operations với structuring element 8-hướng

### 💡 Ví dụ thực tế - Tìm đường trong mê cung

```
Mê cung lưới 5×5, tìm đường từ S đến T:

S . # . .       S=Start, T=Target
# . # . .       #=Tường, .=Đường đi
# . . . #
. # # . .
. . . . T

• Dùng Euclidean: Đường đi "thẳng" nhất (có thể xuyên tường - không hợp lý)
• Dùng City-block: Đi theo 4 hướng, đường đi dài hơn
• Dùng Chessboard: Đi chéo được, đường đi ngắn hơn City-block
```

### 📌 Ứng dụng trong xử lý ảnh
Các khái niệm khoảng cách được sử dụng trong:
- **Segmentation:** Phân vùng dựa trên khoảng cách màu
- **Morphology:** Giãn nở, co rút với structuring element
- **Connected components:** Xác định thành phần liên thông
- **Feature extraction:** Khoảng cách giữa các đặc trưng
- **Pattern matching:** So sánh mẫu

---

# 🧮 PHẦN 5: CÁC PHÉP TOÁN CƠ BẢN TRÊN ẢNH

---

# 🔢 Slide 39: Các phép toán trên ảnh

### Nguyên lý cơ bản
Vì ảnh có thể biểu diễn dưới dạng **ma trận**, ta có thể thực hiện các phép toán như với ma trận thông thường.

### 🔹 Phép toán số học (Arithmetic Operations)
Thực hiện **element-wise** (từng phần tử tương ứng):

| Phép toán | Ký hiệu | Mô tả |
|:---|:---:|:---|
| **Cộng** | $g(x,y) = f_1(x,y) + f_2(x,y)$ | Cộng giá trị pixel tương ứng |
| **Trừ** | $g(x,y) = f_1(x,y) - f_2(x,y)$ | Trừ giá trị pixel tương ứng |
| **Nhân** | $g(x,y) = f_1(x,y) \times f_2(x,y)$ | Nhân giá trị pixel |
| **Chia** | $g(x,y) = f_1(x,y) / f_2(x,y)$ | Chia giá trị pixel |

### 🔹 Phép toán logic (Logical Operations)
Thường dùng với **ảnh nhị phân** (0 hoặc 1):

| Phép toán | Ký hiệu | Mô tả |
|:---|:---:|:---|
| **AND** | $f_1 \wedge f_2$ | Chỉ bằng 1 nếu cả 2 cùng bằng 1 |
| **OR** | $f_1 \vee f_2$ | Bằng 1 nếu ít nhất 1 cái bằng 1 |
| **NOT** | $\neg f$ | Đảo ngược: 0 → 1, 1 → 0 |
| **XOR** | $f_1 \oplus f_2$ | Bằng 1 nếu 2 giá trị khác nhau |

### 💡 Ví dụ minh họa - Phép AND với mask

```
Ảnh gốc (8-bit):        Mask (binary):       Kết quả (AND):
┌─────────────┐         ┌─────────────┐      ┌─────────────┐
│ 100 150 200 │         │  1  1  0    │      │ 100 150   0 │
│ 120 180 220 │    AND  │  1  1  0    │  =   │ 120 180   0 │
│  80 140 160 │         │  0  0  0    │      │   0   0   0 │
└─────────────┘         └─────────────┘      └─────────────┘
```

→ Chỉ giữ lại phần ảnh ứng với mask = 1, phần còn lại = 0

### 🎯 Lưu ý quan trọng
- Các phép toán số học có thể gây **tràn số** (overflow) nếu kết quả > 255 hoặc < 0
- Cần **clip** (cắt) kết quả về khoảng [0, 255]
- Trong Python/NumPy: dùng `np.clip()` hoặc kiểu dữ liệu phù hợp

---

# ➕ Slide 40: Cộng ảnh - Image Averaging

### Ý tưởng cơ bản
Giả sử có $K$ ảnh của **cùng một cảnh**, mỗi ảnh bị **nhiễu độc lập**:

$$g_k(x,y) = f(x,y) + n_k(x,y)$$

Trong đó:
- $f(x,y)$: ảnh gốc (không nhiễu)
- $n_k(x,y)$: nhiễu trong ảnh thứ $k$
- $g_k(x,y)$: ảnh quan sát được

### Công thức trung bình
$$\bar{g}(x,y) = \frac{1}{K} \sum_{k=1}^{K} g_k(x,y)$$

### 🎯 Kết quả quan trọng
Nếu nhiễu có **trung bình bằng 0** và **phương sai $\sigma_n^2$**, thì:

$$\sigma_{\bar{n}}^2 = \frac{\sigma_n^2}{K}$$

> **Kết luận:** Tăng số lượng ảnh trung bình → **giảm nhiễu**!

### 💡 Ví dụ minh họa

**Tình huống:** Chụp ảnh bầu trời đêm có nhiều nhiễu

| Số ảnh trung bình ($K$) | Phương sai nhiễu | Chất lượng ảnh |
|:---:|:---:|:---|
| 1 | $\sigma_n^2$ | Rất nhiễu |
| 4 | $\sigma_n^2 / 4$ | Giảm 75% nhiễu |
| 16 | $\sigma_n^2 / 16$ | Giảm 94% nhiễu |
| 100 | $\sigma_n^2 / 100$ | Gần như hết nhiễu |

### 💡 Ứng dụng thực tế

**1. Nhiếp ảnh thiên văn:**
- Chụp cùng một ngôi sao nhiều lần rồi cộng trung bình
- Kết quả: Ảnh rõ nét hơn, thấy được các sao mờ

**2. Camera an ninh:**
- Trung bình nhiều frame liên tiếp
- Giảm nhiễu, hình ảnh ổn định hơn

**3. Y tế (MRI, CT):**
- Chụp nhiều lần rồi trung bình
- Giảm nhiễu, tăng chất lượng chẩn đoán

### 💡 Code Python minh họa
```python
import numpy as np
import cv2

# Giả sử có 10 ảnh cùng cảnh
images = [cv2.imread(f"image_{i}.jpg") for i in range(10)]

# Tính trung bình
avg_image = np.mean(images, axis=0).astype(np.uint8)

# Lưu kết quả
cv2.imwrite("averaged.jpg", avg_image)
```

### ⚠️ Lưu ý
- Các ảnh phải **cùng một cảnh**, không có chuyển động
- Nếu có chuyển động → ảnh bị **mờ** (blur)
- Ứng dụng tốt nhất với cảnh **tĩnh**

---

# ➖ Slide 41: Trừ ảnh

### Ý tưởng cơ bản
Phép trừ 2 ảnh sẽ cho ta **sự khác biệt** giữa chúng:

$$g(x,y) = f_1(x,y) - f_2(x,y)$$

### 💡 Ứng dụng quan trọng: Phát hiện thay đổi

```
Ảnh trước (Background)     Ảnh sau (Current)
┌──────────────┐           ┌──────────────┐
│              │           │    ████      │
│              │    TRỪ    │    ████      │
│              │   ──────→ │              │
│              │           │              │
└──────────────┘           └──────────────┘
              ↓
        Ảnh kết quả (Difference)
        ┌──────────────┐
        │    ████      │  ← Chỉ còn lại phần thay đổi
        │    ████      │     (vật thể mới xuất hiện)
        │              │
        │              │
        └──────────────┘
```

### 💡 Ví dụ thực tế

**1. Background Subtraction - Trừ nền trong camera an ninh**
```python
# Bước 1: Chụp ảnh nền khi không có người
background = cv2.imread("empty_room.jpg")

# Bước 2: Chụp ảnh hiện tại
current = cv2.imread("current_frame.jpg")

# Bước 3: Trừ 2 ảnh
diff = cv2.absdiff(background, current)

# Bước 4: Ngưỡng để tạo ảnh nhị phân
_, mask = cv2.threshold(diff, 30, 255, cv2.THRESH_BINARY)

# Kết quả: mask chỉ chứa vùng có người
```

**2. Phát hiện chuyển động (Motion Detection)**
- So sánh frame hiện tại với frame trước
- Vùng thay đổi = vùng có chuyển động
- Ứng dụng: Camera an ninh, đếm người

**3. Kiểm tra chất lượng sản phẩm**
- Chụp ảnh sản phẩm chuẩn
- Chụp ảnh sản phẩm cần kiểm tra
- Trừ 2 ảnh → phát hiện lỗi (vết xước, móp méo)

### ⚠️ Lưu ý khi trừ ảnh
- **Căn chỉnh ảnh (Alignment):** 2 ảnh phải cùng kích thước, cùng góc chụp
- **Điều kiện sáng:** Ánh sáng thay đổi cũng gây "khác biệt giả"
- **Nhiễu:** Nhiễu cũng tạo ra khác biệt nhỏ → cần ngưỡng phù hợp

### 💡 Code Python hoàn chỉnh
```python
import cv2
import numpy as np

# Đọc 2 ảnh
img1 = cv2.imread("before.jpg", cv2.IMREAD_GRAYSCALE)
img2 = cv2.imread("after.jpg", cv2.IMREAD_GRAYSCALE)

# Trừ ảnh (dùng absdiff để tránh giá trị âm)
diff = cv2.absdiff(img1, img2)

# Ngưỡng
_, mask = cv2.threshold(diff, 30, 255, cv2.THRESH_BINARY)

# Hiển thị
cv2.imshow("Difference", mask)
cv2.waitKey(0)
```

---

# 🎭 Slide 42: Phép toán logic và Mask

### Khái niệm Mask
**Mask (mặt nạ)** là một ảnh nhị phân (chỉ có 2 giá trị: 0 và 1, hoặc 0 và 255) dùng để **chọn vùng** cần xử lý.

### 💡 Ví dụ - Dùng phép AND với mask để trích xuất ROI

```
Ảnh gốc (RGB):             Mask (hình tròn):      Kết quả (AND):
┌──────────────┐           ┌──────────────┐       ┌──────────────┐
│ Nền xanh     │           │  0 0 0 0 0   │       │  0   0   0   │
│    ████      │           │ 0 1 1 1 1 0  │       │  ████       │
│   █FACES█    │    AND    │ 0 1 1 1 1 0  │   =   │ █FACES█     │
│    ████      │           │ 0 1 1 1 1 0  │       │  ████       │
│ Nền xanh     │           │  0 0 0 0 0   │       │  0   0   0   │
└──────────────┘           └──────────────┘       └──────────────┘
```

→ Chỉ giữ lại phần khuôn mặt (trong vùng mask = 1), nền bị xóa (mask = 0)

### 💡 Các phép toán logic thông dụng

| Phép toán | Tác dụng | Ứng dụng |
|:---|:---|:---|
| **AND** | Giữ lại phần giao | Trích xuất ROI |
| **OR** | Hợp 2 vùng | Kết hợp nhiều mask |
| **NOT** | Đảo ngược mask | Lấy phần nền thay vì vật thể |
| **XOR** | Phần đối xứng | Phát hiện thay đổi |

### 💡 Ví dụ thực tế

**1. Trích xuất khuôn mặt (Face ROI)**
```python
# Tạo mask hình tròn tại vị trí khuôn mặt
mask = np.zeros(image.shape[:2], dtype=np.uint8)
cv2.circle(mask, (center_x, center_y), radius, 255, -1)

# Áp dụng mask
face_only = cv2.bitwise_and(image, image, mask=mask)
```

**2. Xóa nền (Background Removal)**
```python
# Tạo mask cho vật thể (dùng threshold, segmentation...)
object_mask = create_object_mask(image)

# NOT mask để lấy nền
background_mask = cv2.bitwise_not(object_mask)

# Lấy phần nền
background_only = cv2.bitwise_and(image, image, mask=background_mask)
```

**3. Kết hợp nhiều vùng quan tâm**
```python
# Phát hiện cả người và xe
person_mask = detect_person(image)
car_mask = detect_car(image)

# OR để lấy cả 2
combined_mask = cv2.bitwise_or(person_mask, car_mask)
```

### 🎯 Tại sao Mask quan trọng?
- **Tiết kiệm tính toán:** Chỉ xử lý vùng cần thiết
- **Tập trung vào ROI:** Bỏ qua phần không quan trọng
- **Linh hoạt:** Có thể kết hợp nhiều mask theo logic
- **Ứng dụng rộng rãi:** Từ xử lý ảnh cơ bản đến AI

> 💡 **Trong deep learning:** Mask được dùng trong **Mask R-CNN** - một trong những mô hình phân vùng ảnh hiện đại nhất.

---

# 🎯 Slide 43: Phép toán không gian

### Định nghĩa
Trong phép toán không gian, giá trị pixel đầu ra $g(x,y)$ phụ thuộc vào:
- **Một pixel** duy nhất (single-pixel operation)
- **Một vùng lân cận** của pixel đó (neighborhood operation)

### 🔹 1. Single-pixel operation (Biến đổi điểm)
$$g(x,y) = T(f(x,y))$$

Giá trị đầu ra chỉ phụ thuộc vào **giá trị pixel đầu vào** tại cùng vị trí.

**Ví dụ:**
- **Negative (Âm bản):** $g(x,y) = 255 - f(x,y)$
- **Brightness adjustment:** $g(x,y) = f(x,y) + 50$
- **Threshold (Ngưỡng):** $g(x,y) = 255$ nếu $f(x,y) > T$, ngược lại $= 0$

**💡 Minh họa - Negative:**
```
Ảnh gốc:       [100, 150, 200]
Negative:      [155, 105,  55]   (= 255 - giá trị gốc)
```

### 🔹 2. Neighborhood operation (Biến đổi lân cận)
Giá trị đầu ra phụ thuộc vào **giá trị của pixel và các pixel xung quanh**.

**Ví dụ:**
- **Blur (Làm mờ):** Lấy trung bình các pixel lân cận
- **Sharpening (Làm sắc nét):** Nhấn mạnh sự khác biệt với lân cận
- **Edge detection (Phát hiện biên):** Tìm nơi có sự thay đổi đột ngột

**💡 Minh họa - Mean Filter (Lọc trung bình 3×3):**
```
Ảnh gốc (3×3):          Kernel 3×3:         Pixel trung tâm mới:
┌────┬────┬────┐        ┌───┬───┬───┐
│ 10 │ 20 │ 30 │        │ 1 │ 1 │ 1 │
├────┼────┼────┐        ├───┼───┼───┤       (10+20+30+40+50+60
│ 40 │[50]│ 60 │   ×    │ 1 │ 1 │ 1 │  =    +70+80+90) / 9
├────┼────┼────┤        ├───┼───┼───┤     = 500 / 9 ≈ 56
│ 70 │ 80 │ 90 │        │ 1 │ 1 │ 1 │
└────┴────┴────┘        └───┴───┴───┘
```

→ Pixel 50 được thay bằng **56** (trung bình của 9 pixel xung quanh)

### 💡 So sánh 2 loại phép toán

| | Single-pixel | Neighborhood |
|:---|:---|:---|
| **Phụ thuộc vào** | Chỉ 1 pixel | Pixel + lân cận |
| **Tốc độ** | Rất nhanh | Chậm hơn |
| **Tác dụng** | Điều chỉnh giá trị | Lọc, phát hiện đặc trưng |
| **Ví dụ** | Negative, threshold | Blur, edge detection |

### 💡 Code Python minh họa

```python
# Single-pixel: Negative
negative = 255 - image

# Single-pixel: Threshold
_, binary = cv2.threshold(image, 128, 255, cv2.THRESH_BINARY)

# Neighborhood: Mean filter
blurred = cv2.blur(image, (5, 5))

# Neighborhood: Edge detection
edges = cv2.Canny(image, 100, 200)
```

---

# 🌀 Slide 44: Convolution - Tích chập

### Định nghĩa
**Convolution (tích chập)** là phép toán **cốt lõi** của xử lý ảnh, dùng một ma trận nhỏ gọi là **kernel (bộ lọc)** trượt trên ảnh để tạo ra ảnh mới.

### Công thức toán học
$$g(x,y) = \sum_{m} \sum_{n} h(m,n) \cdot f(x-m, y-n)$$

Trong đó:
- $f$: ảnh đầu vào
- $h$: kernel (bộ lọc)
- $g$: ảnh đầu ra

### 💡 Minh họa quy trình convolution

```
Bước 1: Đặt kernel lên ảnh
        ┌─────────────────────┐
        │ 10  20  30  40  50  │
        │ 15  25  35  45  55  │
        │ 20 [30] 40  50  60  │  ← Kernel 3×3 đặt lên pixel 30
        │ 25  35  45  55  65  │
        │ 30  40  50  60  70  │
        └─────────────────────┘

Bước 2: Nhân element-wise và cộng
        Kernel:          Phần ảnh tương ứng:
        ┌───┬───┬───┐    ┌────┬────┬────┐
        │ 0 │-1 │ 0 │    │ 20 │ 30 │ 40 │
        ├───┼───┼───┤    ├────┼────┼────┤
        │-1 │ 4 │-1 │ ×  │ 25 │ 30 │ 35 │
        ├───┼───┼───┤    ├────┼────┼────┤
        │ 0 │-1 │ 0 │    │ 30 │ 40 │ 50 │
        └───┴───┴───┘    └────┴────┴────┘

        = 0×20 + (-1)×30 + 0×40
        + (-1)×25 + 4×30 + (-1)×35
        + 0×30 + (-1)×40 + 0×50
        = -30 - 25 + 120 - 35 - 40
        = -10

Bước 3: Gán giá trị -10 cho pixel trung tâm trong ảnh kết quả
```

### 🎯 Ý nghĩa của Convolution
- Kernel đóng vai trò như **"công thức nấu ăn"** cho pixel đầu ra
- Mỗi loại kernel khác nhau → tạo ra **hiệu ứng khác nhau**
- Là nền tảng của: **lọc, phát hiện biên, làm mờ, làm sắc nét...**

### 💡 Ví dụ các loại kernel phổ biến

| Kernel | Tên | Tác dụng |
|:---|:---|:---|
| $\frac{1}{9}\begin{bmatrix}1&1&1\\1&1&1\\1&1&1\end{bmatrix}$ | Mean filter | Làm mờ, giảm nhiễu |
| $\begin{bmatrix}-1&-1&-1\\-1&8&-1\\-1&-1&-1\end{bmatrix}$ | Laplacian | Phát hiện biên |
| $\begin{bmatrix}0&-1&0\\-1&5&-1\\0&-1&0\end{bmatrix}$ | Sharpen | Làm sắc nét |

### 💡 Code Python
```python
import cv2
import numpy as np

# Kernel làm mờ 3×3
kernel = np.ones((3,3), np.float32) / 9

# Áp dụng convolution
blurred = cv2.filter2D(image, -1, kernel)

# Hoặc dùng hàm có sẵn
blurred2 = cv2.blur(image, (3, 3))  # Tương đương
```

---

# 🔧 Slide 45: Ví dụ về Kernel

### 🔹 1. Mean Filter (Lọc trung bình)

**Kernel:**
$$\frac{1}{9} \begin{bmatrix} 1 & 1 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & 1 \end{bmatrix}$$

**Tác dụng:** Làm mượt ảnh, giảm nhiễu
**Nguyên lý:** Thay pixel bằng **trung bình** của 9 pixel xung quanh

**💡 Ví dụ:**
```
Ảnh có nhiễu "muối tiêu" (salt-and-pepper):
┌───────────────────┐
│ ░░░░░░▓░░░░░░░░░░ │  ← ▓ là nhiễu
│ ░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░▓░░░░░░░ │  ← ▓ là nhiễu
│ ░░░░░░░░░░░░░░░░░ │
└───────────────────┘

Sau khi áp dụng Mean Filter:
┌───────────────────┐
│ ░░░░░░░░░░░░░░░░░ │  ← Nhiễu bị "dịu" đi
│ ░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░ │
└───────────────────┘
```

### 🔹 2. Edge Filter (Lọc phát hiện biên)

**Kernel:**
$$\begin{bmatrix} -1 & -1 & -1 \\ -1 & 8 & -1 \\ -1 & -1 & -1 \end{bmatrix}$$

**Tác dụng:** Nhấn mạnh các vùng có **thay đổi cường độ mạnh** (biên)
**Nguyên lý:** Pixel đầu ra = 8 × pixel giữa - tổng 8 pixel xung quanh

**💡 Ví dụ:**
```
Ảnh gốc (vùng có biên dọc):
┌──────────────┐
│ 50  50 │ 200 200 │
│ 50  50 │ 200 200 │  ← Biên dọc ở giữa
│ 50  50 │ 200 200 │
└──────────────┘

Sau khi áp dụng Edge Filter:
┌──────────────┐
│  0   0 │  0   0  │
│  0  50 │ -50  0  │  ← Biên được nhấn mạnh
│  0   0 │  0   0  │     (giá trị lớn ở vùng biên)
└──────────────┘
```

### 🔹 3. So sánh tác dụng của 2 kernel

| | Mean Filter | Edge Filter |
|:---|:---|:---|
| **Hệ số** | Toàn dương, tổng = 1 | Có âm, tổng = 0 |
| **Tác dụng** | Làm mờ, giảm nhiễu | Phát hiện biên |
| **Ảnh hưởng lên biên** | Làm mờ biên | Nhấn mạnh biên |
| **Ứng dụng** | Tiền xử lý, giảm nhiễu | Phát hiện vật thể |

### 💡 Code Python minh họa
```python
import cv2
import numpy as np

# Mean filter
mean_kernel = np.ones((3,3), np.float32) / 9
blurred = cv2.filter2D(image, -1, mean_kernel)

# Edge filter (Laplacian)
edge_kernel = np.array([[-1,-1,-1],
                        [-1, 8,-1],
                        [-1,-1,-1]], np.float32)
edges = cv2.filter2D(image, -1, edge_kernel)

# Hoặc dùng hàm có sẵn
edges2 = cv2.Laplacian(image, cv2.CV_64F)
```

### 🎯 Ghi nhớ quan trọng
> **Kernel quyết định hiệu ứng của convolution.** Cùng một ảnh, nhưng dùng kernel khác nhau sẽ cho kết quả hoàn toàn khác. Thiết kế kernel phù hợp là **nghệ thuật** trong xử lý ảnh!

---

# 🔄 Slide 46: Biến đổi hình học

### Định nghĩa
**Biến đổi hình học (Geometric Transformation)** thay đổi **vị trí** của các pixel trong ảnh, nhưng **giữ nguyên giá trị cường độ**.

### Các phép biến đổi phổ biến

| Phép biến đổi | Mô tả | Ma trận biến đổi |
|:---|:---|:---|
| **Translation** (Tịnh tiến) | Dịch ảnh theo vector $(t_x, t_y)$ | $\begin{bmatrix}1&0&t_x\\0&1&t_y\end{bmatrix}$ |
| **Rotation** (Xoay) | Xoay ảnh quanh một điểm góc $\theta$ | $\begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}$ |
| **Scaling** (Co giãn) | Phóng to / thu nhỏ ảnh | $\begin{bmatrix}s_x&0\\0&s_y\end{bmatrix}$ |
| **Shearing** (Trượt) | Làm nghiêng ảnh | $\begin{bmatrix}1&sh_x\\sh_y&1\end{bmatrix}$ |
| **Perspective** (Phối cảnh) | Biến đổi phối cảnh 3D → 2D | Ma trận 3×3 |

### 💡 Minh họa các phép biến đổi

```
Ảnh gốc:         Rotation 45°:     Scaling 2x:
┌────┐              ◇                  ┌────────┐
│    │             ╱  ╲                 │        │
│    │            ╱    ╲                │        │
└────┘           ╱      ╲               │        │
                 ╲      ╱               │        │
                  ╲    ╱                │        │
                   ╲  ╱                 │        │
                    ◇                   └────────┘
```

### ⚠️ Vấn đề quan trọng: Interpolation
Sau khi biến đổi, vị trí mới của pixel thường là **số lẻ** (ví dụ: (2.3, 4.7)). Nhưng pixel phải ở vị trí **nguyên**.

→ Cần dùng **Interpolation** để ước lượng giá trị tại vị trí mới:
- **Nearest Neighbor:** Nhanh, răng cưa
- **Bilinear:** Mượt hơn
- **Bicubic:** Mượt nhất, chất lượng cao

### 💡 Quy trình biến đổi hình học
```
Ảnh gốc
   ↓
[1] Áp dụng biến đổi hình học
   → Tọa độ mới (thường là số lẻ)
   ↓
[2] Làm tròn / Nội suy
   → Gán giá trị pixel tại vị trí nguyên
   ↓
Ảnh mới
```

### 💡 Code Python
```python
import cv2
import numpy as np

# 1. Resize (Scaling)
resized = cv2.resize(image, (640, 480), interpolation=cv2.INTER_CUBIC)

# 2. Rotation
rows, cols = image.shape[:2]
M = cv2.getRotationMatrix2D((cols/2, rows/2), 45, 1)  # Xoay 45°
rotated = cv2.warpAffine(image, M, (cols, rows))

# 3. Translation
M = np.float32([[1, 0, 100], [0, 1, 50]])  # Dịch (100, 50)
translated = cv2.warpAffine(image, M, (cols, rows))

# 4. Flip
flipped = cv2.flip(image, 1)  # Flip ngang
```

### 💡 Ứng dụng thực tế
- **Augmentation trong deep learning:** Xoay, lật, co giãn ảnh để tăng dữ liệu huấn luyện
- **Correction:** Sửa ảnh bị nghiêng (document scanning)
- **Panorama:** Ghép nhiều ảnh bằng biến đổi phối cảnh
- **AR/VR:** Biến đổi phối cảnh để ghép vật thể ảo vào ảnh thật

---

# 📊 Slide 47: Thống kê cường độ

### Khái niệm
Cường độ pixel có thể được xem như một **biến ngẫu nhiên**. Ta có thể tính các đại lượng thống kê để mô tả phân bố của nó.

### 🔹 1. Mean (Giá trị trung bình)
$$\mu = \frac{1}{N} \sum_{i=1}^{N} x_i$$

**Ý nghĩa:** Cho biết **mức cường độ trung bình** của ảnh
- $\mu$ cao → ảnh sáng
- $\mu$ thấp → ảnh tối

### 🔹 2. Variance (Phương sai)
$$\sigma^2 = \frac{1}{N} \sum_{i=1}^{N} (x_i - \mu)^2$$

**Ý nghĩa:** Cho biết **mức độ phân tán** của cường độ
- $\sigma^2$ cao → tương phản cao (ảnh có cả vùng sáng và tối)
- $\sigma^2$ thấp → tương phản thấp (ảnh xám xịt, nhợt nhạt)

### 💡 Ví dụ minh họa

**Ảnh 1: Tối, tương phản thấp**
```
Pixel values: [10, 12, 11, 13, 10, 12, 11, 13, ...]
μ = 11.5  → Rất tối
σ² = 1.2  → Tương phản rất thấp (các giá trị gần nhau)
```

**Ảnh 2: Sáng, tương phản cao**
```
Pixel values: [0, 0, 0, 255, 255, 255, 0, 255, ...]
μ = 127.5  → Trung bình
σ² = 16256 → Tương phản rất cao (chỉ có đen và trắng)
```

**Ảnh 3: Bình thường**
```
Pixel values: [50, 100, 150, 200, 80, 120, 180, 220, ...]
μ = 137.5  → Hơi sáng
σ² = 3500  → Tương phản trung bình
```

### 💡 Ứng dụng của thống kê trong xử lý ảnh

| Đại lượng | Ứng dụng |
|:---|:---|
| **Mean** | Phát hiện ảnh tối/sáng, cân bằng ánh sáng |
| **Variance** | Đánh giá tương phản, phát hiện ảnh mờ |
| **Standard Deviation** ($\sigma$) | Ngưỡng tự động (adaptive threshold) |
| **Histogram** | Cân bằng giản đồ (histogram equalization) |

### 💡 Code Python
```python
import cv2
import numpy as np

# Tính mean và standard deviation
mean, std = cv2.meanStdDev(image)
print(f"Mean: {mean[0][0]:.2f}")
print(f"Std: {std[0][0]:.2f}")

# Tính variance
variance = std[0][0] ** 2
print(f"Variance: {variance:.2f}")

# Tính mean thủ công
mean_manual = np.mean(image)
```

### 🎯 Ghi nhớ
> **Mean cho biết "độ sáng trung bình", Variance cho biết "độ tương phản".** Hai đại lượng này là **công cụ đơn giản nhưng mạnh mẽ** để phân tích nhanh chất lượng ảnh.

---

# 📈 Slide 48: Histogram

### Định nghĩa
**Histogram** là biểu đồ cột thể hiện **số lượng pixel** tương ứng với từng **mức cường độ**.

### 💡 Minh họa trực quan

```
Ảnh 8-bit (256 mức xám):

Số pixel
  │
  │            ████
  │          ████████
  │        ████████████
  │      ████████████████
  │    ████████████████████
  │  ████████████████████████
  │████████████████████████████
  └────────────────────────────→ Mức xám
  0                            255
       (đen)            (trắng)
```

### 💡 Các dạng histogram điển hình

**1. Ảnh tối (Underexposed):**
```
Số pixel
  │
  │████████████
  │██████████████
  │████████████████
  │█████████████████
  │██████████████████
  └────────────────────→
  0                  255
  ↑
  Dồn về bên trái (gần 0)
```

**2. Ảnh sáng (Overexposed):**
```
Số pixel
  │
  │              ████████████
  │            ██████████████
  │          ████████████████
  │        ██████████████████
  │      ████████████████████
  └────────────────────────────→
  0                            255
                               ↑
                         Dồn về bên phải (gần 255)
```

**3. Ảnh tương phản thấp:**
```
Số pixel
  │
  │        ████████████
  │      ████████████████
  │    ████████████████████
  │  ████████████████████████
  │████████████████████████████
  └────────────────────────────→
  0                            255
         ↑
    Tập trung ở giữa
```

**4. Ảnh tương phản cao (lý tưởng):**
```
Số pixel
  │
  │██                        ██
  │████                    ████
  │██████                ██████
  │████████            ████████
  │██████████        ██████████
  │████████████    ████████████
  └────────────────────────────→
  0                            255
  ↑                            ↑
  Có cả vùng tối và vùng sáng
```

### 🎯 Histogram giúp phân tích gì?

| Đặc điểm histogram | Ý nghĩa |
|:---|:---|
| Dồn về bên trái | Ảnh tối (underexposed) |
| Dồn về bên phải | Ảnh sáng (overexposed) |
| Tập trung ở giữa | Tương phản thấp |
| Trải đều 0-255 | Tương phản cao, lý tưởng |
| Có 2 đỉnh (bimodal) | Ảnh có nền và vật thể rõ ràng |

### 💡 Ứng dụng của Histogram

1. **Histogram Equalization:** Cân bằng giản đồ để tăng tương phản
2. **Thresholding tự động:** Tìm ngưỡng phân tách nền/vật thể (Otsu's method)
3. **Đánh giá chất lượng ảnh:** Kiểm tra ảnh có bị over/underexposed không
4. **Color correction:** Cân bằng màu sắc dựa trên histogram từng kênh

### 💡 Code Python
```python
import cv2
import matplotlib.pyplot as plt

# Tính histogram
hist = cv2.calcHist([image], [0], None, [256], [0, 256])

# Vẽ histogram
plt.plot(hist)
plt.xlim([0, 256])
plt.title("Histogram of Grayscale Image")
plt.xlabel("Intensity")
plt.ylabel("Number of Pixels")
plt.show()

# Hoặc dùng matplotlib trực tiếp
plt.hist(image.ravel(), 256, [0, 256])
plt.show()
```

---

# 🐍 PHẦN 6: CÔNG CỤ XỬ LÝ ẢNH TRONG PYTHON

---

# 🌐 Slide 49: Hệ sinh thái Python

### Tại sao Python phổ biến trong Xử lý ảnh & Computer Vision?

✅ **Cú pháp đơn giản, dễ học**
✅ **Hệ sinh thái thư viện phong phú**
✅ **Tích hợp tốt với Machine Learning / Deep Learning**
✅ **Hỗ trợ cả nghiên cứu và triển khai ứng dụng**
✅ **Cộng đồng lớn, tài liệu dồi dào**

### 🏗️ Kiến trúc hệ sinh thái Python cho XLẢ & CGMT

```
                    ┌─────────────┐
                    │   Python    │
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          ↓                ↓                ↓
    ┌──────────┐    ┌──────────┐    ┌──────────────┐
    │  NumPy   │    │  OpenCV  │    │ scikit-image │
    │ (Nền tảng│    │ (XLẢ &   │    │ (Nghiên cứu  │
    │  tính    │    │  CGMT)   │    │  khoa học)   │
    │  toán)   │    │          │    │              │
    └──────────┘    └──────────┘    └──────────────┘
          │                │                │
          └────────────────┼────────────────┘
                           ↓
                 ┌───────────────────┐
                 │ Image Processing  │
                 │ & Computer Vision │
                 └───────────────────┘
```

### 📚 Các thư viện chính

| Thư viện | Vai trò | Điểm mạnh |
|:---|:---|:---|
| **NumPy** | Nền tảng tính toán | Ma trận, vectorization, nhanh |
| **OpenCV** | Xử lý ảnh & CV | Hàng trăm thuật toán, real-time |
| **scikit-image** | Nghiên cứu khoa học | Thuật toán hiện đại, giáo dục |
| **Matplotlib** | Trực quan hóa | Vẽ biểu đồ, hiển thị ảnh |
| **Pillow (PIL)** | Thao tác ảnh cơ bản | Đơn giản, nhẹ |

### 💡 Lựa chọn thư viện cho học phần này
> **Bộ 3 "thần thánh": NumPy + OpenCV + Matplotlib**
>
> Đây là combo mạnh mẽ nhất, được sử dụng rộng rãi trong cả học thuật và công nghiệp.

---

# 🔢 Slide 50: NumPy - Nền tảng dữ liệu

### Vai trò của NumPy
**NumPy** (Numerical Python) là thư viện **nền tảng** cho tính toán khoa học trong Python, cung cấp:

✅ **Mảng đa chiều** (ndarray) - biểu diễn ảnh
✅ **Phép toán vector / ma trận** - xử lý hàng loạt
✅ **Các hàm toán học** - sin, cos, exp, log...
✅ **Boolean masking** - lọc theo điều kiện
✅ **Slicing** - cắt lát mảng

### 💡 Biểu diễn ảnh trong NumPy

**Ảnh xám (Grayscale):**
- Mảng 2 chiều: $H \times W$
- Ví dụ: `image.shape = (480, 640)`

**Ảnh màu RGB:**
- Mảng 3 chiều: $H \times W \times 3$
- Ví dụ: `image.shape = (480, 640, 3)`

### 💡 Ví dụ minh họa

```python
import numpy as np

# Tạo ảnh xám 3×4
gray_image = np.array([
    [12, 30, 45, 70],
    [18, 42, 80, 100],
    [25, 60, 110, 150]
])
print(gray_image.shape)  # (3, 4)

# Tạo ảnh màu RGB 2×2
rgb_image = np.array([
    [[255, 0, 0], [0, 255, 0]],      # Đỏ, Lục
    [[0, 0, 255], [255, 255, 255]]   # Lam, Trắng
])
print(rgb_image.shape)  # (2, 2, 3)
```

### 💡 Các thao tác phổ biến với NumPy

```python
# 1. Truy cập pixel
pixel = image[100, 200]  # Pixel tại (y=100, x=200)

# 2. Thay đổi giá trị pixel
image[100, 200] = 128

# 3. Cắt lát (Slicing) - lấy vùng ROI
roi = image[100:200, 150:300]  # Vùng từ (100,150) đến (200,300)

# 4. Boolean masking
mask = image > 128  # Tạo mask: True nếu pixel > 128
image[mask] = 255   # Đặt các pixel > 128 thành 255

# 5. Phép toán vectorized (nhanh hơn vòng lặp)
image_adjusted = image + 50  # Cộng 50 vào tất cả pixel
image_normalized = image / 255.0  # Chuẩn hóa về [0, 1]

# 6. Các hàm thống kê
mean_val = np.mean(image)
std_val = np.std(image)
max_val = np.max(image)
min_val = np.min(image)
```

### 🎯 Tại sao NumPy quan trọng?

| Không dùng NumPy | Dùng NumPy |
|:---|:---|
| Vòng lặp Python → chậm | Vectorized → nhanh (100-1000x) |
| Code dài, phức tạp | Code ngắn gọn, dễ đọc |
| Khó bảo trì | Dễ bảo trì, tái sử dụng |

### 💡 Ví dụ so sánh tốc độ

```python
# Cách 1: Vòng lặp (CHẬM)
for i in range(image.shape[0]):
    for j in range(image.shape[1]):
        image[i, j] = image[i, j] + 50

# Cách 2: Vectorized (NHANH)
image = image + 50  # Nhanh hơn 100-1000 lần!
```

> 📌 **Ghi nhớ:** Trong xử lý ảnh, **luôn ưu tiên vectorized operations** thay vì vòng lặp!

---

# 📷 Slide 51: OpenCV - Thư viện xử lý ảnh hàng đầu

### Giới thiệu
**OpenCV** (Open Source Computer Vision Library) là thư viện mã nguồn mở **mạnh mẽ nhất** cho Xử lý ảnh và Computer Vision.

### ✅ Điểm mạnh của OpenCV
- **Hàng trăm thuật toán** từ cơ bản đến nâng cao
- **Tốc độ cao** (viết bằng C/C++, có binding cho Python)
- **Real-time processing** - xử lý thời gian thực
- **Đa nền tảng** - Windows, Linux, macOS, Android, iOS
- **Cộng đồng lớn**, tài liệu phong phú

### 📚 Các chức năng chính của OpenCV

| Nhóm chức năng | Ví dụ |
|:---|:---|
| **I/O** | Đọc/ghi ảnh, video |
| **Biến đổi hình học** | Resize, rotate, flip, warp |
| **Chuyển đổi màu** | RGB ↔ Gray, RGB ↔ HSV |
| **Lọc (Filtering)** | Blur, sharpen, edge detection |
| **Ngưỡng (Thresholding)** | Binary, adaptive, Otsu |
| **Hình thái học (Morphology)** | Erode, dilate, open, close |
| **Đường viền (Contours)** | Tìm, vẽ, phân tích contours |
| **Nhận dạng vật thể** | Face detection, object tracking |
| **Video processing** | Đọc/ghi video, background subtraction |

### 💡 Các hàm OpenCV phổ biến

```python
import cv2

# 1. Đọc/ghi ảnh
img = cv2.imread("image.jpg")
cv2.imwrite("output.jpg", img)

# 2. Hiển thị ảnh
cv2.imshow("Window", img)
cv2.waitKey(0)
cv2.destroyAllWindows()

# 3. Chuyển đổi màu
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# 4. Biến đổi kích thước
resized = cv2.resize(img, (640, 480))

# 5. Lọc
blurred = cv2.GaussianBlur(img, (5, 5), 0)
edges = cv2.Canny(img, 100, 200)

# 6. Ngưỡng
_, binary = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY)

# 7. Hình thái học
kernel = np.ones((5,5), np.uint8)
eroded = cv2.erode(binary, kernel)
dilated = cv2.dilate(binary, kernel)

# 8. Tìm contours
contours, hierarchy = cv2.findContours(binary, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
```

### 💡 Ví dụ hoàn chỉnh - Phát hiện biên

```python
import cv2
import matplotlib.pyplot as plt

# Đọc ảnh
img = cv2.imread("image.jpg")

# Chuyển sang xám
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Làm mờ để giảm nhiễu
blurred = cv2.GaussianBlur(gray, (5, 5), 0)

# Phát hiện biên Canny
edges = cv2.Canny(blurred, 100, 200)

# Hiển thị kết quả
plt.subplot(121), plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
plt.title("Original"), plt.axis("off")

plt.subplot(122), plt.imshow(edges, cmap="gray")
plt.title("Edges"), plt.axis("off")

plt.show()
```

### 🎯 Tại sao OpenCV là lựa chọn số 1?
- **Đầy đủ:** Có hầu hết các thuật toán xử lý ảnh
- **Nhanh:** Tối ưu cho real-time applications
- **Ổn định:** Được sử dụng rộng rãi trong công nghiệp
- **Miễn phí:** Mã nguồn mở, giấy phép Apache 2.0

---

# 🛠️ Slide 52: OpenCV - Các hàm cơ bản

### 🔹 1. Đọc / Ghi ảnh

```python
# Đọc ảnh
img = cv2.imread("image.jpg")              # Đọc ảnh màu
img_gray = cv2.imread("image.jpg", 0)      # Đọc ảnh xám
img_unchanged = cv2.imread("image.jpg", -1) # Đọc ảnh không đổi (có alpha)

# Ghi ảnh
cv2.imwrite("output.jpg", img)
cv2.imwrite("output.png", img)  # PNG không mất dữ liệu
```

### 🔹 2. Biến đổi hình học cơ bản

```python
# Resize
resized = cv2.resize(img, (640, 480))  # Kích thước cố định
resized = cv2.resize(img, None, fx=0.5, fy=0.5)  # Tỷ lệ 50%

# Flip
flipped_h = cv2.flip(img, 1)   # Flip ngang
flipped_v = cv2.flip(img, 0)   # Flip dọc
flipped_both = cv2.flip(img, -1)  # Flip cả 2

# Rotate
rows, cols = img.shape[:2]
M = cv2.getRotationMatrix2D((cols/2, rows/2), 45, 1)  # Xoay 45°
rotated = cv2.warpAffine(img, M, (cols, rows))
```

### 🔹 3. Chuyển đổi màu sắc

```python
# BGR ↔ Gray
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
bgr = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)

# BGR ↔ RGB (cho matplotlib)
rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# BGR ↔ HSV
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# BGR ↔ LAB
lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
```

### 🔹 4. Vẽ hình cơ bản

```python
# Vẽ đường thẳng
cv2.line(img, (0, 0), (100, 100), (0, 255, 0), 2)

# Vẽ hình chữ nhật
cv2.rectangle(img, (50, 50), (200, 200), (255, 0, 0), 2)

# Vẽ hình tròn
cv2.circle(img, (150, 150), 50, (0, 0, 255), -1)  # -1: fill

# Viết chữ
cv2.putText(img, "Hello", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
```

### 🔹 5. Hiển thị ảnh

```python
# Hiển thị bằng OpenCV
cv2.imshow("Window Name", img)
cv2.waitKey(0)  # Đợi phím bất kỳ
cv2.destroyAllWindows()

# Hiển thị bằng Matplotlib (khuyên dùng)
import matplotlib.pyplot as plt
plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
plt.axis("off")
plt.show()
```

### ⚠️ Lưu ý quan trọng

**OpenCV đọc ảnh theo thứ tự BGR, không phải RGB!**

```python
# Sai: Hiển thị bằng matplotlib mà không chuyển đổi
plt.imshow(img)  # Màu sẽ bị sai!

# Đúng: Chuyển BGR → RGB trước khi hiển thị
plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))  # Màu đúng
```

---

# 🎨 Slide 53: OpenCV - Filtering & Enhancement

### 🔹 1. Làm mờ / Giảm nhiễu

```python
# Mean filter (lọc trung bình)
blurred = cv2.blur(img, (5, 5))

# Gaussian filter (lọc Gaussian)
gaussian = cv2.GaussianBlur(img, (5, 5), 0)

# Median filter (lọc trung vị - tốt cho nhiễu muối tiêu)
median = cv2.medianBlur(img, 5)

# Bilateral filter (giữ biên tốt)
bilateral = cv2.bilateralFilter(img, 9, 75, 75)
```

### 🔹 2. Phát hiện biên

```python
# Canny edge detector
edges = cv2.Canny(img, 100, 200)

# Sobel (theo hướng)
sobel_x = cv2.Sobel(img, cv2.CV_64F, 1, 0, ksize=5)
sobel_y = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=5)

# Laplacian
laplacian = cv2.Laplacian(img, cv2.CV_64F)
```

### 🔹 3. Thresholding (Ngưỡng)

```python
# Binary threshold
_, binary = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY)

# Adaptive threshold (ngưỡng thích nghi)
adaptive = cv2.adaptiveThreshold(
    gray, 255,
    cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv2.THRESH_BINARY,
    11, 2
)

# Otsu's threshold (tự động tìm ngưỡng)
_, otsu = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
```

### 🔹 4. Morphological Operations (Hình thái học)

```python
kernel = np.ones((5, 5), np.uint8)

# Erosion (Co rút)
eroded = cv2.erode(binary, kernel, iterations=1)

# Dilation (Giãn nở)
dilated = cv2.dilate(binary, kernel, iterations=1)

# Opening (Erosion rồi Dilation - loại bỏ nhiễu nhỏ)
opening = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)

# Closing (Dilation rồi Erosion - lấp lỗ hổng)
closing = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)
```

### 🔹 5. Contours (Đường viền)

```python
# Tìm contours
contours, hierarchy = cv2.findContours(
    binary,
    cv2.RETR_TREE,
    cv2.CHAIN_APPROX_SIMPLE
)

# Vẽ contours
cv2.drawContours(img, contours, -1, (0, 255, 0), 2)

# Phân tích contour
for cnt in contours:
    area = cv2.contourArea(cnt)
    perimeter = cv2.arcLength(cnt, True)
    x, y, w, h = cv2.boundingRect(cnt)
```

### 💡 Ví dụ hoàn chỉnh - Pipeline phát hiện vật thể

```python
import cv2
import numpy as np

# 1. Đọc ảnh
img = cv2.imread("objects.jpg")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# 2. Làm mờ
blurred = cv2.GaussianBlur(gray, (5, 5), 0)

# 3. Ngưỡng
_, binary = cv2.threshold(blurred, 128, 255, cv2.THRESH_BINARY)

# 4. Hình thái học
kernel = np.ones((5, 5), np.uint8)
cleaned = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)

# 5. Tìm contours
contours, _ = cv2.findContours(cleaned, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# 6. Vẽ kết quả
for i, cnt in enumerate(contours):
    area = cv2.contourArea(cnt)
    if area > 100:  # Chỉ lấy vật thể đủ lớn
        x, y, w, h = cv2.boundingRect(cnt)
        cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)
        cv2.putText(img, f"Object {i+1}", (x, y-10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

# 7. Hiển thị
cv2.imshow("Detection", img)
cv2.waitKey(0)
```

---

# 📚 Slide 54: Các thư viện khác

### 🔹 1. Pillow (PIL - Python Imaging Library)

**Phù hợp với:**
- Đọc / ghi ảnh cơ bản
- Chuyển đổi định dạng ảnh
- Các thao tác ảnh đơn giản (crop, resize, rotate)
- Ứng dụng web, xử lý ảnh nhanh

**💡 Ví dụ:**
```python
from PIL import Image

# Mở ảnh
img = Image.open("image.jpg")

# Resize
img_resized = img.resize((640, 480))

# Crop
img_cropped = img.crop((100, 100, 400, 400))

# Convert to grayscale
img_gray = img.convert("L")

# Lưu
img_resized.save("output.jpg")
```

**Ưu điểm:** Đơn giản, nhẹ, phù hợp cho tác vụ cơ bản
**Nhược điểm:** Không có các thuật toán xử lý ảnh nâng cao

### 🔹 2. scikit-image

**Phù hợp với:**
- Giáo dục, nghiên cứu
- Các thuật toán xử lý ảnh khoa học
- Segmentation, restoration, feature extraction

**💡 Ví dụ:**
```python
from skimage import io, filters, feature, morphology

# Đọc ảnh
img = io.imread("image.jpg")

# Phát hiện biên (Canny)
edges = feature.canny(img, sigma=2)

# Lọc Gaussian
blurred = filters.gaussian(img, sigma=1)

# Ngưỡng Otsu
threshold = filters.threshold_otsu(img)
binary = img > threshold

# Hình thái học
cleaned = morphology.remove_small_objects(binary, min_size=100)
```

**Ưu điểm:** API Pythonic, tài liệu tốt, phù hợp nghiên cứu
**Nhược điểm:** Chậm hơn OpenCV, không phù hợp real-time

### 🔹 3. Mahotas

**Phù hợp với:**
- Image processing hiệu năng cao
- Morphological operations
- Xử lý ảnh sinh học, y tế

**💡 Ví dụ:**
```python
import mahotas as mh

# Đọc ảnh
img = mh.imread("image.jpg")

# Lọc Gaussian
blurred = mh.gaussian_filter(img, sigma=2)

# Ngưỡng
threshold = mh.thresholding.otsu(img)
binary = img > threshold

# Label connected components
labeled, num_objects = mh.label(binary)
```

**Ưu điểm:** Nhanh, tập trung vào xử lý ảnh khoa học
**Nhược điểm:** Ít chức năng hơn OpenCV, cộng đồng nhỏ

### 🎯 So sánh các thư viện

| Thư viện | Điểm mạnh | Điểm yếu | Phù hợp cho |
|:---|:---|:---|:---|
| **OpenCV** | Đầy đủ, nhanh, real-time | API hơi phức tạp | Sản phẩm, real-time |
| **Pillow** | Đơn giản, nhẹ | Không có thuật toán nâng cao | Thao tác cơ bản, web |
| **scikit-image** | Pythonic, nghiên cứu | Chậm | Giáo dục, nghiên cứu |
| **Mahotas** | Nhanh, khoa học | Ít chức năng | Xử lý ảnh sinh học |

---

# 🤔 Slide 55: Nên dùng thư viện nào?

### Bảng so sánh tổng hợp

| Thư viện | Điểm mạnh | Phù hợp cho |
|:---|:---|:---|
| **NumPy** | Ma trận và tính toán số | Nền tảng cho mọi xử lý |
| **OpenCV** | Image Processing & Computer Vision | Sản phẩm, real-time, công nghiệp |
| **Pillow** | Thao tác ảnh cơ bản | Web, ứng dụng đơn giản |
| **scikit-image** | Thuật toán nghiên cứu | Giáo dục, nghiên cứu khoa học |
| **Matplotlib** | Hiển thị và trực quan hóa | Vẽ biểu đồ, debug, presentation |

### 💡 Khuyến nghị cho học phần này

> **Bộ 3 "thần thánh": NumPy + OpenCV + Matplotlib**

**Lý do:**
1. **NumPy:** Nền tảng tính toán, biểu diễn ảnh dưới dạng ma trận
2. **OpenCV:** Thư viện xử lý ảnh đầy đủ nhất, tốc độ cao
3. **Matplotlib:** Hiển thị ảnh, vẽ histogram, trực quan hóa kết quả

### 💡 Khi nào dùng thư viện khác?

| Tình huống | Thư viện khuyên dùng |
|:---|:---|
| Làm web, cần xử lý ảnh nhanh | **Pillow** |
| Nghiên cứu thuật toán mới | **scikit-image** |
| Xử lý ảnh y tế, sinh học | **Mahotas** hoặc **scikit-image** |
| Deep Learning với ảnh | **PyTorch** hoặc **TensorFlow** (có tích hợp OpenCV) |
| Real-time trên embedded | **OpenCV** (C++) |

### 💡 Ví dụ kết hợp các thư viện

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

# 1. Đọc ảnh bằng OpenCV
img = cv2.imread("image.jpg")

# 2. Xử lý bằng OpenCV
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
edges = cv2.Canny(gray, 100, 200)

# 3. Tính toán bằng NumPy
mean_intensity = np.mean(gray)
print(f"Mean intensity: {mean_intensity:.2f}")

# 4. Trực quan hóa bằng Matplotlib
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

axes[0].imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
axes[0].set_title("Original")
axes[0].axis("off")

axes[1].imshow(gray, cmap="gray")
axes[1].set_title("Grayscale")
axes[1].axis("off")

axes[2].imshow(edges, cmap="gray")
axes[2].set_title("Edges")
axes[2].axis("off")

plt.tight_layout()
plt.show()
```

### 🎯 Thông điệp cuối cùng
> **Không có thư viện "tốt nhất" - chỉ có thư viện "phù hợp nhất" cho từng bài toán.**
>
> Hãy bắt đầu với **NumPy + OpenCV + Matplotlib**, sau đó khám phá các thư viện khác khi cần!

---

# 💻 PHẦN 7: MÔI TRƯỜNG THỰC HÀNH

---

# ⚙️ Slide 56: Môi trường thực hành

### 📦 Phần mềm cần cài đặt

**1. Python 3.11+**
- Tải từ: https://www.python.org/
- Khuyến nghị: Python 3.11 hoặc 3.12

**2. IDE / Code Editor**
- **VS Code** (khuyên dùng): Nhẹ, nhiều extension, hỗ trợ Jupyter
- **Jupyter Notebook**: Tương tác, phù hợp cho học tập và nghiên cứu
- **PyCharm**: Mạnh mẽ, phù hợp cho dự án lớn

**3. VS Code Extensions cần thiết**
- **Python** (Microsoft): Hỗ trợ Python cơ bản
- **Jupyter** (Microsoft): Chạy notebook trong VS Code
- **Pylance** (Microsoft): Intelli