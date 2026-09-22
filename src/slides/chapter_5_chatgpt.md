---
marp: true
theme: eaut
paginate: true
transition: zoom
---

<!-- _class: cover -->

<div class="middle">

# XỬ LÝ ẢNH& THỊ GIÁC MÁY TÍNH

## Chương 5: Thị giác máy tính

</div>

### Giảng viên: Nguyễn Phồn Lữa

---

# SLIDE 2: MỤC TIÊU HỌC TẬP

Sau khi hoàn thành chương này, sinh viên có thể:

* Trình bày được khái niệm và vai trò của **Computer Vision**.
* Phân biệt được **Computer Vision** và **Image Processing**.
* Mô tả được các bài toán phổ biến:

  * Classification
  * Object Detection
  * Segmentation
  * Keypoint / Feature Detection
  * OCR
  * Pose Estimation
  * 3D Reconstruction
* Mô tả được quy trình xây dựng một hệ thống Computer Vision.
* Biết một số công cụ phổ biến như **OpenCV, CVAT, PyTorch, TensorFlow**.
* Giải thích được vai trò của các mô hình Deep Learning trong Computer Vision.
* Phân biệt được các nhóm mô hình Classification, Detection, Segmentation và Foundation Model.
* Hiểu nguyên lý **Transfer Learning** và biết khi nào nên sử dụng.

---

# SLIDE 3: NỘI DUNG CHƯƠNG

### 1. Tổng quan về Thị giác máy tính

* Khái niệm Computer Vision
* Đầu vào và đầu ra
* Kiến trúc tổng quát
* Mục tiêu và ứng dụng
* Computer Vision và Image Processing

### 2. Các bài toán trong Computer Vision

* Classification
* Object Detection
* Segmentation
* Feature / Keypoint Detection
* OCR
* Pose Estimation
* 3D Reconstruction

### 3. Quy trình và công cụ

* Xác định bài toán
* Dữ liệu và gán nhãn
* Tiền xử lý
* Huấn luyện và đánh giá
* Triển khai
* Công cụ và thư viện

### 4. Ứng dụng mô hình AI

* CNN và các mô hình Classification
* Object Detection
* Segmentation
* Pose và OCR
* Vision Transformer
* Foundation Models

### 5. Transfer Learning

* Pretrained Model
* Feature Extraction
* Fine-tuning
* Chiến lược thực tế

---

# PHẦN I

# TỔNG QUAN VỀ THỊ GIÁC MÁY TÍNH

---

# SLIDE 4: COMPUTER VISION LÀ GÌ?

### Khái niệm

**Computer Vision (Thị giác máy tính)** là lĩnh vực nghiên cứu các phương pháp giúp máy tính **thu nhận, xử lý, phân tích và hiểu thông tin từ hình ảnh hoặc video**.

Mục tiêu không chỉ là xử lý ảnh mà là:

> **Biến dữ liệu hình ảnh thành thông tin có ý nghĩa để máy tính có thể nhận biết, suy luận hoặc đưa ra hành động.**

### Ví dụ

Camera quan sát một người đi vào khu vực cấm:

```text
Ảnh camera
    ↓
Phát hiện người
    ↓
Xác định vị trí
    ↓
Nhận biết khu vực cấm
    ↓
Phát hiện xâm nhập
    ↓
Phát cảnh báo
```

### Ý tưởng cốt lõi

> **Computer Vision chuyển từ "pixel" sang "meaning".**

---

# SLIDE 5: TỪ PIXEL ĐẾN THÔNG TIN CÓ Ý NGHĨA

Máy tính không nhìn ảnh giống con người.

Đối với máy tính, ảnh trước hết là:

> **Một ma trận các giá trị số.**

Ví dụ ảnh grayscale:

$$
I(x,y)\in[0,255]
$$

Trong đó:

* \(x,y\): vị trí pixel.
* \(I(x,y)\): mức xám tại pixel.
* 0: đen.
* 255: trắng.

Đối với ảnh màu RGB:

$$
I(x,y)=[R,G,B]
$$

### Quá trình Computer Vision

```text
Pixel
  ↓
Đặc trưng / biểu diễn
  ↓
Thông tin thị giác
  ↓
Nhận thức
  ↓
Quyết định / hành động
```

Ví dụ:

```text
Pixel
 ↓
Các đặc trưng hình dạng
 ↓
Hình dạng chiếc xe
 ↓
Đối tượng "car"
 ↓
Xe đang đi trên đường
```

---

# SLIDE 6: ĐẦU VÀO CỦA COMPUTER VISION

Computer Vision có thể tiếp nhận nhiều loại dữ liệu.

### Ảnh tĩnh

* JPG
* PNG
* Ảnh y tế
* Ảnh vệ tinh
* Ảnh tài liệu

### Video

* Chuỗi frame liên tiếp.
* Camera giao thông.
* Camera giám sát.
* Video trực tuyến.

### Camera thời gian thực

* Webcam.
* Camera an ninh.
* Camera trên xe.
* Camera công nghiệp.

### Các nguồn khác

* Drone.
* Smartphone.
* CCTV.
* Camera 3D.
* Các cảm biến hình ảnh chuyên dụng.

### Lưu ý

> **Video có thể được xem như một chuỗi các frame ảnh theo thời gian.**

---

# SLIDE 7: ĐẦU RA CỦA COMPUTER VISION

Tùy bài toán, hệ thống có thể tạo ra nhiều loại đầu ra.

### 1. Nhãn

Ví dụ:

```text
Ảnh → "Cat"
```

### 2. Vị trí

Ví dụ:

```text
Ảnh
 ↓
Bounding Box
 ↓
(x, y, width, height)
```

### 3. Mask

Mỗi pixel được xác định thuộc đối tượng hoặc lớp nào.

### 4. Văn bản

Ví dụ:

```text
Ảnh biển báo
      ↓
"STOP"
```

### 5. Keypoint

Ví dụ các điểm:

* Vai
* Khuỷu tay
* Cổ tay
* Đầu gối
* Mắt cá chân

### 6. Thông tin định lượng

* Khoảng cách
* Kích thước
* Tốc độ
* Góc
* Số lượng đối tượng

---

# SLIDE 8: KIẾN TRÚC TỔNG QUÁT CỦA COMPUTER VISION

Một hệ thống Computer Vision có thể được mô tả khái quát:

```text
┌─────────────────────────────┐
│           INPUT             │
│  Image / Video / Camera     │
│  Drone / CCTV / Sensor      │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│      TIỀN XỬ LÝ DỮ LIỆU     │
│ Resize / Denoise / Normalize│
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│    BIỂU DIỄN THỊ GIÁC       │
│ Feature / Deep Feature      │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│      NHẬN THỨC THỊ GIÁC     │
│ Classification / Detection  │
│ Segmentation / OCR / Pose   │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│     HẬU XỬ LÝ & QUYẾT ĐỊNH   │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│           OUTPUT            │
│ Label / Box / Mask / Text   │
│ Measurement / Action        │
└─────────────────────────────┘
```

### Lưu ý

Đây là **kiến trúc khái quát**, không phải pipeline bắt buộc cho mọi hệ thống.

Trong Deep Learning hiện đại, nhiều bước có thể được **học đồng thời trong một mô hình end-to-end**.

---

# SLIDE 9: TIỀN XỬ LÝ TRONG COMPUTER VISION

Tiền xử lý nhằm đưa dữ liệu về dạng phù hợp trước khi phân tích.

### Các thao tác phổ biến

**Resize**

* Đưa ảnh về kích thước chuẩn.
* Ví dụ: \(224\times224\).

**Denoising**

* Giảm nhiễu.
* Gaussian Blur.
* Median Filter.

**Normalization**

