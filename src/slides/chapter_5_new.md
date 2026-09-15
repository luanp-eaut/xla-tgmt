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

<!-- _class: toc -->

# Nội dung

- Giới thiệu tổng quan
- Phát hiện điểm, đường và biên
- Phân ngưỡng (Thresholding)
- Phân đoạn bằng phát triển, chia tách/hợp nhất vùng
- Phân đoạn sử dụng phân cụm và superpixels

---

<!-- _class: section -->

# GIỚI THIỆU TỔNG QUAN

---

# 📊 SLIDES BÀI GIẢNG CHƯƠNG 5
## Thị giác máy tính (Computer Vision)

---

# PHẦN 1 — THỊ GIÁC MÁY TÍNH

---

## Slide 1: Trang bìa

# Chương 5: Thị giác máy tính
## Computer Vision

**Học phần:** Xử lý ảnh & Thị giác máy tính  
**Nội dung:**
1. Thị giác máy tính
2. Ứng dụng OpenCV trong Thị giác máy tính
3. Ứng dụng các mô hình AI trong Thị giác máy tính

---

## Slide 2: Định nghĩa Thị giác máy tính

**Khái niệm:**
> **Computer Vision (CV)** là khoa học giúp máy tính **"nhìn"** và **"hiểu"** thế giới từ ảnh/video.

**Đầu vào (Input):**
- Ảnh tĩnh (image)
- Video (sequence of frames)
- Camera thời gian thực
- Dữ liệu từ cảm biến khác (drone, phone, CCTV...)

**Đầu ra (Output):**
- **Nhãn** (label): phân loại đối tượng
- **Vị trí** (location): tọa độ, bounding box
- **Mô tả** (description): văn bản, số liệu

**Mục tiêu tổng quát:**
> Xây dựng hệ thống thị giác nhân tạo mạnh mẽ như con người.

---

## Slide 3: Kiến trúc hệ thống Computer Vision

```
┌─────────────────────────────────────────────────────────┐
│ ĐẦU VÀO              HỆ THỐNG CV              ĐẦU RA    │
├─────────────┬──────────────────────┬────────────────────┤
│ Ảnh         │ 1. Tiền xử lý        │ Phân loại (Xe ô tô)│
│ Video    →  │ 2. Trích xuất đặc    │ Phát hiện đối tượng│
│ Camera      │    trưng             │ Phân đoạn (Seg)    │
│ Drone/Phone │ 3. Hiểu & Nhận thức  │ Theo dõi (Track)   │
│ CCTV        │ 4. Ra quyết định     │ Ước lượng / Đo     │
└─────────────┴──────────────────────┴────────────────────┘
```

**4 giai đoạn chính:**
1. **Tiền xử lý:** lọc nhiễu, thay đổi kích thước, chuẩn hóa
2. **Trích xuất đặc trưng:** cạnh, texture, keypoint, đặc trưng sâu
3. **Hiểu & Nhận thức:** phân loại, phát hiện, ước lượng
4. **Ra quyết định:** đưa ra kết quả cuối dựa trên bài toán

---

## Slide 4: Mục tiêu của Computer Vision

**1. Hiểu nội dung ảnh:**
- Xác định đối tượng, cảnh, hành động
- Hiểu mối quan hệ không gian giữa các đối tượng

**2. Trích xuất thông tin:**
- Chuyển dữ liệu thô (pixel) thành cấu trúc có nghĩa
- Tọa độ, nhãn, mô tả, số liệu đo lường

**3. Ra quyết định dựa trên hình ảnh:**
- Nhận diện biến báo → tự lái xe
- Phát hiện khối u → chẩn đoán y tế

**4. Khái quát hóa:**
- Hoạt động tốt trên nhiều điều kiện đầu vào khác nhau
- Thay đổi ánh sáng, góc nhìn, độ phân giải

---

## Slide 5: Ứng dụng Computer Vision — Đời sống

| Lĩnh vực | Ứng dụng cụ thể |
|----------|-----------------|
| **Đời sống hàng ngày** | Mở khóa khuôn mặt (Face ID), tìm kiếm ảnh theo nội dung |
| **Mạng xã hội** | Lọc ảo AR (Instagram, TikTok), gợi ý ảnh |
| **Y tế** | Phát hiện ung thư vú, phân loại bệnh võng mạc, hỗ trợ phẫu thuật robot |
| **Xe tự hành** | Phát hiện làn đường, người đi bộ; Drone giao hàng |
| **Sản xuất** | Phát hiện lỗi sản phẩm, đọc mã vạch tốc độ cao |
| **An ninh** | Phát hiện hành vi bất thường, đếm người, phân tích dòng người |
| **Nông nghiệp** | Phát hiện sâu bệnh, đếm trái cây, ước tính sản lượng |
| **Thương mại điện tử** | Thử đồ ảo, tìm kiếm sản phẩm bằng ảnh chụp |

---

## Slide 6: So sánh Computer Vision vs Xử lý ảnh

