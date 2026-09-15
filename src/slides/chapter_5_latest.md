# 📊 SLIDES BÀI GIẢNG CHƯƠNG 5
## Thị giác máy tính (Computer Vision)

> **Cấu trúc mới:**
> - **PHẦN 1 — Thị giác máy tính** (tích hợp OpenCV xuyên suốt các slide lý thuyết)
> - **PHẦN 2 — Ứng dụng mô hình AI trong Thị giác máy tính** (phần riêng)

---

# PHẦN 1 — THỊ GIÁC MÁY TÍNH
## (Tích hợp ứng dụng OpenCV)

---

## Slide 1: Trang bìa

# Chương 5: Thị giác máy tính
## Computer Vision

**Học phần:** Xử lý ảnh & Thị giác máy tính  
**Giảng viên:** Nguyễn Phôn Lữa

**Nội dung chương:**
1. **Thị giác máy tính** — Định nghĩa, kiến trúc, bài toán, ứng dụng OpenCV
2. **Ứng dụng mô hình AI** — ResNet, YOLO, U-Net, Transfer Learning

---

## Slide 2: Nội dung chương

```
┌─────────────────────────────────────────────────────────┐
│  PHẦN 1 — THỊ GIÁC MÁY TÍNH                             │
├─────────────────────────────────────────────────────────┤
│  1.1  Định nghĩa & Kiến trúc hệ thống CV                │
│  1.2  Mục tiêu & Ứng dụng                               │
│  1.3  So sánh CV vs Xử lý ảnh                           │
│  1.4  6 bài toán chính (kèm ứng dụng OpenCV)            │
│  1.5  Lịch sử phát triển                                │
│  1.6  Pipeline xây dựng hệ thống CV                     │
│  1.7  Công cụ & Thư viện                                │
├─────────────────────────────────────────────────────────┤
│  PHẦN 2 — ỨNG DỤNG MÔ HÌNH AI TRONG CV                  │
├─────────────────────────────────────────────────────────┤
│  2.1  Mô hình AI là gì?                                 │
│  2.2  Ứng dụng AI theo lĩnh vực                         │
│  2.3  Các mô hình chính (ResNet, YOLO, U-Net, ...)      │
│  2.4  Transfer Learning                                 │
└─────────────────────────────────────────────────────────┘
```

---

## Slide 3: Định nghĩa Thị giác máy tính

### 🎯 Khái niệm

> **Computer Vision (CV)** là khoa học giúp máy tính **"nhìn"** và **"hiểu"** thế giới từ ảnh/video — tương tự cách con người cảm nhận và suy luận qua mắt và não.

### 📥 Đầu vào (Input)

| Loại | Ví dụ |
|------|-------|
| **Ảnh tĩnh** | Ảnh JPG, PNG, ảnh y tế, ảnh vệ tinh |
| **Video** | Chuỗi frame từ camera, phim, YouTube |
| **Camera thời gian thực** | Webcam, camera an ninh, camera xe hơi |
| **Cảm biến khác** | Drone, phone, CCTV, ảnh siêu âm |

### 📤 Đầu ra (Output)

| Loại | Ví dụ |
|------|-------|
| **Nhãn (label)** | "Đây là mèo", "Đây là xe ô tô" |
| **Vị trí (location)** | Tọa độ, bounding box, mask |
| **Mô tả (description)** | "Người đàn ông đang đi bộ trên phố" |
| **Số liệu đo lường** | Khoảng cách, tốc độ, kích thước |

### 🔑 Câu thần chú

> **Input: Pixel (ma trận số) → Output: Thông tin có nghĩa (nhãn, vị trí, mô tả)**

---

## Slide 4: Kiến trúc hệ thống CV — 4 giai đoạn

### 🔄 Sơ đồ tổng quát

```
   ĐẦU VÀO              HỆ THỐNG CV                 ĐẦU RA
┌────────────┐      ┌──────────────────────┐      ┌────────────────┐
│   Ảnh      │      │  1. Tiền xử lý       │      │  Phân loại     │
│   Video    │ ──►  │  2. Trích xuất đặc   │ ──►  │  Phát hiện     │
│   Camera   │      │     trưng            │      │  Phân đoạn     │
│   Drone    │      │  3. Hiểu & Nhận thức │      │  Theo dõi      │
│   CCTV     │      │  4. Ra quyết định    │      │  Ước lượng     │
└────────────┘      └──────────────────────┘      └────────────────┘
```

### 📋 Chi tiết 4 giai đoạn

**1. Tiền xử lý (Preprocessing):**
- Lọc nhiễu (Gaussian, Median)
- Thay đổi kích thước (resize)
- Chuẩn hóa (normalization)

**2. Trích xuất đặc trưng (Feature Extraction):**
- Cạnh, texture (Sobel, Canny)
- Keypoint (ORB, SIFT)
- Đặc trưng sâu (CNN)

**3. Hiểu & Nhận thức (Understanding):**
- Phân loại (Classification)
- Phát hiện (Detection)
- Ước lượng (Estimation)

**4. Ra quyết định (Decision Making):**
- Đưa ra kết quả cuối cùng dựa trên bài toán cụ thể

### 💻 Ứng dụng OpenCV trong giai đoạn 1–2

```python
import cv2

# Giai đoạn 1: Tiền xử lý
img = cv2.imread('input.jpg', cv2.IMREAD_GRAYSCALE)
blurred = cv2.GaussianBlur(img, (5, 5), 1.5)     # lọc nhiễu
resized = cv2.resize(blurred, (224, 224))         # resize
normalized = resized / 255.0                       # chuẩn hóa [0,1]

# Giai đoạn 2: Trích xuất đặc trưng
edges = cv2.Canny(img, 50, 150)                    # cạnh
orb = cv2.ORB_create(nfeatures=500)                # keypoint
kps, desc = orb.detectAndCompute(img, None)
```

---

## Slide 5: Mục tiêu của Thị giác máy tính

### 🎯 4 mục tiêu chính

### 1. Hiểu nội dung ảnh
- **Nhận dạng đối tượng:** Xe, người, động vật, đồ vật
- **Nhận dạng cảnh:** Đường phố, bãi biển, văn phòng
- **Nhận dạng hành động:** Đi bộ, chạy, nhảy
- **Mối quan hệ không gian:** "Người đứng trên xe", "Mèo nằm dưới ghế"

