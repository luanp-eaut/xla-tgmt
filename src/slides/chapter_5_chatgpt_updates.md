# CHƯƠNG 5: THỊ GIÁC MÁY TÍNH

---

## SLIDE 1. CHƯƠNG 5 – THỊ GIÁC MÁY TÍNH

**XỬ LÝ ẢNH & THỊ GIÁC MÁY TÍNH**

### CHƯƠNG 5

# THỊ GIÁC MÁY TÍNH

**Computer Vision**

---

## SLIDE 2. MỤC TIÊU CỦA CHƯƠNG

Sau chương này, sinh viên có thể:

* Giải thích được **Computer Vision** là gì và phân biệt với **Image Processing**.
* Mô tả được kiến trúc tổng quát của một hệ thống Computer Vision.
* Phân biệt các bài toán:

  * Image Classification
  * Object Detection
  * Image Segmentation
  * Keypoint Detection và Feature Matching
  * OCR
  * 3D Reconstruction
* Mô tả được quy trình xây dựng một hệ thống Computer Vision.
* Nhận biết vai trò của OpenCV, Machine Learning và Deep Learning.
* Giải thích được vai trò của các mô hình CNN, Transformer và Foundation Model.
* Hiểu khái niệm **Pretrained Model** và **Transfer Learning**.
* Biết lựa chọn mô hình phù hợp với bài toán và tài nguyên triển khai.

---

## SLIDE 3. NỘI DUNG CHƯƠNG

1. Tổng quan về Computer Vision
2. Các bài toán trong Computer Vision
3. Quy trình xây dựng hệ thống Computer Vision
4. Công cụ và thư viện
5. Các mô hình AI trong Computer Vision
6. Foundation Models
7. Transfer Learning và lựa chọn mô hình
8. Tổng kết và ôn tập

---

# PHẦN 1. TỔNG QUAN VỀ COMPUTER VISION

---

## SLIDE 4. COMPUTER VISION LÀ GÌ?

### Định nghĩa

**Computer Vision (Thị giác máy tính)** là lĩnh vực nghiên cứu các phương pháp giúp máy tính **thu nhận, xử lý và hiểu thông tin có ý nghĩa từ dữ liệu hình ảnh và video**.

### Ý tưởng cốt lõi

$$
\text{Dữ liệu hình ảnh} \rightarrow
\text{Biểu diễn} \rightarrow
\text{Hiểu nội dung} \rightarrow
\text{Quyết định}
$$

Ví dụ:

$$
\text{Ảnh camera}
\rightarrow
\text{Phát hiện người}
\rightarrow
\text{Theo dõi người}
\rightarrow
\text{Cảnh báo}
$$

---

## SLIDE 5. ĐẦU VÀO VÀ ĐẦU RA CỦA COMPUTER VISION

### Đầu vào

* Ảnh tĩnh.
* Video.
* Camera thời gian thực.
* Camera trên drone.
* CCTV.
* Ảnh y tế.
* Ảnh vệ tinh.
* Dữ liệu hình ảnh từ các cảm biến khác.

### Đầu ra

Tùy bài toán, hệ thống có thể trả về:

* **Nhãn (label)**.
* **Lớp (class)**.
* **Hộp giới hạn (bounding box)**.
* **Mặt nạ (mask)**.
* **Điểm đặc trưng (keypoint)**.
* Văn bản.
* Thông tin hình học hoặc số liệu đo lường.

---

## SLIDE 6. TỪ PIXEL ĐẾN THÔNG TIN CÓ Ý NGHĨA

Một ảnh số có thể được biểu diễn bằng ma trận các giá trị pixel.

Ví dụ ảnh xám:

$$
I \in \mathbb{R}^{H\times W}
$$

Ảnh màu RGB:

$$
I \in \mathbb{R}^{H\times W\times 3}
$$

Trong đó:

* \(H\): chiều cao ảnh.
* \(W\): chiều rộng ảnh.
* \(3\): ba kênh màu R, G, B.

### Mục tiêu của Computer Vision

Chuyển từ:

$$
\text{Pixel}
\rightarrow
\text{Đặc trưng}
\rightarrow
\text{Thông tin}
$$

Ví dụ:

$$
\text{Pixel}
\rightarrow
\text{Đặc trưng hình dạng}
\rightarrow
\text{"Đây là ô tô"}
$$

---

## SLIDE 7. COMPUTER VISION VÀ IMAGE PROCESSING

| Khía cạnh | Image Processing          | Computer Vision                 |
| --------- | ------------------------- | ------------------------------- |
| Mục tiêu  | Biến đổi/cải thiện ảnh    | Hiểu nội dung ảnh               |
| Đầu vào   | Ảnh                       | Ảnh/video                       |
| Xử lý     | Lọc, tăng cường, biến đổi | Nhận dạng, phát hiện, phân đoạn |
| Kết quả   | Ảnh mới                   | Thông tin có ý nghĩa            |
| Ví dụ     | Khử nhiễu                 | Phát hiện người                 |

### Quan hệ

Image Processing thường là **một thành phần hỗ trợ** cho Computer Vision.

Ví dụ:

$$
\text{Ảnh}
\rightarrow
\boxed{\text{Khử nhiễu}}
\rightarrow
\boxed{\text{Object Detection}}
$$

---

## SLIDE 8. KIẾN TRÚC TỔNG QUÁT CỦA HỆ THỐNG COMPUTER VISION

### Bốn giai đoạn

$$
\boxed{\text{Input}}
\rightarrow
\boxed{\text{Preprocessing}}
\rightarrow
\boxed{\text{Feature Representation}}
\rightarrow
\boxed{\text{Understanding}}
\rightarrow
\boxed{\text{Decision}}
$$

### Trong đó

1. **Tiền xử lý (Preprocessing)**
2. **Trích xuất/biểu diễn đặc trưng (Feature Extraction/Representation)**
3. **Hiểu và nhận thức (Understanding)**
4. **Ra quyết định (Decision)**

