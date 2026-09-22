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

# MỤC TIÊU HỌC TẬP

Sau khi hoàn thành chương này, sinh viên có thể:

- Trình bày được khái niệm và vai trò của **Computer Vision** (Thị giác máy tính)
- Phân biệt được **Computer Vision** và **Image Processing** (Xử lý ảnh)
  - *Ví dụ:* Image Processing là làm mờ ảnh để giảm nhiễu, còn Computer Vision là nhận diện khuôn mặt trong ảnh đó
- Mô tả được các bài toán phổ biến: Classification, Object Detection, Segmentation, Keypoint/Feature Detection, OCR, Pose Estimation, 3D Reconstruction
- Mô tả được quy trình xây dựng một hệ thống Computer Vision hoàn chỉnh
- Biết một số công cụ phổ biến như **OpenCV, CVAT, PyTorch, TensorFlow**
- Giải thích được vai trò của các mô hình Deep Learning trong Computer Vision
- Phân biệt các nhóm mô hình: Classification, Detection, Segmentation và Foundation Model
- Hiểu nguyên lý **Transfer Learning** và biết khi nào nên sử dụng

---

# NỘI DUNG CHƯƠNG

**Phần 1 – Tổng quan về Thị giác máy tính**

- Khái niệm Computer Vision
- Đầu vào và đầu ra
- Kiến trúc tổng quát
- Mục tiêu và ứng dụng
- Phân biệt Computer Vision và Image Processing

**Phần 2 – Các bài toán trong Computer Vision**

- Classification, Object Detection, Segmentation
- Feature/Keypoint Detection, OCR, Pose Estimation, 3D Reconstruction

**Phần 3 – Quy trình và công cụ**

- Xác định bài toán, Dữ liệu và gán nhãn, Tiền xử lý
- Huấn luyện và đánh giá, Triển khai
- Công cụ và thư viện

**Phần 4 – Mô hình Deep Learning và Foundation Models**

- Các kiến trúc CNN, Transformer, Vision Transformer
- Foundation Models, CLIP, SAM
- Transfer Learning và chiến lược lựa chọn mô hình

---
<!--_class: section-->

# PHẦN 1. TỔNG QUAN VỀ COMPUTER VISION

---

# COMPUTER VISION LÀ GÌ?

**Định nghĩa:**

Computer Vision (Thị giác máy tính) là lĩnh vực nghiên cứu các phương pháp giúp máy tính thu nhận, xử lý và hiểu thông tin có ý nghĩa từ dữ liệu hình ảnh và video.

**Ý tưởng cốt lõi:**

$$
\text{Dữ liệu hình ảnh} \rightarrow \text{Biểu diễn} \rightarrow \text{Hiểu nội dung} \rightarrow \text{Quyết định}
$$

**Ví dụ minh họa:**

$$
\text{Ảnh camera} \rightarrow \text{Phát hiện người} \rightarrow \text{Theo dõi người} \rightarrow \text{Cảnh báo}
$$

- *Ví dụ thực tế:* Camera quan sát một người đi vào khu vực cấm → máy tính phát hiện người → xác định vị trí → nhận biết khu vực cấm → phát hiện xâm nhập → phát cảnh báo. Computer Vision chuyển từ "pixel" sang "ý nghĩa".

---

# ĐẦU VÀO VÀ ĐẦU RA CỦA COMPUTER VISION

**Đầu vào (Input):**

- Ảnh tĩnh: JPG, PNG, ảnh y tế, ảnh vệ tinh, ảnh tài liệu
- Video: chuỗi frame liên tiếp từ camera giao thông, camera giám sát
- Camera thời gian thực: webcam, camera an ninh, camera trên xe, camera công nghiệp
- Các nguồn khác: drone, smartphone, CCTV, camera 3D, cảm biến hình ảnh chuyên dụng

**Đầu ra (Output):**

Tùy bài toán, hệ thống có thể trả về:

- **Nhãn (label)** hoặc **lớp (class)**
- **Hộp giới hạn (bounding box)**
- **Mặt nạ (mask)** ở cấp pixel
- **Điểm đặc trưng (keypoint)**
- **Văn bản** (từ OCR)
- **Thông tin hình học hoặc số liệu đo lường** (khoảng cách, kích thước, tốc độ, góc, số lượng)

- *Ví dụ:* Một camera giao thông có đầu vào là video, đầu ra là danh sách các xe kèm bounding box, nhãn loại xe và tốc độ di chuyển.

---

# TỪ PIXEL ĐẾN THÔNG TIN CÓ Ý NGHĨA

**Biểu diễn toán học của ảnh:**

Một ảnh số được biểu diễn bằng ma trận các giá trị pixel.

- Ảnh xám (grayscale):

$$
I \in \mathbb{R}^{H\times W}
$$

- Ảnh màu RGB:

$$
I \in \mathbb{R}^{H\times W\times 3}
$$

Trong đó:
- $H$: chiều cao ảnh (số hàng pixel)
- $W$: chiều rộng ảnh (số cột pixel)
- $3$: ba kênh màu R, G, B

**Mục tiêu của Computer Vision:**

$$
\text{Pixel} \rightarrow \text{Đặc trưng} \rightarrow \text{Thông tin}
$$

- *Ví dụ:* Từ ma trận pixel → trích xuất đặc trưng hình dạng → nhận ra "Đây là ô tô". Máy tính không nhìn ảnh giống con người – nó chỉ thấy các con số, nhiệm vụ của CV là biến các con số đó thành thông tin có ý nghĩa.

---

# COMPUTER VISION VÀ IMAGE PROCESSING

**Bảng so sánh:**

| Khía cạnh | Image Processing | Computer Vision |
|---|---|---|
| Mục tiêu | Biến đổi/cải thiện ảnh | Hiểu nội dung ảnh |
| Đầu vào | Ảnh | Ảnh/video |
| Xử lý | Lọc, tăng cường, biến đổi | Nhận dạng, phát hiện, phân đoạn |
| Kết quả | Ảnh mới | Thông tin có ý nghĩa |
| Ví dụ | Khử nhiễu | Phát hiện người |

**Quan hệ giữa hai lĩnh vực:**

Image Processing thường là một thành phần hỗ trợ cho Computer Vision:

$$
\text{Ảnh} \rightarrow \boxed{\text{Khử nhiễu}} \rightarrow \boxed{\text{Object Detection}}
$$

- *Ví dụ:* Ảnh chụp trong điều kiện thiếu sáng được làm sáng và khử nhiễu trước (Image Processing), sau đó đưa vào mô hình phát hiện biển báo (Computer Vision).

---

# KIẾN TRÚC TỔNG QUÁT CỦA HỆ THỐNG COMPUTER VISION

**Bốn giai đoạn chính:**

$$
\boxed{\text{Input}} \rightarrow \boxed{\text{Preprocessing}} \rightarrow \boxed{\text{Feature Representation}} \rightarrow \boxed{\text{Understanding}} \rightarrow \boxed{\text{Decision}}
$$

Trong đó:
- **Tiền xử lý (Preprocessing):** Làm sạch và chuẩn hóa dữ liệu
- **Trích xuất/biểu diễn đặc trưng (Feature Extraction/Representation):** Chuyển ảnh thành các đặc trưng có ý nghĩa
- **Hiểu và nhận thức (Understanding):** Suy luận về nội dung ảnh
- **Ra quyết định (Decision):** Đưa ra hành động dựa trên kết quả

- *Ví dụ:* Camera chụp ảnh sản phẩm → tiền xử lý (resize, chuẩn hóa) → CNN trích xuất đặc trưng → mô hình nhận diện "lỗi" hay "tốt" → hệ thống gạt sản phẩm lỗi ra khỏi dây chuyền.

---

# GIAI ĐOẠN 1 – TIỀN XỬ LÝ

**Mục tiêu của Preprocessing:**

- Làm sạch dữ liệu
- Chuẩn hóa dữ liệu
- Đưa dữ liệu về dạng phù hợp với mô hình

**Các thao tác thường gặp:**

- **Resize:** thay đổi kích thước ảnh
- **Crop:** cắt ảnh
- **Denoising:** khử nhiễu
- **Normalization:** chuẩn hóa giá trị pixel
- **Contrast Enhancement:** tăng cường độ tương phản
- **Data Augmentation:** tạo biến thể dữ liệu