### 2. Trích xuất thông tin
- **Chuyển dữ liệu thô** (pixel) → **cấu trúc có nghĩa**
- **Đầu ra:** Tọa độ, nhãn, mô tả, số liệu đo lường

### 3. Ra quyết định dựa trên hình ảnh
- **Y tế:** Nhận diện khối u → hỗ trợ chẩn đoán
- **Giao thông:** Nhận diện biến báo → tự động lái xe
- **An ninh:** Phát hiện xâm nhập → cảnh báo

### 4. Khái quát hóa (Generalization)
- Hoạt động tốt trên **nhiều điều kiện đầu vào khác nhau**:
  - Ánh sáng thay đổi (ngày/đêm)
  - Góc nhìn khác nhau (trên/xuống/ngang)
  - Độ phân giải khác nhau
  - Thời tiết (mưa, nắng, sương mù)

---

## Slide 6: Ứng dụng CV trong đời sống

### 🌍 Bảng ứng dụng theo lĩnh vực

| Lĩnh vực | Ứng dụng cụ thể | Công nghệ |
|----------|-----------------|-----------|
| **Đời sống hàng ngày** | Face ID, tìm kiếm ảnh theo nội dung | Face recognition, image retrieval |
| **Mạng xã hội** | Lọc ảo AR (Instagram, TikTok), gợi ý ảnh | Pose estimation, face detection |
| **Y tế** | Phát hiện ung thư vú, phân loại bệnh võng mạc | Medical image segmentation |
| **Xe tự hành** | Phát hiện làn đường, người đi bộ; drone giao hàng | Object detection, tracking |
| **Sản xuất** | Phát hiện lỗi sản phẩm, đọc mã vạch tốc độ cao | Anomaly detection, OCR |
| **An ninh** | Phát hiện hành vi bất thường, đếm người | Action recognition, crowd counting |
| **Nông nghiệp** | Phát hiện sâu bệnh, đếm trái cây | Plant disease detection |
| **Thương mại điện tử** | Thử đồ ảo, tìm kiếm sản phẩm bằng ảnh | Virtual try-on, image search |

### 🖼️ Hình minh họa

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Face ID     │  │  Xe tự lái   │  │  Y tế        │
│   👤         │  │   🚗         │  │   🏥         │
│  Nhận diện   │  │  Phát hiện   │  │  Phân đoạn   │
│  khuôn mặt   │  │  làn đường   │  │  khối u      │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## Slide 7: So sánh Computer Vision vs Xử lý ảnh

### 📊 Bảng so sánh chi tiết

| Khía cạnh | Computer Vision | Xử lý ảnh (Image Processing) |
|-----------|-----------------|------------------------------|
| **Mục đích** | Suy luận, hiểu nội dung ảnh | Cải thiện chất lượng ảnh |
| **Trọng tâm** | Nhận dạng, phân loại, phán đoán | Khử nhiễu, tăng cường, phát hiện đặc trưng |
| **Kỹ thuật** | Nhận dạng mẫu, học sâu, DL | Lọc, ngưỡng hóa, hình thái học |
| **Sự phụ thuộc** | Cần ảnh đã xử lý | Có thể độc lập hoặc tiền xử lý |
| **Kết quả đầu ra** | Nhãn, phân loại, hành vi | Ảnh đã lọc/cải thiện |
| **Độ phức tạp** | Rất cao (cần huấn luyện) | Trung bình (dựa trên quy tắc) |

### 🔗 Mối quan hệ

```
   Ảnh gốc ──► [Xử lý ảnh] ──► Ảnh sạch ──► [Computer Vision] ──► Nhãn
              (tiền xử lý)                    (hiểu nội dung)
```

> **Kết luận:** Xử lý ảnh là **tiền đề** cho Computer Vision — CV thường dùng xử lý ảnh làm bước tiền xử lý.

### 💻 Ứng dụng OpenCV — Cả 2 vai trò

```python
import cv2

# OpenCV vừa là công cụ xử lý ảnh (IP) vừa là công cụ CV
img = cv2.imread('input.jpg')

# --- Vai trò IP: tiền xử lý ---
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
blurred = cv2.GaussianBlur(gray, (5, 5), 1.5)

# --- Vai trò CV: phát hiện đối tượng ---
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
faces = face_cascade.detectMultiScale(blurred, 1.1, 5)

# --- Vai trò IP: hậu xử lý (vẽ bounding box) ---
for (x, y, w, h) in faces:
    cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
```

---

## Slide 8: Bài toán 1 — Phân loại ảnh (Classification)

### 📌 Định nghĩa

| | Mô tả |
|---|---|
| **Đầu vào** | 1 ảnh |
| **Đầu ra** | 1 nhãn duy nhất (từ tập lớp xác định trước) |

### 🖼️ Minh họa

```
   Input: Ảnh          Output: Nhãn
   ┌──────────┐        ┌──────────┐
   │   🐕     │  ──►   │  "Chó"   │
   └──────────┘        └──────────┘
   
   ┌──────────┐        ┌──────────┐
   │   🐈     │  ──►   │  "Mèo"   │
   └──────────┘        └──────────┘
```

### 📝 Đặc điểm

- **Không quan tâm vị trí** đối tượng trong ảnh
- Chỉ cần biết "ảnh này thuộc lớp nào"
- **1 ảnh → 1 nhãn** (không có bounding box)

### 🎯 Ứng dụng

- Phân loại ảnh sản phẩm (tốt/lỗi)
- Lọc ảnh khiêu dâm
- Phân loại bệnh từ ảnh X-quang
- Nhận diện chữ số viết tay (MNIST)

### 💻 Ứng dụng OpenCV — HOG + SVM

```python
from skimage.feature import hog
from sklearn.svm import SVC
import cv2

# 1. Trích xuất HOG
hog_features = hog(gray_img, orientations=9,
                   pixels_per_cell=(8, 8),
                   cells_per_block=(2, 2))

# 2. Huấn luyện SVM
svm = SVC(kernel='linear').fit(X_train, y_train)
pred = svm.predict([hog_features])
```

### 💻 Ứng dụng OpenCV — DNN inference