| Khía cạnh | Computer Vision | Xử lý ảnh (Image Processing) |
|-----------|-----------------|------------------------------|
| **Mục đích** | Suy luận, hiểu nội dung ảnh | Cải thiện chất lượng ảnh |
| **Trọng tâm** | Nhận dạng, phân loại, phán đoán | Khử nhiễu, tăng cường, phát hiện đặc trưng |
| **Kỹ thuật** | Nhận dạng mẫu, học sâu, DL | Lọc, ngưỡng hóa, hình thái học |
| **Sự phụ thuộc** | Cần ảnh đã xử lý | Có thể độc lập hoặc tiền xử lý |
| **Kết quả** | Nhãn, phân loại, hành vi | Ảnh đã lọc/cải thiện |
| **Độ phức tạp** | Rất cao, cần huấn luyện | Trung bình, dựa trên quy tắc |

**Mối quan hệ:**
> Xử lý ảnh là **tiền đề** cho Computer Vision — CV thường dùng xử lý ảnh làm bước tiền xử lý.

---

## Slide 7: Bài toán 1 — Phân loại ảnh (Classification)

**Định nghĩa:**
- **Đầu vào:** 1 ảnh
- **Đầu ra:** 1 nhãn duy nhất (từ tập lớp xác định trước)

**Ví dụ:**
- Ảnh chó → nhãn "Chó"
- Ảnh mèo → nhãn "Mèo"
- Ảnh xe → nhãn "Xe ô tô"

**Đặc điểm:**
- Không quan tâm vị trí đối tượng trong ảnh
- Chỉ cần biết "ảnh này thuộc lớp nào"

**Mô hình tiêu biểu:** ResNet, EfficientNet, Vision Transformer (ViT)

---

## Slide 8: Bài toán 2 — Phát hiện đối tượng (Object Detection)

**Định nghĩa:**
- **Đầu vào:** 1 ảnh
- **Đầu ra:** Danh sách đối tượng kèm **vị trí** (bounding box) và **nhãn**

**Ví dụ:** Ảnh giao thông → phát hiện người, xe đạp, ô tô, xe tải

**Đặc điểm:**
- Có thể có nhiều đối tượng trong 1 ảnh
- Mỗi đối tượng có bounding box riêng

**Mô hình tiêu biểu:** YOLO (v8, v9, v10), Faster R-CNN, DETR

---

## Slide 9: Bài toán 3 — Phân đoạn ảnh (Segmentation)

**3 loại phân đoạn:**

| Loại | Đặc điểm | Ví dụ |
|------|----------|-------|
| **Semantic Segmentation** | Gán nhãn cho từng pixel theo **lớp** | Pixel thuộc "đường", "vỉa hè" |
| **Instance Segmentation** | Phân biệt **các thể hiện khác nhau** của cùng lớp | Người A khác người B |
| **Panoptic Segmentation** | Mở rộng của Instance — bao gồm cả background | Phân đoạn toàn diện |

**Mô hình tiêu biểu:** U-Net (y tế), Mask R-CNN, DeepLab

---

## Slide 10: Bài toán 4 — Phát hiện điểm đặc trưng

**Định nghĩa:**
- Phát hiện các **điểm đặc biệt** trong ảnh: góc, cạnh, điểm chấm
- Xây dựng **"dấu vân tay"** (descriptor) cho mỗi điểm

**Đặc điểm điểm đặc trưng:**
- Có tính **bất biến** với scale, rotation, ánh sáng
- Có thể **match** giữa các ảnh khác nhau

**Ứng dụng:**
- Ghép ảnh panorama
- Tái tạo 3D
- Theo dõi đối tượng (object tracking)

**Thuật toán tiêu biểu:** SIFT, SURF, ORB, AKAZE

---

## Slide 11: Bài toán 5 — Nhận dạng chữ (OCR)

**Định nghĩa:**
- **OCR** (Optical Character Recognition): Chuyển văn bản trong ảnh thành **mã ký tự** có thể chỉnh sửa

**Ứng dụng:**
- Đọc biển số xe
- Số hóa tài liệu (scan → text)
- Trích xuất thông tin từ hóa đơn

**Mô hình tiêu biểu:** CRNN + CTC, TrOCR (Transformer-based)

---

## Slide 12: Bài toán 6 — Tái tạo 3D

**Định nghĩa:**
- Xây dựng **mô hình 3D** của vật thể/cảnh từ nhiều ảnh chụp từ các góc khác nhau

**Kỹ thuật chính:**
- **SfM** (Structure from Motion)
- **MVS** (Multi-view Stereo)

**Ứng dụng:**
- Lập bản đồ 3D
- Di sản số (số hóa di tích)
- Phim ảnh, VR/AR

---

## Slide 13: Lịch sử phát triển — 3 giai đoạn

### Giai đoạn 1: Cách tiếp cận cổ điển (trước 2012)
- Trích xuất đặc trưng **thủ công**: SIFT, HOG, LBP
- Phân loại cổ điển: **SVM, Random Forest, AdaBoost**
- **Hạn chế:** Đặc trưng do con người thiết kế không đủ tổng quát