**Ví dụ công thức chuẩn hóa:**

$$
I' = \frac{I}{255}
$$

để đưa giá trị pixel từ:

$$
[0,255] \rightarrow [0,1]
$$

- *Ví dụ:* Ảnh đầu vào có kích thước 1920x1080 được resize về 224x224, giá trị pixel được chia cho 255 để nằm trong khoảng [0,1], sau đó đưa vào mô hình ResNet.

---

# GIAI ĐOẠN 2 – TRÍCH XUẤT ĐẶC TRƯNG

**Mục tiêu:** Chuyển ảnh từ biểu diễn pixel sang biểu diễn chứa thông tin hữu ích hơn.

$$
\text{Image} \rightarrow \text{Feature Representation}
$$

**Đặc trưng truyền thống (thiết kế thủ công):**

- **Edge:** biên, cạnh
- **Corner:** góc
- **Texture:** kết cấu bề mặt
- **Shape:** hình dạng
- **Keypoint:** điểm đặc trưng

**Đặc trưng học sâu (Deep Learning):**

CNN hoặc Transformer có thể tự học biểu diễn đặc trưng từ dữ liệu:

$$
\text{Image} \rightarrow \text{Neural Network} \rightarrow \text{Low-level features} \rightarrow \text{High-level features} \rightarrow \text{Prediction}
$$

- *Ví dụ:* Trong ảnh con mèo, các lớp đầu của CNN học các cạnh và góc (low-level), các lớp sâu hơn học hình dạng tai, mắt, lông (high-level).

---

# GIAI ĐOẠN 3 – HIỂU VÀ NHẬN THỨC

Hệ thống sử dụng đặc trưng để suy luận về nội dung ảnh.

**Các nhiệm vụ có thể thực hiện:**

- **Classification:** phân loại ảnh
- **Object Detection:** phát hiện và định vị đối tượng
- **Segmentation:** phân đoạn ở cấp pixel
- **OCR:** nhận dạng văn bản
- **Pose Estimation:** ước lượng tư thế
- **Tracking:** theo dõi đối tượng
- **Depth Estimation:** ước lượng độ sâu

**Ví dụ:**

$$
\text{Feature} \rightarrow \text{Class = Car}
$$

hoặc:

$$
\text{Feature} \rightarrow \text{Bounding Box + Class}
$$

- *Ví dụ:* Từ các đặc trưng đã trích xuất, mô hình nhận ra "đây là xe ô tô" và xác định vị trí xe nằm trong khung [100, 200, 400, 500].

---

# GIAI ĐOẠN 4 – RA QUYẾT ĐỊNH

Kết quả Computer Vision có thể được sử dụng để thực hiện hành động.

**Ví dụ trong các lĩnh vực:**

**Giao thông:**

$$
\text{Phát hiện người} \rightarrow \text{Cảnh báo}
$$

**Sản xuất:**

$$
\text{Phát hiện lỗi} \rightarrow \text{Loại sản phẩm}
$$

**Xe tự hành:**

$$
\text{Phát hiện vật cản} \rightarrow \text{Điều chỉnh hướng di chuyển}
$$

- *Ví dụ:* Camera phát hiện người đi bộ băng qua đường → hệ thống xe tự hành ra quyết định phanh → xe dừng lại an toàn.

---

# HIỂU NỘI DUNG HÌNH ẢNH

Computer Vision có thể trả lời các câu hỏi khác nhau về ảnh:

**"Có gì trong ảnh?"**
→ Object Classification/Detection

**"Đối tượng ở đâu?"**
→ Bounding Box/Segmentation

**"Đối tượng đang làm gì?"**
→ Action Recognition

**"Các đối tượng có quan hệ như thế nào?"**
→ Scene/Relationship Understanding

- *Ví dụ:* Một hệ thống giám sát có thể trả lời: "Có 3 người đang đi bộ trên vỉa hè, một người đang cầm ô, và có một chiếc xe đang đỗ bên đường".

---

# ỨNG DỤNG CỦA COMPUTER VISION

**Y tế:**
- Phân tích ảnh X-quang, CT, MRI
- Phân đoạn khối u

**Giao thông:**
- Phát hiện phương tiện
- Nhận dạng biển báo
- Theo dõi người đi bộ

**Sản xuất:**
- Kiểm tra lỗi sản phẩm
- Kiểm soát chất lượng

**An ninh:**
- Nhận dạng và theo dõi đối tượng
- Phân tích video

**Nông nghiệp:**
- Phát hiện sâu bệnh
- Đếm và ước lượng sản lượng

- *Ví dụ:* Trong bệnh viện, CV phân tích ảnh CT để phát hiện vùng khối u phổi sớm, hỗ trợ bác sĩ chẩn đoán chính xác hơn.

---
<!--_class: section-->

# PHẦN 2. CÁC BÀI TOÁN TRONG COMPUTER VISION

---

# CÁC BÀI TOÁN CHÍNH

| Bài toán | Đầu ra chính |
|---|---|
| Classification | Class/Label |
| Object Detection | Class + Bounding Box |
| Semantic Segmentation | Class cho từng pixel |
| Instance Segmentation | Mask cho từng đối tượng |
| Keypoint Detection | Các keypoint |
| OCR | Chuỗi văn bản |
| 3D Reconstruction | Mô hình/đám mây điểm 3D |

**Nguyên tắc:** Bắt đầu từ yêu cầu đầu ra của bài toán, sau đó mới lựa chọn thuật toán hoặc mô hình phù hợp.

---

# BÀI TOÁN 1 – IMAGE CLASSIFICATION

**Định nghĩa:**

Image Classification xác định ảnh thuộc lớp nào trong tập các lớp đã biết:

$$
f(I) \rightarrow y
$$

Trong đó:
- $I$: ảnh đầu vào
- $y$: nhãn/lớp dự đoán

**Single-label Classification:**

Một ảnh → một lớp:

$$
I \rightarrow \text{Cat}
$$

**Multi-label Classification:**

Một ảnh có thể có nhiều nhãn:

$$
I \rightarrow \{\text{Dog, Grass, Person}\}
$$

- *Ví dụ:* Phân loại ảnh trái cây: ảnh một quả táo → nhãn "apple". Phân loại cảnh: ảnh công viên → nhiều nhãn {"cây", "người", "ghế", "bầu trời"}.

---

# CLASSIFICATION – VÍ DỤ MINH HỌA

**Ảnh:** Một con mèo nằm trên ghế.

**Single-label:**

$$
\text{Image} \rightarrow \text{Cat}
$$

**Multi-label:**

$$
\text{Image} \rightarrow \{\text{Cat, Chair}\}
$$

**Lưu ý quan trọng:**

Classification **không cung cấp vị trí** của đối tượng trong ảnh. Nó chỉ trả lời "ảnh này chứa cái gì" chứ không trả lời "nó nằm ở đâu".

- *Ví dụ:* Một hệ thống phân loại ảnh y tế có thể cho biết "ảnh này có khối u" nhưng không chỉ ra khối u nằm ở vị trí nào trên ảnh X-quang.

---

# BÀI TOÁN 2 – OBJECT DETECTION

**Định nghĩa:**

Object Detection xác định đồng thời:
- Đối tượng thuộc lớp nào
- Đối tượng nằm ở đâu

Mỗi đối tượng thường được biểu diễn bởi:

$$
(\text{class}, \text{bounding box}, \text{confidence})
$$

**Ví dụ:**

$$
(\text{Car}, B_1, 0.95)
$$

Trong đó $B_1$ là bounding box của chiếc xe, 0.95 là độ tin cậy của dự đoán.

- *Ví dụ:* Một ảnh giao thông có 3 người, 2 ô tô, 1 xe đạp → mô hình detection trả về 6 kết quả, mỗi kết quả gồm nhãn, vị trí hộp và độ tin cậy.

---

# BOUNDING BOX

**Định nghĩa:**

Bounding box là hình chữ nhật bao quanh một đối tượng.

**Cách biểu diễn 1 – Hai góc:**

$$
B = (x_{min}, y_{min}, x_{max}, y_{max})
$$

Trong đó:
- $(x_{min}, y_{min})$: góc trên trái
- $(x_{max}, y_{max})$: góc dưới phải

**Cách biểu diễn 2 – Tâm và kích thước:**

$$
B = (x_c, y_c, w, h)
$$