```python
# Chạy mô hình classification pretrained
net = cv2.dnn.readNet('model.onnx')
blob = cv2.dnn.blobFromImage(img, 1/255.0, (224, 224),
                              swapRB=True, crop=False)
net.setInput(blob)
scores = net.forward()
```

---

## Slide 9: Bài toán 2 — Phát hiện đối tượng (Object Detection)

### 📌 Định nghĩa

| | Mô tả |
|---|---|
| **Đầu vào** | 1 ảnh |
| **Đầu ra** | Danh sách đối tượng + vị trí (bounding box) + nhãn |

### 🖼️ Minh họa

```
   Input: Ảnh giao thông
   ┌─────────────────────────────┐
   │   🚗           🚙           │
   │  (xe)         (xe)          │
   │         🚶      🚶          │
   │        (người) (người)      │
   │              🚴              │
   │             (xe đạp)         │
   └─────────────────────────────┘
   
   Output: 
   - xe: bbox (50, 100, 200, 150)
   - xe: bbox (400, 120, 180, 140)
   - người: bbox (250, 300, 60, 120)
   - người: bbox (500, 320, 55, 110)
   - xe đạp: bbox (350, 400, 100, 80)
```

### 📝 Đặc điểm

- **Nhiều đối tượng** trong 1 ảnh
- Mỗi đối tượng có **bounding box riêng**
- Có thể có nhiều lớp khác nhau

### 🎯 Ứng dụng

- Xe tự hành (phát hiện xe, người, biển báo)
- An ninh (đếm người, phát hiện xâm nhập)
- Bán lẻ (kiểm kê hàng hóa)
- Y tế (phát hiện khối u, tổn thương)

### 💻 Ứng dụng OpenCV — Haar Cascade

```python
import cv2

# Load cascade
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# Phát hiện khuôn mặt
faces = face_cascade.detectMultiScale(
    gray_img,
    scaleFactor=1.1,
    minNeighbors=5,
    minSize=(30, 30)
)

# Vẽ bounding box
for (x, y, w, h) in faces:
    cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)
```

### 💻 Ứng dụng OpenCV — DNN module (YOLO)

```python
# Load YOLO pretrained
net = cv2.dnn.readNet('yolov8n.pt', 'yolov8n.cfg')

# Chuẩn bị input
blob = cv2.dnn.blobFromImage(img, 1/255.0, (640, 640),
                              swapRB=True, crop=False)
net.setInput(blob)

# Suy luận
outputs = net.forward(net.getUnconnectedOutLayersNames())

# Xử lý output (lọc theo confidence + NMS)
for detection in outputs:
    scores = detection[5:]
    class_id = np.argmax(scores)
    confidence = scores[class_id]
    if confidence > 0.5:
        # Vẽ bounding box
        ...
```

---

## Slide 10: Bài toán 3 — Phân đoạn ảnh (Segmentation)

### 📌 Định nghĩa

| | Mô tả |
|---|---|
| **Đầu vào** | 1 ảnh |
| **Đầu ra** | Mask cùng kích thước — mỗi pixel có 1 nhãn |

### 📊 3 loại phân đoạn

| Loại | Đặc điểm | Ví dụ |
|------|----------|-------|
| **Semantic Segmentation** | Gán nhãn cho từng pixel theo **lớp** | Pixel thuộc "đường", "vỉa hè" |
| **Instance Segmentation** | Phân biệt **các thể hiện khác nhau** của cùng lớp | Người A ≠ người B |
| **Panoptic Segmentation** | Mở rộng của Instance — bao gồm cả background | Phân đoạn toàn diện |

### 🖼️ Minh họa — Semantic vs Instance

```
Ảnh gốc:                Semantic:                Instance:
┌──────────────┐       ┌──────────────┐         ┌──────────────┐
│ 🐕    🐕     │       │ ▓▓    ▓▓     │         │ ██    ▒▒     │
│  (2 chó)     │  ──►  │ (cùng màu)   │  ──►    │ (khác màu)   │
│ 🌱🌱🌱🌱🌱     │       │ ░░░░░░░░░░   │         │ ░░░░░░░░░░   │
│  (cỏ)        │       │ (cùng màu)   │         │ (cùng màu)   │
└──────────────┘       └──────────────┘         └──────────────┘
```

### 🎯 Ứng dụng

- **Y tế:** Phân đoạn khối u, tế bào, mạch máu
- **Xe tự hành:** Phân đoạn làn đường, vỉa hè, người
- **Vệ tinh:** Phân đoạn đường, sông, rừng
- **Nhiếp ảnh:** Xóa phông, tách nền tự động

### 💻 Ứng dụng OpenCV — Threshold & Contour

```python
import cv2

# 1. Phân ngưỡng Otsu
_, th = cv2.threshold(img, 0, 255,
                       cv2.THRESH_BINARY + cv2.THRESH_OTSU)

# 2. Morphology làm sạch
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
closed = cv2.morphologyEx(th, cv2.MORPH_CLOSE, kernel, iterations=2)

# 3. Tìm contour
contours, _ = cv2.findContours(closed, cv2.RETR_EXTERNAL,
                                cv2.CHAIN_APPROX_SIMPLE)
```

### 💻 Ứng dụng OpenCV — Watershed

```python
# Phân đoạn bằng Watershed
dist = cv2.distanceTransform(closed, cv2.DIST_L2, 5)
_, sure_fg = cv2.threshold(dist, 0.7 * dist.max(), 255, 0)
sure_fg = np.uint8(sure_fg)
unknown = cv2.subtract(sure_bg, sure_fg)

# Tìm marker + watershed
_, markers = cv2.connectedComponents(sure_fg)
markers = markers + 1
markers[unknown == 255] = 0
markers = cv2.watershed(img, markers)
```

---

## Slide 11: Bài toán 4 — Phát hiện điểm đặc trưng (Keypoint Detection)

### 📌 Định nghĩa

**Phát hiện điểm đặc trưng** là tìm các **điểm đặc biệt** trong ảnh (góc, cạnh, điểm chấm) và xây dựng **"dấu vân tay"** (descriptor) cho mỗi điểm.

### 🎯 Đặc điểm của điểm đặc trưng

- **Bất biến** với scale, rotation, ánh sáng
- Có thể **match** giữa các ảnh khác nhau
- Mỗi keypoint có 1 **descriptor** (vector mô tả)