---

## SLIDE 9. GIAI ĐOẠN 1 – TIỀN XỬ LÝ

### Preprocessing

Mục tiêu:

* Làm sạch dữ liệu.
* Chuẩn hóa dữ liệu.
* Đưa dữ liệu về dạng phù hợp với mô hình.

Các thao tác thường gặp:

* Resize.
* Crop.
* Denoising.
* Normalization.
* Contrast Enhancement.
* Data Augmentation.

Ví dụ:

$$
I' = \frac{I}{255}
$$

để đưa giá trị pixel từ:

$$
[0,255]\rightarrow[0,1]
$$

---

## SLIDE 10. GIAI ĐOẠN 2 – TRÍCH XUẤT ĐẶC TRƯNG

### Feature Extraction

Chuyển ảnh từ biểu diễn pixel sang biểu diễn chứa thông tin hữu ích hơn.

### Đặc trưng truyền thống

* Edge.
* Corner.
* Texture.
* Shape.
* Keypoint.

### Đặc trưng học sâu

CNN hoặc Transformer có thể **tự học biểu diễn đặc trưng** từ dữ liệu.

$$
\text{Image}
\rightarrow
\text{Feature Representation}
$$

---

## SLIDE 11. GIAI ĐOẠN 3 – HIỂU VÀ NHẬN THỨC

Hệ thống sử dụng đặc trưng để suy luận về nội dung ảnh.

Các nhiệm vụ:

* Classification.
* Object Detection.
* Segmentation.
* OCR.
* Pose Estimation.
* Tracking.
* Depth Estimation.

Ví dụ:

$$
\text{Feature}
\rightarrow
\text{Class = Car}
$$

hoặc:

$$
\text{Feature}
\rightarrow
\text{Bounding Box + Class}
$$

---

## SLIDE 12. GIAI ĐOẠN 4 – RA QUYẾT ĐỊNH

Kết quả Computer Vision có thể được sử dụng để thực hiện hành động.

Ví dụ:

### Giao thông

$$
\text{Phát hiện người}
\rightarrow
\text{Cảnh báo}
$$

### Sản xuất

$$
\text{Phát hiện lỗi}
\rightarrow
\text{Loại sản phẩm}
$$

### Xe tự hành

$$
\text{Phát hiện vật cản}
\rightarrow
\text{Điều chỉnh hướng di chuyển}
$$

---

## SLIDE 13. HIỂU NỘI DUNG HÌNH ẢNH

Computer Vision có thể trả lời các câu hỏi:

### "Có gì trong ảnh?"

→ Object Classification/Detection

### "Đối tượng ở đâu?"

→ Bounding Box/Segmentation

### "Đối tượng đang làm gì?"

→ Action Recognition

### "Các đối tượng có quan hệ như thế nào?"

→ Scene/Relationship Understanding

---

## SLIDE 14. ỨNG DỤNG COMPUTER VISION

### Y tế

* Phân tích ảnh X-quang, CT, MRI.
* Phân đoạn khối u.

### Giao thông

* Phát hiện phương tiện.
* Nhận dạng biển báo.
* Theo dõi người đi bộ.

### Sản xuất

* Kiểm tra lỗi sản phẩm.
* Kiểm soát chất lượng.

### An ninh

* Nhận dạng và theo dõi đối tượng.
* Phân tích video.

### Nông nghiệp

* Phát hiện sâu bệnh.
* Đếm và ước lượng sản lượng.

---

# PHẦN 2. CÁC BÀI TOÁN TRONG COMPUTER VISION

---

## SLIDE 15. CÁC BÀI TOÁN CHÍNH

| Bài toán              | Đầu ra chính            |
| --------------------- | ----------------------- |
| Classification        | Class/Label             |
| Object Detection      | Class + Bounding Box    |
| Semantic Segmentation | Class cho từng pixel    |
| Instance Segmentation | Mask cho từng đối tượng |
| Keypoint Detection    | Các keypoint            |
| OCR                   | Chuỗi văn bản           |
| 3D Reconstruction     | Mô hình/đám mây điểm 3D |

---

## SLIDE 16. CLASSIFICATION

### Định nghĩa

**Image Classification** xác định ảnh thuộc lớp nào trong tập các lớp đã biết.

$$
f(I)\rightarrow y
$$

Trong đó:

* \(I\): ảnh đầu vào.
* \(y\): nhãn/lớp dự đoán.

### Single-label Classification

Một ảnh → một lớp.

Ví dụ:

$$
I\rightarrow\text{Cat}
$$

### Multi-label Classification

Một ảnh có thể có nhiều nhãn.

$$
I\rightarrow\{\text{Dog, Grass, Person}\}
$$

---

## SLIDE 17. CLASSIFICATION – VÍ DỤ

Ảnh:

> Một con mèo nằm trên ghế.

### Single-label

$$
\text{Image}\rightarrow\text{Cat}
$$

### Multi-label

$$
\text{Image}
\rightarrow
\{\text{Cat, Chair}\}
$$

### Lưu ý

Classification **không cung cấp vị trí** của đối tượng.

---

## SLIDE 18. OBJECT DETECTION

### Định nghĩa

Object Detection xác định:

1. Đối tượng thuộc lớp nào.
2. Đối tượng nằm ở đâu.

Mỗi đối tượng thường được biểu diễn bởi:

$$
(\text{class},\text{bounding box},\text{confidence})
$$

Ví dụ:

$$
(\text{Car}, B_1, 0.95)
$$

Trong đó \(B_1\) là bounding box của chiếc xe.

---

## SLIDE 19. BOUNDING BOX

Bounding box là hình chữ nhật bao quanh một đối tượng.

Có thể biểu diễn bằng:

$$
B=(x_{min},y_{min},x_{max},y_{max})
$$

Trong đó:

* \(x_{min},y_{min}\): góc trên trái.
* \(x_{max},y_{max}\): góc dưới phải.

Hoặc:

$$
B=(x_c,y_c,w,h)
$$

Trong đó:

* \((x_c,y_c)\): tâm bounding box.
* \(w,h\): chiều rộng và chiều cao.

### Quy ước

Trong toàn bộ chương, sử dụng:

$$
B=(x_{min},y_{min},x_{max},y_{max})
$$

khi minh họa bounding box.

---

## SLIDE 20. DETECTION KHÁC CLASSIFICATION NHƯ THẾ NÀO?

### Classification

$$
\text{Image}\rightarrow\text{Class}
$$

### Detection

$$
\text{Image}
\rightarrow
\{(\text{Class},\text{Box})_1,\ldots,(\text{Class},\text{Box})_n\}
$$

Classification trả lời:

> "Ảnh này thuộc lớp nào?"

Detection trả lời:

> "Có những đối tượng nào và chúng nằm ở đâu?"

---

## SLIDE 21. SEGMENTATION

### Image Segmentation

Phân đoạn ảnh là bài toán gán thông tin lớp hoặc đối tượng cho từng pixel.

Ba dạng chính:

1. Semantic Segmentation.
2. Instance Segmentation.
3. Panoptic Segmentation.

---

## SLIDE 22. SEMANTIC SEGMENTATION

Mỗi pixel được gán một **class**.

Ví dụ:

* Road.
* Car.
* Person.
* Sky.

Nếu:

$$
I\in\mathbb{R}^{H\times W\times3}
$$

thì mask lớp có thể biểu diễn:

$$
M\in\{1,\ldots,C\}^{H\times W}
$$

Trong đó:

* \(H,W\): kích thước ảnh.
* \(C\): số lớp.

### Đặc điểm

Các đối tượng cùng lớp **không được phân biệt riêng**.

Ví dụ:

> Hai người → đều mang class "Person".

---

## SLIDE 23. INSTANCE SEGMENTATION

Instance Segmentation phân biệt **từng đối tượng cụ thể**, ngay cả khi chúng cùng lớp.

Ví dụ:

* Person 1.
* Person 2.
* Person 3.

Kết quả:

$$
\{(class_i,mask_i)\}_{i=1}^{N}
$$

Trong đó:

* \(N\): số instance.
* \(mask_i\): mặt nạ của instance thứ \(i\).

---

## SLIDE 24. PANOPTIC SEGMENTATION

Panoptic Segmentation kết hợp:

* **Thing**: các đối tượng có thể đếm riêng.

  * Person.
  * Car.
  * Dog.

* **Stuff**: các vùng không có instance riêng.

  * Sky.
  * Road.
  * Grass.

Mục tiêu:

> Gán một nhãn đầy đủ cho toàn bộ ảnh, đồng thời phân biệt các instance đối với nhóm "thing".

---

## SLIDE 25. SO SÁNH BA LOẠI SEGMENTATION

| Loại     | Mỗi pixel có class | Phân biệt instance |
| -------- | -----------------: | -----------------: |
| Semantic |                 Có |              Không |
| Instance |                 Có |                 Có |
| Panoptic |                 Có |   Có đối với Thing |

Ví dụ có 3 người:

* Semantic → tất cả là `Person`.
* Instance → Person 1, Person 2, Person 3.
* Panoptic → đồng thời xử lý người và các vùng `Road`, `Sky`, `Grass`.

---

## SLIDE 26. KEYPOINT DETECTION

### Keypoint

Keypoint là một vị trí đặc trưng trong ảnh.

Ví dụ:

* Góc của vật thể.
* Điểm đặc trưng trên khuôn mặt.
* Khớp trên cơ thể người.

Có thể biểu diễn:

$$
p_i=(x_i,y_i)
$$

Mỗi keypoint có thể đi kèm:

* Score.
* Scale.
* Orientation.
* Descriptor.

---

## SLIDE 27. FEATURE DESCRIPTOR VÀ FEATURE MATCHING

### Descriptor

Descriptor là vector mô tả vùng lân cận của một keypoint.

$$
d_i\in\mathbb{R}^{D}
$$

Trong đó \(D\) là số chiều của descriptor.

### Feature Matching

So sánh các descriptor giữa hai ảnh để tìm các cặp điểm tương ứng.

Ví dụ:

$$
d_i^{(A)}\leftrightarrow d_j^{(B)}
$$

### Ứng dụng

* Panorama.
* Object tracking.
* Image registration.
* 3D reconstruction.

---

## SLIDE 28. OCR

### OCR – Optical Character Recognition

OCR là quá trình nhận dạng ký tự/văn bản xuất hiện trong ảnh và chuyển chúng thành dữ liệu văn bản có thể xử lý bằng máy tính.

Ví dụ:

$$
\text{Ảnh biển số}
\rightarrow
\text{"29A-12345"}
$$

### Ứng dụng

* Nhận dạng biển số.
* Số hóa tài liệu.
* Trích xuất hóa đơn.
* Đọc văn bản.

---

## SLIDE 29. 3D RECONSTRUCTION

### Định nghĩa

3D Reconstruction là quá trình xây dựng biểu diễn ba chiều của vật thể hoặc cảnh từ hình ảnh và/hoặc dữ liệu cảm biến.

### Một số kỹ thuật

**Structure from Motion (SfM)**

Ước lượng cấu trúc 3D và chuyển động camera từ nhiều ảnh.

**Multi-view Stereo (MVS)**

Khai thác nhiều ảnh của cùng một cảnh để tạo thông tin hình học 3D, chẳng hạn point cloud.

### Ứng dụng

* Bản đồ 3D.
* Di sản số.
* VR/AR.
* Đo đạc và mô hình hóa.

---

## SLIDE 30. TỔNG HỢP CÁC BÀI TOÁN