* Đưa giá trị pixel về miền phù hợp.
* Ví dụ:

$$
I'=\frac{I}{255}
$$

**Color conversion**

* RGB → Grayscale.
* RGB → HSV.

### Với OpenCV

OpenCV cung cấp các hàm phổ biến cho:

* Đọc/ghi ảnh.
* Resize.
* Blur.
* Color conversion.
* Threshold.
* Edge detection.

---

# SLIDE 10: BIỂU DIỄN VÀ ĐẶC TRƯNG

Để nhận biết nội dung ảnh, hệ thống cần một cách biểu diễn ảnh.

### Computer Vision truyền thống

Đặc trưng được thiết kế thủ công:

* Edge
* Corner
* Texture
* Shape
* Keypoint
* Histogram

Ví dụ:

```text
Ảnh
 ↓
Canny Edge
 ↓
Các đường biên
 ↓
Đặc trưng hình dạng
```

### Deep Learning

Đặc trưng được **học tự động từ dữ liệu**.

```text
Image
 ↓
Neural Network
 ↓
Low-level features
 ↓
Mid-level features
 ↓
High-level features
 ↓
Prediction
```

### Ý nghĩa

> Deep Learning chuyển một phần lớn quá trình thiết kế đặc trưng từ con người sang mô hình.

---

# SLIDE 11: NHẬN THỨC THỊ GIÁC

Computer Vision không chỉ tìm pixel hoặc cạnh.

Hệ thống có thể cần trả lời:

### "Có gì trong ảnh?"

→ Object Recognition

### "Nó ở đâu?"

→ Object Detection

### "Pixel nào thuộc về nó?"

→ Segmentation

### "Đó là chữ gì?"

→ OCR

### "Người đang làm gì?"

→ Action / Pose Recognition

### "Cấu trúc không gian của cảnh như thế nào?"

→ 3D Reconstruction

---

# SLIDE 12: COMPUTER VISION VÀ IMAGE PROCESSING

| Khía cạnh                  | Image Processing           | Computer Vision           |
| -------------------------- | -------------------------- | ------------------------- |
| Mục tiêu                   | Cải thiện / biến đổi ảnh   | Hiểu nội dung ảnh         |
| Đầu vào                    | Ảnh                        | Ảnh / video / camera      |
| Trọng tâm                  | Pixel và biểu diễn ảnh     | Đối tượng và ngữ nghĩa    |
| Kỹ thuật                   | Lọc, histogram, morphology | ML, DL, recognition       |
| Đầu ra                     | Ảnh mới                    | Label, box, mask, text... |
| Có cần dữ liệu huấn luyện? | Thường không               | Thường có với ML/DL       |
| Ví dụ                      | Khử nhiễu                  | Nhận diện người           |

### Quan hệ giữa hai lĩnh vực

```text
Image Processing
      ↓
Tiền xử lý / cải thiện dữ liệu
      ↓
Computer Vision
      ↓
Nhận thức và hiểu ảnh
```

> Image Processing và Computer Vision có vùng giao nhau; xử lý ảnh thường đóng vai trò hỗ trợ cho hệ thống Computer Vision.

---

# SLIDE 13: MỤC TIÊU CỦA COMPUTER VISION

### 1. Hiểu nội dung ảnh

* Nhận dạng người, xe, động vật.
* Nhận dạng cảnh.
* Nhận dạng hành động.
* Xác định quan hệ giữa các đối tượng.

### 2. Trích xuất thông tin

* Tọa độ.
* Bounding box.
* Mask.
* Text.
* Keypoint.
* Số lượng.

### 3. Hỗ trợ ra quyết định

Ví dụ:

**Y tế**

```text
Ảnh CT → phát hiện vùng bất thường → hỗ trợ bác sĩ
```

**Giao thông**

```text
Camera → phát hiện người/xe → cảnh báo
```

### 4. Hoạt động trong điều kiện đa dạng

* Ánh sáng khác nhau.
* Góc nhìn khác nhau.
* Độ phân giải khác nhau.
* Thời tiết khác nhau.
* Nhiễu và che khuất.

---

# SLIDE 14: ỨNG DỤNG COMPUTER VISION

### Đời sống

* Face Unlock.
* Tìm kiếm ảnh theo nội dung.
* AR Filter.

### Y tế

* Phân tích X-quang, CT, MRI.
* Phát hiện vùng bất thường.
* Phân đoạn mô và cơ quan.

### Giao thông

* Phát hiện phương tiện.
* Nhận diện người đi bộ.
* Nhận diện biển báo.
* Phân tích làn đường.

### Công nghiệp

* Kiểm tra lỗi sản phẩm.
* Đọc mã vạch.
* Kiểm soát chất lượng.

### Nông nghiệp

* Phát hiện sâu bệnh.
* Đếm trái cây.
* Ước tính sản lượng.

### Thương mại điện tử

* Tìm kiếm bằng hình ảnh.
* Thử sản phẩm ảo.
* Phân tích sản phẩm.

---

# PHẦN II

# CÁC BÀI TOÁN TRONG COMPUTER VISION

---

# SLIDE 15: BỨC TRANH TỔNG THỂ CÁC BÀI TOÁN

Các bài toán Computer Vision có thể phân loại theo loại thông tin cần lấy ra:

```text
                 COMPUTER VISION
                       │
       ┌───────────────┼────────────────┐
       ↓               ↓                ↓
   Nhận dạng       Định vị          Pixel-level
       │               │                │
Classification     Detection       Segmentation
       │
       ├── OCR
       ├── Pose / Keypoint
       └── Feature Detection

                 Hình học 3D
                     │
             3D Reconstruction
```

### Câu hỏi quan trọng

> **Bài toán cần hệ thống trả lời câu hỏi gì?**

---

# SLIDE 16: BÀI TOÁN 1 – IMAGE CLASSIFICATION

### Định nghĩa

Classification trả lời câu hỏi:

> **"Ảnh này thuộc lớp nào?"**

### Đầu vào

Một ảnh.

### Đầu ra

Một hoặc nhiều nhãn lớp tùy bài toán.

Ví dụ:

```text
        Image
          ↓
    Classification
          ↓
        "Cat"
```

### Đặc điểm

* Không cần xác định vị trí từng đối tượng.
* Trọng tâm là **class của ảnh hoặc nội dung được yêu cầu phân loại**.

### Ví dụ

* Mèo / chó.
* Sản phẩm tốt / lỗi.
* Bệnh / không bệnh.
* Chữ số 0–9.

---

# SLIDE 17: CLASSIFICATION – VÍ DỤ

Giả sử hệ thống phân loại động vật:

```text
┌───────────────┐
│     IMAGE     │
│    🐈         │
└───────┬───────┘
        ↓
    Model AI
        ↓
┌───────────────┐
│ Cat: 0.96     │
│ Dog: 0.03     │
│ Bird: 0.01    │
└───────────────┘
```

Mô hình thường trả về xác suất hoặc confidence cho các lớp.

### Điểm quan trọng

Classification trả lời:

> **"Đây là loại gì?"**

chứ không nhất thiết trả lời:

> **"Nó nằm ở đâu?"**

---

# SLIDE 18: BÀI TOÁN 2 – OBJECT DETECTION

### Định nghĩa

Detection trả lời đồng thời hai câu hỏi:

> **Có đối tượng nào?**

> **Đối tượng nằm ở đâu?**

### Đầu ra

Mỗi đối tượng thường gồm:

* Class.
* Bounding Box.
* Confidence.

Ví dụ:

```text
Person   → box + confidence
Car      → box + confidence
Bicycle  → box + confidence
```

### Ví dụ

Một ảnh giao thông có:

* 3 người.
* 2 ô tô.
* 1 xe đạp.