### 🖼️ Minh họa

```
Ảnh gốc:                   Keypoint + Descriptor:
┌──────────────┐          ┌──────────────┐
│ 👤           │          │  ✦  ✦✦  ✦   │
│ (khuôn mặt)  │  ──►     │ ✦✦ ✦ ✦✦✦    │
│              │          │  ✦✦✦✦ ✦✦    │
└──────────────┘          └──────────────┘
                          (mỗi ✦ = 1 keypoint)
```

### 🎯 Ứng dụng

- **Ghép ảnh panorama:** Ghép nhiều ảnh thành 1 ảnh rộng
- **Tái tạo 3D:** Xây dựng mô hình 3D từ nhiều ảnh
- **Object tracking:** Theo dõi đối tượng qua các frame

### 💻 Ứng dụng OpenCV — ORB & SIFT

```python
import cv2

# --- ORB (nhanh, real-time) ---
orb = cv2.ORB_create(nfeatures=500)
kps, desc = orb.detectAndCompute(gray_img, None)

# --- SIFT (chính xác hơn, chậm hơn) ---
sift = cv2.SIFT_create(nfeatures=500)
kps, desc = sift.detectAndCompute(gray_img, None)

# Vẽ keypoint
out = cv2.drawKeypoints(img, kps, None,
                        color=(0, 255, 0),
                        flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
```

### 💻 Ứng dụng OpenCV — Ghép ảnh Panorama

```python
# 1. Phát hiện keypoint trên 2 ảnh
orb = cv2.ORB_create(nfeatures=1000)
kps1, desc1 = orb.detectAndCompute(img1, None)
kps2, desc2 = orb.detectAndCompute(img2, None)

# 2. Matching bằng BFMatcher
bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
matches = sorted(bf.match(desc1, desc2), key=lambda x: x.distance)

# 3. Tính Homography
src_pts = np.float32([kps1[m.queryIdx].pt for m in matches]).reshape(-1, 1, 2)
dst_pts = np.float32([kps2[m.trainIdx].pt for m in matches]).reshape(-1, 1, 2)
H, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)

# 4. Warp và ghép
result = cv2.warpPerspective(img1, H, (w + offset, h))
result[:, offset:] = img2
```

---

## Slide 12: Bài toán 5 — Nhận dạng chữ (OCR)

### 📌 Định nghĩa

> **OCR (Optical Character Recognition):** Chuyển văn bản trong ảnh thành **mã ký tự** có thể chỉnh sửa (text).

### 🖼️ Minh họa

```
   Input: Ảnh chụp biển số          Output: Text
   ┌─────────────────┐              ┌─────────────┐
   │   29A-12345     │     ──►      │ "29A-12345" │
   └─────────────────┘              └─────────────┘
```

### 🎯 Ứng dụng

| Ứng dụng | Ví dụ |
|----------|-------|
| **Đọc biển số xe** | Camera giao thông tự động ghi nhận |
| **Số hóa tài liệu** | Scan sách, hóa đơn → text |
| **Trích xuất hóa đơn** | Tự động nhập liệu kế toán |
| **Hỗ trợ người khiếm thị** | Đọc văn bản thành giọng nói |

### 🔄 Pipeline OCR cổ điển

```
Ảnh → Tiền xử lý → Phân đoạn ký tự → Nhận dạng → Text
```

### 💻 Ứng dụng OpenCV — Template Matching cho OCR

```python
import cv2
import numpy as np

# 1. Tạo template chữ số 0-9
def make_digit(d):
    img = np.zeros((60, 40), dtype=np.uint8)
    cv2.putText(img, str(d), (5, 45),
                cv2.FONT_HERSHEY_SIMPLEX, 1.5, 255, 3)
    return img

templates = {d: make_digit(d) for d in range(10)}

# 2. Chia ảnh biển số thành từng ô
step = plate.shape[1] // 4
for i in range(4):
    roi = plate[:, i*step:(i+1)*step]
    roi_rs = cv2.resize(roi, (40, 60))
    
    # 3. Match với 10 template
    best_digit, best_score = None, -np.inf
    for d, tmpl in templates.items():
        res = cv2.matchTemplate(roi_rs, tmpl, cv2.TM_CCOEFF_NORMED)
        _, max_val, _, _ = cv2.minMaxLoc(res)
        if max_val > best_score:
            best_score = max_val
            best_digit = d
```

### 💻 Ứng dụng OpenCV — Tiền xử lý cho OCR

```python
# Tiền xử lý ảnh trước khi đưa vào OCR engine
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, th = cv2.threshold(gray, 0, 255,
                       cv2.THRESH_BINARY + cv2.THRESH_OTSU)
denoised = cv2.medianBlur(th, 3)
```

---

## Slide 13: Bài toán 6 — Tái tạo 3D (3D Reconstruction)

### 📌 Định nghĩa

> Xây dựng **mô hình 3D** của vật thể/cảnh từ **nhiều ảnh chụp từ các góc khác nhau**.

### 🖼️ Minh họa

```
   Nhiều ảnh 2D                          Mô hình 3D
   ┌───┐ ┌───┐ ┌───┐                     ┌─────────┐
   │ 👤│ │ 👤│ │ 👤│       ──►           │  👤 3D  │
   │góc│ │góc│ │góc│                     │  model  │
   │ 1 │ │ 2 │ │ 3 │                     └─────────┘
   └───┘ └───┘ └───┘
```

### 🔧 Kỹ thuật chính

**1. SfM (Structure from Motion):**
- Tìm **cấu trúc 3D** của cảnh từ **chuyển động** của camera
- Ứng dụng: Xây dựng bản đồ 3D, số hóa di tích

**2. MVS (Multi-view Stereo):**
- Từ **nhiều ảnh** chụp cùng vật thể → tạo **point cloud 3D**
- Ứng dụng: Số hóa vật thể, hiệu ứng phim ảnh

### 🎯 Ứng dụng

| Ứng dụng | Ví dụ |
|----------|-------|
| **Lập bản đồ 3D** | Google Maps 3D, bản đồ đô thị |
| **Di sản số** | Số hóa di tích, bảo tàng ảo |
| **Phim ảnh** | Tạo hiệu ứng CGI |
| **VR/AR** | Xây dựng môi trường ảo |