Trong đó:
- $(x_c, y_c)$: tâm bounding box
- $(w, h)$: chiều rộng và chiều cao

**Quy ước:** Trong toàn bộ chương, sử dụng $B = (x_{min}, y_{min}, x_{max}, y_{max})$ khi minh họa bounding box.

- *Ví dụ:* Một người trong ảnh được bao bởi hộp có góc trên trái (100, 50) và góc dưới phải (300, 400).

---

# DETECTION KHÁC CLASSIFICATION NHƯ THẾ NÀO?

**Classification:**

$$
\text{Image} \rightarrow \text{Class}
$$

**Detection:**

$$
\text{Image} \rightarrow \{(\text{Class}, \text{Box})_1, \ldots, (\text{Class}, \text{Box})_n\}
$$

**So sánh:**

- **Classification** trả lời: "Ảnh này thuộc lớp nào?"
- **Detection** trả lời: "Có những đối tượng nào và chúng nằm ở đâu?"

- *Ví dụ:* Classification cho ảnh đường phố chỉ nói "có xe và người". Detection cho biết "có 3 chiếc xe tại vị trí A, B, C và 2 người tại vị trí D, E".

---

# BÀI TOÁN 3 – IMAGE SEGMENTATION

**Định nghĩa:**

Image Segmentation là bài toán gán thông tin lớp hoặc đối tượng cho **từng pixel** của ảnh.

**Ba dạng chính:**

- **Semantic Segmentation:** phân đoạn theo ngữ nghĩa
- **Instance Segmentation:** phân đoạn theo từng đối tượng riêng biệt
- **Panoptic Segmentation:** kết hợp cả hai

- *Ví dụ:* Trong ảnh giao thông, segmentation không chỉ nói "có xe" mà chỉ ra chính xác pixel nào là xe, pixel nào là đường, pixel nào là bầu trời.

---

# SEMANTIC SEGMENTATION

**Định nghĩa:**

Mỗi pixel được gán một class.

**Ví dụ các lớp:** Road, Car, Person, Sky

Nếu ảnh đầu vào:

$$
I \in \mathbb{R}^{H\times W\times 3}
$$

thì mask lớp có thể biểu diễn:

$$
M \in \{1, \ldots, C\}^{H\times W}
$$

Trong đó:
- $(H, W)$: kích thước ảnh
- $C$: số lớp

**Đặc điểm:**

Các đối tượng cùng lớp **không được phân biệt riêng**.

- *Ví dụ:* Hai người trong ảnh → cả hai đều mang class "Person", không phân biệt người thứ nhất và người thứ hai.

---

# INSTANCE SEGMENTATION

**Định nghĩa:**

Instance Segmentation phân biệt **từng đối tượng cụ thể**, ngay cả khi chúng cùng lớp.

**Ví dụ:** Person 1, Person 2, Person 3

**Kết quả:**

$$
\{(class_i, mask_i)\}_{i=1}^{N}
$$

Trong đó:
- $N$: số instance
- $mask_i$: mặt nạ của instance thứ $i$

- *Ví dụ:* Trong ảnh có 3 người, instance segmentation tạo ra 3 mask riêng biệt, mỗi mask bao quanh một người, giúp phân biệt được từng người.

---

# PANOPTIC SEGMENTATION

**Định nghĩa:**

Panoptic Segmentation kết hợp:

**Thing:** các đối tượng có thể đếm riêng
- Person, Car, Dog

**Stuff:** các vùng không có instance riêng
- Sky, Road, Grass

**Mục tiêu:**

Gán một nhãn đầy đủ cho toàn bộ ảnh, đồng thời phân biệt các instance đối với nhóm "thing".

- *Ví dụ:* Trong ảnh đường phố, panoptic segmentation vừa phân biệt từng chiếc xe (thing), vừa phân vùng bầu trời, mặt đường, vỉa hè (stuff).

---

# SO SÁNH BA LOẠI SEGMENTATION

| Loại | Mỗi pixel có class | Phân biệt instance |
|---|---|---|
| Semantic | Có | Không |
| Instance | Có | Có |
| Panoptic | Có | Có đối với Thing |

**Ví dụ có 3 người:**

- **Semantic:** tất cả là `Person`
- **Instance:** Person 1, Person 2, Person 3
- **Panoptic:** đồng thời xử lý người và các vùng `Road`, `Sky`, `Grass`

- *Ví dụ thực tế:* Trong ứng dụng xe tự hành, panoptic segmentation cho xe hiểu được cả "có 3 người đang qua đường" (instance) lẫn "đây là mặt đường, đây là vỉa hè" (stuff).

---

# BÀI TOÁN 4 – KEYPOINT DETECTION

**Định nghĩa:**

Keypoint là một vị trí đặc trưng trong ảnh.

**Ví dụ:**
- Góc của vật thể
- Điểm đặc trưng trên khuôn mặt
- Khớp trên cơ thể người

**Biểu diễn:**

$$
p_i = (x_i, y_i)
$$

Mỗi keypoint có thể đi kèm:
- **Score:** độ tin cậy
- **Scale:** tỷ lệ
- **Orientation:** hướng
- **Descriptor:** vector mô tả

- *Ví dụ:* Trong ảnh một người, các keypoint có thể là: mũi (100, 150), vai trái (120, 200), vai phải (180, 200), khuỷu tay trái (110, 280), v.v.

---

# FEATURE DESCRIPTOR VÀ FEATURE MATCHING

**Descriptor:**

Descriptor là vector mô tả vùng lân cận của một keypoint:

$$
d_i \in \mathbb{R}^{D}
$$

Trong đó $D$ là số chiều của descriptor.

**Feature Matching:**

So sánh các descriptor giữa hai ảnh để tìm các cặp điểm tương ứng:

$$
d_i^{(A)} \leftrightarrow d_j^{(B)}
$$

**Ứng dụng:**
- Panorama (ghép ảnh)
- Object tracking (theo dõi đối tượng)
- Image registration (căn chỉnh ảnh)
- 3D reconstruction (tái tạo 3D)

- *Ví dụ:* Chụp cùng một tòa nhà từ hai góc khác nhau, feature matching tìm ra các điểm tương ứng để ghép thành ảnh toàn cảnh panorama.

---

# BÀI TOÁN 5 – OCR

**Định nghĩa:**

OCR – Optical Character Recognition là quá trình nhận dạng ký tự/văn bản xuất hiện trong ảnh và chuyển chúng thành dữ liệu văn bản có thể xử lý bằng máy tính.

**Ví dụ:**

$$
\text{Ảnh biển số} \rightarrow \text{"29A-12345"}
$$

**Ứng dụng:**
- Nhận dạng biển số
- Số hóa tài liệu
- Trích xuất hóa đơn
- Đọc văn bản

- *Ví dụ:* Camera tại bãi đỗ xe chụp ảnh biển số → OCR chuyển thành chuỗi "29A-12345" → hệ thống mở cổng tự động.

---

# BÀI TOÁN 6 – POSE ESTIMATION

**Định nghĩa:**

Pose Estimation xác định các keypoint của cơ thể người.

**Biểu diễn:**

$$
\{(x_1, y_1), \ldots, (x_K, y_K)\}
$$

Trong đó $K$ là số keypoint.

**Ví dụ các keypoint:** Vai, khuỷu tay, cổ tay, hông, đầu gối, mắt cá chân.

**Ứng dụng:**
- Phân tích thể thao
- AR/VR
- Theo dõi chuyển động
- Phân tích hành vi

- *Ví dụ:* Trong ứng dụng tập gym, pose estimation xác định 17 keypoints trên cơ thể người tập để phân tích tư thế squat có đúng hay không.

---

# BÀI TOÁN 7 – 3D RECONSTRUCTION

**Định nghĩa:**

3D Reconstruction là quá trình xây dựng biểu diễn ba chiều của vật thể hoặc cảnh từ hình ảnh và/hoặc dữ liệu cảm biến.

**Một số kỹ thuật:**

- **Structure from Motion (SfM):** Ước lượng cấu trúc 3D và chuyển động camera từ nhiều ảnh
- **Multi-view Stereo (MVS):** Khai thác nhiều ảnh của cùng một cảnh để tạo thông tin hình học 3D, chẳng hạn point cloud

**Ứng dụng:**
- Bản đồ 3D
- Di sản số
- VR/AR
- Đo đạc và mô hình hóa