### Giai đoạn 2: Machine Learning truyền thống
- **Học có giám sát:** Cần ảnh có nhãn để huấn luyện
- Kỹ thuật: PCA, k-NN, HOG+SVM, Haar Cascade

### Giai đoạn 3: Deep Learning — Cuộc cách mạng (2012 → nay)
- **Mạng nơ-ron tích chập (CNN):** Tự động học đặc trưng từ thấp → cao
- **Kiến trúc tiêu biểu:** AlexNet, VGG, ResNet, YOLO, Mask R-CNN, ViT
- **Điểm mạnh:** Chính xác vượt trội, không cần thiết kế đặc trưng thủ công

---

## Slide 14: Bảng mô hình Deep Learning theo bài toán

| Bài toán | Mô hình Deep Learning điển hình |
|----------|---------------------------------|
| **Classification** (Phân loại) | ResNet, EfficientNet, Vision Transformer (ViT) |
| **Detection** (Phát hiện) | YOLO (v8, v9, v10), Faster R-CNN, DETR |
| **Segmentation** (Phân đoạn) | U-Net (y tế), Mask R-CNN, DeepLab |
| **Keypoint** (Điểm đặc trưng) | OpenPose, HRNet |
| **OCR** (Nhận dạng chữ) | CRNN + CTC, TrOCR (Transformer) |

---

## Slide 15: Pipeline xây dựng hệ thống CV — 7 bước

| Bước | Nội dung | Ví dụ |
|:----:|----------|-------|
| **1** | **Xác định bài toán** | Phân loại sản phẩm tốt/lỗi |
| **2** | **Thu thập dữ liệu** | Chụp 10.000 ảnh từ 3 camera |
| **3** | **Gán nhãn dữ liệu** | Label "tốt"/"lỗi" (LabelImg, CVAT) |
| **4** | **Tiền xử lý** | Resize 224×224, chuẩn hóa, augment |
| **5** | **Xây dựng mô hình** | ResNet50 pretrained + fine-tune |
| **6** | **Đánh giá** | Accuracy, Precision, Recall, F1 |
| **7** | **Triển khai & bảo trì** | Raspberry Pi + camera, giám sát định kỳ |

---

## Slide 16: Công cụ và thư viện phổ biến

| Giai đoạn | Công cụ |
|-----------|---------|
| **Xử lý ảnh** | OpenCV, PIL, scikit-image |
| **Machine Learning cổ điển** | scikit-learn, XGBoost |
| **Deep Learning** | TensorFlow, PyTorch, Keras |
| **Gán nhãn** | LabelImg, CVAT, Makesense.ai |
| **Triển khai** | ONNX, TensorRT, OpenVINO, TFLite |

---

# PHẦN 2 — ỨNG DỤNG OPENCV TRONG THỊ GIÁC MÁY TÍNH

---

## Slide 17: Tổng quan OpenCV cho Computer Vision

**OpenCV** cung cấp 3 nhóm công cụ cho CV:

| Nhóm | Chức năng | Module |
|------|-----------|--------|
| **Xử lý ảnh cơ bản** | Đọc/ghi, chuyển màu, biến đổi | `imgproc`, `imgcodecs` |
| **Phát hiện đặc trưng** | Keypoint, descriptor, matching | `features2d` |
| **Nhận dạng đối tượng** | Haar Cascade, HOG, DNN inference | `objdetect`, `dnn` |

---

## Slide 18: OpenCV — Phát hiện đặc trưng

**Các thuật toán chính trong `cv2`:**

| Thuật toán | Ưu điểm | Nhược điểm | Ứng dụng |
|------------|---------|------------|----------|
| **ORB** | Nhanh, real-time | Kém chính xác hơn SIFT | Tracking, SLAM |
| **SIFT** | Chất lượng cao, bất biến scale | Chậm | Panorama, 3D |
| **AKAZE** | Cân bằng tốc độ + chất lượng | Chỉ có trong contrib | Nhận dạng vật thể |
| **BRISK** | Nhanh, binary descriptor | Ít phổ biến | Real-time |

**Ví dụ code ORB:**
```python
import cv2

# Tạo ORB detector với 500 keypoint
orb = cv2.ORB_create(nfeatures=500)

# Phát hiện keypoint + descriptor
kps, desc = orb.detectAndCompute(gray_img, None)

# Vẽ keypoint lên ảnh
out = cv2.drawKeypoints(img, kps, None, color=(0, 255, 0),
                        flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
```

---

## Slide 19: OpenCV — Ghép ảnh Panorama (Image Stitching)

**Quy trình 5 bước:**

```
1. Phát hiện ORB keypoint trên 2 ảnh
2. Match descriptor bằng BFMatcher
3. Lọc match tốt (Lowe's ratio / top-N)
4. Tính Homography bằng RANSAC
5. Warp và ghép 2 ảnh lại
```