| Bài toán              | Câu hỏi chính            | Đầu ra            |
| --------------------- | ------------------------ | ----------------- |
| Classification        | Có gì?                   | Class             |
| Detection             | Có gì và ở đâu?          | Class + Box       |
| Semantic Segmentation | Pixel thuộc lớp nào?     | Pixel Class       |
| Instance Segmentation | Đối tượng cụ thể nào?    | Mask + Instance   |
| Keypoint              | Điểm đặc trưng ở đâu?    | Keypoints         |
| OCR                   | Văn bản là gì?           | Text              |
| 3D Reconstruction     | Hình học 3D như thế nào? | 3D Representation |

---

# PHẦN 3. QUY TRÌNH XÂY DỰNG HỆ THỐNG

---

## SLIDE 31. PIPELINE TỔNG QUÁT

$$
\boxed{\text{Problem}}
\rightarrow
\boxed{\text{Data}}
\rightarrow
\boxed{\text{Preprocessing}}
\rightarrow
\boxed{\text{Model}}
\rightarrow
\boxed{\text{Evaluation}}
\rightarrow
\boxed{\text{Deployment}}
\rightarrow
\boxed{\text{Monitoring}}
$$

Đây là một **vòng lặp**, không phải quy trình chỉ thực hiện một lần.

---

## SLIDE 32. BƯỚC 1 – XÁC ĐỊNH BÀI TOÁN

Cần xác định:

* Mục tiêu.
* Đầu vào.
* Đầu ra.
* Đối tượng cần nhận biết.
* Điều kiện hoạt động.
* Yêu cầu về tốc độ.
* Yêu cầu về độ chính xác.

Ví dụ:

> Phát hiện sản phẩm lỗi trên dây chuyền sản xuất.

Input:

$$
\text{Image}
$$

Output:

$$
\text{Class}+\text{Bounding Box}
$$

---

## SLIDE 33. BƯỚC 2 – THU THẬP DỮ LIỆU

Nguồn dữ liệu:

* Camera.
* Dataset công khai.
* Thiết bị IoT.
* Ảnh do người dùng cung cấp.

Cần đảm bảo dữ liệu đa dạng về:

* Góc nhìn.
* Ánh sáng.
* Độ phân giải.
* Khoảng cách.
* Môi trường.
* Các trường hợp đặc biệt.

---

## SLIDE 34. BƯỚC 3 – GÁN NHÃN DỮ LIỆU

### Annotation

Tạo **ground truth** cho dữ liệu.

Ví dụ:

Classification:

$$
(image,label)
$$

Detection:

$$
(image,\{(class_i,B_i)\})
$$

Segmentation:

$$
(image,\{mask_i\})
$$

### Công cụ

* LabelImg.
* CVAT.
* MakeSense.ai.

---

## SLIDE 35. BƯỚC 4 – CHIA DỮ LIỆU

Thông thường:

$$
D=D_{train}\cup D_{val}\cup D_{test}
$$

Trong đó:

* **Training set**: dùng để học tham số mô hình.
* **Validation set**: dùng để lựa chọn mô hình và siêu tham số.
* **Test set**: dùng để đánh giá cuối cùng.

### Nguyên tắc quan trọng

Không để dữ liệu từ test set tham gia quá trình huấn luyện hoặc lựa chọn mô hình.

→ Tránh **data leakage**.

---

## SLIDE 36. BƯỚC 5 – TIỀN XỬ LÝ VÀ AUGMENTATION

### Preprocessing

* Resize.
* Normalize.
* Denoising.
* Crop.

### Data Augmentation

Tạo biến thể của dữ liệu:

* Flip.
* Rotation.
* Crop.
* Translation.
* Thay đổi brightness/contrast.

### Nguyên tắc

Phép biến đổi phải **không làm thay đổi ý nghĩa của nhãn**.

---

## SLIDE 37. BƯỚC 6 – XÂY DỰNG MÔ HÌNH

Các lựa chọn:

### Mô hình truyền thống

* SVM.
* k-NN.
* Random Forest.

### Deep Learning

* CNN.
* Transformer.
* Vision Transformer.

### Pretrained Model

Có thể sử dụng mô hình đã được huấn luyện trước và **Transfer Learning**.

---

## SLIDE 38. BƯỚC 7 – HUẤN LUYỆN

Trong quá trình training, mô hình tối ưu các tham số \(\theta\).

$$
\theta^*=
\arg\min_{\theta}
\mathcal{L}(\theta)
$$

Trong đó:

* \(\theta\): tham số mô hình.
* \(\mathcal{L}\): hàm mất mát.

Ví dụ:

$$
\text{Image}
\rightarrow
\text{Model}
\rightarrow
\hat{y}
$$

so sánh \(\hat{y}\) với ground truth \(y\) để tính loss.

---

## SLIDE 39. BƯỚC 8 – ĐÁNH GIÁ MÔ HÌNH

### Classification

Các chỉ số:

* Accuracy.
* Precision.
* Recall.
* F1-score.

### Detection

* IoU.
* AP.
* mAP.

### Segmentation

* IoU.
* Dice coefficient.

### Deployment

Ngoài chất lượng dự đoán còn quan tâm:

* Latency.
* Throughput.
* Memory.
* Model size.

---

## SLIDE 40. CÁC CHỈ SỐ CLASSIFICATION

Ma trận nhầm lẫn:

|                 | Predicted Positive | Predicted Negative |
| --------------- | -----------------: | -----------------: |
| Actual Positive |                 TP |                 FN |
| Actual Negative |                 FP |                 TN |

### Accuracy

$$
Accuracy=
\frac{TP+TN}
{TP+TN+FP+FN}
$$

### Precision

$$
Precision=
\frac{TP}{TP+FP}
$$

### Recall

$$
Recall=
\frac{TP}{TP+FN}
$$

### F1-score

$$
F1=
2\frac{Precision\cdot Recall}
{Precision+Recall}
$$

---

## SLIDE 41. IoU – INTERSECTION OVER UNION

IoU đo mức độ chồng lấp giữa dự đoán và ground truth.

$$
IoU=
\frac{|B_{pred}\cap B_{gt}|}
{|B_{pred}\cup B_{gt}|}
$$