Detection tạo ra **nhiều dự đoán**, mỗi dự đoán có vị trí riêng.

---

# SLIDE 19: BOUNDING BOX

Bounding Box là hình chữ nhật bao quanh đối tượng.

Có thể biểu diễn bằng:

$$
(x_{min},y_{min},x_{max},y_{max})
$$

hoặc:

$$
(x,y,w,h)
$$

Trong đó:

* \(x,y\): vị trí.
* \(w,h\): chiều rộng và chiều cao.

Ví dụ:

```text
┌──────────────────────────┐
│                          │
│      ┌─────────┐         │
│      │ PERSON  │         │
│      └─────────┘         │
│                          │
└──────────────────────────┘
```

### Bounding Box dùng để

* Xác định vị trí.
* Đếm đối tượng.
* Theo dõi đối tượng.
* Làm đầu vào cho các bước xử lý tiếp theo.

---

# SLIDE 20: CLASSIFICATION VS DETECTION

|              | Classification        | Detection            |
| ------------ | --------------------- | -------------------- |
| Câu hỏi      | Ảnh thuộc lớp nào?    | Có gì và ở đâu?      |
| Số đối tượng | Thường không quan tâm | Có thể nhiều         |
| Vị trí       | Không cần             | Cần                  |
| Bounding Box | Không                 | Có                   |
| Ví dụ        | "Ảnh có mèo"          | "Có 2 con mèo ở đây" |

### Minh họa

```text
Classification

[      🐱      ]
       ↓
      CAT


Detection

[  🐱     🐱   ]
   ↓       ↓
  Cat     Cat
```

---

# SLIDE 21: BÀI TOÁN 3 – IMAGE SEGMENTATION

### Định nghĩa

Segmentation xác định **nhãn cho từng pixel** của ảnh.

```text
Image
  ↓
Segmentation
  ↓
Pixel-level labels
```

### Đầu ra

Một mask tương ứng với ảnh.

Ví dụ:

```text
Pixel → Road
Pixel → Car
Pixel → Person
Pixel → Sky
```

### Khác với Detection

Detection:

> "Đối tượng nằm trong bounding box nào?"

Segmentation:

> "Chính xác pixel nào thuộc đối tượng?"

---

# SLIDE 22: BA LOẠI SEGMENTATION

### 1. Semantic Segmentation

Mỗi pixel được gán một class.

Ví dụ:

```text
Road
Road
Car
Person
Sky
```

Các đối tượng cùng lớp **không nhất thiết được phân biệt riêng**.

### 2. Instance Segmentation

Phân biệt từng instance.

Ví dụ:

```text
Person 1
Person 2
Person 3
```

### 3. Panoptic Segmentation

Kết hợp hai ý tưởng:

* Mọi pixel đều có semantic class.
* Các object instance được phân biệt riêng.

### Minh họa

```text
Semantic:
Person Person Person

Instance:
Person-1 Person-2 Person-3

Panoptic:
Background + Class + Instance
```

---

# SLIDE 23: DETECTION VS SEGMENTATION

|                 | Detection    | Segmentation           |
| --------------- | ------------ | ---------------------- |
| Đầu ra          | Bounding Box | Mask                   |
| Mức độ chi tiết | Object-level | Pixel-level            |
| Biên đối tượng  | Xấp xỉ       | Chi tiết hơn           |
| Độ phức tạp     | Thấp hơn     | Cao hơn                |
| Ví dụ           | Phát hiện xe | Tách chính xác vùng xe |

### Minh họa

```text
Detection

┌───────────────┐
│      CAR      │
└───────────────┘


Segmentation

      █████
    █████████
   ███████████
     ███████
```

---

# SLIDE 24: BÀI TOÁN 4 – KEYPOINT VÀ FEATURE DETECTION

### Keypoint

Keypoint là những điểm đặc biệt trong ảnh có tính phân biệt cao.

Ví dụ:

* Góc.
* Điểm nổi bật.
* Giao điểm.
* Chi tiết hình học.

### Descriptor

Descriptor là biểu diễn số mô tả vùng lân cận của keypoint.

```text
Image
 ↓
Keypoint Detection
 ↓
Keypoints
 ↓
Descriptor
 ↓
Feature Matching
```

### Một số phương pháp truyền thống

* SIFT
* ORB
* SURF

### Ứng dụng

* Panorama.
* Image matching.
* Tracking.
* 3D reconstruction.

---

# SLIDE 25: FEATURE MATCHING

Giả sử có hai ảnh của cùng một cảnh.

```text
Image A                Image B

•     •                •
    •                       •
       •                 •
  •                         •
```

Quy trình:

```text
Ảnh A → Keypoints → Descriptors
                         │
                         │ Matching
                         ↓
Ảnh B → Keypoints → Descriptors
```

Các điểm tương ứng được sử dụng để:

* Ghép ảnh.
* Tìm chuyển động camera.
* Tái tạo 3D.
* Theo dõi đối tượng.

### OpenCV

OpenCV hỗ trợ nhiều thao tác:

* ORB.
* SIFT.
* Descriptor matching.
* Homography.
* Image stitching.

---

# SLIDE 26: BÀI TOÁN 5 – OCR

### OCR – Optical Character Recognition

OCR là bài toán:

> **Chuyển nội dung chữ trong hình ảnh thành dữ liệu văn bản có thể xử lý bằng máy tính.**

### Ví dụ

```text
Ảnh biển số
    ↓
OCR
    ↓
"29A-12345"
```

### Ứng dụng

* Đọc biển số.
* Số hóa sách.
* Đọc hóa đơn.
* Trích xuất chứng từ.
* Đọc tài liệu.
* Hỗ trợ người khiếm thị.

### Pipeline OCR cơ bản

```text
Image
 ↓
Preprocessing
 ↓
Text Detection
 ↓
Text Recognition
 ↓
Text
```

---

# SLIDE 27: BÀI TOÁN 6 – POSE ESTIMATION

Pose Estimation xác định vị trí các **keypoint của cơ thể người**.

Ví dụ:

* Đầu.
* Vai.
* Khuỷu tay.
* Cổ tay.
* Hông.
* Đầu gối.
* Mắt cá chân.

### Đầu ra

```text
Person
 ↓
17 / nhiều keypoints
 ↓
Skeleton
```

### Ứng dụng

* Phân tích thể thao.
* AR.
* Game.
* Điều khiển bằng cử chỉ.
* Phục hồi chức năng.
* Phân tích tư thế.

---

# SLIDE 28: BÀI TOÁN 7 – 3D RECONSTRUCTION

### Mục tiêu

Xây dựng cấu trúc hoặc mô hình 3D từ:

* Một hoặc nhiều ảnh.
* Video.
* Nhiều góc nhìn.

### Ví dụ

```text
Image 1 ─┐
Image 2 ─┼→ 3D Reconstruction → 3D Model
Image 3 ─┘
```

### Hai kỹ thuật quan trọng

**Structure from Motion – SfM**

* Suy ra cấu trúc 3D từ chuyển động của camera.

**Multi-view Stereo – MVS**

* Sử dụng nhiều ảnh để tạo dense 3D information / point cloud.

### Ứng dụng

* Bản đồ 3D.
* Di sản số.
* VR/AR.
* Phim ảnh.
* Số hóa vật thể.

---

# SLIDE 29: TỔNG HỢP CÁC BÀI TOÁN

| Bài toán          | Câu hỏi                | Đầu ra                |
| ----------------- | ---------------------- | --------------------- |
| Classification    | Đây là gì?             | Label                 |
| Detection         | Có gì và ở đâu?        | Label + Box           |
| Segmentation      | Pixel nào thuộc về gì? | Mask                  |
| Feature Detection | Điểm nào đặc biệt?     | Keypoint + Descriptor |
| OCR               | Chữ trong ảnh là gì?   | Text                  |
| Pose              | Các bộ phận nằm ở đâu? | Keypoints             |
| 3D Reconstruction | Cấu trúc 3D thế nào?   | 3D structure          |