### 💻 Ứng dụng OpenCV — Stereo Vision

```python
# Tính disparity map từ 2 ảnh stereo
stereo = cv2.StereoSGBM_create(
    minDisparity=0,
    numDisparities=64,
    blockSize=11
)
disparity = stereo.compute(img_left, img_right)

# Từ disparity → độ sâu (depth)
# depth = focal_length * baseline / disparity
```

---

## Slide 14: Lịch sử phát triển — 3 giai đoạn

### 📅 Giai đoạn 1: Cách tiếp cận cổ điển (trước 2012)

**Đặc điểm:**
- **Trích xuất đặc trưng thủ công:** SIFT, HOG, LBP
- **Phân loại cổ điển:** SVM, Random Forest, AdaBoost
- **Pipeline:** Feature extraction → Classifier

**Hạn chế:**
- Đặc trưng do **con người thiết kế** — không đủ tổng quát
- Khó mở rộng cho bài toán phức tạp
- Cần **chuyên gia** thiết kế đặc trưng cho từng bài toán

### 📅 Giai đoạn 2: Machine Learning truyền thống (2000–2012)

**Đặc điểm:**
- **Học có giám sát:** Cần ảnh có nhãn để huấn luyện
- **Kỹ thuật:** PCA, k-NN, HOG + SVM, Haar Cascade
- **Pipeline:** Feature extraction (thủ công) + ML classifier

**Ví dụ tiêu biểu:**
- Haar Cascade (2001) — phát hiện khuôn mặt
- HOG + SVM (2005) — phát hiện người đi bộ

### 📅 Giai đoạn 3: Deep Learning — Cuộc cách mạng (2012 → nay)

**Đặc điểm:**
- **Mạng nơ-ron tích chập (CNN):** Tự động học đặc trưng từ **thấp → cao**
- **Kiến trúc tiêu biểu:** AlexNet, VGG, ResNet, YOLO, Mask R-CNN, ViT
- **Pipeline:** End-to-end — ảnh thô → nhãn

**Điểm mạnh:**
- **Chính xác vượt trội** — vượt con người trong nhiều bài toán
- **Không cần thiết kế đặc trưng thủ công**
- **Hoạt động tốt trên dữ liệu lớn**

### 📊 Biểu đồ độ chính xác ImageNet qua các năm

```
Accuracy (%)
  100 ┤                                    ● ResNet
   95 ┤                              ●     ● ViT
   90 ┤                        ● VGG
   85 ┤              ● AlexNet
   80 ┤
   75 ┤    ● Truyền thống (SIFT+SVM)
   70 ┤
      └────┬────┬────┬────┬────┬────┬────►
         2010 2012 2014 2016 2018 2020
```

---

## Slide 15: Ứng dụng OpenCV theo bài toán CV

### 📊 Bảng tổng hợp

| Bài toán | OpenCV API chính | Đặc điểm |
|----------|------------------|----------|
| **Classification** | `cv2.dnn`, `cv2.ml.SVM` | Cần model pretrained |
| **Object Detection** | `cv2.CascadeClassifier`, `cv2.dnn` | Haar, YOLO, SSD |
| **Segmentation** | `cv2.threshold`, `cv2.watershed`, `cv2.findContours` | Cổ điển |
| **Keypoint** | `cv2.ORB_create`, `cv2.SIFT_create` | ORB, SIFT, AKAZE |
| **Matching** | `cv2.BFMatcher`, `cv2.FlannBasedMatcher` | Brute-force, FLANN |
| **OCR** | `cv2.matchTemplate`, `cv2.dnn` | Template, DL |
| **3D** | `cv2.StereoSGBM`, `cv2.calibrateCamera` | Stereo vision |

### 💡 Nhận xét

- **OpenCV cung cấp API cho hầu hết bài toán CV cổ điển**
- **Với Deep Learning:** dùng module `cv2.dnn` để chạy model pretrained
- **Không huấn luyện model DL** — cần PyTorch/TensorFlow

---

## Slide 16: Pipeline xây dựng hệ thống CV — 7 bước

### 🔄 Quy trình 7 bước

| Bước | Nội dung | Ví dụ |
|:----:|----------|-------|
| **1** | **Xác định bài toán** | Phân loại sản phẩm tốt/lỗi |
| **2** | **Thu thập dữ liệu** | Chụp 10.000 ảnh từ 3 camera |
| **3** | **Gán nhãn dữ liệu** | Label "tốt"/"lỗi" (LabelImg, CVAT) |
| **4** | **Tiền xử lý** | Resize 224×224, chuẩn hóa, augment |
| **5** | **Xây dựng mô hình** | ResNet50 pretrained + fine-tune |
| **6** | **Đánh giá** | Accuracy, Precision, Recall, F1 |
| **7** | **Triển khai & bảo trì** | Raspberry Pi + camera, giám sát định kỳ |

### 🖼️ Sơ đồ tổng quát

```
   ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
   │ 1. Bài  │    │ 2. Thu  │    │ 3. Gán  │    │ 4. Tiền  │
   │  toán   │──► │  thập   │──► │  nhãn   │──► │  xử lý   │
   └─────────┘    └─────────┘    └─────────┘    └─────────┘
                                                       │
   ┌─────────┐    ┌─────────┐    ┌─────────┐          │
   │ 7. Triển│    │ 6. Đánh │    │ 5. Xây  │          │
   │  khai   │◄── │  giá    │◄── │  dựng   │◄─────────┘
   └─────────┘    └─────────┘    └─────────┘
```

### 💡 Lưu ý quan trọng

- **Bước 1–4 chiếm 70% thời gian** — dữ liệu quan trọng hơn mô hình
- **Bước 5** với Transfer Learning chỉ mất vài phút
- **Bước 7** cần giám sát định kỳ để phát hiện **data drift**

---

## Slide 17: Công cụ và thư viện phổ biến

### 📊 Bảng công cụ theo giai đoạn