**Ví dụ code:**
```python
# 1. ORB + BFMatcher
orb = cv2.ORB_create(nfeatures=1000)
kps1, desc1 = orb.detectAndCompute(img1, None)
kps2, desc2 = orb.detectAndCompute(img2, None)

bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
matches = sorted(bf.match(desc1, desc2), key=lambda x: x.distance)

# 2. Tính Homography
src_pts = np.float32([kps1[m.queryIdx].pt for m in matches]).reshape(-1, 1, 2)
dst_pts = np.float32([kps2[m.trainIdx].pt for m in matches]).reshape(-1, 1, 2)
H, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)

# 3. Warp và ghép
result = cv2.warpPerspective(img1, H, (w + offset, h))
result[:, offset:offset+350] = img2
```

---

## Slide 20: OpenCV — Phát hiện khuôn mặt (Haar Cascade)

**Nguyên lý:**
- Sử dụng **đặc trưng Haar-like** (tổ hợp các hình chữ nhật sáng/tối)
- AdaBoost để chọn đặc trưng quan trọng
- Cascade of Classifiers để tăng tốc độ

**Ví dụ code:**
```python
# Load cascade
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# Phát hiện
faces = face_cascade.detectMultiScale(gray_img,
                                       scaleFactor=1.1,
                                       minNeighbors=5,
                                       minSize=(30, 30))

# Vẽ bounding box
for (x, y, w, h) in faces:
    cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 3)
```

**Ưu điểm:**
- Có sẵn trong OpenCV, không cần huấn luyện
- Nhanh, chạy được trên CPU

**Nhược điểm:**
- Kém chính xác với mặt nghiêng, đeo kính, ánh sáng kém

---

## Slide 21: OpenCV — Template Matching

**Ứng dụng:** Tìm mẫu (template) trong ảnh lớn

**Ví dụ code:**
```python
# Áp dụng matchTemplate với 3 phương pháp
methods = {
    'TM_CCOEFF_NORMED': cv2.TM_CCOEFF_NORMED,   # tốt nhất
    'TM_CCORR_NORMED':  cv2.TM_CCORR_NORMED,
    'TM_SQDIFF_NORMED': cv2.TM_SQDIFF_NORMED,
}

for name, method in methods.items():
    res = cv2.matchTemplate(img, template, method)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
    # SQDIFF: giá trị NHỎ tốt; còn lại: LỚN tốt
    top_left = min_loc if method == cv2.TM_SQDIFF_NORMED else max_loc
    cv2.rectangle(img, top_left,
                  (top_left[0] + w_t, top_left[1] + h_t),
                  (255, 0, 0), 2)
```

**Ưu điểm:** Đơn giản, nhanh  
**Nhược điểm:** Không xử lý được xoay, scale, phối cảnh

---

## Slide 22: OpenCV — OCR đơn giản

**Pipeline OCR cổ điển:**
```
Ảnh → Tiền xử lý → Phân đoạn ký tự → Nhận dạng → Text
```

**Ví dụ với Template Matching:**
```python
# 1. Tạo template chữ số 0-9
templates = {d: make_digit(d) for d in range(10)}

# 2. Chia ảnh biển số thành 4 ô
for i in range(4):
    roi = plate[:, i*step:(i+1)*step]
    roi_rs = cv2.resize(roi, (w_t, h_t))
    
    # 3. Match với 10 template
    best_digit, best_score = None, -np.inf
    for d, tmpl in templates.items():
        res = cv2.matchTemplate(roi_rs, tmpl, cv2.TM_CCOEFF_NORMED)
        _, max_val, _, _ = cv2.minMaxLoc(res)
        if max_val > best_score:
            best_score = max_val
            best_digit = d
```

**Trên thực tế:** Dùng Tesseract, EasyOCR, hoặc mô hình DL.

---

# Slide 23: OpenCV — DNN module (suy luận Deep Learning)

**OpenCV hỗ trợ chạy các mô hình Deep Learning qua `cv2.dnn`:**

```python
# Load mô hình YOLO pretrained
net = cv2.dnn.readNet('yolov8n.pt', 'yolov8n.cfg')

# Chuẩn bị ảnh đầu vào (blob)
blob = cv2.dnn.blobFromImage(img, 1/255.0, (640, 640),
                              swapRB=True, crop=False)
net.setInput(blob)

# Chạy suy luận
outputs = net.forward(net.getUnconnectedOutLayersNames())

# Xử lý kết quả (lọc theo confidence, NMS)
for out in outputs:
    for detection in out:
        scores = detection[5:]
        class_id = np.argmax(scores)
        confidence = scores[class_id]
        if confidence > 0.5:
            # Vẽ bounding box
            ...
```

**Ưu điểm:** Không cần cài PyTorch/TensorFlow — chỉ dùng OpenCV.

---

# Ứng dụng mô hình AI trong Thị giác máy tính

> **Ghi chú:** Phần 3 rút gọn, chỉ tập trung vào **mô hình AI** và **ứng dụng trong CV**. Phần 1 (Thị giác máy tính) và Phần 2 (Ứng dụng OpenCV) giữ nguyên.