### Nguyên tắc

> **Bắt đầu từ yêu cầu đầu ra của bài toán, sau đó mới lựa chọn thuật toán hoặc mô hình.**

---

# PHẦN III

# QUY TRÌNH XÂY DỰNG HỆ THỐNG COMPUTER VISION

---

# SLIDE 30: TỪ BÀI TOÁN THỰC TẾ ĐẾN HỆ THỐNG CV

Một hệ thống Computer Vision không bắt đầu bằng việc chọn model.

Quy trình nên bắt đầu từ:

```text
Vấn đề thực tế
      ↓
Xác định bài toán
      ↓
Xác định dữ liệu
      ↓
Xác định đầu ra
      ↓
Chọn phương pháp
      ↓
Huấn luyện
      ↓
Đánh giá
      ↓
Triển khai
```

### Ví dụ

Bài toán:

> Phát hiện sản phẩm lỗi trên dây chuyền.

Cần xác định:

* Lỗi là gì?
* Có bao nhiêu loại lỗi?
* Cần classification hay detection?
* Camera đặt ở đâu?
* Cần real-time hay không?
* Sai sót nào nghiêm trọng nhất?

---

# SLIDE 31: BƯỚC 1 – XÁC ĐỊNH BÀI TOÁN

### Cần xác định

**Mục tiêu**

* Hệ thống cần giải quyết vấn đề gì?

**Đầu vào**

* Ảnh?
* Video?
* Camera?
* Drone?

**Đầu ra**

* Label?
* Bounding box?
* Mask?
* Text?
* Keypoint?

**Ràng buộc**

* Độ chính xác.
* Tốc độ.
* Bộ nhớ.
* Thiết bị triển khai.

### Ví dụ

```text
Input:
Ảnh sản phẩm

Output:
GOOD / DEFECT

→ Classification
```

---

# SLIDE 32: BƯỚC 2 – THU THẬP DỮ LIỆU

### Nguồn dữ liệu

* Camera.
* Smartphone.
* Drone.
* Dataset công khai.
* Hệ thống hiện có.

### Dữ liệu cần đủ đa dạng

* Góc nhìn.
* Ánh sáng.
* Khoảng cách.
* Độ phân giải.
* Nền.
* Vật thể.
* Điều kiện môi trường.

### Nguyên tắc

> Dữ liệu phải đại diện cho điều kiện mà hệ thống sẽ gặp khi triển khai.

### Ví dụ

Không chỉ thu thập:

```text
Ảnh sản phẩm đẹp
```

mà cần:

```text
Sản phẩm tốt
Sản phẩm lỗi nhẹ
Sản phẩm lỗi nặng
Góc nhìn khác nhau
Ánh sáng khác nhau
```

---

# SLIDE 33: BƯỚC 3 – GÁN NHÃN DỮ LIỆU

Đối với Supervised Learning, dữ liệu cần có **ground truth**.

### Classification

```text
Image → Label
```

### Detection

```text
Image → Bounding Boxes + Labels
```

### Segmentation

```text
Image → Pixel Masks
```

### Công cụ

* LabelImg.
* CVAT.
* makesense.ai.
* Các công cụ annotation chuyên dụng.

### Nguyên tắc

> Chất lượng nhãn ảnh hưởng trực tiếp đến chất lượng mô hình.

---

# SLIDE 34: BƯỚC 4 – CHIA DỮ LIỆU

Không nên dùng toàn bộ dữ liệu để huấn luyện.

Thông thường dữ liệu được chia thành:

```text
Dataset
  │
  ├── Training Set
  │      ↓
  │   Huấn luyện model
  │
  ├── Validation Set
  │      ↓
  │   Chọn model / tham số
  │
  └── Test Set
         ↓
      Đánh giá cuối
```

### Training Set

Mô hình sử dụng để học.

### Validation Set

Dùng trong quá trình phát triển để:

* Chọn hyperparameter.
* So sánh mô hình.
* Theo dõi overfitting.

### Test Set

Dùng để đánh giá cuối cùng trên dữ liệu mô hình chưa sử dụng để lựa chọn.

---

# SLIDE 35: BƯỚC 5 – TIỀN XỬ LÝ VÀ AUGMENTATION

### Tiền xử lý

* Resize.
* Normalize.
* Denoising.
* Color conversion.

### Data Augmentation

Tạo biến thể dữ liệu từ ảnh hiện có.

Ví dụ:

* Flip.
* Rotation.
* Crop.
* Scale.
* Brightness.
* Contrast.

```text
Original Image
      │
 ┌────┼─────┐
 ↓    ↓     ↓
Flip Rotate Brightness
 │    │     │
 └────┼─────┘
      ↓
 More Training Samples
```

### Mục tiêu

* Tăng tính đa dạng dữ liệu.
* Giảm overfitting.
* Tăng khả năng tổng quát hóa.

---

# SLIDE 36: BƯỚC 6 – XÂY DỰNG MÔ HÌNH

Có thể lựa chọn:

### Machine Learning truyền thống

* SVM.
* k-NN.
* Decision Tree.
* Random Forest.

Thường cần:

```text
Image
 ↓
Feature Extraction
 ↓
ML Model
 ↓
Prediction
```

### Deep Learning

```text
Image
 ↓
Neural Network
 ↓
Feature Learning
 ↓
Prediction
```

### Các quyết định

* Chọn architecture.
* Chọn pretrained model.
* Chọn loss function.
* Chọn optimizer.
* Chọn learning rate.
* Chọn batch size.

---

# SLIDE 37: BƯỚC 7 – HUẤN LUYỆN

Trong quá trình training:

```text
Input Image
     ↓
Model
     ↓
Prediction
     ↓
Loss
     ↓
Backpropagation
     ↓
Update Parameters
```

Lặp lại qua nhiều batch và epoch.

### Mục tiêu

Tìm các tham số mô hình sao cho:

$$
Loss \rightarrow \min
$$

### Cần theo dõi

* Training loss.
* Validation loss.
* Training accuracy.
* Validation accuracy.

### Vấn đề thường gặp

**Underfitting**

→ Model chưa học đủ.

**Overfitting**

→ Model học quá tốt training data nhưng kém trên dữ liệu mới.

---

# SLIDE 38: BƯỚC 8 – ĐÁNH GIÁ MÔ HÌNH

Không nên chỉ nhìn vào Accuracy.

### Classification

* Accuracy.
* Precision.
* Recall.
* F1-score.
* Confusion Matrix.

### Detection

* IoU.
* Precision.
* Recall.
* mAP.

### Segmentation

* IoU.
* Dice Score.
* Pixel Accuracy.

### Ngoài độ chính xác

Cần đánh giá:

* Inference time.
* FPS.
* Memory.
* Model size.
* Resource consumption.

> Một mô hình chính xác nhưng quá chậm có thể không phù hợp với ứng dụng real-time.

---

# SLIDE 39: BƯỚC 9 – TRIỂN KHAI

Sau khi đánh giá, mô hình được đưa vào môi trường thực tế.

### Server / Cloud

Phù hợp khi:

* Cần GPU mạnh.
* Dữ liệu có thể gửi lên server.
* Không yêu cầu độ trễ quá thấp.

### PC / Workstation

* Camera công nghiệp.
* Hệ thống giám sát.

### Edge Device

* Smartphone.
* Raspberry Pi.
* Jetson.
* Camera thông minh.
* IoT.

### Mục tiêu