| Giai đoạn | Công cụ chính | Mô tả |
|-----------|---------------|-------|
| **Xử lý ảnh** | OpenCV, PIL, scikit-image | Đọc/ghi, biến đổi ảnh |
| **ML cổ điển** | scikit-learn, XGBoost | SVM, k-NN, decision tree |
| **Deep Learning** | TensorFlow, PyTorch, Keras | Huấn luyện mạng nơ-ron |
| **Gán nhãn** | LabelImg, CVAT, Makesense.ai | Tạo ground truth |
| **Triển khai** | ONNX, TensorRT, OpenVINO, TFLite | Tối ưu cho edge |

### 🎯 Vai trò từng công cụ

**OpenCV:** Công cụ đa năng — xử lý ảnh + CV cổ điển + chạy DL model.

**PyTorch / TensorFlow:** Huấn luyện mô hình DL từ đầu hoặc fine-tune.

**scikit-learn:** ML cổ điển — SVM, k-NN, random forest.

**ONNX:** Định dạng trung gian — chuyển model giữa các framework.

### 💻 Ứng dụng kết hợp OpenCV + PyTorch

```python
import cv2
import torch
import torchvision.transforms as T
from PIL import Image

# 1. Tiền xử lý ảnh với OpenCV
img = cv2.imread('input.jpg')
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# 2. Chuyển sang PyTorch
transform = T.Compose([
    T.ToPILImage(),
    T.Resize(224),
    T.ToTensor(),
    T.Normalize(mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225])
])
input_tensor = transform(img_rgb).unsqueeze(0)

# 3. Suy luận với PyTorch
model = torch.load('resnet50.pt')
model.eval()
with torch.no_grad():
    output = model(input_tensor)
```

---

# PHẦN 2 — ỨNG DỤNG MÔ HÌNH AI TRONG THỊ GIÁC MÁY TÍNH

---

## Slide 18: Mô hình AI là gì?

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

### 💡 So sánh với lập trình truyền thống

| | Lập trình truyền thống | Mô hình AI |
|---|---|---|
| **Con người làm gì?** | Viết **quy tắc** | Cung cấp **dữ liệu** |
| **Máy làm gì?** | Thực thi quy tắc | **Học quy tắc** từ dữ liệu |
| **Ví dụ với ảnh mèo** | Viết code: "tai nhọn + ria mép = mèo" | Xem 10.000 ảnh mèo → tự học |

---

## Slide 19: Ứng dụng AI trong CV theo lĩnh vực

### 🌍 Bảng ứng dụng chi tiết

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

### 🖼️ Hình minh họa theo lĩnh vực

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Y tế        │  │  Xe tự lái   │  │  An ninh     │
│  🏥          │  │  🚗          │  │  🔒          │
│  U-Net       │  │  YOLO        │  │  RetinaFace  │
│  Phân đoạn   │  │  Phát hiện   │  │  Nhận dạng   │
│  khối u      │  │  real-time   │  │  khuôn mặt   │
└──────────────┘  └──────────────┘  └──────────────┘
```

### 📈 Điểm chung

Tất cả ứng dụng trên đều dùng **cùng một loại công nghệ** — **mạng nơ-ron tích chập (CNN)** hoặc **Transformer** — học từ **hàng triệu ảnh** để đạt độ chính xác cao.

---

## Slide 20: Mô hình Classification — ResNet

### 🎯 Bài toán

| | Mô tả |
|---|---|
| **Đầu vào** | 1 ảnh |
| **Đầu ra** | 1 nhãn duy nhất |

### 🏆 ResNet (Residual Network) — 2015

**Ý tưởng chính:** **Skip Connection** — thêm "đường tắt" cho tín hiệu.

### 🖼️ Sơ đồ Skip Connection

```
      x ──────────────────┐
      │                   │  ← đường tắt (identity)
      ▼                   │
   [Conv layers]          │
      │                   │
      ▼                   │
      ⊕ ◄─────────────────┘  ← cộng lại
      │
      ▼
   y = F(x) + x
```

### 📊 Ưu điểm

- Huấn luyện được mạng **rất sâu** (100+ lớp)
- Không bị **vanishing gradient**
- **Hiệu quả cao** — độ chính xác vượt trội

### 📊 Các phiên bản ResNet

| Phiên bản | Số lớp | Tham số |
|-----------|:------:|:-------:|
| ResNet-18 | 18 | 11.7M |
| ResNet-50 | 50 | 25.6M |
| ResNet-101 | 101 | 44.5M |
| ResNet-152 | 152 | 60.2M |

### 🎯 Ứng dụng

- **Phân loại ảnh:** ImageNet, CIFAR, medical imaging
- **Trích xuất đặc trưng:** Làm nền cho detection, segmentation
- **Transfer Learning:** ResNet-50 là lựa chọn phổ biến nhất

---

## Slide 21: Mô hình Detection — YOLO

### 🎯 Bài toán

| | Mô tả |
|---|---|
| **Đầu vào** | 1 ảnh |
| **Đầu ra** | Danh sách đối tượng + bounding box + nhãn |

### ⚡ YOLO (You Only Look Once) — 2015

**Ý tưởng chính:** Xử lý ảnh **1 lần duy nhất** để phát hiện **tất cả đối tượng**.

### 🖼️ So sánh 2 phương pháp

**Phương pháp 2 giai đoạn (Faster R-CNN):**
```
Bước 1: Đề xuất vùng có đối tượng (region proposals)
Bước 2: Phân loại từng vùng
→ Chính xác cao nhưng CHẬM (5-7 FPS)
```

**YOLO (1 giai đoạn):**
```
Chia ảnh thành lưới S×S
Mỗi ô dự đoán bounding box + class
→ Nhanh (45+ FPS) — chạy real-time
```

### 📊 So sánh tốc độ

| Phương pháp | Tốc độ | Ứng dụng |
|-------------|:------:|----------|
| **Faster R-CNN** | 5–7 FPS | Offline, server |
| **YOLO** | **45+ FPS** | **Real-time** |

### 📊 Các phiên bản YOLO

| Phiên bản | Năm | Đặc điểm |
|-----------|:---:|----------|
| YOLOv1 | 2015 | Ra đời, 45 FPS |
| YOLOv5 | 2020 | Phổ biến nhất |
| YOLOv8 | 2023 | Ultralytics, 80+ FPS |
| YOLOv10 | 2024 | Tối ưu cho edge device |

### 🎯 Ứng dụng

Xe tự hành, an ninh, đếm người, kiểm kê hàng hóa, drone.

---

## Slide 22: Mô hình Segmentation — U-Net

### 🎯 Bài toán

| | Mô tả |
|---|---|
| **Đầu vào** | 1 ảnh |
| **Đầu ra** | Mask cùng kích thước — mỗi pixel có 1 nhãn |

### 🩺 U-Net — 2015

**Ra đời cho ảnh y tế** — phân đoạn tế bào, khối u.

### 🖼️ Kiến trúc hình chữ U

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
             (điểm thắt)
```