---

# Slide 24: Mô hình AI là gì?

### 📖 Định nghĩa đơn giản

> **Mô hình AI (AI Model)** là một **chương trình máy tính** được **huấn luyện từ dữ liệu** để tự động đưa ra **dự đoán** hoặc **quyết định**.

### 🔄 Quy trình cơ bản

```
   Dữ liệu huấn luyện          Mô hình AI            Dự đoán
┌────────────────────┐      ┌──────────────┐      ┌──────────────┐
│  Ảnh mèo → "mèo"   │      │              │      │              │
│  Ảnh chó → "chó"   │ ──►  │   Học quy    │ ──►  │  Ảnh mới → ?  │
│  ...               │      │   luật       │      │              │
└────────────────────┘      └──────────────┘      └──────────────┘
```

### 🎯 Ba loại mô hình AI phổ biến trong CV

| Loại | Chức năng | Ví dụ |
|------|-----------|-------|
| **Classification** | Phân loại ảnh → 1 nhãn | "Ảnh này là mèo hay chó?" |
| **Detection** | Tìm đối tượng + vị trí | "Có 3 người, 2 xe trong ảnh" |
| **Segmentation** | Gán nhãn từng pixel | "Pixel này thuộc đường, pixel kia thuộc vỉa hè" |

---

## Slide 25: Ứng dụng AI trong Thị giác máy tính

### 🌍 Ứng dụng thực tế theo lĩnh vực

| Lĩnh vực | Mô hình AI | Ứng dụng cụ thể |
|----------|-----------|-----------------|
| **Y tế** | U-Net, nnU-Net | Phân đoạn khối u, mạch máu từ ảnh MRI/CT |
| **Xe tự hành** | YOLO | Phát hiện làn đường, xe, người đi bộ real-time |
| **An ninh** | RetinaFace, ArcFace | Nhận dạng khuôn mặt (Face ID) |
| **Sản xuất** | EfficientNet | Phát hiện lỗi sản phẩm trên dây chuyền |
| **Nông nghiệp** | YOLOv8 | Đếm trái cây, phát hiện sâu bệnh |
| **Thương mại** | CLIP, SAM | Tìm kiếm ảnh theo text, tách nền sản phẩm |
| **Giải trí** | OpenPose, MediaPipe | AR filter, game điều khiển cử chỉ |
| **OCR** | TrOCR | Đọc biển số xe, số hóa tài liệu |

### 📈 Điểm chung

Tất cả ứng dụng trên đều dùng **cùng một loại công nghệ** — **mạng nơ-ron tích chập (CNN)** hoặc **Transformer** — học từ **hàng triệu ảnh** để đạt độ chính xác cao.

---

## Slide 26: Mô hình Classification — ResNet

### 🎯 Bài toán
**Đầu vào:** 1 ảnh → **Đầu ra:** 1 nhãn duy nhất.

### 🏆 ResNet (Residual Network) — 2015

**Ý tưởng chính:** **Skip Connection** — thêm "đường tắt" cho tín hiệu.

```
      x ──────────────────┐
      │                   │  ← đường tắt
      ▼                   │
   [Conv layers]          │
      │                   │
      ▼                   │
      ⊕ ◄─────────────────┘
      │
      ▼
   y = F(x) + x
```

**Ưu điểm:**
- Huấn luyện được mạng **rất sâu** (100+ lớp).
- Không bị **vanishing gradient**.

**Các phiên bản:** ResNet-18, ResNet-50, ResNet-101, ResNet-152.

**Ứng dụng:** Phân loại ảnh, trích xuất đặc trưng, làm nền cho nhiều mô hình khác.

---

## Slide 27: Mô hình Detection — YOLO

### 🎯 Bài toán
**Đầu vào:** 1 ảnh → **Đầu ra:** danh sách đối tượng + bounding box + nhãn.

### ⚡ YOLO (You Only Look Once) — 2015

**Ý tưởng:** Xử lý ảnh **1 lần duy nhất** để phát hiện **tất cả đối tượng**.

### 🆚 So sánh tốc độ

| Phương pháp | Tốc độ | Ứng dụng |
|-------------|:------:|----------|
| **Faster R-CNN** (2-stage) | 5–7 FPS | Offline, server |
| **YOLO** (1-stage) | **45+ FPS** | **Real-time** |

### 📊 Các phiên bản YOLO

| Phiên bản | Năm | Đặc điểm |
|-----------|:---:|----------|
| YOLOv1 | 2015 | Ra đời, 45 FPS |
| YOLOv5 | 2020 | Phổ biến nhất |
| YOLOv8 | 2023 | Ultralytics, 80+ FPS |
| YOLOv10 | 2024 | Tối ưu cho edge device |

**Ứng dụng:** Xe tự hành, an ninh, đếm người, kiểm kê hàng hóa.

---

## Slide 28: Mô hình Segmentation — U-Net

### 🎯 Bài toán
**Đầu vào:** 1 ảnh → **Đầu ra:** mask cùng kích thước, mỗi pixel có 1 nhãn.

