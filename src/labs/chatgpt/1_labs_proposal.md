Được. Với mục tiêu **“demo được mọi phương diện quan trọng của Computer Vision”**, tôi đề xuất không giới hạn ở vài bài OpenCV cơ bản mà xây dựng thành một **bộ bài thực hành có hệ thống**, đi từ xử lý ảnh → đặc trưng → video → hình học → camera → deep learning → detection → segmentation → tracking → pose → OCR → multimodal/vision-language.

Tôi sẽ thiết kế mỗi bài theo cùng một format:

> **Bài toán → Mục tiêu → Dữ liệu → Các bước thực hiện → Code Colab hoàn chỉnh → Kết quả trực quan → Kiến thức rút ra**

Và **không yêu cầu sinh viên phải có GPU riêng**; các bài AI có thể dùng Google Colab và ưu tiên các mô hình pretrained.

---

# I. Nhóm A — Computer Vision với OpenCV

Nhóm này tập trung vào việc giúp sinh viên hiểu **Computer Vision trước khi phụ thuộc vào AI**.

![Image](https://images.openai.com/static-rsc-4/tSbt0mUBGN_mTIiYc6YvwIy5oPb_EQ6o7e04V45H1rkjoqNZ0yivNWX8tNh_fC4fVVQonz4Mp9hCnNQliFQNe9lhTXrfJXN1QCrix7GiCzeA_Rz3XfKU1RDN_uONRZygv60knKg9pfsoCyVsN8kuQjlsWJOHGo3_CTlDBl1zQ1s_iGfBm5S5peb8wOFCZJ6J?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/mx4C8--uVMXmA6CCDqColuL_EvBdRcwLjLNsi6V5qn2Tib5TG64GY6ZgCGidHHn4ijOiWsYmzEhWwDinj-116nZewlRDHIryO6FRGk4OQmVXGKoOHvmrY2m774K3Di2fvgR9XHj2Gm-4xCgsNocA4mteMGeGtqZ1cAViiATQ30M17ToeDYUnNnSLvK4o-RYP?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/o3UA0l7FsaY1LAqJ_GFeRjFxR_JMRHRF5IFbgnsi922q-XSH5rVuGXwNgW-BI7lsDfyAY-nStdTnrIfVdBAhcTnCzUamHCaNZk_C7CT6I6TfmSaV9WbKXh6eRu2dIR6r025HcgwJOsFn8nrSqKP0e5CPb84s743WSo49bFHyd0Hzd063oIBv8NxmVXjU8xsA?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/CSdffPsZr5kudgEIKfcPJFE38Yb8b1OmEXd24LU0vYrhIMm7ldycA44dnSK5f4uKWFeD6wP-pilipg24FzIYt5PZxgk1EevJmQoHrHj7RaAbWHh2D3XAVhOS4cAHf26sDTW8NdHFe-L75mtNOu5Onr97UVr4GkV9oISCknfOcRD3sVIDUok-Q6qsaIG1iP_y?purpose=fullsize)

## A1. Đọc, hiển thị và khám phá ảnh

**Bài toán:**
Đọc một ảnh từ máy tính/Internet, hiển thị ảnh và khảo sát các thuộc tính cơ bản.

Sinh viên thực hiện:

* đọc ảnh bằng OpenCV
* BGR → RGB
* lấy width, height, channels
* truy cập pixel
* crop ảnh
* resize
* lưu ảnh
* hiển thị histogram

**Kết quả:** một notebook giúp sinh viên nhìn thấy rằng ảnh thực chất là ma trận số.

---

## A2. Các không gian màu

**Bài toán:** Chuyển một ảnh RGB/BGR sang:

* Grayscale
* HSV
* LAB
* YCrCb

Sau đó hiển thị từng channel.

**Demo trực quan:**

```text
Original
   │
   ├── Grayscale
   ├── HSV
   │    ├── H
   │    ├── S
   │    └── V
   ├── LAB
   └── YCrCb
```

Sinh viên hiểu tại sao HSV hữu ích cho segmentation theo màu.

---

## A3. Histogram và cân bằng histogram

**Bài toán:** So sánh ảnh trước và sau:

* histogram
* histogram equalization
* CLAHE

Hiển thị đồng thời ảnh và histogram.

**Mục tiêu:** hiểu contrast enhancement.

---

## A4. Các phép biến đổi hình học

**Bài toán:** Thực hiện:

* translation
* rotation
* scaling
* flipping
* affine transformation
* perspective transformation

Đặc biệt cho sinh viên thấy:

```text
Ảnh biển báo
     ↓
Perspective Transform
     ↓
Ảnh nhìn thẳng
```

---

## A5. Làm mờ và khử nhiễu

So sánh:

* Gaussian Blur
* Median Blur
* Average Blur
* Bilateral Filter

Thêm nhiễu:

* Gaussian noise
* Salt & Pepper noise

Sau đó đánh giá trực quan khả năng phục hồi.

---

## A6. Image sharpening

**Bài toán:** Làm sắc nét ảnh bằng:

* Laplacian
* unsharp masking
* kernel convolution

Hiển thị:

```text
Original → Blur → Sharpen
```

---

## A7. Edge Detection

Demo:

* Sobel X
* Sobel Y
* magnitude
* Laplacian
* Canny

Hiển thị pipeline:

```text
Original
   ↓
Grayscale
   ↓
Gaussian Blur
   ↓
Canny
   ↓
Edges
```

---

## A8. Thresholding

So sánh:

* binary threshold
* inverse threshold
* adaptive threshold
* Otsu

**Bài toán:** tách chữ hoặc vật thể khỏi nền.

---

## A9. Morphological Image Processing

Demo:

* erosion
* dilation
* opening
* closing
* morphological gradient
* top-hat
* black-hat

**Bài toán:** làm sạch mask của vật thể.

---

## A10. Connected Components

**Bài toán:** Cho một ảnh binary chứa nhiều vật thể, tìm:

* số vật thể
* bounding box
* diện tích
* centroid

Kết quả:

```text
Object 1: area = ...
Object 2: area = ...
Object 3: area = ...
```

và vẽ bounding box lên ảnh.

---

## A11. Contour Detection

Sinh viên dùng:

```python
cv2.findContours()
```

để:

* tìm contour
* diện tích
* perimeter
* bounding rectangle
* rotated rectangle
* convex hull

---

## A12. Nhận dạng hình học cơ bản

**Bài toán:** Nhận dạng:

* triangle
* rectangle
* square
* circle
* polygon

bằng contour approximation.

Đây là bài rất tốt để minh họa:

> Computer Vision truyền thống có thể giải quyết một số bài toán mà không cần AI.

---

## A13. Hough Transform — đường thẳng

**Bài toán:** Phát hiện lane/đường thẳng trong ảnh đường phố.

Sử dụng:

```python
cv2.HoughLines()
cv2.HoughLinesP()
```

Hiển thị đường thẳng phát hiện được trên ảnh.

---

## A14. Hough Circle Transform

Phát hiện:

* đồng xu
* bóng
* bánh xe
* hình tròn

bằng:

```python
cv2.HoughCircles()
```

---

## A15. Template Matching

**Bài toán:** Tìm một biểu tượng/logo nhỏ trong ảnh lớn.

Sinh viên thử:

```python
cv2.matchTemplate()
```

và hiển thị bounding box vị trí tìm được.

---

## A16. Image Segmentation bằng màu

**Bài toán:** Tách vật thể có màu đặc trưng.

Ví dụ:

```text
Ảnh trái cây
      ↓
HSV
      ↓
Color Mask
      ↓
Morphology
      ↓
Object
```

---

## A17. Feature Detection — Harris Corner

Demo:

* Harris
* Shi-Tomasi

Hiển thị các corner trên ảnh.

---

## A18. Feature Detection — ORB

Sinh viên phát hiện:

```python
cv2.ORB_create()
```

và hiển thị keypoints.

---

## A19. Feature Matching

So sánh hai ảnh của cùng một vật thể bằng:

* ORB
* BFMatcher
* Hamming distance

Hiển thị:

```text
Image A                    Image B
   ● ─────────────────────── ●
   ● ─────────────────────── ●
   ● ─────────────────────── ●
```

---

## A20. Homography

**Bài toán:** Tìm một tài liệu trong ảnh chụp nghiêng và biến đổi nó thành ảnh phẳng.

Đây là một bài rất hay để kết nối:

> feature matching → homography → perspective transform.

---

## A21. Panorama / Image Stitching

Ghép 2–3 ảnh thành panorama bằng:

```python
cv2.Stitcher_create()
```

Sinh viên thấy kết quả ngay lập tức.

---

## A22. Background Subtraction

Đối với video:

```text
Video
  ↓
Background Model
  ↓
Foreground Mask
  ↓
Moving Objects
```

Dùng:

* MOG2
* KNN

---

## A23. Optical Flow

Demo:

* Lucas-Kanade
* Farneback

Hiển thị vector chuyển động trên video.

---

## A24. Motion Detection

**Bài toán:** Camera giám sát phát hiện khi có người/vật chuyển động.

Pipeline:

```text
Camera
 ↓
Frame Difference
 ↓
Threshold
 ↓
Morphology
 ↓
Contour
 ↓
Bounding Box
```

---

## A25. Object Tracking truyền thống

Theo dõi một vật thể bằng:

* MeanShift
* CamShift

Hiển thị trajectory.

---

## A26. Haar Cascade Face Detection

Demo:

```python
cv2.CascadeClassifier()
```

phát hiện:

* face
* eyes
* smile

Đây là bài chuyển tiếp rất tốt:

> Traditional CV → Machine Learning → Deep Learning.

---

## A27. Camera Calibration

Sinh viên sử dụng chessboard để:

* phát hiện corner
* tính intrinsic matrix
* distortion coefficients
* undistort ảnh

Hiển thị:

```text
Distorted Image
       ↓
Calibration
       ↓
Undistorted Image
```

---

## A28. Perspective Geometry

**Bài toán:** Từ camera nhìn một mặt phẳng, biến đổi tọa độ pixel thành hệ tọa độ thực.

Có thể xây dựng demo:

> Đo chiều dài một vật trên mặt bàn bằng camera.

---

## A29. Document Scanner

Một mini-project rất trực quan:

```text
Camera Image
     ↓
Edge Detection
     ↓
Largest Contour
     ↓
4 Corners
     ↓
Perspective Transform
     ↓
Scanned Document
```

---

## A30. Lane Detection

Pipeline OpenCV hoàn chỉnh:

```text
Video
 ↓
ROI
 ↓
Grayscale
 ↓
Gaussian Blur
 ↓
Canny
 ↓
Hough Transform
 ↓
Lane Lines
```

---

# II. Nhóm B — Computer Vision với AI

Nhóm này chuyển từ:

> **“chúng ta tự thiết kế thuật toán”**

sang:

> **“mô hình AI học representation và quyết định từ dữ liệu.”**

![Image](https://images.openai.com/static-rsc-4/s2uXeb33bnvNGbXyyXz5olP7rEfzArjKmGI0OGdCgnT3bSDuTH3Abs66HDpC0-IOHLdvOkj6y40MfSoQXIRlDrbtLe1UyMyVkOOEKuEmGN3GSRz8hZy0MQfWR7-7c_3gq1U0bs_zG_b0ydu2jnSLNU8zQPVBnnDylq51PmdAmd6MrEU9f-sNNrSsyypR5yPv?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/5V-6Kq56Dz9FVDuNEQEUyS-qQXsDQs_ah56Ld2OwWpCoBVWpRqogl848iX4nF9Kh9PyXGVDSFqGYBV8BwUjI7F6Omv_DW7FITrWPNNq314va6sM1hu_B0a01TcLWv6ckr-DZpzod4ZIUOs9zTCfFojgRdLBLx3JYjV0ka9AHqNnhERIWqsFCUmkCpVsUU5-S?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/Uqd3U0819hrtN0vDZFqhK2zmpDsiB3Mwa-k3RiMZZaS93LWkk31agihGspiU-9JjhECY9OZLD0VGt1P4XLVVG7iZ_WoNhOI3MXoU1Ey0NXnRUs27RGKfZ1VQiDhw3LfxugbeiWPRhmRQfcH-OUQYgs6U5S5RaJRZdYCj9uin-InqqR60ZT9izVayegElnPvt?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/x3CzGRPOfDyL_WZ7_i7FeSuhYUhrNva3k9LlJ2MS4UWVi9zjvDJndSkQButDLKLVJiEtDJ6vPll8TnF_-ZaEpvDge_1DS73Aq01iMXBmHwk1MyPxG0YRVnb3kibRywByhiTd81VZ7pWn3vW8aNnBkgaZ1cDBBdrIWi0gyVDPDmaPeO97ihTwKtNgCmQVA7Sd?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/mJgn2zbkp-vRoXahy6S--RpPZyM4t4UXtPWHOoaqCSZDYEoS7dvoKXwxZASFFAFDaGyYgw_VeOUtbHERnFDRzLPOwhi1oRHX76AM9GDIYafz6WxAMBS9CdW961gu1VeIsluiB6iLCUBVnFpEFoD2aLl-hlxYnprOIR8bh2QNo80jxLgHRzohcMFdG4GAYexR?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/yzthU1Pgy3AfIL_APBqQKjfWRneSS2SLJeTMCX1lTGsOnTGIAOimu7yHKyNp1VsJ-oEgtyLqOfdnBvZlOB5mJLPlNAUHWyr7lL-Xkxc81fp29Fi0R9itejqawL1vxbSRFcZk9_PwzgEimyobxS25PYyb3mLF5RKtw0ESzIZIXTx3GTNbs-tPiQgOiCwMRCAP?purpose=fullsize)

---

# B1. Image Classification bằng CNN

**Bài toán:** Phân loại ảnh thành các lớp.

Ví dụ:

```text
Cat
Dog
Horse
Bird
```

Sinh viên xây dựng CNN đơn giản bằng TensorFlow/Keras.

Pipeline:

```text
Image
 ↓
Resize
 ↓
Normalize
 ↓
CNN
 ↓
Softmax
 ↓
Class
```

Hiển thị:

* training loss
* validation loss
* accuracy
* confusion matrix
* sample predictions.

---

# B2. Transfer Learning

Dùng pretrained:

* MobileNet
* EfficientNet
* ResNet

So sánh:

```text
CNN from scratch
       vs
Transfer Learning
```

Đây là bài cực kỳ quan trọng trong Computer Vision hiện đại.

---

# B3. Data Augmentation

Cho sinh viên trực quan hóa:

* rotation
* flip
* crop
* zoom
* brightness
* contrast

và xem augmentation ảnh hưởng thế nào đến model.

---

# B4. Image Classification với Vision Transformer

Giới thiệu:

> CNN → Transformer → Vision Transformer.

Dùng pretrained ViT để classification.

---

# B5. Object Detection với YOLO

Đây nên là **một trong những bài trung tâm**.

**Bài toán:** Phát hiện nhiều đối tượng trong ảnh.

Output:

```text
person 0.94
car    0.88
dog    0.91
```

với bounding boxes.

---

# B6. YOLO trên video

Không chỉ ảnh tĩnh.

```text
Video
 ↓
YOLO
 ↓
Detection từng frame
 ↓
Annotated Video
```

Hiển thị FPS.

---

# B7. Real-time Object Detection với Webcam

Sinh viên chạy:

```text
Webcam
   ↓
YOLO
   ↓
Bounding Boxes
   ↓
Class + Confidence
```

Trong Colab có thể dùng webcam JavaScript bridge.

---

# B8. Object Detection Evaluation

Cho model chạy trên dataset và tính:

* IoU
* Precision
* Recall
* AP
* mAP

Sinh viên hiểu rằng:

> “accuracy” không phải metric thích hợp cho object detection.

---

# B9. Semantic Segmentation

**Bài toán:** Mỗi pixel thuộc về class nào?

Ví dụ:

```text
road
car
person
sky
building
```

Output là segmentation mask.

---

# B10. U-Net

Sinh viên tự xây dựng U-Net đơn giản.

Pipeline:

```text
Image
  ↓
Encoder
  ↓
Bottleneck
  ↓
Decoder
  ↓
Segmentation Mask
```

Đây là bài quan trọng để hiểu architecture segmentation.

---

# B11. Semantic Segmentation bằng pretrained model

Sử dụng:

* DeepLabV3
* SegFormer

So sánh với U-Net.

---

# B12. Instance Segmentation

Phân biệt:

```text
Person 1
Person 2
Person 3
```

thay vì chỉ:

```text
person
```

Dùng:

* Mask R-CNN
* YOLO segmentation

Hiển thị từng mask.

---

# B13. Panoptic Segmentation

Kết hợp:

* semantic segmentation
* instance segmentation

Ví dụ:

```text
road       → semantic
building   → semantic
person #1  → instance
person #2  → instance
car #1     → instance
```

---

# B14. Object Tracking với AI

Pipeline:

```text
YOLO
 ↓
Detection
 ↓
Tracker
 ↓
Object ID
```

Ví dụ:

```text
Person #12
Person #27
Car #5
```

Dùng:

* ByteTrack
* BoT-SORT

---

# B15. Multi-Object Tracking

Đây là bước nâng cao của B14.

Sinh viên phân tích:

* ID
* trajectory
* object entering
* object leaving
* counting.

---

# B16. People Counting

**Bài toán:** Đếm số người trong video.

Có thể mở rộng:

```text
Total people = 17

Entering = 5
Leaving  = 3
```

Kết hợp detection + tracking.

---

# B17. Vehicle Counting

Camera giao thông:

```text
Car
Truck
Bus
Motorcycle
```

Đếm xe đi qua một line.

---

# B18. Pose Estimation

Dùng:

* MediaPipe Pose
* YOLO Pose

Hiển thị skeleton:

```text
head
 │
shoulder
 │
elbow ─ wrist
 │
hip
 │
knee
 │
ankle
```

---

# B19. Human Activity Recognition

Từ pose hoặc video, phân loại:

* walking
* running
* sitting
* standing
* waving

---

# B20. Hand Tracking

Dùng MediaPipe Hands.

Hiển thị 21 landmarks của bàn tay.

---

# B21. Gesture Recognition

Từ hand landmarks:

```text
✋ → STOP
👍 → YES
✌ → VICTORY
```

Sinh viên có thể tự xây classifier đơn giản.

---

# B22. Face Detection bằng Deep Learning

So sánh:

```text
Haar Cascade
      vs
Deep Learning Face Detector
```

Qua đó thấy sự khác biệt giữa traditional CV và AI CV.

---

# B23. Face Landmark Detection

Phát hiện:

* mắt
* mũi
* miệng
* contour khuôn mặt.

---

# B24. Face Recognition

Pipeline:

```text
Face Detection
      ↓
Face Alignment
      ↓
Face Embedding
      ↓
Similarity
      ↓
Identity
```

Có thể dùng pretrained face embedding model.

---

# B25. Face Verification

Khác với recognition:

> “Hai ảnh này có phải cùng một người không?”

Output:

```text
Similarity = 0.87
Same person = True
```

---

# B26. OCR

Đây là một mảng rất quan trọng.

Pipeline:

```text
Image
 ↓
Text Detection
 ↓
Text Recognition
 ↓
Text
```

Dùng:

* EasyOCR
* PaddleOCR
* Tesseract để so sánh.

---

# B27. OCR tài liệu tiếng Việt

Cho ảnh:

```text
Họ tên: Nguyễn Văn A
MSSV: 123456
Lớp: CNTT...
```

model trích xuất text.

Có thể mở rộng thành:

> Image → OCR → structured JSON.

---

# B28. License Plate Recognition

Pipeline:

```text
Vehicle
 ↓
License Plate Detection
 ↓
Crop
 ↓
OCR
 ↓
License Plate Number
```

Đây là mini-project rất trực quan.

---

# B29. Document Understanding

Không chỉ OCR.

Cho:

```text
Hóa đơn
```

model xác định:

```json
{
  "seller": "...",
  "date": "...",
  "total": "...",
  "items": [...]
}
```

Đây là bước từ Computer Vision sang Document AI.

---

# B30. Image Captioning

Cho ảnh:

```text
Image
 ↓
Vision Encoder
 ↓
Language Decoder
 ↓
"This is a dog playing in a park."
```

Giúp sinh viên thấy sự kết hợp:

> Computer Vision + NLP.

---

# B31. Visual Question Answering

Cho ảnh:

> **Question:** How many people are in the image?

Model trả lời:

> **Answer:** 3.

Pipeline:

```text
Image + Question
       ↓
Vision-Language Model
       ↓
Answer
```

---

# B32. Image Embedding

Sinh viên sử dụng pretrained vision model để biến ảnh thành vector:

```text
Image
 ↓
Encoder
 ↓
[0.12, -0.37, ..., 0.81]
```

Sau đó trực quan hóa bằng:

* PCA
* t-SNE
* UMAP

---

# B33. Image Similarity Search

Cho một ảnh query:

```text
Query Image
     ↓
Embedding
     ↓
Vector Search
     ↓
Top-K similar images
```

Đây là bài rất tốt để giới thiệu:

> Computer Vision + Vector Database.

---

# B34. Image Retrieval

Xây dựng mini search engine:

```text
"find similar images"
```

Sinh viên upload một ảnh và hệ thống trả về Top-5 ảnh giống nhất.

---

# B35. Anomaly Detection

**Bài toán:** Phát hiện ảnh khác thường.

Ví dụ:

```text
Normal product
Normal product
Normal product
Defective product ← anomaly
```

Dùng:

* Autoencoder
* pretrained embedding + distance.

---

# B36. Image Generation

Giới thiệu generative vision:

```text
Text
 ↓
Text Encoder
 ↓
Diffusion Model
 ↓
Image
```

Sinh viên thử text-to-image bằng model pretrained trong Colab.

---

# B37. Image-to-Image Generation

Ví dụ:

```text
Sketch
 ↓
Diffusion / ControlNet
 ↓
Realistic Image
```

Qua đó giới thiệu:

> generative computer vision.

---

# B38. Image Restoration

Các bài:

* denoising
* deblurring
* super-resolution
* inpainting.

Sinh viên so sánh:

```text
Low Quality
      ↓
AI Restoration
      ↓
Enhanced Image
```

---

# B39. Super Resolution

```text
Low Resolution
      ↓
Super Resolution Model
      ↓
High Resolution
```

So sánh interpolation:

```text
Bicubic
vs
AI Super Resolution
```

---

# B40. Depth Estimation

Từ một ảnh RGB:

```text
RGB Image
    ↓
Depth Model
    ↓
Depth Map
```

Hiển thị depth map.

Đây là bài rất quan trọng để mở sang **3D Computer Vision**.

---

# B41. Monocular 3D Understanding

Từ RGB + depth:

* approximate distance
* relative depth
* object ordering.

---

# B42. Stereo Vision

Hai camera:

```text
Left Camera       Right Camera
     ↓                 ↓
     └──── Stereo ─────┘
             ↓
        Disparity
             ↓
          Depth
```

Sinh viên tính depth từ disparity.

---

# B43. 3D Reconstruction

Từ nhiều ảnh:

```text
Images
 ↓
Feature Matching
 ↓
Camera Geometry
 ↓
3D Points
```

Hiển thị point cloud 3D.

---

# B44. Visual Odometry

Video camera:

```text
Frame t
   ↓
Feature Matching
   ↓
Frame t+1
   ↓
Camera Motion
```

Ước lượng trajectory.

---

# B45. Visual SLAM — demo

Một bài nâng cao để sinh viên hiểu:

```text
Camera
 ↓
Feature Detection
 ↓
Tracking
 ↓
Mapping
 ↓
Localization
```

Không nhất thiết tự implement SLAM; có thể chạy một hệ thống pretrained/library và phân tích kết quả.

---

# III. Nhóm C — Các bài tích hợp

Nếu mục tiêu là **“demo mọi phương diện”**, tôi khuyên thêm một nhóm cuối thay vì chỉ chia OpenCV/AI.

Đây là nơi sinh viên kết hợp nhiều kỹ thuật.

## C1. Smart Traffic Camera

```text
Camera
   ↓
YOLO Detection
   ↓
Tracking
   ↓
Vehicle Classification
   ↓
Counting
   ↓
Speed Estimation
   ↓
Statistics
```

Output trực quan:

```text
Cars       : 24
Motorbikes : 51
Buses      : 3
Trucks     : 5
```

---

## C2. Smart Classroom

```text
Camera
 ↓
Person Detection
 ↓
Pose Estimation
 ↓
Tracking
 ↓
Activity Recognition
```

Có thể demo:

* số người
* vị trí
* trạng thái đứng/ngồi
* occupancy.

---

## C3. Automated Document Scanner

Kết hợp:

```text
OpenCV
  ↓
Document Detection
  ↓
Perspective Correction
  ↓
AI OCR
  ↓
Structured Information
```

---

## C4. Product Inspection

```text
Camera
 ↓
Object Detection
 ↓
Segmentation
 ↓
Anomaly Detection
 ↓
PASS / FAIL
```

---

## C5. Face Attendance

Một pipeline tổng hợp:

```text
Camera
 ↓
Face Detection
 ↓
Face Embedding
 ↓
Face Matching
 ↓
Identity
 ↓
Attendance
```

Có thể cho sinh viên phân tích riêng vấn đề **false positive / false negative** thay vì chỉ làm demo nhận diện.

---

## C6. AI Visual Search Engine

```text
Image
 ↓
Vision Encoder
 ↓
Embedding
 ↓
Vector Database
 ↓
Similarity Search
 ↓
Top-K Images
```

Đây là bài rất phù hợp để kết nối Computer Vision với AI system engineering.

---

## C7. Visual Chatbot

```text
Image
   +
Question
   ↓
Vision-Language Model
   ↓
Answer
```

Ví dụ:

> “What objects are visible?”

> “What is the person doing?”

> “Describe this scene.”

---

# IV. Cấu trúc bộ Lab tôi đề xuất

Thay vì biến thành một danh sách 50 bài độc lập hoàn toàn, có thể tổ chức thành **6 cấp độ**:

| Cấp | Nội dung                  |     Bài |
| --- | ------------------------- | ------: |
| 1   | Image Fundamentals        |   A1–A6 |
| 2   | Classical CV              |  A7–A16 |
| 3   | Geometry & Motion         | A17–A30 |
| 4   | Deep Learning CV          |  B1–B14 |
| 5   | Advanced AI Vision        | B15–B44 |
| 6   | Integrated Vision Systems |   C1–C7 |

Tổng cộng hiện tại là **87 bài thực hành**.

Điểm quan trọng là **không cần bắt sinh viên làm cả 87 bài**. Đây có thể là một **Computer Vision Lab Bank**, từ đó chọn khoảng 15–20 bài cho một học phần.

---

# V. Chuẩn hóa format code Colab

Tôi đề xuất **mọi bài đều có cùng cấu trúc notebook**:

```text
# ============================================================
# COMPUTER VISION LAB XX
# Tên bài
# ============================================================

# 1. Cài đặt thư viện
# ------------------------------------------------------------

# 2. Import thư viện
# ------------------------------------------------------------

# 3. Chuẩn bị dữ liệu
# ------------------------------------------------------------

# 4. Hiển thị dữ liệu đầu vào
# ------------------------------------------------------------

# 5. Tiền xử lý
# ------------------------------------------------------------

# 6. Thực hiện thuật toán / mô hình
# ------------------------------------------------------------

# 7. Trực quan hóa kết quả
# ------------------------------------------------------------

# 8. Đánh giá kết quả
# ------------------------------------------------------------

# 9. Thử nghiệm với dữ liệu khác
# ------------------------------------------------------------

# 10. Kết luận
# ------------------------------------------------------------
```

Ví dụ với một bài OpenCV:

```python
# ============================================================
# LAB: EDGE DETECTION WITH CANNY
# ============================================================

import cv2
import matplotlib.pyplot as plt

# ------------------------------------------------------------
# 1. Đọc ảnh
# ------------------------------------------------------------

image = cv2.imread("image.jpg")

# OpenCV đọc ảnh theo thứ tự BGR.
# Matplotlib sử dụng RGB, vì vậy cần chuyển đổi.
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# ------------------------------------------------------------
# 2. Chuyển sang ảnh grayscale
# ------------------------------------------------------------

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# ------------------------------------------------------------
# 3. Làm giảm nhiễu
# ------------------------------------------------------------

# Gaussian Blur giúp giảm các cạnh giả do nhiễu.
blur = cv2.GaussianBlur(gray, (5, 5), 0)

# ------------------------------------------------------------
# 4. Phát hiện cạnh bằng Canny
# ------------------------------------------------------------

edges = cv2.Canny(
    blur,
    threshold1=50,
    threshold2=150
)

# ------------------------------------------------------------
# 5. Hiển thị kết quả
# ------------------------------------------------------------

plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
plt.imshow(image_rgb)
plt.title("Original")
plt.axis("off")

plt.subplot(1, 3, 2)
plt.imshow(gray, cmap="gray")
plt.title("Grayscale")
plt.axis("off")

plt.subplot(1, 3, 3)
plt.imshow(edges, cmap="gray")
plt.title("Canny Edges")
plt.axis("off")

plt.show()
```

Điểm tôi muốn giữ xuyên suốt là **code không chỉ chạy được mà phải “giải thích được”**.

---

# VI. Với các bài AI, cần một format trực quan hơn

Ví dụ YOLO:

```python
# ------------------------------------------------------------
# 1. Load pretrained model
# ------------------------------------------------------------

from ultralytics import YOLO

model = YOLO("yolo11n.pt")

# ------------------------------------------------------------
# 2. Chạy object detection
# ------------------------------------------------------------

results = model(image)

# ------------------------------------------------------------
# 3. Hiển thị kết quả
# ------------------------------------------------------------

annotated = results[0].plot()

plt.figure(figsize=(12, 8))
plt.imshow(annotated[..., ::-1])
plt.axis("off")
plt.show()
```

Nhưng notebook hoàn chỉnh nên tiếp tục:

```text
Input Image
     ↓
Preprocessing
     ↓
YOLO
     ↓
Bounding Boxes
     ↓
Class
     ↓
Confidence
     ↓
Visualization
```

và cho sinh viên **truy cập trực tiếp các kết quả bên trong model**:

```python
boxes = results[0].boxes

print("Number of objects:", len(boxes))

for box in boxes:
    print(
        "class =", int(box.cls),
        "confidence =", float(box.conf)
    )
```

Như vậy sinh viên không chỉ biết:

> `model(image)`

mà hiểu **model trả về cái gì**.

---

# VII. Một nguyên tắc rất quan trọng cho bộ bài này

Tôi sẽ tránh thiết kế các bài kiểu:

> “Chạy YOLO bằng 5 dòng code.”

vì như vậy sinh viên chỉ đang **sử dụng API**, chưa thực sự học Computer Vision.

Mỗi bài AI nên có ít nhất 4 tầng:

```text
Tầng 1 — Run
    ↓
Chạy pretrained model

Tầng 2 — Understand
    ↓
Đọc input/output của model

Tầng 3 — Visualize
    ↓
Hiển thị prediction

Tầng 4 — Experiment
    ↓
Thay đổi input / threshold / model / parameter
    ↓
Quan sát ảnh hưởng
```

Ví dụ Object Detection:

```text
                     ┌── confidence threshold
                     │
Image → YOLO → Boxes ├── class
                     │
                     ├── confidence
                     │
                     └── coordinates
                              ↓
                         Visualization
```

Điều này đặc biệt phù hợp với **mục tiêu giảng dạy đại học**: sinh viên vừa thấy được kết quả, vừa hiểu pipeline phía sau.

---

# VIII. Phạm vi Computer Vision được bao phủ

Với danh sách trên, bộ lab bao phủ gần như toàn bộ các nhánh chính:

```text
                    COMPUTER VISION
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   IMAGE PROCESSING   GEOMETRY/MOTION     AI VISION
        │                  │                  │
        ├─ Color           ├─ Calibration    ├─ Classification
        ├─ Histogram       ├─ Homography     ├─ Detection
        ├─ Filtering       ├─ Stereo         ├─ Segmentation
        ├─ Threshold       ├─ Optical Flow   ├─ Tracking
        ├─ Morphology      ├─ 3D             ├─ Pose
        ├─ Edge            ├─ SLAM           ├─ Face
        ├─ Contour         └─ Odometry       ├─ OCR
        ├─ Features                           ├─ Depth
        ├─ Matching                            ├─ Embedding
        └─ Stitching                           ├─ Retrieval
                                               ├─ VLM
                                               └─ Generation
```

Và ở tầng ứng dụng:

```text
              COMPUTER VISION APPLICATIONS
                         │
       ┌─────────┬───────┼────────┬──────────┐
       ↓         ↓       ↓        ↓          ↓
   Traffic   Document  Face    Inspection   Search
   Camera    AI        AI      AI           AI
       │         │       │        │          │
       └─────────┴───────┴────────┴──────────┘
                         ↓
                  Vision System
```

**Nếu mục tiêu là xây dựng một bộ bài thực hành dùng trực tiếp cho môn “Thị giác máy tính”, tôi đề xuất bước tiếp theo là chuyển 87 bài trên thành một “Lab Specification” hoàn chỉnh:** với mỗi bài có **Mã bài, tên bài, mục tiêu học tập, kiến thức nền, phát biểu bài toán, dữ liệu sử dụng, yêu cầu đầu ra, code Colab hoàn chỉnh, expected output, câu hỏi thảo luận và bài tập mở rộng**. Như vậy có thể dùng trực tiếp để tạo các notebook `.ipynb` cho sinh viên.