### 💡 Điểm hay của U-Net

1. **Encoder:** Nén ảnh → học đặc trưng trừu tượng.
2. **Skip Connection:** Chuyển chi tiết từ encoder sang decoder → **giữ biên sắc nét**.
3. **Decoder:** Giải nén → tạo mask **cùng kích thước ảnh gốc**.

### 🎯 Ứng dụng

| Lĩnh vực | Ứng dụng |
|----------|----------|
| **Y tế** | Phân đoạn khối u, tế bào, mạch máu |
| **Vệ tinh** | Phân đoạn đường, sông, rừng |
| **Xe tự hành** | Phân đoạn làn đường, vỉa hè |
| **Nhiếp ảnh** | Xóa phông, tách nền tự động |

---

## Slide 23: Mô hình Detection nâng cao — Faster & Mask R-CNN

### 🎯 Faster R-CNN (2015) — Microsoft Research

**Ý tưởng chính:** **Region Proposal Network (RPN)** — mạng đề xuất vùng có đối tượng, sau đó phân loại từng vùng.

### 🖼️ Quy trình 2 giai đoạn

```
Ảnh → [RPN] → Đề xuất ~2000 vùng → [Classifier] → Nhãn + Bounding box
```

### 📊 So sánh với YOLO

| Tiêu chí | Faster R-CNN | YOLO |
|----------|:------------:|:----:|
| **Tốc độ** | 5–7 FPS | **45+ FPS** |
| **Độ chính xác** | Cao hơn | Tốt |
| **Ứng dụng** | Server, offline | **Real-time** |

### 🎭 Mask R-CNN (2017) — Facebook AI Research

**Ý tưởng chính:** Mở rộng Faster R-CNN bằng cách **thêm 1 nhánh** dự đoán **mask** cho từng đối tượng.

### 🖼️ Ba đầu ra cùng lúc

```
       ┌─► Nhãn (class)
Ảnh ─► ├─► Bounding box
       └─► Mask (pixel-wise)
```

### 🎯 Ứng dụng Mask R-CNN

- **Đếm và tách từng cá thể** (người A ≠ người B)
- **Phân đoạn tế bào** trong ảnh y tế
- **Chỉnh sửa ảnh** (tách nền, xóa vật thể)

---

## Slide 24: Các mô hình Classification khác

### 🏆 AlexNet (2012) — Mô hình khai sinh kỷ nguyên Học sâu

**Đặc điểm:**
- Mạng CNN **8 lớp** (5 conv + 3 fully-connected)
- Sử dụng **ReLU** thay vì sigmoid → huấn luyện nhanh hơn
- **Dropout** để giảm overfitting
- Chạy trên **2 GPU** — đột phá thời bấy giờ

**So sánh với phương pháp truyền thống (2012):**

| Phương pháp | Top-5 Accuracy |
|-------------|:--------------:|
| Truyền thống (SIFT + SVM) | ~72% |
| **AlexNet (CNN)** | **~85%** |

### 🔷 VGG (2014) — "Đơn giản mà hiệu quả"

**Đặc điểm:**
- Chỉ dùng **kernel 3×3** duy nhất, xếp chồng nhiều lớp
- Mạng **rất sâu** (16 hoặc 19 lớp)
- Kiến trúc **đối xứng, dễ hiểu**

**Ưu điểm:** Kiến trúc đơn giản, dễ hiểu → dùng nhiều trong nghiên cứu.  
**Nhược điểm:** Nhiều tham số (~140M) → nặng, chậm.

### ⚡ EfficientNet (2019) — "Nhỏ mà có võ"

**Ý tưởng chính:** **Compound Scaling** — mở rộng mạng cân bằng theo 3 chiều:
- **Độ sâu (depth):** thêm nhiều lớp.
- **Độ rộng (width):** thêm nhiều kênh.
- **Độ phân giải (resolution):** tăng kích thước ảnh đầu vào.

**So sánh với ResNet:**

| Mô hình | Tham số | ImageNet Top-1 |
|---------|:-------:|:--------------:|
| ResNet-50 | 25.6M | 76.1% |
| **EfficientNet-B0** | **5.3M** | **77.1%** |
| EfficientNet-B7 | 66M | **84.3%** |

### 📱 MobileNet (2017) — "AI trong túi áo"

**Ý tưởng chính:** **Depthwise Separable Convolution** — tách phép tích chập thành 2 bước nhỏ → giảm **8–9 lần** tính toán.

**Ứng dụng:** Face ID, Google Lens, ứng dụng di động có AI.

---

## Slide 25: Các mô hình AI khác

### 🕺 Pose Estimation — OpenPose (2017)

**Chức năng:** Phát hiện **tư thế người** — vị trí các **khớp** trên cơ thể.

**Số keypoint:** 17–135 tùy phiên bản (cơ thể, mặt, tay).

**Ứng dụng:**
- Phân tích động tác thể thao.
- AR filter (Instagram, TikTok).
- Game điều khiển bằng cử chỉ.

### 📝 OCR — TrOCR (2021)

**Chức năng:** Đọc chữ trong ảnh — **end-to-end** không cần chia bước.

**Ưu điểm:**
- Xử lý được **chữ viết tay**, xoay, nghiêng.
- Hỗ trợ **đa ngôn ngữ**.
- Không cần template matching.

**Ứng dụng:** Số hóa tài liệu, đọc hóa đơn, biển số xe.

### 🌟 Vision Transformer — ViT (2020)

**Ý tưởng chính:** Chia ảnh thành các **patch** (miếng nhỏ, ví dụ 16×16) → đưa vào **Transformer** giống như xử lý từ trong câu văn.

**So sánh với CNN:**