- *Ví dụ:* Chụp 50 bức ảnh một bức tượng cổ từ nhiều góc → dùng SfM + MVS để tạo mô hình 3D có thể xoay và xem từ mọi hướng trên máy tính.

---

# TỔNG HỢP CÁC BÀI TOÁN

| Bài toán | Câu hỏi chính | Đầu ra |
|---|---|---|
| Classification | Có gì? | Class |
| Detection | Có gì và ở đâu? | Class + Box |
| Semantic Segmentation | Pixel thuộc lớp nào? | Pixel Class |
| Instance Segmentation | Đối tượng cụ thể nào? | Mask + Instance |
| Keypoint | Điểm đặc trưng ở đâu? | Keypoints |
| OCR | Văn bản là gì? | Text |
| 3D Reconstruction | Hình học 3D như thế nào? | 3D Representation |

**Nguyên tắc:** Bắt đầu từ yêu cầu đầu ra của bài toán, sau đó mới lựa chọn thuật toán hoặc mô hình.

---
<!--_class: section-->

# PHẦN 3. QUY TRÌNH XÂY DỰNG HỆ THỐNG

---

# PIPELINE TỔNG QUÁT

$$
\boxed{\text{Problem}} \rightarrow \boxed{\text{Data}} \rightarrow \boxed{\text{Preprocessing}} \rightarrow \boxed{\text{Model}} \rightarrow \boxed{\text{Evaluation}} \rightarrow \boxed{\text{Deployment}} \rightarrow \boxed{\text{Monitoring}}
$$

**Đây là một vòng lặp**, không phải quy trình chỉ thực hiện một lần.

- *Ví dụ:* Xây dựng hệ thống phát hiện khẩu trang: xác định bài toán → thu thập ảnh người đeo/không đeo khẩu trang → tiền xử lý → huấn luyện mô hình → đánh giá → triển khai tại cổng ra vào → giám sát và cải tiến khi điều kiện thay đổi.

---

# BƯỚC 1 – XÁC ĐỊNH BÀI TOÁN

**Cần xác định:**
- Mục tiêu
- Đầu vào
- Đầu ra
- Đối tượng cần nhận biết
- Điều kiện hoạt động
- Yêu cầu về tốc độ
- Yêu cầu về độ chính xác

**Ví dụ:**

Phát hiện sản phẩm lỗi trên dây chuyền sản xuất.

- **Input:** $\text{Image}$
- **Output:** $\text{Class} + \text{Bounding Box}$

- *Ví dụ chi tiết:* Nhà máy cần biết: lỗi là gì (trầy, nứt, biến dạng), có bao nhiêu loại lỗi, cần classification hay detection, camera đặt ở đâu, có cần real-time không, sai sót nào nghiêm trọng hơn (bỏ sót lỗi hay báo nhầm).

---

# BƯỚC 2 – THU THẬP DỮ LIỆU

**Nguồn dữ liệu:**
- Camera
- Dataset công khai
- Thiết bị IoT
- Ảnh do người dùng cung cấp

**Cần đảm bảo dữ liệu đa dạng về:**
- Góc nhìn
- Ánh sáng
- Độ phân giải
- Khoảng cách
- Môi trường
- Các trường hợp đặc biệt

**Nguyên tắc:** Dữ liệu phải đại diện cho điều kiện mà hệ thống sẽ gặp khi triển khai.

- *Ví dụ:* Không chỉ thu thập ảnh sản phẩm đẹp, mà cần cả: sản phẩm tốt, sản phẩm lỗi nhẹ, sản phẩm lỗi nặng, chụp ở các góc nhìn khác nhau và ánh sáng khác nhau.

---

# BƯỚC 3 – GÁN NHÃN DỮ LIỆU

**Annotation:** Tạo ground truth cho dữ liệu.

**Ví dụ các dạng gán nhãn:**

- **Classification:** $(image, label)$
- **Detection:** $(image, \{(class_i, B_i)\})$
- **Segmentation:** $(image, \{mask_i\})$

**Công cụ phổ biến:**
- LabelImg
- CVAT
- MakeSense.ai

**Nguyên tắc:** Chất lượng nhãn ảnh hưởng trực tiếp đến chất lượng mô hình. "Garbage in, garbage out" – dữ liệu nhãn kém sẽ tạo ra mô hình kém.

---

# BƯỚC 4 – CHIA DỮ LIỆU

**Thông thường:**

$$
D = D_{train} \cup D_{val} \cup D_{test}
$$

Trong đó:
- **Training set:** dùng để học tham số mô hình
- **Validation set:** dùng để lựa chọn mô hình và siêu tham số
- **Test set:** dùng để đánh giá cuối cùng

**Nguyên tắc quan trọng:**

Không để dữ liệu từ test set tham gia quá trình huấn luyện hoặc lựa chọn mô hình → Tránh **data leakage**.

- *Ví dụ:* Nếu cùng một bức ảnh xuất hiện cả trong tập train và tập test, mô hình có thể "nhớ" bức ảnh đó thay vì học đặc trưng tổng quát, dẫn đến kết quả đánh giá lạc quan giả tạo.

---

# BƯỚC 5 – TIỀN XỬ LÝ VÀ AUGMENTATION

**Preprocessing:**
- Resize
- Normalize
- Denoising
- Crop

**Data Augmentation:** Tạo biến thể của dữ liệu:
- Flip
- Rotation
- Crop
- Translation
- Thay đổi brightness/contrast

**Nguyên tắc:** Phép biến đổi phải **không làm thay đổi ý nghĩa của nhãn**.

- *Ví dụ:* Lật ngang ảnh con mèo vẫn là con mèo (hợp lệ). Nhưng lật ngược ảnh chữ "p" sẽ thành chữ "d" (không hợp lệ cho bài toán OCR).

---

# BƯỚC 6 – XÂY DỰNG MÔ HÌNH

**Các lựa chọn:**

**Mô hình truyền thống:**
- SVM, k-NN, Random Forest

**Deep Learning:**
- CNN, Transformer, Vision Transformer

**Pretrained Model:**
- Có thể sử dụng mô hình đã được huấn luyện trước và Transfer Learning

- *Ví dụ:* Với bài toán phân loại hoa có 500 ảnh, có thể dùng ResNet-50 đã huấn luyện trên ImageNet, thay lớp cuối từ 1000 classes thành 5 classes, rồi huấn luyện trên dữ liệu hoa.

---

# BƯỚC 7 – HUẤN LUYỆN

Trong quá trình training, mô hình tối ưu các tham số $\theta$:

$$
\theta^* = \arg\min_{\theta} \mathcal{L}(\theta)
$$

Trong đó:
- $\theta$: tham số mô hình
- $\mathcal{L}$: hàm mất mát

**Ví dụ:**

$$
\text{Image} \rightarrow \text{Model} \rightarrow \hat{y}
$$

so sánh $\hat{y}$ với ground truth $y$ để tính loss.

- *Ví dụ:* Mô hình dự đoán ảnh là "mèo" với xác suất 0.7, nhưng nhãn đúng là "chó" → tính loss → lan truyền ngược để cập nhật tham số → lặp lại qua nhiều batch và epoch.

---

# BƯỚC 8 – ĐÁNH GIÁ MÔ HÌNH

**Classification:**
- Accuracy, Precision, Recall, F1-score

**Detection:**
- IoU, AP, mAP

**Segmentation:**
- IoU, Dice coefficient

**Deployment (triển khai):**

Ngoài chất lượng dự đoán còn quan tâm:
- Latency (độ trễ)
- Throughput (số lượng xử lý/giây)
- Memory (bộ nhớ)
- Model size (kích thước mô hình)

- *Ví dụ:* Một mô hình có accuracy 95% nhưng xử lý mất 2 giây/ảnh sẽ không phù hợp cho ứng dụng real-time yêu cầu 30 FPS.

---

# CÁC CHỈ SỐ CLASSIFICATION

**Ma trận nhầm lẫn (Confusion Matrix):**

|  | Predicted Positive | Predicted Negative |
|---|---|---|
| Actual Positive | TP | FN |
| Actual Negative | FP | TN |

**Accuracy:**

$$
Accuracy = \frac{TP + TN}{TP + TN + FP + FN}
$$

**Precision:**

$$
Precision = \frac{TP}{TP + FP}
$$

**Recall:**

$$
Recall = \frac{TP}{TP + FN}
$$