### 🩺 U-Net — 2015

**Ra đời cho ảnh y tế** — phân đoạn tế bào, khối u.

### 🏗️ Kiến trúc hình chữ U

```
Encoder (nén)                    Decoder (giải nén)
─────────────────────────────────────────────────────
Input (572×572)                    Output (388×388)
    │                                    ▲
[Conv + Pool] ─────skip connection────► [Up + Conv]
    │                                    ▲
[Conv + Pool] ─────skip connection────► [Up + Conv]
    │                                    ▲
    └────────► Bottleneck ──────────────┘
```

### 💡 Điểm hay của U-Net

- **Skip Connection:** Chuyển chi tiết từ encoder sang decoder → **giữ biên sắc nét**.
- **Output cùng kích thước input** → phân đoạn pixel-wise.

**Ứng dụng:** Phân đoạn khối u, tách nền, phân đoạn làn đường.

---

## Slide 29: Các mô hình AI khác

### 🕺 Pose Estimation — OpenPose (2017)

**Chức năng:** Phát hiện **tư thế người** — vị trí các khớp (17–135 keypoint).

**Ứng dụng:** AR filter, phân tích thể thao, game điều khiển cử chỉ.

### 📝 OCR — TrOCR (2021)

**Chức năng:** Đọc chữ trong ảnh — **end-to-end** không cần chia bước.

**Ưu điểm:** Xử lý được chữ viết tay, xoay, nghiêng, đa ngôn ngữ.

**Ứng dụng:** Số hóa tài liệu, đọc hóa đơn, biển số xe.

### 🌟 Foundation Models

**SAM (Segment Anything Model) — Meta 2023:**
- Phân đoạn **mọi đối tượng** với 1 click chuột.

**CLIP (OpenAI 2021):**
- Kết nối **ảnh và văn bản** — **zero-shot classification**.
- Chỉ cần mô tả: "a photo of a cat" → máy phân loại được **không cần huấn luyện**.

---

# 📊 SLIDES BỔ SUNG — MỘT SỐ MÔ HÌNH AI PHỔ BIẾN
## (Chèn sau Slide 29 — Các mô hình AI khác)

---

## Slide 29a: Phân loại ảnh — AlexNet (2012)

### 🏆 AlexNet — Mô hình khai sinh kỷ nguyên Học sâu

**Ra đời:** 2012, thắng cuộc thi **ImageNet** với độ chính xác vượt trội.

**Ý tưởng chính:**
- Mạng CNN **8 lớp** (5 conv + 3 fully-connected).
- Sử dụng **ReLU** thay vì sigmoid → huấn luyện nhanh hơn.
- **Dropout** để giảm overfitting.
- Chạy trên **2 GPU** — đột phá thời bấy giờ.

### 📊 So sánh với phương pháp truyền thống (2012)

| Phương pháp | Top-5 Accuracy |
|-------------|:--------------:|
| Truyền thống (SIFT + SVM) | ~72% |
| **AlexNet (CNN)** | **~85%** |

**Ý nghĩa:** Đánh dấu **kỷ nguyên Học sâu** trong Thị giác máy tính.

---

## Slide 29b: Phân loại ảnh — VGG (2014)

### 🔷 VGG — Mô hình "đơn giản mà hiệu quả"

**Ra đời:** 2014, Đại học Oxford (Visual Geometry Group).

**Ý tưởng chính:**
- Chỉ dùng **kernel 3×3** duy nhất, xếp chồng nhiều lớp.
- Mạng **rất sâu** (16 hoặc 19 lớp).
- Kiến trúc **đối xứng, dễ hiểu**.

### 📊 Các phiên bản VGG

| Phiên bản | Số lớp | Tham số |
|-----------|:------:|:-------:|
| VGG-16 | 16 | 138M |
| VGG-19 | 19 | 144M |

**Ưu điểm:** Kiến trúc đơn giản, dễ hiểu → dùng nhiều trong nghiên cứu.
**Nhược điểm:** Nhiều tham số (~140M) → nặng, chậm.

---

## Slide 29c: Phân loại ảnh — EfficientNet (2019)

### ⚡ EfficientNet — "Nhỏ mà có võ"

**Ra đời:** 2019, Google Brain.

**Ý tưởng chính:** **Compound Scaling** — mở rộng mạng một cách **cân bằng** theo 3 chiều:
- **Độ sâu** (depth): thêm nhiều lớp.
- **Độ rộng** (width): thêm nhiều kênh.
- **Độ phân giải** (resolution): tăng kích thước ảnh đầu vào.

### 📊 So sánh với ResNet

| Mô hình | Tham số | ImageNet Top-1 |
|---------|:-------:|:--------------:|
| ResNet-50 | 25.6M | 76.1% |
| **EfficientNet-B0** | **5.3M** | **77.1%** |
| EfficientNet-B7 | 66M | **84.3%** |

**Ưu điểm:** Chính xác cao với **ít tham số** → phù hợp mobile, edge device.

---