| Tiêu chí | CNN | ViT |
|----------|:---:|:---:|
| **Cách nhìn ảnh** | Cục bộ (kernel trượt) | **Toàn cục** (tất cả patch) |
| **Dữ liệu cần** | Vừa | **Rất lớn** (JFT-300M) |
| **Độ chính xác** | Tốt | **Vượt trội** khi đủ data |

### 🌟 Foundation Models

**SAM (Segment Anything Model) — Meta 2023:**
- Phân đoạn **mọi đối tượng** trong ảnh với **1 click chuột**.
- Huấn luyện trên **1 tỷ mask** — dataset lớn nhất.

**CLIP (OpenAI 2021):**
- Kết nối **ảnh và văn bản** trong cùng không gian vector.
- **Zero-shot classification:** Phân loại ảnh **không cần huấn luyện**.
- Chỉ cần **mô tả bằng tiếng Anh**: "a photo of a cat" → máy phân loại được.

---

## Slide 26: Bảng tổng hợp — Các mô hình AI phổ biến

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
| | Mask R-CNN | 2017 | Detection + Instance Seg |
| | DETR | 2020 | Transformer cho detection |
| **Segmentation** | U-Net | 2015 | Ảnh y tế |
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

## Slide 27: Chọn mô hình nào cho bài toán?

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

## Slide 28: Transfer Learning — Chiến lược thực tế

### ⚠️ Vấn đề

Huấn luyện mô hình AI từ đầu cần:
- **Triệu ảnh** có nhãn (rất tốn kém).
- **GPU mạnh** (hàng nghìn USD).
- **Nhiều ngày** huấn luyện.

→ Sinh viên, cá nhân, doanh nghiệp nhỏ **không đủ nguồn lực**.

### 💡 Giải pháp — Transfer Learning

**Ý tưởng:** Tận dụng **kiến thức** mà mô hình đã học từ **dataset khổng lồ** (ImageNet).

### 🖼️ Quy trình 4 bước

```
Bước 1: Tải mô hình pretrained (ResNet50 đã học 1.2M ảnh)
                    ↓
Bước 2: Đóng băng các lớp đầu (giữ nguyên kiến thức chung)
                    ↓
Bước 3: Thay lớp cuối bằng lớp mới cho bài toán của bạn
                    ↓
Bước 4: Huấn luyện chỉ lớp mới trên dataset nhỏ của bạn
```

### 📊 So sánh

| Tiêu chí | Huấn luyện từ đầu | Transfer Learning |
|----------|:-----------------:|:-----------------:|
| **Dữ liệu cần** | Triệu ảnh | **Vài trăm ảnh** |
| **Thời gian** | Vài ngày | **Vài phút** |
| **GPU** | Rất mạnh | **Trung bình** |
| **Độ chính xác** | Cao | **Tương đương** |

### 💻 Code minh họa — Transfer Learning với PyTorch

```python
import torch
import torch.nn as nn
import torchvision.models as models

# 1. Load ResNet50 pretrained
model = models.resnet50(pretrained=True)

# 2. Đóng băng các layer đầu
for param in model.parameters():
    param.requires_grad = False

# 3. Thay lớp FC cuối cho bài toán mới (3 lớp)
model.fc = nn.Linear(2048, 3)

# 4. Fine-tune chỉ lớp FC mới
trainable = sum(p.numel() for p in model.parameters()
                if p.requires_grad)
print(f"Tham số huấn luyện: {trainable:,}")   # ~6K
```

> **Ví dụ thực tế:** Phân loại 5 loại hoa với 500 ảnh — Transfer Learning đạt **>95% accuracy** chỉ trong **30 phút**.

---

## Slide 29: Tổng kết chương

### 📌 Nhớ 6 điều quan trọng

1. **Computer Vision** = khoa học giúp máy tính **"nhìn"** và **"hiểu"** thế giới từ ảnh/video.

2. **6 bài toán chính:** Classification, Detection, Segmentation, Keypoint, OCR, 3D Reconstruction.

3. **OpenCV** cung cấp công cụ **cổ điển** (Haar, ORB, Template Matching) + **chạy DL models** (DNN module).

4. **Mô hình AI** = chương trình được **huấn luyện từ dữ liệu** để tự động dự đoán.

5. **Ba mô hình AI chính trong CV:**
   - **Classification** (ResNet): phân loại ảnh → 1 nhãn.
   - **Detection** (YOLO): tìm đối tượng + vị trí real-time.
   - **Segmentation** (U-Net): gán nhãn từng pixel.

6. **Transfer Learning** — dùng mô hình pretrained, chỉ cần **vài trăm ảnh** là có kết quả tốt.

### 🚀 Xu hướng hiện tại

- **Foundation Models** (SAM, CLIP): 1 mô hình dùng cho mọi bài toán.
- **Multimodal:** Kết hợp ảnh + text + audio (GPT-4V, Gemini).
- **Edge AI:** Mô hình nhỏ chạy trên điện thoại, drone.

### 🎯 Con đường học tập tiếp theo

```
Bước 1: Nắm vững xử lý ảnh (Chương 1-4)      ← đã học
Bước 2: Thành thạo OpenCV (Chương 5 Phần 1)  ← đang học
Bước 3: Hiểu mô hình AI (Chương 5 Phần 2)     ← đang học
Bước 4: Học PyTorch / TensorFlow
Bước 5: Thực hành Transfer Learning
Bước 6: Triển khai ứng dụng thực tế
```

---

**📝 Ghi chú về bộ slides mới:**

- **Tổng cộng 29 slide**, chia thành 2 phần rõ ràng:
  - **PHẦN 1 (Slide 1–17):** Thị giác máy tính — tích hợp OpenCV xuyên suốt.
  - **PHẦN 2 (Slide 18–29):** Ứng dụng mô hình AI trong CV — phần riêng.

- **Điểm mới so với bản cũ:**
  - **Tích hợp OpenCV vào từng bài toán** (Slide 8–13) thay vì tách thành phần riêng.
  - **Bổ sung hình vẽ minh họa** (sơ đồ, bảng, ASCII art) cho mỗi slide.
  - **Nội dung chi tiết hơn** — mỗi slide có phần giải thích đầy đủ.
  - **Loại bỏ trùng lặp** — gộp các slide trùng nội dung.
  - **Cấu trúc logic:** Lý thuyết → Ứng dụng OpenCV → Mô hình AI.