**F1-score:**

$$
F1 = 2 \cdot \frac{Precision \cdot Recall}{Precision + Recall}
$$

- *Ví dụ:* Trong bài toán phát hiện bệnh, Recall cao nghĩa là mô hình bỏ sót ít bệnh nhân thực sự có bệnh. Precision cao nghĩa là ít chẩn đoán nhầm người khỏe thành người bệnh.

---

# IoU – INTERSECTION OVER UNION

**Định nghĩa:**

IoU đo mức độ chồng lấp giữa dự đoán và ground truth.

**Trong Detection:**

$$
IoU = \frac{|B_{pred} \cap B_{gt}|}{|B_{pred} \cup B_{gt}|}
$$

**Trong Segmentation** ($B$ được thay bằng mask):

$$
IoU = \frac{|M_{pred} \cap M_{gt}|}{|M_{pred} \cup M_{gt}|}
$$

**Giá trị:**

$$
0 \leq IoU \leq 1
$$

- $IoU = 0$: không chồng lấp
- $IoU = 1$: trùng khớp hoàn toàn

- *Ví dụ:* Bounding box dự đoán và ground truth chồng lên nhau 70% diện tích → IoU = 0.7. Thông thường IoU > 0.5 được coi là dự đoán chấp nhận được.

---

# AP VÀ mAP

**Average Precision – AP:**

AP tổng hợp quan hệ Precision–Recall của mô hình cho một lớp.

**Mean Average Precision – mAP:**

Nếu có $C$ lớp:

$$
mAP = \frac{1}{C} \sum_{c=1}^{C} AP_c
$$

**Trong thực tế có thể gặp:**
- mAP@0.5
- mAP@0.5:0.95

**Lưu ý:** mAP phụ thuộc vào:
- Cách tính AP
- Ngưỡng IoU
- Tập lớp
- Phiên bản/benchmark

- *Ví dụ:* Mô hình YOLOv8 đạt mAP@0.5:0.95 là 53.0% trên tập COCO, nghĩa là trung bình trên 80 lớp đối tượng, ở các ngưỡng IoU từ 0.5 đến 0.95, AP trung bình là 53%.

---

# BƯỚC 9 – TRIỂN KHAI

Mô hình sau khi đánh giá có thể được triển khai trên:
- Server
- Cloud
- PC
- Edge device
- Mobile
- Embedded device

**Hai yêu cầu thường có sự đánh đổi:**

$$
\text{Accuracy} \leftrightarrow \text{Speed} \leftrightarrow \text{Resource}
$$

Mô hình lớn thường cho biểu diễn mạnh hơn nhưng có thể yêu cầu nhiều tài nguyên hơn.

- *Ví dụ:* ResNet-152 có accuracy cao hơn ResNet-18 nhưng cần GPU mạnh và bộ nhớ lớn. Trên điện thoại di động, thường phải chọn MobileNet để đảm bảo tốc độ và tiết kiệm pin.

---

# BƯỚC 10 – GIÁM SÁT VÀ CẢI TIẾN

**Sau khi triển khai cần theo dõi:**
- Độ chính xác thực tế
- Latency
- Tỷ lệ lỗi
- Dữ liệu mới
- Data drift

**Vòng lặp cải tiến:**

$$
\text{Deploy} \rightarrow \text{Monitor} \rightarrow \text{Collect Data} \rightarrow \text{Retrain} \rightarrow \text{Deploy}
$$

- *Ví dụ:* Hệ thống nhận diện biển báo hoạt động tốt vào mùa hè, nhưng khi mùa đông đến, tuyết phủ làm thay đổi hình dạng biển báo → cần thu thập dữ liệu mới và huấn luyện lại.

---

# PIPELINE HOÀN CHỈNH

$$
\boxed{\text{Problem} \rightarrow \text{Data} \rightarrow \text{Annotation} \rightarrow \text{Preprocessing} \rightarrow \text{Training} \rightarrow \text{Evaluation} \rightarrow \text{Deployment} \rightarrow \text{Monitoring}}
$$

Sau Monitoring:

$$
\boxed{\text{Feedback} \rightarrow \text{Improvement}}
$$

→ Computer Vision là một **quy trình lặp liên tục**.

- *Ví dụ:* Hệ thống phát hiện sản phẩm lỗi sau 6 tháng hoạt động có độ chính xác giảm do camera bị bẩn và ánh sáng nhà máy thay đổi → cần thu thập dữ liệu mới, gán nhãn lại, huấn luyện lại và triển khai phiên bản mới.

---
<!--_class: section-->

# PHẦN 4. CÔNG CỤ VÀ THƯ VIỆN

---

# HỆ SINH THÁI COMPUTER VISION

**Image Processing:**
- OpenCV, Pillow, scikit-image

**Machine Learning:**
- scikit-learn, XGBoost

**Deep Learning:**
- PyTorch, TensorFlow, Keras

**Annotation:**
- CVAT, LabelImg

**Deployment:**
- ONNX, TensorRT, OpenVINO, LiteRT/TFLite

- *Ví dụ:* Một dự án CV hoàn chỉnh có thể dùng OpenCV để tiền xử lý ảnh, PyTorch để huấn luyện mô hình, CVAT để gán nhãn dữ liệu, và TensorRT để tối ưu triển khai trên GPU.

---

# OPENCV TRONG COMPUTER VISION

OpenCV cung cấp nhiều chức năng xử lý ảnh và thị giác máy tính.

**Tiền xử lý:**
- `cv2.resize()`, `cv2.GaussianBlur()`, `cv2.cvtColor()`

**Phát hiện đặc trưng:**
- `cv2.Canny()`, `cv2.SIFT_create()`

**Xử lý hình thái:**
- `cv2.erode()`, `cv2.dilate()`

**Vai trò:**

$$
\text{Input} \rightarrow \boxed{\text{OpenCV Preprocessing}} \rightarrow \text{AI Model}
$$

- *Ví dụ:* Dùng OpenCV để đọc frame từ camera, chuyển sang ảnh xám, áp dụng GaussianBlur để giảm nhiễu, sau đó đưa vào mô hình YOLO để phát hiện đối tượng.

---

# OPENCV + AI MODEL

Một hệ thống thực tế có thể kết hợp:

$$
\text{Camera} \rightarrow \text{OpenCV} \rightarrow \text{AI Model} \rightarrow \text{Post-processing} \rightarrow \text{Output}
$$

**Ví dụ:**
1. OpenCV đọc frame
2. Resize ảnh
3. AI model phát hiện đối tượng
4. OpenCV vẽ bounding box
5. Hiển thị kết quả

- *Ví dụ:* Camera giám sát → OpenCV đọc frame → YOLO phát hiện người → OpenCV vẽ hộp xanh quanh người → hiển thị lên màn hình bảo vệ.

---
<!--_class: section-->

# PHẦN 5. MÔ HÌNH AI TRONG COMPUTER VISION

---

# MÔ HÌNH AI LÀ GÌ?

Mô hình AI là một mô hình tính toán được học các tham số từ dữ liệu để thực hiện một nhiệm vụ dự đoán hoặc suy luận.

**Quá trình:**

$$
\text{Training Data} \rightarrow \text{Learning} \rightarrow \text{Model Parameters}
$$

**Sau đó:**

$$
\text{New Image} \rightarrow \text{Trained Model} \rightarrow \text{Prediction}
$$

- *Ví dụ:* Cho mô hình xem 10.000 ảnh con mèo và con chó → mô hình học các tham số → khi đưa ảnh mới, mô hình dự đoán đó là mèo hay chó.

---

# CNN – CONVOLUTIONAL NEURAL NETWORK

CNN được thiết kế đặc biệt hiệu quả cho dữ liệu có cấu trúc không gian như ảnh.

**Các thành phần thường gặp:**
- Convolution
- Activation
- Pooling
- Fully Connected Layer

**Ý tưởng:**

$$
\text{Image} \rightarrow \text{Low-level Features} \rightarrow \text{High-level Features} \rightarrow \text{Prediction}
$$

- *Ví dụ:* Trong nhận dạng chữ số viết tay, các lớp đầu học các cạnh và đường nét đơn giản, các lớp sâu hơn học hình dạng chữ số hoàn chỉnh.

---

# ALEXNET – KIẾN TRÚC CNN ĐỘT PHÁ