> Mô hình không chỉ cần "chạy được" mà phải đáp ứng yêu cầu của môi trường triển khai.

---

# SLIDE 40: BƯỚC 10 – GIÁM SÁT VÀ CẢI TIẾN

Sau khi triển khai, hệ thống vẫn cần được theo dõi.

### Các vấn đề

* Dữ liệu mới khác dữ liệu huấn luyện.
* Điều kiện ánh sáng thay đổi.
* Camera thay đổi.
* Xuất hiện đối tượng mới.
* Chất lượng dự đoán giảm.

### Quy trình cải tiến

```text
Deployment
    ↓
Monitoring
    ↓
Collect New Data
    ↓
Re-label
    ↓
Retrain / Fine-tune
    ↓
Evaluate
    ↓
Redeploy
```

### Nguyên tắc

> Computer Vision là một vòng lặp cải tiến liên tục, không phải một lần huấn luyện rồi kết thúc.

---

# SLIDE 41: PIPELINE HOÀN CHỈNH

```text
┌─────────────────────┐
│ 1. Problem          │
│    Definition       │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ 2. Data Collection  │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ 3. Annotation       │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ 4. Train / Val /    │
│    Test              │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ 5. Preprocessing    │
│    & Augmentation   │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ 6. Model Training   │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ 7. Evaluation       │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ 8. Deployment       │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ 9. Monitoring       │
└─────────┬───────────┘
          │
          └──────→ Improve
```

### Thông điệp chính

> **Dữ liệu → Mô hình → Đánh giá → Triển khai → Cải tiến**

---

# PHẦN IV

# CÔNG CỤ VÀ THƯ VIỆN

---

# SLIDE 42: HỆ SINH THÁI CÔNG CỤ COMPUTER VISION

Có thể chia công cụ thành các nhóm:

```text
Computer Vision Ecosystem
│
├── Image Processing
│   ├── OpenCV
│   ├── Pillow
│   └── scikit-image
│
├── Machine Learning
│   ├── scikit-learn
│   └── XGBoost
│
├── Deep Learning
│   ├── PyTorch
│   ├── TensorFlow
│   └── Keras
│
├── Annotation
│   ├── CVAT
│   └── LabelImg
│
└── Deployment
    ├── ONNX
    ├── TensorRT
    ├── OpenVINO
    └── TFLite
```

---

# SLIDE 43: OPENCV

### OpenCV – Open Source Computer Vision Library

OpenCV là thư viện phổ biến cho:

* Xử lý ảnh.
* Computer Vision.
* Video processing.
* Camera.
* Feature detection.
* Object tracking.

### Một số thao tác cơ bản

```text
Đọc ảnh
   ↓
Resize
   ↓
Color Conversion
   ↓
Blur
   ↓
Edge Detection
   ↓
Display / Save
```

### Các bài toán có thể thực hành

* Grayscale.
* Threshold.
* Canny.
* Contour.
* Hough Transform.
* SIFT / ORB.
* Feature Matching.
* Video processing.

### Vai trò trong chương

> OpenCV đặc biệt phù hợp để minh họa các thuật toán Computer Vision truyền thống và xây dựng pipeline tiền xử lý.

---

# SLIDE 44: MACHINE LEARNING VÀ DEEP LEARNING FRAMEWORK

### Machine Learning

**scikit-learn**

* SVM.
* k-NN.
* Decision Tree.
* Random Forest.
* Các thuật toán preprocessing và evaluation.

**XGBoost**

* Gradient Boosting.
* Classification.
* Regression.

### Deep Learning

**PyTorch**

* Linh hoạt.
* Phổ biến trong nghiên cứu.
* Hệ sinh thái Deep Learning mạnh.

**TensorFlow**

* Deep Learning framework.
* Hỗ trợ triển khai production.

**Keras**

* API cấp cao.
* Dễ xây dựng mô hình Deep Learning.
* Có thể chạy trên TensorFlow.

---

# SLIDE 45: CÔNG CỤ GÁN NHÃN

### LabelImg

Phù hợp với:

* Bounding Box.
* Object Detection.

### CVAT

Hỗ trợ nhiều dạng annotation:

* Classification.
* Detection.
* Segmentation.
* Tracking.

### makesense.ai

* Công cụ trực tuyến.
* Không cần cài đặt.
* Phù hợp cho các bài tập nhỏ.

### Quy trình

```text
Raw Images
    ↓
Annotation Tool
    ↓
Labeled Dataset
    ↓
Training
```

---

# SLIDE 46: CÔNG CỤ TRIỂN KHAI

### ONNX

Định dạng trung gian giúp trao đổi mô hình giữa các framework / runtime.

### TensorRT

* Tối ưu inference.
* Phù hợp GPU NVIDIA.

### OpenVINO

* Tối ưu cho hệ sinh thái Intel.
* Hướng tới CPU và các phần cứng hỗ trợ.

### TensorFlow Lite

* Hướng tới mobile và edge devices.

### Mục tiêu

```text
Training Model
      ↓
Optimization / Conversion
      ↓
Deployment Runtime
      ↓
Real Application
```

---

# PHẦN V

# ỨNG DỤNG MÔ HÌNH AI TRONG COMPUTER VISION

---

# SLIDE 47: MÔ HÌNH AI LÀ GÌ?

Mô hình AI là một mô hình tính toán được huấn luyện từ dữ liệu để học mối quan hệ giữa **đầu vào và đầu ra**.

### Lập trình truyền thống

```text
Input + Rules
      ↓
Program
      ↓
Output
```

Con người xây dựng quy tắc.

### Machine Learning

```text
Input + Label
      ↓
Learning Algorithm
      ↓
Model
```

Máy học quy luật từ dữ liệu.

### Computer Vision

```text
Image
 ↓
AI Model
 ↓
Label / Box / Mask / Text
```

---

# SLIDE 48: TỪ CNN ĐẾN DEEP LEARNING

CNN – Convolutional Neural Network là một kiến trúc quan trọng trong Computer Vision.

### Ý tưởng

Các lớp convolution học các đặc trưng từ ảnh.

```text
Image
 ↓
Edges
 ↓
Textures
 ↓
Shapes
 ↓
Objects
```

### Đặc điểm

Các lớp đầu thường học đặc trưng mức thấp.

Các lớp sâu hơn học đặc trưng mức cao.

### Vì vậy

> CNN cho phép mô hình học biểu diễn ảnh thay vì phải thiết kế toàn bộ đặc trưng bằng tay.

---

# NHÓM 1 – CLASSIFICATION MODELS

---

# SLIDE 49: CÁC THẾ HỆ MÔ HÌNH CLASSIFICATION

Một số kiến trúc tiêu biểu:

```text
AlexNet
   ↓
VGG
   ↓
ResNet
   ↓
MobileNet / EfficientNet
   ↓
Vision Transformer
```

Mỗi thế hệ tập trung vào những vấn đề khác nhau:

* Tăng khả năng học.
* Tăng độ sâu.
* Giảm chi phí tính toán.
* Cải thiện hiệu quả.
* Khai thác Attention / Transformer.

---

# SLIDE 50: ALEXNET

### Sự ra đời

* Công bố năm 2012.
* Tác giả: Alex Krizhevsky, Ilya Sutskever và Geoffrey Hinton.
* Đạt kết quả nổi bật tại ImageNet 2012.

### Đặc điểm

* CNN sâu hơn các mô hình trước đó.
* Sử dụng ReLU.
* Sử dụng Dropout.
* Huấn luyện trên GPU.

### Ý nghĩa

AlexNet là một dấu mốc quan trọng trong sự phát triển của:

> **Deep Learning cho Computer Vision.**

### Bài học

> Dữ liệu lớn + mạng sâu + GPU đã tạo ra bước tiến mạnh về nhận dạng ảnh.