Trong segmentation, \(B\) được thay bằng mask:

$$
IoU=
\frac{|M_{pred}\cap M_{gt}|}
{|M_{pred}\cup M_{gt}|}
$$

### Giá trị

$$
0\leq IoU\leq1
$$

* \(IoU=0\): không chồng lấp.
* \(IoU=1\): trùng khớp hoàn toàn.

---

## SLIDE 42. AP VÀ mAP

### Average Precision – AP

AP tổng hợp quan hệ Precision–Recall của mô hình cho một lớp.

### Mean Average Precision – mAP

Nếu có \(C\) lớp:

$$
mAP=
\frac{1}{C}
\sum_{c=1}^{C}AP_c
$$

Trong thực tế có thể gặp:

* mAP@0.5
* mAP@0.5:0.95

### Lưu ý

mAP phụ thuộc vào:

* Cách tính AP.
* Ngưỡng IoU.
* Tập lớp.
* Phiên bản/benchmark.

---

## SLIDE 43. BƯỚC 9 – TRIỂN KHAI

Mô hình sau khi đánh giá có thể được triển khai trên:

* Server.
* Cloud.
* PC.
* Edge device.
* Mobile.
* Embedded device.

### Hai yêu cầu thường có sự đánh đổi

$$
\text{Accuracy}
\leftrightarrow
\text{Speed}
\leftrightarrow
\text{Resource}
$$

Mô hình lớn thường cho biểu diễn mạnh hơn nhưng có thể yêu cầu nhiều tài nguyên hơn.

---

## SLIDE 44. BƯỚC 10 – GIÁM SÁT VÀ CẢI TIẾN

Sau khi triển khai cần theo dõi:

* Độ chính xác thực tế.
* Latency.
* Tỷ lệ lỗi.
* Dữ liệu mới.
* Data drift.

### Vòng lặp

$$
Deploy
\rightarrow
Monitor
\rightarrow
Collect\ Data
\rightarrow
Retrain
\rightarrow
Deploy
$$

---

## SLIDE 45. PIPELINE HOÀN CHỈNH

$$
\boxed{
Problem
\rightarrow
Data
\rightarrow
Annotation
\rightarrow
Preprocessing
\rightarrow
Training
\rightarrow
Evaluation
\rightarrow
Deployment
\rightarrow
Monitoring
}
$$

Sau Monitoring:

$$
\boxed{\text{Feedback}\rightarrow\text{Improvement}}
$$

→ Computer Vision là một **quy trình lặp liên tục**.

---

# PHẦN 4. CÔNG CỤ VÀ THƯ VIỆN

---

## SLIDE 46. HỆ SINH THÁI COMPUTER VISION

### Image Processing

* OpenCV.
* Pillow.
* scikit-image.

### Machine Learning

* scikit-learn.
* XGBoost.

### Deep Learning

* PyTorch.
* TensorFlow.
* Keras.

### Annotation

* CVAT.
* LabelImg.

### Deployment

* ONNX.
* TensorRT.
* OpenVINO.
* LiteRT/TFLite.

---

## SLIDE 47. OPENCV TRONG COMPUTER VISION

OpenCV cung cấp nhiều chức năng xử lý ảnh và thị giác máy tính.

### Tiền xử lý

```python
cv2.resize()
cv2.GaussianBlur()
cv2.cvtColor()
```

### Phát hiện đặc trưng

```python
cv2.Canny()
cv2.SIFT_create()
```

### Xử lý hình thái

```python
cv2.erode()
cv2.dilate()
```

OpenCV thường đóng vai trò:

$$
\text{Input}
\rightarrow
\boxed{\text{OpenCV Preprocessing}}
\rightarrow
\text{AI Model}
$$

---

## SLIDE 48. OPENCV + AI MODEL

Một hệ thống thực tế có thể kết hợp:

$$
\text{Camera}
\rightarrow
\text{OpenCV}
\rightarrow
\text{AI Model}
\rightarrow
\text{Post-processing}
\rightarrow
\text{Output}
$$

Ví dụ:

1. OpenCV đọc frame.
2. Resize ảnh.
3. AI model phát hiện đối tượng.
4. OpenCV vẽ bounding box.
5. Hiển thị kết quả.

---

# PHẦN 5. MÔ HÌNH AI TRONG COMPUTER VISION

---

## SLIDE 49. MÔ HÌNH AI LÀ GÌ?

Mô hình AI là một mô hình tính toán được **học các tham số từ dữ liệu** để thực hiện một nhiệm vụ dự đoán hoặc suy luận.

Quá trình:

$$
\text{Training Data}
\rightarrow
\text{Learning}
\rightarrow
\text{Model Parameters}
$$

Sau đó:

$$
\text{New Image}
\rightarrow
\text{Trained Model}
\rightarrow
\text{Prediction}
$$

---

## SLIDE 50. CNN

### Convolutional Neural Network

CNN được thiết kế đặc biệt hiệu quả cho dữ liệu có cấu trúc không gian như ảnh.

Các thành phần thường gặp:

* Convolution.
* Activation.
* Pooling.
* Fully Connected Layer.

### Ý tưởng

$$
\text{Image}
\rightarrow
\text{Low-level Features}
\rightarrow
\text{High-level Features}
\rightarrow
\text{Prediction}
$$

---

## SLIDE 51. ALEXNET

### Đặc điểm

* Kiến trúc CNN nổi tiếng từ ImageNet 2012.
* Sử dụng ReLU.
* Sử dụng Dropout.
* Gồm nhiều lớp convolution và fully connected.
* Cho thấy khả năng vượt trội của Deep Learning trong Image Classification.

### Ý nghĩa

AlexNet là một dấu mốc quan trọng trong sự phát triển của Deep Learning cho Computer Vision.

---

## SLIDE 52. VGG

### Đặc điểm