**Đặc điểm:**
- Kiến trúc CNN nổi tiếng từ ImageNet 2012
- Sử dụng ReLU
- Sử dụng Dropout
- Gồm nhiều lớp convolution và fully connected
- Cho thấy khả năng vượt trội của Deep Learning trong Image Classification

**Ý nghĩa:**

AlexNet là một dấu mốc quan trọng trong sự phát triển của Deep Learning cho Computer Vision.

- *Ví dụ:* Trước AlexNet (2012), các hệ thống nhận diện ảnh thường dùng đặc trưng thủ công như SIFT + SVM. AlexNet cho thấy CNN kết hợp GPU và dữ liệu lớn có thể vượt xa các phương pháp truyền thống, giảm top-5 error từ 26% xuống 15.3% trên ImageNet.

---

# VGG – KIẾN TRÚC SÂU ĐƠN GIẢN

**Đặc điểm:**
- Kiến trúc sâu
- Sử dụng nhiều convolution kernel $3\times 3$
- Các phiên bản nổi tiếng: VGG-16, VGG-19

**Ưu điểm:**
- Kiến trúc tương đối đơn giản, dễ hiểu

**Hạn chế:**
- Số lượng tham số lớn → tốn bộ nhớ và tính toán

- *Ví dụ:* VGG-16 có khoảng 138 triệu tham số, lớn hơn nhiều so với ResNet-50 (~25 triệu) nhưng cho kết quả thấp hơn. VGG thường được dùng làm backbone trong các ứng dụng transfer learning.

---

# RESNET – SKIP CONNECTION

**Vấn đề:**

Khi mạng quá sâu, việc tối ưu có thể gặp khó khăn (vanishing gradient).

**Giải pháp – Residual Connection / Skip Connection:**

$$
\boxed{y = F(x) + x}
$$

Trong đó:
- $x$: đầu vào
- $F(x)$: phần biến đổi được học
- $y$: đầu ra

**Nếu kích thước không tương thích:**

Có thể dùng phép chiếu:

$$
y = F(x) + W_s x
$$

với $W_s$ là phép biến đổi để đưa kích thước về phù hợp.

- *Ví dụ:* ResNet-152 có 152 lớp nhưng vẫn huấn luyện được nhờ skip connection giúp gradient lan truyền dễ dàng hơn. Skip connection cho phép mạng học phần "bổ sung" $F(x)$ thay vì học toàn bộ ánh xạ.

---

# MOBILENET – MÔ HÌNH NHẸ

MobileNet được thiết kế hướng đến:
- Mobile
- Edge Device
- IoT

**Ý tưởng chính – Depthwise Separable Convolution:**

Tách convolution thông thường thành:
- Depthwise Convolution
- Pointwise Convolution

Giúp giảm đáng kể chi phí tính toán.

**Các phiên bản:** MobileNetV1, MobileNetV2, MobileNetV3

- *Ví dụ:* MobileNetV2 chỉ có khoảng 3.4 triệu tham số, nhỏ hơn ResNet-50 (~25 triệu) khoảng 7 lần, nhưng vẫn đạt độ chính xác chấp nhận được trên thiết bị di động.

---

# EFFICIENTNET – TỐI ƯU HIỆU QUẢ

**Ý tưởng – Compound Scaling:**

Mở rộng đồng thời:
- **Depth** (độ sâu)
- **Width** (độ rộng)
- **Input Resolution** (độ phân giải đầu vào)

**Các phiên bản:**

$$
B0, B1, \ldots, B7
$$

**Mục tiêu:**

Tìm cân bằng giữa độ chính xác và chi phí tính toán.

- *Ví dụ:* EfficientNet-B0 có ~5.3 triệu tham số và đạt 77.1% top-1 accuracy trên ImageNet, trong khi ResNet-50 có ~25.6 triệu tham số nhưng chỉ đạt 76.0%. EfficientNet-B7 đạt 84.3% với chi phí tính toán được tối ưu.

---

# VISION TRANSFORMER – ViT

ViT đưa kiến trúc Transformer vào bài toán thị giác.

**Ý tưởng:**

Chia ảnh thành các patch:

$$
224 \times 224 \rightarrow 16 \times 16 \text{ patches}
$$

Mỗi patch được biến đổi thành một vector embedding:

$$
\text{Image} \rightarrow \text{Patch Embeddings} \rightarrow \text{Transformer} \rightarrow \text{Prediction}
$$

- *Ví dụ:* Một ảnh 224x224 được chia thành 196 patch 16x16. Mỗi patch trở thành một "token" tương tự như một từ trong câu, và Transformer xử lý chuỗi 196 token này để hiểu nội dung ảnh.

---
<!--_class: section-->

# PHẦN 6. MÔ HÌNH OBJECT DETECTION

---

# HAI NHÓM KIẾN TRÚC DETECTION

**Two-stage detector:**

Ví dụ: Faster R-CNN

$$
\text{Image} \rightarrow \text{Region Proposals} \rightarrow \text{Classification + Box Refinement}
$$

**One-stage detector:**

Ví dụ: YOLO, SSD

$$
\text{Image} \rightarrow \text{Detection}
$$

**Mục tiêu:** Giảm thời gian xử lý và phù hợp với nhiều ứng dụng thời gian thực.

- *Ví dụ:* Faster R-CNN tạo ra các vùng đề xuất chứa đối tượng trước, sau đó phân loại từng vùng (chính xác nhưng chậm). YOLO thực hiện detection trong một lần xử lý (nhanh, phù hợp real-time).

---

# FASTER R-CNN

Faster R-CNN là một kiến trúc two-stage object detector.

**Hai giai đoạn:**
- Region Proposal Network – RPN
- Classification + Bounding Box Regression

**Đầu ra:**

$$
(class, bbox, score)
$$

**Đặc điểm:**
- Kiến trúc mạnh cho detection
- Có thể đạt độ chính xác cao
- Chi phí tính toán thường lớn hơn các detector tối ưu real-time

- *Ví dụ:* Trong ảnh y tế phát hiện khối u, Faster R-CNN được ưu tiên vì cần độ chính xác cao, không yêu cầu real-time.

---

# YOLO – YOU ONLY LOOK ONCE

YOLO là một họ mô hình object detection một giai đoạn.

**Ý tưởng chung:**

$$
\text{Image} \rightarrow \text{Neural Network} \rightarrow \{bbox, class, score\}
$$

**Các phiên bản/họ triển khai YOLO khác nhau có kiến trúc và đặc tính khác nhau.**

**Điểm mạnh:**
- Tốc độ xử lý cao
- Phù hợp nhiều ứng dụng real-time

- *Ví dụ:* YOLOv8 có thể xử lý 100+ FPS trên GPU hiện đại, phù hợp cho camera giao thông đếm xe theo thời gian thực.

---

# SO SÁNH DETECTION

| Tiêu chí | Two-stage | One-stage |
|---|---|---|
| Ví dụ | Faster R-CNN | YOLO |
| Quy trình | Proposal → Detection | Detection trực tiếp |
| Tốc độ | Thường thấp hơn | Thường cao hơn |
| Độ chính xác | Có thể rất cao | Có thể rất cao |
| Ứng dụng | Khi chất lượng là ưu tiên | Real-time/Edge |

**Lưu ý:** Không nên kết luận rằng một nhóm luôn chính xác hoặc nhanh hơn nhóm còn lại. Kết quả phụ thuộc vào: Kiến trúc, Phiên bản, Dataset, Phần cứng, Cách triển khai.

---
<!--_class: section-->

# PHẦN 7. MÔ HÌNH SEGMENTATION

---

# MASK R-CNN

Mask R-CNN mở rộng Faster R-CNN cho Instance Segmentation.

Ngoài:

$$
(class, bbox)
$$

mô hình dự đoán thêm:

$$
mask
$$

Do đó:

$$
\text{Image} \rightarrow \{class, bbox, mask\}
$$

cho từng instance.

- *Ví dụ:* Trong ảnh có 5 người, Mask R-CNN trả về 5 kết quả, mỗi kết quả gồm nhãn "person", bounding box và mask chi tiết bao quanh từng người.

---

# U-NET

U-Net được thiết kế cho bài toán semantic segmentation, đặc biệt nổi tiếng trong ảnh y tế.

**Kiến trúc:**

$$
\text{Encoder} \rightarrow \text{Bottleneck} \rightarrow \text{Decoder}
$$