## Slide 29d: Phân loại ảnh — MobileNet (2017)

### 📱 MobileNet — "AI trong túi áo"

**Ra đời:** 2017, Google — thiết kế cho **điện thoại di động**.

**Ý tưởng chính:** **Depthwise Separable Convolution** — tách phép tích chập thành 2 bước nhỏ → giảm **8–9 lần** tính toán.

### 📊 Các phiên bản MobileNet

| Phiên bản | Năm | Đặc điểm |
|-----------|:---:|----------|
| MobileNetV1 | 2017 | Depthwise separable conv |
| MobileNetV2 | 2018 | Inverted residuals |
| MobileNetV3 | 2019 | Neural architecture search |

**Ứng dụng:** Face ID, Google Lens, ứng dụng di động có AI.

---

## Slide 29e: Phát hiện đối tượng — Faster R-CNN (2015)

### 🎯 Faster R-CNN — Tổ tiên của YOLO

**Ra đời:** 2015, Microsoft Research.

**Ý tưởng chính:** **Region Proposal Network (RPN)** — mạng đề xuất vùng có đối tượng, sau đó phân loại từng vùng.

### 🔄 Quy trình 2 giai đoạn

```
Ảnh → [RPN] → Đề xuất ~2000 vùng → [Classifier] → Nhãn + Bounding box
```

### 📊 So sánh với YOLO

| Tiêu chí | Faster R-CNN | YOLO |
|----------|:------------:|:----:|
| **Tốc độ** | 5–7 FPS | **45+ FPS** |
| **Độ chính xác** | Cao hơn | Tốt |
| **Ứng dụng** | Server, offline | **Real-time** |

**Ý nghĩa:** Đặt nền móng cho các mô hình detection hiện đại.

---

## Slide 29f: Phát hiện + Phân đoạn — Mask R-CNN (2017)

### 🎭 Mask R-CNN — "Vua" của Instance Segmentation

**Ra đời:** 2017, Facebook AI Research (FAIR).

**Ý tưởng chính:** Mở rộng Faster R-CNN bằng cách **thêm 1 nhánh** dự đoán **mask** cho từng đối tượng.

### 🎯 Ba đầu ra cùng lúc

```
       ┌─► Nhãn (class)
Ảnh ─► ├─► Bounding box
       └─► Mask (pixel-wise)
```

**Ứng dụng:**
- Đếm và tách từng cá thể (người A ≠ người B).
- Phân đoạn tế bào trong ảnh y tế.
- Chỉnh sửa ảnh (tách nền, xóa vật thể).

---

## Slide 29g: Vision Transformer — ViT (2020)

### 🌟 ViT — "Transformer đến với Thị giác"

**Ra đời:** 2020, Google Research.

**Ý tưởng chính:** Chia ảnh thành các **patch** (miếng nhỏ, ví dụ 16×16) → đưa vào **Transformer** giống như xử lý từ trong câu văn.

### 🔄 So sánh với CNN

| Tiêu chí | CNN | ViT |
|----------|:---:|:---:|
| **Cách nhìn ảnh** | Cục bộ (kernel trượt) | **Toàn cục** (tất cả patch) |
| **Dữ liệu cần** | Vừa | **Rất lớn** (JFT-300M) |
| **Độ chính xác** | Tốt | **Vượt trội** khi đủ data |

### 📊 Ứng dụng

- **Phân loại ảnh:** ViT, DeiT, Swin Transformer.
- **Phát hiện:** DETR, DINO.
- **Segmentation:** SegFormer, Mask2Former.

> **Xu hướng 2020+:** Transformer đang **thay thế dần CNN** trong CV.

---

## Slide 29h: Bảng tổng hợp — Các mô hình AI phổ biến

### 📋 Phân loại theo bài toán

| Bài toán | Mô hình tiêu biểu | Năm | Điểm mạnh |
|----------|-------------------|:---:|-----------|
| **Classification** | AlexNet | 2012 | Khai sinh Học sâu |
| | VGG | 2014 | Đơn giản, dễ hiểu |
| | ResNet | 2015 | Skip connection, rất sâu |
| | MobileNet | 2017 | Nhẹ, cho mobile |
| | EfficientNet | 2019 | Nhỏ mà chính xác |
| | ViT | 2020 | Transformer cho CV |
| **Detection** | Faster R-CNN | 2015 | 2-stage, chính xác |
| | YOLO | 2015 | 1-stage, real-time |
| | DETR | 2020 | Transformer cho detection |
| **Segmentation** | U-Net | 2015 | Ảnh y tế |
| | Mask R-CNN | 2017 | Instance segmentation |
| | DeepLab | 2018 | Semantic segmentation |
| **Keypoint** | OpenPose | 2017 | Pose estimation |
| | HRNet | 2019 | High-resolution |
| **OCR** | CRNN + CTC | 2015 | OCR cổ điển |
| | TrOCR | 2021 | Transformer OCR |
| **Foundation** | CLIP | 2021 | Zero-shot |
| | SAM | 2023 | Segment anything |