---

# SLIDE 51: VGG

### Đặc điểm

VGG nổi bật với kiến trúc đơn giản:

* Sử dụng convolution \(3\times3\).
* Xếp chồng nhiều convolution.
* Các phiên bản nổi bật:

  * VGG-16
  * VGG-19

### Ưu điểm

* Kiến trúc dễ hiểu.
* Có tính hệ thống.
* Phù hợp minh họa kiến trúc CNN.

### Nhược điểm

* Nhiều tham số.
* Chi phí tính toán và bộ nhớ lớn.

### Vai trò

VGG từng được sử dụng rộng rãi:

* Classification.
* Feature extraction.
* Transfer Learning.

---

# SLIDE 52: RESNET

### Vấn đề

Khi mạng quá sâu, việc huấn luyện trở nên khó khăn.

ResNet đưa vào:

> **Skip Connection / Residual Connection**

Công thức:

$$
y=F(x)+x
$$

Trong đó:

* \(x\): đầu vào.
* \(F(x)\): phần biến đổi học được.
* \(y\): đầu ra.

### Các phiên bản

* ResNet-18.
* ResNet-50.
* ResNet-101.
* ResNet-152.

### Ý nghĩa

ResNet trở thành một kiến trúc backbone quan trọng cho:

* Classification.
* Detection.
* Segmentation.
* Transfer Learning.

---

# SLIDE 53: MOBILENET

### Mục tiêu

Chạy Computer Vision trên:

* Mobile.
* IoT.
* Edge device.
* Thiết bị có tài nguyên hạn chế.

### Ý tưởng

Sử dụng:

> **Depthwise Separable Convolution**

Thay convolution thông thường bằng các phép tính hiệu quả hơn.

### Kết quả

* Ít tham số hơn.
* Ít phép tính hơn.
* Tốc độ inference tốt hơn trên thiết bị hạn chế.

### Các phiên bản

* MobileNetV1.
* MobileNetV2.
* MobileNetV3.

### Ứng dụng

* Smartphone.
* Camera thông minh.
* Drone.
* IoT.

---

# SLIDE 54: EFFICIENTNET

### Mục tiêu

Cân bằng:

* Accuracy.
* Model size.
* Computational cost.

### Ý tưởng

**Compound Scaling**

Mở rộng đồng thời:

* Depth.
* Width.
* Input resolution.

### Các phiên bản

```text
EfficientNet-B0
       ↓
EfficientNet-B1
       ↓
...
       ↓
EfficientNet-B7
```

### Ứng dụng

* Classification.
* Feature extraction.
* Industrial inspection.
* Edge deployment.

### Ý nghĩa

> Không phải mô hình lớn nhất luôn là mô hình phù hợp nhất.

---

# SLIDE 55: VISION TRANSFORMER – ViT

### Ý tưởng

Thay vì xử lý ảnh trực tiếp như một ma trận lớn, ViT chia ảnh thành các **patch**.

Ví dụ:

```text
Image
 ↓
16×16 patches
 ↓
Patch Embeddings
 ↓
Transformer
 ↓
Classification
```

### Khác với CNN

CNN có inductive bias mạnh về:

* Local structure.
* Convolution.

Transformer sử dụng:

* Self-attention.
* Quan hệ giữa các patch.

### Ý nghĩa

Transformer mở rộng mạnh cách tiếp cận Deep Learning trong Computer Vision.

---

# NHÓM 2 – OBJECT DETECTION

---

# SLIDE 56: HAI HƯỚNG TIẾP CẬN DETECTION

Có thể chia các detector thành hai nhóm lớn:

### Two-stage detector

```text
Image
 ↓
Region Proposals
 ↓
Classification + Box Refinement
 ↓
Detection
```

Ví dụ:

* Faster R-CNN.

### One-stage detector

```text
Image
 ↓
Detection Network
 ↓
Boxes + Classes
```

Ví dụ:

* YOLO.

### Đánh đổi

```text
Accuracy ↔ Speed ↔ Resource
```

---

# SLIDE 57: FASTER R-CNN

### Ý tưởng chính

Faster R-CNN sử dụng:

> **Region Proposal Network – RPN**

để đề xuất các vùng có khả năng chứa đối tượng.

### Pipeline

```text
Image
 ↓
Backbone
 ↓
Feature Map
 ↓
RPN
 ↓
Region Proposals
 ↓
Classification + Bounding Box
 ↓
Final Detection
```

### Đặc điểm

* Hai giai đoạn.
* Độ chính xác cao.
* Chi phí tính toán lớn hơn các detector real-time.

### Ứng dụng

* Phân tích ảnh y tế.
* Kiểm tra sản phẩm.
* Hệ thống cần độ chính xác cao.

---

# SLIDE 58: YOLO

### YOLO – You Only Look Once

Ý tưởng:

> Thực hiện detection trong một lần xử lý chính của mạng.

### Pipeline khái quát

```text
Image
 ↓
YOLO Network
 ↓
Bounding Boxes
 + Classes
 + Confidence
```

### Đặc điểm

* One-stage detector.
* Tốc độ cao.
* Phù hợp nhiều ứng dụng real-time.

### Ứng dụng

* Camera giao thông.
* Giám sát.
* Robot.
* Drone.
* Kiểm kê hàng hóa.

### Thông điệp

> YOLO là một **họ mô hình**, phát triển qua nhiều phiên bản.

---

# SLIDE 59: SO SÁNH FASTER R-CNN VÀ YOLO

|                 | Faster R-CNN      | YOLO                |
| --------------- | ----------------- | ------------------- |
| Kiến trúc       | Two-stage         | One-stage           |
| Region Proposal | Có                | Không theo cách RPN |
| Tốc độ          | Thường thấp hơn   | Thường cao          |
| Accuracy        | Cao               | Cao                 |
| Real-time       | Khó hơn           | Phù hợp hơn         |
| Ứng dụng        | Accuracy-oriented | Real-time           |

### Kết luận

Không có mô hình "tốt nhất" cho mọi bài toán.

Cần cân nhắc:

* Accuracy.
* Latency.
* FPS.
* Hardware.
* Model size.
* Dữ liệu.

---

# NHÓM 3 – SEGMENTATION

---

# SLIDE 60: MASK R-CNN

Mask R-CNN mở rộng Faster R-CNN cho:

> **Instance Segmentation**

### Đầu ra

Mỗi đối tượng có:

* Class.
* Bounding Box.
* Mask.

```text
Image
 ↓
Backbone
 ↓
Detection
 ↓
┌─────────────┬─────────────┬─────────────┐
│ Class       │ Bounding Box│ Mask        │
└─────────────┴─────────────┴─────────────┘
```

### Ứng dụng

* Tách từng người.
* Tách từng tế bào.
* Tách sản phẩm.
* Phân tích ảnh y tế.

---

# SLIDE 61: U-NET

### Mục tiêu

U-Net được thiết kế nổi bật cho:

> **Image Segmentation**

đặc biệt trong ảnh y tế.

### Kiến trúc

```text
Input
  ↓
Encoder
  ↓
Bottleneck
  ↓
Decoder
  ↓
Segmentation Mask
```

Có các **skip connections** giữa encoder và decoder.

### Vai trò của skip connection

Giúp decoder nhận lại thông tin chi tiết không gian từ encoder.

### Ứng dụng

* Khối u.
* Tế bào.
* Mạch máu.
* Ảnh vệ tinh.
* Làn đường.

---

# SLIDE 62: SO SÁNH CÁC NHÓM SEGMENTATION MODEL