Sử dụng Skip Connections giữa encoder và decoder.

**Mục tiêu:**

Giữ lại thông tin không gian chi tiết trong quá trình giải mã.

- *Ví dụ:* Trong ảnh MRI não, U-Net phân đoạn chính xác vùng khối u ở cấp pixel, giúp bác sĩ xác định kích thước và vị trí khối u để lên kế hoạch phẫu thuật.

---

# SO SÁNH SEGMENTATION

| Mô hình | Bài toán tiêu biểu |
|---|---|
| U-Net | Semantic Segmentation |
| Mask R-CNN | Instance Segmentation |
| Mask2Former | Semantic/Instance/Panoptic Segmentation |

**Việc lựa chọn phụ thuộc:**
- Loại segmentation
- Dataset
- Độ chính xác mong muốn
- Tài nguyên tính toán

- *Ví dụ:* Phân đoạn tế bào trong ảnh y sinh → U-Net. Tách từng người trong ảnh giám sát → Mask R-CNN. Phân đoạn toàn cảnh cho xe tự hành → Mask2Former.

---
<!--_class: section-->

# PHẦN 8. POSE ESTIMATION VÀ OCR

---

# POSE ESTIMATION

Pose Estimation xác định các keypoint của cơ thể.

**Biểu diễn:**

$$
\{(x_1, y_1), \ldots, (x_K, y_K)\}
$$

Trong đó $K$ là số keypoint.

**Ví dụ:** Vai, khuỷu tay, cổ tay, hông, đầu gối, mắt cá chân.

**Ứng dụng:**
- Phân tích thể thao
- AR/VR
- Theo dõi chuyển động
- Phân tích hành vi

- *Ví dụ:* OpenPose có thể xác định 25 keypoints trên cơ thể mỗi người, kể cả khi có nhiều người trong cùng một ảnh, tạo thành skeleton để phân tích tư thế.

---

# OPENPOSE

OpenPose là một phương pháp nổi tiếng cho multi-person 2D pose estimation.

**Mục tiêu:**

$$
\text{Image} \rightarrow \text{Human Keypoints}
$$

Sau đó các keypoint được liên kết để tạo thành cấu trúc cơ thể.

**Ứng dụng:**
- Human pose estimation
- Gesture analysis
- Motion analysis

- *Ví dụ:* Trong ứng dụng điều khiển game bằng cử chỉ, OpenPose xác định các keypoints trên tay người chơi → hệ thống nhận diện cử chỉ vẫy tay, nắm tay, chỉ tay → điều khiển nhân vật trong game.

---

# OCR VÀ TROCR

TrOCR là mô hình OCR dựa trên Transformer.

**Pipeline khái quát:**

$$
\text{Image of Text} \rightarrow \text{Visual Encoder} \rightarrow \text{Text Decoder} \rightarrow \text{Text}
$$

**Ví dụ:**

$$
\text{Ảnh hóa đơn} \rightarrow \text{"Tổng tiền: 250.000 VNĐ"}
$$

- *Ví dụ:* TrOCR có thể đọc được cả chữ in và chữ viết tay, phù hợp cho ứng dụng số hóa tài liệu cũ, hóa đơn viết tay, hoặc biển báo trên đường.

---
<!--_class: section-->

# PHẦN 9. FOUNDATION MODELS

---

# FOUNDATION MODEL LÀ GÌ?

Foundation Model là mô hình được tiền huấn luyện trên dữ liệu quy mô lớn và có thể được thích nghi cho nhiều nhiệm vụ khác nhau.

**Khái niệm quan trọng:**

$$
\text{Large-scale Pretraining} \rightarrow \text{General Representation} \rightarrow \text{Task Adaptation}
$$

**Lưu ý:** Không nên hiểu rằng một Foundation Model luôn giải quyết mọi bài toán mà không cần bất kỳ bước thích nghi nào.

- *Ví dụ:* GPT-4 là foundation model cho ngôn ngữ, có thể làm nhiều nhiệm vụ (dịch, tóm tắt, trả lời câu hỏi) nhưng vẫn cần được tinh chỉnh cho từng ứng dụng cụ thể. Trong thị giác máy tính, SAM là foundation model cho segmentation.

---

# CLIP – CONTRASTIVE LANGUAGE-IMAGE PRE-TRAINING

**CLIP** là mô hình học mối quan hệ giữa hình ảnh và văn bản.

**Ý tưởng:**

Đưa ảnh và văn bản vào cùng một không gian biểu diễn:

$$
\text{Image} \rightarrow Embedding_I
$$

$$
\text{Text} \rightarrow Embedding_T
$$

Sau đó so sánh độ tương đồng:

$$
sim(Embedding_I, Embedding_T)
$$

**Ứng dụng:**
- Image-text retrieval
- Zero-shot classification
- Tìm kiếm ảnh bằng văn bản

- *Ví dụ:* Với ảnh con mèo và ba mô tả "a photo of a cat", "a photo of a car", "a photo of a dog" → CLIP tính độ tương đồng cao nhất với "cat" → phân loại ảnh là mèo mà không cần huấn luyện trên tập dữ liệu mèo.

---

# SAM – SEGMENT ANYTHING MODEL

**SAM** là mô hình segmentation có khả năng sử dụng prompt để định hướng đối tượng cần phân đoạn.

**Prompt có thể gồm:**
- Point
- Box
- Các dạng prompt được mô hình hỗ trợ

**Khái quát:**

$$
\text{Image} + \text{Prompt} \rightarrow \text{Mask}
$$

**Ứng dụng:**
- Tách đối tượng
- Hỗ trợ annotation
- Chỉnh sửa ảnh
- Interactive segmentation

- *Ví dụ:* Bạn click vào một điểm trên ảnh con chó → SAM tự động tạo mask bao quanh toàn bộ con chó, tách nó khỏi nền mà không cần huấn luyện lại.

---

# FOUNDATION MODELS TRONG COMPUTER VISION

**Xu hướng:**

$$
\text{Pretrain lớn} \rightarrow \text{Representation tổng quát} \rightarrow \text{Adaptation} \rightarrow \text{Nhiều nhiệm vụ}
$$

**Ví dụ:**
- CLIP → image-text understanding
- SAM → promptable segmentation
- ViT → visual representation
- Các mô hình multimodal → kết hợp vision và language

**Lưu ý:** Foundation Model không loại bỏ hoàn toàn nhu cầu về dữ liệu, đánh giá, fine-tuning, kiểm soát chất lượng và tối ưu triển khai.

---
<!--_class: section-->

# PHẦN 10. LỰA CHỌN MÔ HÌNH

---

# LỰA CHỌN MÔ HÌNH – BẮT ĐẦU TỪ BÀI TOÁN

Không có một mô hình tốt nhất cho mọi bài toán.

**Cần cân nhắc:**
- Nhiệm vụ
- Dữ liệu
- Độ chính xác
- Tốc độ
- Bộ nhớ
- Phần cứng
- Môi trường triển khai

**Quy tắc:**

$$
\text{Model Selection} = f(\text{Task, Data, Accuracy, Speed, Resources})
$$

- *Ví dụ:* Bài toán phát hiện biển báo trên xe tự hành cần độ chính xác cao và tốc độ real-time → chọn YOLOv8. Bài toán phân tích ảnh y tế không yêu cầu real-time → chọn Faster R-CNN hoặc Mask R-CNN.

---

# ACCURACY – SPEED – RESOURCE

Ba yếu tố thường phải cân bằng:

$$
\boxed{\text{Accuracy} \leftrightarrow \text{Latency} \leftrightarrow \text{Resource}}
$$

**Ví dụ:**

- **Server mạnh:** Có thể sử dụng mô hình lớn hơn
- **Edge device:** Ưu tiên model nhỏ, latency thấp, memory thấp
- **Real-time:** Ưu tiên throughput/latency phù hợp với yêu cầu hệ thống

- *Ví dụ:* Trên server với GPU A100, có thể chạy ResNet-152 với accuracy 83%. Trên Raspberry Pi, phải dùng MobileNetV3 với accuracy 75% nhưng chạy được real-time.

---
<!--_class: section-->

# PHẦN 11. TRANSFER LEARNING

---

# TẠI SAO CẦN TRANSFER LEARNING?

Huấn luyện một mô hình lớn từ đầu thường cần:
- Nhiều dữ liệu
- Nhiều thời gian
- Tài nguyên tính toán lớn