### 📌 Xu hướng chung

```
2012–2015: CNN cơ bản (AlexNet, VGG, ResNet)
2015–2019: Chuyên biệt hóa (YOLO, U-Net, MobileNet, EfficientNet)
2020+    : Transformer + Foundation Models (ViT, CLIP, SAM)
```

---

## Slide 29i: Chọn mô hình nào cho bài toán của bạn?

### 🎯 Hướng dẫn chọn mô hình

| Tình huống | Mô hình khuyến nghị |
|------------|---------------------|
| **Bài toán đơn giản, ít data** | Transfer Learning với **ResNet-50** hoặc **EfficientNet-B0** |
| **Cần chạy trên điện thoại** | **MobileNetV3**, **EfficientNet-Lite** |
| **Cần real-time detection** | **YOLOv8** hoặc **YOLOv10** |
| **Cần chính xác cao (offline)** | **Faster R-CNN**, **DETR** |
| **Ảnh y tế** | **U-Net**, **nnU-Net** |
| **Instance segmentation** | **Mask R-CNN**, **Mask2Former** |
| **Không có data để train** | **CLIP** (zero-shot), **SAM** |
| **Nghiên cứu mới nhất** | **ViT**, **Swin Transformer** |

### 💡 Lời khuyên cho sinh viên

1. **Bắt đầu với ResNet-50** + Transfer Learning — dễ nhất, hiệu quả cao.
2. **Thử YOLOv8** nếu cần detection real-time.
3. **Dùng U-Net** cho bài toán phân đoạn y tế.
4. **Đừng cố huấn luyện từ đầu** — hãy dùng mô hình pretrained.

---

**📝 Ghi chú:** 9 slide bổ sung (29a → 29i), chèn sau Slide 29 gốc, giới thiệu:
- **6 mô hình classification:** AlexNet, VGG, EfficientNet, MobileNet (bổ sung ResNet đã có).
- **2 mô hình detection:** Faster R-CNN, Mask R-CNN (bổ sung YOLO đã có).
- **1 mô hình Transformer:** ViT.
- **2 slide tổng hợp:** bảng mô hình + hướng dẫn chọn mô hình.

Tổng cộng Phần 3 sau khi bổ sung: **17 slide** (Slide 24 → 31 + 9 slide bổ sung).

---

## Slide 30: Transfer Learning — Chiến lược thực tế

### ⚠️ Vấn đề
Huấn luyện mô hình AI từ đầu cần:
- **Triệu ảnh** có nhãn (rất tốn kém).
- **GPU mạnh** (hàng nghìn USD).
- **Nhiều ngày** huấn luyện.

### 💡 Giải pháp — Transfer Learning

**Ý tưởng:** Tận dụng **kiến thức** mô hình đã học từ dataset khổng lồ (ImageNet).

```
1. Tải mô hình pretrained (ResNet50)
2. Đóng băng các lớp đầu (giữ kiến thức chung)
3. Thay lớp cuối cho bài toán mới
4. Huấn luyện chỉ lớp mới trên dataset nhỏ
```

### 📊 So sánh

| Tiêu chí | Từ đầu | Transfer Learning |
|----------|:------:|:-----------------:|
| **Dữ liệu cần** | Triệu ảnh | **Vài trăm ảnh** |
| **Thời gian** | Vài ngày | **Vài phút** |
| **GPU** | Rất mạnh | **Trung bình** |

> **Với sinh viên:** Transfer Learning là cách **thực tế nhất** để áp dụng AI vào CV.

---

## Slide 31: Tổng kết Phần 3

### 📌 Nhớ 3 điều

1. **Mô hình AI** = chương trình được **huấn luyện từ dữ liệu** để tự động dự đoán.

2. **Ba mô hình AI chính trong CV:**
   - **Classification** (ResNet): phân loại ảnh → 1 nhãn.
   - **Detection** (YOLO): tìm đối tượng + vị trí real-time.
   - **Segmentation** (U-Net): gán nhãn từng pixel.

3. **Transfer Learning** — dùng mô hình pretrained, chỉ cần **vài trăm ảnh** là có kết quả tốt.

### 🚀 Xu hướng hiện tại

- **Foundation Models** (SAM, CLIP): 1 mô hình dùng cho mọi bài toán.
- **Multimodal:** Kết hợp ảnh + text + audio (GPT-4V, Gemini).
- **Edge AI:** Mô hình nhỏ chạy trên điện thoại, drone.

---

**📝 Ghi chú:** Phần 3 rút gọn gồm **8 slide** (Slide 24 → 31), giới thiệu ngắn gọn về:
- Mô hình AI là gì (Slide 24)
- Ứng dụng AI trong CV theo lĩnh vực (Slide 25)
- 3 mô hình chính: ResNet, YOLO, U-Net (Slide 26–28)
- Các mô hình khác: OpenPose, TrOCR, SAM, CLIP (Slide 29)
- Transfer Learning — chiến lược thực tế (Slide 30)
- Tổng kết (Slide 31)