* Kiến trúc sâu.
* Sử dụng nhiều convolution kernel \(3\times3\).
* Các phiên bản nổi tiếng:

  * VGG-16.
  * VGG-19.

### Ưu điểm

Kiến trúc tương đối đơn giản, dễ hiểu.

### Hạn chế

Số lượng tham số lớn → tốn bộ nhớ và tính toán.

---

## SLIDE 53. RESNET

### Vấn đề

Khi mạng quá sâu, việc tối ưu có thể gặp khó khăn.

### Giải pháp

**Residual Connection / Skip Connection**

$$
\boxed{y=F(x)+x}
$$

Trong đó:

* \(x\): đầu vào.
* \(F(x)\): phần biến đổi được học.
* \(y\): đầu ra.

### Nếu kích thước không tương thích

Có thể dùng phép chiếu:

$$
y=F(x)+W_sx
$$

với \(W_s\) là phép biến đổi để đưa kích thước về phù hợp.

---

## SLIDE 54. MOBILENET

MobileNet được thiết kế hướng đến:

* Mobile.
* Edge Device.
* IoT.

### Ý tưởng chính

**Depthwise Separable Convolution**

Tách convolution thông thường thành:

1. Depthwise Convolution.
2. Pointwise Convolution.

Giúp giảm đáng kể chi phí tính toán.

### Các phiên bản

* MobileNetV1.
* MobileNetV2.
* MobileNetV3.

---

## SLIDE 55. EFFICIENTNET

### Ý tưởng

**Compound Scaling**

Mở rộng đồng thời:

* Depth.
* Width.
* Input Resolution.

Các phiên bản:

$$
B0,B1,\ldots,B7
$$

Mục tiêu:

> Tìm cân bằng giữa độ chính xác và chi phí tính toán.

---

## SLIDE 56. VISION TRANSFORMER – ViT

ViT đưa kiến trúc Transformer vào bài toán thị giác.

### Ý tưởng

Chia ảnh thành các patch.

Ví dụ:

$$
224\times224
\rightarrow
16\times16\ patches
$$

Mỗi patch được biến đổi thành một vector embedding.

$$
\text{Image}
\rightarrow
\text{Patch Embeddings}
\rightarrow
\text{Transformer}
\rightarrow
\text{Prediction}
$$

---

# PHẦN 6. MÔ HÌNH OBJECT DETECTION

---

## SLIDE 57. HAI NHÓM KIẾN TRÚC DETECTION

### Two-stage detector

Ví dụ:

* Faster R-CNN.

Quy trình khái quát:

$$
Image
\rightarrow
Region Proposals
\rightarrow
Classification + Box Refinement
$$

### One-stage detector

Ví dụ:

* YOLO.
* SSD.

Quy trình:

$$
Image
\rightarrow
Detection
$$

Mục tiêu:

> Giảm thời gian xử lý và phù hợp với nhiều ứng dụng thời gian thực.

---

## SLIDE 58. FASTER R-CNN

Faster R-CNN là một kiến trúc **two-stage object detector**.

### Hai giai đoạn

1. Region Proposal Network – RPN.
2. Classification + Bounding Box Regression.

### Đầu ra

$$
(class,\ bbox,\ score)
$$

### Đặc điểm

* Kiến trúc mạnh cho detection.
* Có thể đạt độ chính xác cao.
* Chi phí tính toán thường lớn hơn các detector tối ưu real-time.

---

## SLIDE 59. YOLO

YOLO – **You Only Look Once** – là một **họ mô hình object detection một giai đoạn**.

Ý tưởng chung:

$$
Image
\rightarrow
\text{Neural Network}
\rightarrow
\{bbox,class,score\}
$$

Các phiên bản/họ triển khai YOLO khác nhau có kiến trúc và đặc tính khác nhau.

### Điểm mạnh

* Tốc độ xử lý cao.
* Phù hợp nhiều ứng dụng real-time.

---

## SLIDE 60. SO SÁNH DETECTION

| Tiêu chí     | Two-stage                 | One-stage           |
| ------------ | ------------------------- | ------------------- |
| Ví dụ        | Faster R-CNN              | YOLO                |
| Quy trình    | Proposal → Detection      | Detection trực tiếp |
| Tốc độ       | Thường thấp hơn           | Thường cao hơn      |
| Độ chính xác | Có thể rất cao            | Có thể rất cao      |
| Ứng dụng     | Khi chất lượng là ưu tiên | Real-time/Edge      |

Không nên kết luận rằng một nhóm **luôn** chính xác hoặc nhanh hơn nhóm còn lại.

Kết quả phụ thuộc:

* Kiến trúc.
* Phiên bản.
* Dataset.
* Phần cứng.
* Cách triển khai.

---

# PHẦN 7. MÔ HÌNH SEGMENTATION

---

## SLIDE 61. MASK R-CNN

Mask R-CNN mở rộng Faster R-CNN cho **Instance Segmentation**.

Ngoài:

$$
(class,bbox)
$$

mô hình dự đoán thêm:

$$
mask
$$

Do đó:

$$
Image
\rightarrow
\{class,bbox,mask\}
$$

cho từng instance.

---

## SLIDE 62. U-NET

U-Net được thiết kế cho bài toán **semantic segmentation**, đặc biệt nổi tiếng trong ảnh y tế.

### Kiến trúc

$$
Encoder
\rightarrow
Bottleneck
\rightarrow
Decoder
$$

Sử dụng **Skip Connections** giữa encoder và decoder.

### Mục tiêu

Giữ lại thông tin không gian chi tiết trong quá trình giải mã.

---

## SLIDE 63. SO SÁNH SEGMENTATION

| Mô hình     | Bài toán tiêu biểu                      |
| ----------- | --------------------------------------- |
| U-Net       | Semantic Segmentation                   |
| Mask R-CNN  | Instance Segmentation                   |
| Mask2Former | Semantic/Instance/Panoptic Segmentation |

Việc lựa chọn phụ thuộc:

* Loại segmentation.
* Dataset.
* Độ chính xác mong muốn.
* Tài nguyên tính toán.

---

# PHẦN 8. POSE ESTIMATION VÀ OCR

---

## SLIDE 64. POSE ESTIMATION

Pose Estimation xác định các keypoint của cơ thể.

Ví dụ:

$$
\{(x_1,y_1),\ldots,(x_K,y_K)\}
$$

Trong đó \(K\) là số keypoint.

Ví dụ:

* Vai.
* Khuỷu tay.
* Cổ tay.
* Hông.
* Đầu gối.
* Mắt cá chân.

### Ứng dụng

* Phân tích thể thao.
* AR/VR.
* Theo dõi chuyển động.
* Phân tích hành vi.

---

## SLIDE 65. OPENPOSE

OpenPose là một phương pháp nổi tiếng cho **multi-person 2D pose estimation**.

Mục tiêu:

$$
Image
\rightarrow
\text{Human Keypoints}
$$

Sau đó các keypoint được liên kết để tạo thành cấu trúc cơ thể.

### Ứng dụng

* Human pose estimation.
* Gesture analysis.
* Motion analysis.

---

## SLIDE 66. OCR VÀ TROCR

**TrOCR** là mô hình OCR dựa trên Transformer.

Pipeline khái quát:

$$
\text{Image of Text}
\rightarrow
\text{Visual Encoder}
\rightarrow
\text{Text Decoder}
\rightarrow
\text{Text}
$$

Ví dụ:

$$
\text{Ảnh hóa đơn}
\rightarrow
\text{"Tổng tiền: 250.000 VNĐ"}
$$

---

# PHẦN 9. FOUNDATION MODELS

---

## SLIDE 67. FOUNDATION MODEL LÀ GÌ?

Foundation Model là mô hình được **tiền huấn luyện trên dữ liệu quy mô lớn** và có thể được thích nghi cho nhiều nhiệm vụ khác nhau.

Khái niệm quan trọng:

$$
\text{Large-scale Pretraining}
\rightarrow
\text{General Representation}
\rightarrow
\text{Task Adaptation}
$$

Không nên hiểu rằng một Foundation Model luôn giải quyết mọi bài toán **mà không cần bất kỳ bước thích nghi nào**.

---

## SLIDE 68. CLIP

CLIP – **Contrastive Language–Image Pre-training**.

Ý tưởng:

Đưa ảnh và văn bản vào cùng một không gian biểu diễn.

$$
Image
\rightarrow
Embedding_I
$$

$$
Text
\rightarrow
Embedding_T
$$

Sau đó so sánh độ tương đồng:

$$
sim(Embedding_I,Embedding_T)
$$

### Ứng dụng

* Image-text retrieval.
* Zero-shot classification.
* Tìm kiếm ảnh bằng văn bản.

---

## SLIDE 69. SAM

SAM – **Segment Anything Model** – là mô hình segmentation có khả năng sử dụng prompt để định hướng đối tượng cần phân đoạn.

Prompt có thể gồm:

* Point.
* Box.
* Các dạng prompt được mô hình hỗ trợ.

Khái quát:

$$
Image + Prompt
\rightarrow
Mask
$$

### Ứng dụng

* Tách đối tượng.
* Hỗ trợ annotation.
* Chỉnh sửa ảnh.
* Interactive segmentation.

---

## SLIDE 70. FOUNDATION MODELS TRONG COMPUTER VISION

Xu hướng:

$$
\text{Pretrain lớn}
\rightarrow
\text{Representation tổng quát}
\rightarrow
\text{Adaptation}
\rightarrow
\text{Nhiều nhiệm vụ}
$$

Ví dụ:

* CLIP → image-text understanding.
* SAM → promptable segmentation.
* ViT → visual representation.
* Các mô hình multimodal → kết hợp vision và language.

---

# PHẦN 10. LỰA CHỌN MÔ HÌNH

---

## SLIDE 71. LỰA CHỌN MÔ HÌNH

Không có một mô hình tốt nhất cho mọi bài toán.

Cần cân nhắc:

1. Nhiệm vụ.
2. Dữ liệu.
3. Độ chính xác.
4. Tốc độ.
5. Bộ nhớ.
6. Phần cứng.
7. Môi trường triển khai.

### Quy tắc

$$
\text{Model Selection}
=
f(\text{Task, Data, Accuracy, Speed, Resources})
$$

---

## SLIDE 72. ACCURACY – SPEED – RESOURCE

Ba yếu tố thường phải cân bằng:

$$
\boxed{
Accuracy
\leftrightarrow
Latency
\leftrightarrow
Resource
}
$$

Ví dụ:

### Server mạnh

Có thể sử dụng mô hình lớn hơn.

### Edge device

Ưu tiên:

* Model nhỏ.
* Latency thấp.
* Memory thấp.

### Real-time

Ưu tiên throughput/latency phù hợp với yêu cầu hệ thống.

---

# PHẦN 11. TRANSFER LEARNING

---

## SLIDE 73. TẠI SAO CẦN TRANSFER LEARNING?

Huấn luyện một mô hình lớn từ đầu thường cần:

* Nhiều dữ liệu.
* Nhiều thời gian.
* Tài nguyên tính toán lớn.

Thay vào đó:

$$
\text{Pretrained Model}
+
\text{New Dataset}
\rightarrow
\text{Adapted Model}
$$

---

## SLIDE 74. PRETRAINED MODEL

Pretrained Model là mô hình đã được huấn luyện trước trên một dataset lớn.

Ví dụ:

* ResNet.
* EfficientNet.
* ViT.

Mô hình đã học được các biểu diễn có thể hữu ích cho nhiệm vụ mới.

Ví dụ:

$$
\text{Edge}
\rightarrow
\text{Texture}
\rightarrow
\text{Shape}
$$

Các đặc trưng này có thể được tái sử dụng.

---

## SLIDE 75. FEATURE EXTRACTION

Trong chiến lược Feature Extraction:

1. Tải pretrained model.
2. Giữ nguyên phần backbone.
3. Đóng băng các tham số backbone.
4. Thay classifier phù hợp.
5. Huấn luyện phần classifier mới.

Khái quát:

$$
\boxed{
Pretrained\ Backbone
+
New\ Head
}
$$

---

## SLIDE 76. FINE-TUNING

Fine-tuning cho phép cập nhật một phần hoặc toàn bộ pretrained model trên dataset mới.

Quy trình:

$$
Pretrained\ Model
\rightarrow
Unfreeze\ Some\ Layers
\rightarrow
Train\ on\ New\ Dataset
$$

### Nguyên tắc

Dataset mới càng nhỏ:

→ thường nên tinh chỉnh thận trọng.

Dataset mới lớn và khác biệt:

→ có thể cần cập nhật nhiều tầng hơn.

---

## SLIDE 77. FEATURE EXTRACTION VÀ FINE-TUNING

| Đặc điểm            | Feature Extraction | Fine-tuning               |
| ------------------- | ------------------ | ------------------------- |
| Backbone            | Đóng băng          | Một phần/toàn bộ cập nhật |
| Tài nguyên          | Thấp hơn           | Cao hơn                   |
| Dữ liệu cần thiết   | Ít hơn             | Thường nhiều hơn          |
| Khả năng thích nghi | Thấp hơn           | Cao hơn                   |
| Nguy cơ overfitting | Thấp hơn           | Cao hơn nếu dữ liệu ít    |

---

## SLIDE 78. PIPELINE TRANSFER LEARNING

$$
\boxed{
Dataset\ lớn
}
$$

↓

$$
\boxed{
Pretraining
}
$$

↓

$$
\boxed{
Pretrained\ Model
}
$$

↓

$$
\boxed{
Dataset\ mới
}
$$

↓

$$
\boxed{
Feature\ Extraction
\ /\ 
Fine-tuning
}
$$

↓

$$
\boxed{
Task-specific\ Model
}
$$

---

## SLIDE 79. CHIẾN LƯỢC THỰC TẾ

### Dữ liệu ít

→ Pretrained Model + Feature Extraction.

### Dữ liệu vừa

→ Pretrained Model + Fine-tuning một phần.

### Dữ liệu lớn

→ Fine-tuning sâu hơn hoặc huấn luyện theo chiến lược phù hợp.

### Không có nhãn

→ Có thể xem xét:

* Zero-shot.
* Foundation Models.
* Self-supervised learning.
* Weak supervision.

---

# PHẦN 12. TỔNG KẾT

---

## SLIDE 80. BẢN ĐỒ KIẾN THỨC

$$
\boxed{\text{Computer Vision}}
$$

↓

### Dữ liệu

Ảnh – Video – Camera

↓

### Tiền xử lý

Resize – Normalize – Denoise – Augmentation

↓

### Biểu diễn

Features – Keypoints – Deep Features

↓

### Nhiệm vụ

Classification
Detection
Segmentation
OCR
Pose
3D Reconstruction

↓

### Mô hình

CNN – ResNet – YOLO – U-Net – ViT – Foundation Models

↓

### Triển khai

Cloud – Server – PC – Edge – Mobile

↓

### Cải tiến

Evaluation → Monitoring → Retraining

---

## SLIDE 81. NHỮNG ĐIỂM CẦN NHỚ

### 1. Computer Vision

Biến dữ liệu hình ảnh thành thông tin có ý nghĩa.

### 2. Classification

$$
Image\rightarrow Class
$$

### 3. Detection

$$
Image\rightarrow Class+Bounding\ Box
$$

### 4. Segmentation

$$
Image\rightarrow Pixel/Instance\ Masks
$$

### 5. AI Model

Học biểu diễn và quy luật từ dữ liệu.

### 6. Transfer Learning

Tận dụng kiến thức từ pretrained model.

### 7. Model Selection

Không chỉ dựa trên accuracy mà phải xét cả:

$$
Accuracy,\ Speed,\ Resource
$$

---

## SLIDE 82. CÂU HỎI ÔN TẬP

1. Computer Vision khác Image Processing như thế nào?
2. Classification và Object Detection khác nhau ở đâu?
3. Semantic Segmentation khác Instance Segmentation như thế nào?
4. Bounding box được biểu diễn như thế nào?
5. IoU được tính như thế nào?
6. Precision và Recall khác nhau như thế nào?
7. Vì sao ResNet sử dụng Skip Connection?
8. YOLO thuộc nhóm kiến trúc detection nào?
9. U-Net phù hợp với bài toán nào?
10. Foundation Model là gì?
11. CLIP và SAM giải quyết những loại bài toán nào?
12. Transfer Learning có ưu điểm gì?
13. Feature Extraction khác Fine-tuning như thế nào?

---

## SLIDE 83. BÀI TẬP THẢO LUẬN

### Bài toán

Một nhà máy muốn xây dựng hệ thống camera để phát hiện sản phẩm lỗi trên dây chuyền.

Yêu cầu:

* Camera chụp ảnh liên tục.
* Phát hiện sản phẩm lỗi.
* Xác định vị trí lỗi.
* Tốc độ xử lý gần thời gian thực.
* Phần cứng hạn chế.

### Hãy đề xuất:

1. Loại bài toán Computer Vision.
2. Kiểu dữ liệu cần thu thập.
3. Cách gán nhãn.
4. Phương pháp tiền xử lý.
5. Loại mô hình phù hợp.
6. Chỉ số đánh giá.
7. Cách triển khai.
8. Chiến lược Transfer Learning nếu dữ liệu ít.

### Mục tiêu

Không chỉ trả lời:

> "Dùng mô hình nào?"

mà phải giải thích toàn bộ:

$$
\boxed{
Problem
\rightarrow
Data
\rightarrow
Model
\rightarrow
Evaluation
\rightarrow
Deployment
}
$$

# KẾT THÚC CHƯƠNG 5