| Model       | Bài toán tiêu biểu    |
| ----------- | --------------------- |
| U-Net       | Semantic segmentation |
| Mask R-CNN  | Instance segmentation |
| Mask2Former | Segmentation đa dạng  |
| nnU-Net     | Segmentation y tế     |

### Chọn theo yêu cầu

```text
Semantic
   ↓
U-Net / các semantic models

Instance
   ↓
Mask R-CNN / các instance models

Panoptic
   ↓
Panoptic segmentation models
```

---

# NHÓM 4 – POSE VÀ OCR

---

# SLIDE 63: OPENPOSE

### Mục tiêu

Xác định các keypoint trên cơ thể người.

```text
Person
 ↓
Keypoint Detection
 ↓
Skeleton
```

### Ví dụ keypoint

* Nose.
* Shoulder.
* Elbow.
* Wrist.
* Hip.
* Knee.
* Ankle.

### Đặc điểm

* Có thể xử lý nhiều người.
* Có thể dùng cho real-time pose estimation.

### Ứng dụng

* Thể thao.
* AR.
* Game.
* Phân tích tư thế.
* Phục hồi chức năng.

---

# SLIDE 64: TROCR

### TrOCR – Transformer-based OCR

TrOCR sử dụng kiến trúc Transformer cho OCR.

### Ý tưởng

```text
Image of Text
      ↓
Vision Encoder
      ↓
Text Decoder
      ↓
Recognized Text
```

### Ưu điểm

Có thể xử lý:

* Chữ in.
* Chữ viết tay.
* Chữ trong nhiều điều kiện khác nhau.

### Ứng dụng

* Số hóa tài liệu.
* Hóa đơn.
* Chứng từ.
* OCR tài liệu.
* Hệ thống giao thông.

---

# PHẦN VI

# FOUNDATION MODELS TRONG COMPUTER VISION

---

# SLIDE 65: TỪ MÔ HÌNH CHUYÊN BIỆT ĐẾN FOUNDATION MODEL

Mô hình truyền thống thường được thiết kế cho một nhiệm vụ:

```text
Model A → Classification
Model B → Detection
Model C → Segmentation
```

Foundation Model hướng tới:

> **Một mô hình có khả năng hỗ trợ nhiều nhiệm vụ hoặc thích nghi với nhiều nhiệm vụ.**

### Đặc điểm

* Được huấn luyện trên dữ liệu lớn.
* Khả năng biểu diễn tổng quát.
* Có thể thích nghi với nhiều nhiệm vụ.
* Có thể sử dụng zero-shot hoặc prompt-based interaction trong một số trường hợp.

---

# SLIDE 66: CLIP

### CLIP – Contrastive Language-Image Pretraining

CLIP học mối quan hệ giữa:

> **Hình ảnh ↔ Văn bản**

### Ý tưởng

```text
Image Encoder ──────┐
                    ├→ Shared Embedding Space
Text Encoder ───────┘
```

Ví dụ:

```text
Image: 🐱

Text 1: "a photo of a cat"
Text 2: "a photo of a car"
Text 3: "a photo of a dog"
```

Mô hình tìm mức độ tương đồng giữa ảnh và các mô tả.

### Ứng dụng

* Zero-shot classification.
* Image-text retrieval.
* Tìm kiếm ảnh bằng văn bản.
* Hệ thống multimodal.

---

# SLIDE 67: SAM – SEGMENT ANYTHING

### SAM

SAM là mô hình segmentation có khả năng tạo mask dựa trên **prompt**.

Prompt có thể là:

* Point.
* Box.
* Các dạng tín hiệu đầu vào phù hợp khác.

### Ý tưởng

```text
Image + Prompt
      ↓
     SAM
      ↓
Segmentation Mask
```

### Đặc điểm

* Không chỉ dành cho một loại object cố định.
* Hướng tới khả năng segmentation tổng quát.
* Có thể hỗ trợ annotation và image editing.

### Ứng dụng

* Tách nền.
* Annotation.
* Chỉnh sửa ảnh.
* Phân tích ảnh.
* Robot và tương tác thị giác.

---

# SLIDE 68: COMPUTER VISION FOUNDATION MODELS

Một số hướng phát triển:

```text
Image Foundation Models
        │
        ├── Vision Transformer
        │
        ├── Vision-Language Models
        │
        ├── Segmentation Foundation Models
        │
        └── Multimodal Models
```

### Xu hướng

Từ:

> **Một model → một task**

sang:

> **Một model → nhiều task / nhiều khả năng**

### Nhưng cần lưu ý

Foundation Model không loại bỏ hoàn toàn nhu cầu:

* Dữ liệu.
* Đánh giá.
* Fine-tuning.
* Kiểm soát chất lượng.
* Tối ưu triển khai.

---

# PHẦN VII

# LỰA CHỌN MÔ HÌNH VÀ TRANSFER LEARNING

---

# SLIDE 69: LỰA CHỌN MÔ HÌNH – BẮT ĐẦU TỪ BÀI TOÁN

Không nên hỏi:

> "Model nào tốt nhất?"

Nên hỏi:

> **"Bài toán của tôi cần đầu ra gì?"**

### Quy trình

```text
1. Xác định Task
       ↓
2. Xác định dữ liệu
       ↓
3. Xác định yêu cầu Accuracy
       ↓
4. Xác định yêu cầu Speed
       ↓
5. Xác định Hardware
       ↓
6. Chọn Model
```

---

# SLIDE 70: CHỌN MODEL THEO BÀI TOÁN

### Classification

Có thể bắt đầu với:

* ResNet.
* EfficientNet.
* MobileNet.
* ViT.

### Object Detection

Có thể xem xét:

* YOLO.
* Faster R-CNN.
* Các detector hiện đại khác.

### Segmentation

Có thể xem xét:

* U-Net.
* Mask R-CNN.
* Các segmentation model hiện đại.

### OCR

Có thể sử dụng:

* OCR pipeline truyền thống.
* Deep Learning OCR.
* Transformer-based OCR.

### Pose

* OpenPose.
* Các pose estimation model hiện đại.

---

# SLIDE 71: ACCURACY – SPEED – RESOURCE

Khi lựa chọn model thường phải cân bằng:

```text
             Accuracy
                ▲
                │
                │
                │
                └──────────────→
                    Speed

       + Model Size
       + Memory
       + Energy
       + Cost
```

### Server

Có thể ưu tiên:

* Accuracy.
* Model lớn.
* GPU mạnh.

### Edge / Mobile

Cần quan tâm:

* Model size.
* Latency.
* Memory.
* Power consumption.

### Real-time

Cần quan tâm:

* FPS.
* Latency.
* Stability.

---

# SLIDE 72: PRETRAINED MODEL

Huấn luyện mô hình Deep Learning từ đầu có thể cần:

* Dataset lớn.
* GPU mạnh.
* Thời gian dài.
* Chi phí tính toán cao.

### Giải pháp

Sử dụng **pretrained model**.

Ví dụ:

```text
Large Dataset
      ↓
Pretrained Model
      ↓
Knowledge learned
      ↓
Your Dataset
      ↓
Transfer Learning
```

### Ý tưởng

> Tận dụng những biểu diễn mà mô hình đã học được từ một dataset lớn để giải quyết bài toán mới.

---

# SLIDE 73: TRANSFER LEARNING

### Định nghĩa

Transfer Learning là kỹ thuật:

> **Chuyển giao kiến thức đã học từ một bài toán / dataset sang một bài toán mới có liên quan.**

Ví dụ:

```text
ImageNet
   ↓
Pretrained ResNet
   ↓
Features
   ↓
Small Dataset
   ↓
Your Classification Model
```

### Lợi ích

* Cần ít dữ liệu hơn.
* Training nhanh hơn.
* Giảm chi phí tính toán.
* Thường phù hợp với bài toán thực hành.