**Thay vào đó:**

$$
\text{Pretrained Model} + \text{New Dataset} \rightarrow \text{Adapted Model}
$$

- *Ví dụ:* Huấn luyện ResNet-50 từ đầu trên ImageNet cần 1-2 tuần trên GPU mạnh. Thay vào đó, tải ResNet-50 đã huấn luyện sẵn và fine-tune trên dữ liệu của mình chỉ cần vài giờ.

---

# PRETRAINED MODEL

Pretrained Model là mô hình đã được huấn luyện trước trên một dataset lớn.

**Ví dụ:** ResNet, EfficientNet, ViT

Mô hình đã học được các biểu diễn có thể hữu ích cho nhiệm vụ mới:

$$
\text{Edge} \rightarrow \text{Texture} \rightarrow \text{Shape}
$$

Các đặc trưng này có thể được tái sử dụng.

- *Ví dụ:* Các lớp đầu của CNN học các cạnh, góc, texture – những đặc trưng cơ bản có thể áp dụng cho nhiều bài toán khác nhau (nhận dạng động vật, phân loại sản phẩm, phát hiện lỗi).

---

# FEATURE EXTRACTION

Trong chiến lược Feature Extraction:
- Tải pretrained model
- Giữ nguyên phần backbone
- Đóng băng các tham số backbone
- Thay classifier phù hợp
- Huấn luyện phần classifier mới

**Khái quát:**

$$
\boxed{\text{Pretrained Backbone} + \text{New Head}}
$$

- *Ví dụ:* Bạn có 500 ảnh X-quang phổi cần phân loại "bình thường" hay "viêm phổi". Tải ResNet-50 pretrained trên ImageNet, đóng băng backbone, thay lớp cuối từ 1000 classes thành 2 classes, chỉ huấn luyện lớp cuối.

---

# FINE-TUNING

Fine-tuning cho phép cập nhật một phần hoặc toàn bộ pretrained model trên dataset mới.

**Quy trình:**

$$
\text{Pretrained Model} \rightarrow \text{Unfreeze Some Layers} \rightarrow \text{Train on New Dataset}
$$

**Nguyên tắc:**
- Dataset mới càng nhỏ → thường nên tinh chỉnh thận trọng
- Dataset mới lớn và khác biệt → có thể cần cập nhật nhiều tầng hơn

- *Ví dụ:* Với 10.000 ảnh xe tự lái, có thể fine-tune YOLO đã huấn luyện trên COCO bằng cách mở băng một số lớp cuối và huấn luyện với learning rate nhỏ (0.0001) để giữ kiến thức đã học.

---

# FEATURE EXTRACTION VÀ FINE-TUNING

| Đặc điểm | Feature Extraction | Fine-tuning |
|---|---|---|
| Backbone | Đóng băng | Một phần/toàn bộ cập nhật |
| Tài nguyên | Thấp hơn | Cao hơn |
| Dữ liệu cần thiết | Ít hơn | Thường nhiều hơn |
| Khả năng thích nghi | Thấp hơn | Cao hơn |
| Nguy cơ overfitting | Thấp hơn | Cao hơn nếu dữ liệu ít |

- *Ví dụ:* Với 200 ảnh hoa → Feature Extraction (đóng băng backbone). Với 50.000 ảnh sản phẩm công nghiệp → Fine-tuning toàn bộ mô hình.

---

# PIPELINE TRANSFER LEARNING

$$
\boxed{\text{Dataset lớn}} \downarrow \boxed{\text{Pretraining}} \downarrow \boxed{\text{Pretrained Model}} \downarrow \boxed{\text{Dataset mới}} \downarrow \boxed{\text{Feature Extraction / Fine-tuning}} \downarrow \boxed{\text{Task-specific Model}}
$$

- *Ví dụ:* ImageNet (1.2 triệu ảnh) → huấn luyện ResNet-50 → mô hình pretrained → dữ liệu 1000 ảnh chó mèo → fine-tune → mô hình phân loại chó mèo.

---

# CHIẾN LƯỢC THỰC TẾ

**Dữ liệu ít:**
→ Pretrained Model + Feature Extraction

**Dữ liệu vừa:**
→ Pretrained Model + Fine-tuning một phần

**Dữ liệu lớn:**
→ Fine-tuning sâu hơn hoặc huấn luyện theo chiến lược phù hợp

**Không có nhãn:**
→ Có thể xem xét: Zero-shot, Foundation Models, Self-supervised learning, Weak supervision

- *Ví dụ:* Sinh viên làm đồ án với 300 ảnh → dùng ResNet-50 pretrained + Feature Extraction. Công ty có 100.000 ảnh sản phẩm → fine-tune YOLO toàn bộ. Không có dữ liệu gán nhãn → dùng CLIP cho zero-shot classification.

---
<!--_class: section-->

# PHẦN 12. TỔNG KẾT

---

# BẢN ĐỒ KIẾN THỨC CHƯƠNG 5

$$
\boxed{\text{Computer Vision}} \downarrow \text{Dữ liệu: Ảnh – Video – Camera} \downarrow \text{Tiền xử lý: Resize – Normalize – Denoise – Augmentation} \downarrow \text{Biểu diễn: Features – Keypoints – Deep Features} \downarrow \text{Nhiệm vụ: Classification – Detection – Segmentation – OCR – Pose – 3D Reconstruction} \downarrow \text{Mô hình: CNN – ResNet – YOLO – U-Net – ViT – Foundation Models} \downarrow \text{Triển khai: Cloud – Server – PC – Edge – Mobile} \downarrow \text{Cải tiến: Evaluation → Monitoring → Retraining}
$$

---

# NHỮNG ĐIỂM CẦN NHỚ

**1. Computer Vision:** Biến dữ liệu hình ảnh thành thông tin có ý nghĩa

**2. Classification:**

$$
\text{Image} \rightarrow \text{Class}
$$

**3. Detection:**

$$
\text{Image} \rightarrow \text{Class} + \text{Bounding Box}
$$

**4. Segmentation:**

$$
\text{Image} \rightarrow \text{Pixel/Instance Masks}
$$

**5. AI Model:** Học biểu diễn và quy luật từ dữ liệu

**6. Transfer Learning:** Tận dụng kiến thức từ pretrained model

**7. Selection:** Không chỉ dựa trên accuracy mà phải xét cả:

$$
\text{Accuracy, Speed, Resource}
$$

---

# CÂU HỎI ÔN TẬP

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

# BÀI TẬP THẢO LUẬN

**Bài toán:** Một nhà máy muốn xây dựng hệ thống camera để phát hiện sản phẩm lỗi trên dây chuyền.

**Yêu cầu:**
- Camera chụp ảnh liên tục
- Phát hiện sản phẩm lỗi
- Xác định vị trí lỗi
- Tốc độ xử lý gần thời gian thực
- Phần cứng hạn chế

**Hãy đề xuất:**
1. Loại bài toán Computer Vision
2. Kiểu dữ liệu cần thu thập
3. Cách gán nhãn
4. Phương pháp tiền xử lý
5. Loại mô hình phù hợp
6. Chỉ số đánh giá
7. Cách triển khai
8. Chiến lược Transfer Learning nếu dữ liệu ít

**Mục tiêu:** Không chỉ trả lời "Dùng mô hình nào?" mà phải giải thích toàn bộ pipeline:

$$
\boxed{\text{Problem} \rightarrow \text{Data} \rightarrow \text{Model} \rightarrow \text{Evaluation} \rightarrow \text{Deployment}}
$$

---

# KẾT THÚC CHƯƠNG 5

**COMPUTER VISION**

Từ dữ liệu hình ảnh → Nhận thức → Thông tin → Quyết định

**Ba câu hỏi quan trọng cần ghi nhớ:**

1. **Máy tính cần hiểu điều gì từ ảnh?** → Xác định bài toán
2. **Dữ liệu nào cần để học điều đó?** → Thu thập và chuẩn bị dữ liệu
3. **Mô hình nào phù hợp với yêu cầu?** → Cân bằng accuracy, speed và resource

**Tư duy cốt lõi:**

$$
\text{Problem} \rightarrow \text{Data} \rightarrow \text{Model} \rightarrow \text{Evaluation} \rightarrow \text{Deployment} \rightarrow \text{Improvement}
$$