---

# SLIDE 74: FEATURE EXTRACTION

Một cách sử dụng pretrained model:

> **Đóng băng backbone và chỉ huấn luyện classifier mới.**

```text
                 Pretrained Model
                       │
             ┌─────────┴─────────┐
             ↓                   ↓
        Backbone             Classifier
       Frozen ❄️              Trainable
             │                   │
             └─────────┬─────────┘
                       ↓
                    Output
```

### Quy trình

1. Tải pretrained model.
2. Giữ nguyên backbone.
3. Thay classifier cuối.
4. Chỉ huấn luyện classifier mới.

### Khi phù hợp?

* Dataset nhỏ.
* Bài toán tương đối gần với dữ liệu pretrained.
* Muốn training nhanh.

---

# SLIDE 75: FINE-TUNING

Fine-tuning cho phép tiếp tục huấn luyện một phần hoặc toàn bộ pretrained model.

```text
Pretrained Model
      ↓
Freeze most layers
      ↓
Train new head
      ↓
Unfreeze selected layers
      ↓
Fine-tune with small LR
```

### Đặc điểm

* Có thể thích nghi tốt hơn với dataset mới.
* Chi phí training cao hơn feature extraction.
* Có nguy cơ overfitting nếu dữ liệu quá ít.

### Nguyên tắc

> Khi fine-tuning, thường sử dụng learning rate nhỏ để tránh làm mất kiến thức đã học.

---

# SLIDE 76: FEATURE EXTRACTION VS FINE-TUNING

|                     | Feature Extraction | Fine-tuning           |
| ------------------- | ------------------ | --------------------- |
| Backbone            | Đóng băng          | Mở một phần / toàn bộ |
| Training cost       | Thấp               | Cao hơn               |
| Dataset nhỏ         | Phù hợp            | Cần thận trọng        |
| Khả năng thích nghi | Thấp hơn           | Cao hơn               |
| Thời gian           | Nhanh              | Chậm hơn              |

### Chiến lược thực tế

```text
Bắt đầu
   ↓
Feature Extraction
   ↓
Đánh giá
   ↓
Chưa đạt?
   ↓
Fine-tuning
```

---

# SLIDE 77: MỘT PIPELINE TRANSFER LEARNING HOÀN CHỈNH

Ví dụ bài toán:

> Phân loại sản phẩm tốt / lỗi.

### Bước 1

Chuẩn bị dataset.

```text
GOOD
DEFECT
```

### Bước 2

Chọn pretrained model.

```text
ResNet / EfficientNet
```

### Bước 3

Thay classifier.

```text
1000 classes
       ↓
2 classes
```

### Bước 4

Train classifier.

### Bước 5

Đánh giá.

### Bước 6

Nếu cần:

> Fine-tune một phần backbone.

---

# SLIDE 78: CHIẾN LƯỢC THỰC TẾ CHO SINH VIÊN

### Dataset nhỏ

→ Transfer Learning.

### Classification

→ ResNet / EfficientNet / MobileNet.

### Detection real-time

→ YOLO-family hoặc detector phù hợp với yêu cầu.

### Segmentation

→ U-Net hoặc model segmentation phù hợp.

### Mobile / Edge

→ MobileNet hoặc các model lightweight.

### OCR

→ OCR model phù hợp với loại văn bản.

### Không có dữ liệu gán nhãn lớn

→ Xem xét pretrained / foundation model / zero-shot khi phù hợp.

### Nguyên tắc

> **Không bắt đầu bằng việc huấn luyện model từ đầu nếu chưa có lý do rõ ràng.**

---

# PHẦN VIII

# TỔNG KẾT

---

# SLIDE 79: BẢN ĐỒ KIẾN THỨC CHƯƠNG 5

```text
                    COMPUTER VISION
                          │
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                 ↓
    Input/Data         CV Tasks          AI Models
        │                 │                 │
   Image/Video       Classification       CNN
   Camera            Detection            ResNet
   Drone             Segmentation         MobileNet
   CCTV              OCR                  ViT
                     Pose                 YOLO
                     3D                   U-Net
                                          CLIP
                                          SAM
                          │
                          ↓
                    CV Pipeline
                          │
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                 ↓
      Data             Training         Deployment
        │                 │                 │
   Collection         Evaluation        Monitoring
   Annotation         Transfer Learning
   Preprocessing
```

---

# SLIDE 80: NHỮNG ĐIỂM CẦN GHI NHỚ

### 1.

> Computer Vision giúp máy tính **nhận thức và hiểu thông tin từ hình ảnh/video**.

### 2.

Các bài toán khác nhau có đầu ra khác nhau:

```text
Classification → Label
Detection     → Box + Label
Segmentation  → Mask
OCR           → Text
Pose          → Keypoints
3D            → 3D Structure
```

### 3.

> Dữ liệu là thành phần nền tảng của hệ thống Computer Vision.

### 4.

> Không nên lựa chọn mô hình trước khi xác định rõ bài toán.

### 5.

> Accuracy không phải tiêu chí duy nhất.

Cần cân nhắc:

* Accuracy.
* Speed.
* Memory.
* Hardware.
* Cost.

### 6.

> Pretrained Model và Transfer Learning giúp giảm đáng kể chi phí phát triển.

---

# SLIDE 81: CÂU HỎI ÔN TẬP

### Câu 1

Computer Vision khác Image Processing ở điểm nào?

### Câu 2

Phân biệt:

* Classification
* Detection
* Segmentation

### Câu 3

Bounding Box và Mask khác nhau như thế nào?

### Câu 4

Keypoint và Descriptor có vai trò gì?

### Câu 5

OCR giải quyết bài toán gì?

### Câu 6

Tại sao cần chia dữ liệu thành:

* Training
* Validation
* Test?

### Câu 7

Tại sao không nên chỉ dùng Accuracy để đánh giá mô hình?

### Câu 8

Phân biệt Feature Extraction và Fine-tuning.

### Câu 9

Khi nào nên ưu tiên mô hình nhẹ như MobileNet?

### Câu 10

Hãy đề xuất pipeline cho một bài toán Computer Vision thực tế.

---

# SLIDE 82: BÀI TẬP THẢO LUẬN

### Bài toán

Một trường đại học muốn xây dựng hệ thống camera để:

> **Đếm số người trong phòng học theo thời gian thực.**

Hãy xác định:

1. Input của hệ thống là gì?
2. Đây là bài toán Classification hay Detection?
3. Output của hệ thống là gì?
4. Cần dữ liệu huấn luyện như thế nào?
5. Có cần gán bounding box không?
6. Nên đánh giá bằng những metric nào?
7. Yêu cầu real-time ảnh hưởng thế nào đến việc lựa chọn model?
8. Nếu chỉ có một lượng nhỏ dữ liệu, nên sử dụng chiến lược nào?

### Mục tiêu

Sinh viên vận dụng toàn bộ kiến thức của chương để thiết kế một hệ thống CV ở mức khái niệm.

---

# SLIDE 83: KẾT THÚC CHƯƠNG

# COMPUTER VISION

> **Từ dữ liệu hình ảnh → Nhận thức → Thông tin → Quyết định**

### Ba câu hỏi quan trọng cần ghi nhớ

**1. Máy tính cần hiểu điều gì từ ảnh?**

→ Xác định bài toán.

**2. Dữ liệu nào cần để học điều đó?**

→ Thu thập và chuẩn bị dữ liệu.

**3. Mô hình nào phù hợp với yêu cầu?**

→ Cân bằng accuracy, speed và resource.

### Tư duy cốt lõi

```text
Problem
   ↓
Data
   ↓
Model
   ↓
Evaluation
   ↓
Deployment
   ↓
Improvement
```

# END
