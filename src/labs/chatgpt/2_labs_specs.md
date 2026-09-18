# COMPUTER VISION — PRACTICAL LAB SPECIFICATION

## 1. Mục tiêu của bộ Lab

Bộ thực hành nhằm giúp sinh viên hình thành năng lực từ **xử lý ảnh cơ bản** đến **xây dựng hệ thống Computer Vision sử dụng AI**.

Lộ trình tổng quát:

```text
Image Fundamentals
        ↓
Image Processing
        ↓
Classical Computer Vision
        ↓
Computer Vision Geometry
        ↓
Video & Motion
        ↓
Deep Learning
        ↓
Object Detection
        ↓
Segmentation
        ↓
Tracking
        ↓
Pose / Face / OCR
        ↓
3D Computer Vision
        ↓
Vision-Language
        ↓
Integrated Vision Systems
```

## 2. Nguyên tắc thiết kế Lab

Mỗi Lab phải:

1. Chạy độc lập trên Google Colab.
2. Có dữ liệu đầu vào rõ ràng.
3. Có mục tiêu Computer Vision cụ thể.
4. Có pipeline xử lý rõ ràng.
5. Có kết quả trực quan.
6. Code có comments giải thích các bước chính.
7. Ưu tiên pretrained model cho các bài AI.
8. Không yêu cầu GPU cá nhân.
9. Có ít nhất một hoạt động để sinh viên thay đổi tham số hoặc dữ liệu.
10. Có câu hỏi/extension giúp sinh viên khám phá thêm.

### Chuẩn notebook

Mỗi notebook nên có:

```text
01. Problem
02. Learning Objectives
03. Environment Setup
04. Dataset / Input
05. Baseline
06. Implementation
07. Visualization
08. Evaluation
09. Experiment
10. Discussion
11. Extension
```

---

# PART A — OPENCV & CLASSICAL COMPUTER VISION

## A01 — Image Fundamentals

### Problem

Khám phá ảnh số dưới góc nhìn Computer Vision. Sinh viên đọc một ảnh, khảo sát kích thước, số channel, giá trị pixel và thực hiện các thao tác cơ bản.

### Learning Objectives

* Hiểu ảnh là ma trận số.
* Phân biệt grayscale và color image.
* Hiểu width, height, channel.
* Truy cập pixel và vùng ảnh.

### Input

Một ảnh JPG/PNG.

### Tasks

* Đọc ảnh bằng OpenCV.
* Hiển thị ảnh.
* In shape.
* Đọc một số pixel.
* Crop một vùng.
* Resize.
* Flip.
* Save ảnh.

### Expected Output

Hiển thị:

```text
Original
Cropped
Resized
Flipped
```

và thông tin:

```text
Width
Height
Channels
Data type
Pixel range
```

### Key Concepts

Image matrix, pixel, channel, BGR, RGB, uint8.

### Extension

Thử thay đổi giá trị pixel của một vùng ảnh và quan sát kết quả.

---

# A02 — Color Spaces

### Problem

Chuyển ảnh giữa các không gian màu và khảo sát vai trò của từng channel.

### Learning Objectives

* BGR/RGB.
* Grayscale.
* HSV.
* LAB.
* YCrCb.

### Tasks

Hiển thị:

```text
Original
Grayscale
HSV: H / S / V
LAB: L / A / B
YCrCb: Y / Cr / Cb
```

### Expected Output

Sinh viên quan sát sự khác biệt giữa các representation.

### Key Concepts

Color representation, channel separation, HSV segmentation.

### Extension

Sử dụng HSV để chọn một khoảng màu cụ thể.

---

# A03 — Histogram & Contrast Enhancement

### Problem

Phân tích histogram và cải thiện contrast của ảnh.

### Tasks

So sánh:

* Original.
* Histogram.
* Histogram Equalization.
* CLAHE.

### Expected Output

Hiển thị ảnh và histogram trước/sau.

### Key Concepts

Histogram, contrast, equalization, CLAHE.

### Extension

Thử CLAHE với các tile size khác nhau.

---

# A04 — Geometric Transformations

### Problem

Thực hiện các phép biến đổi hình học trên ảnh.

### Tasks

* Translation.
* Rotation.
* Scaling.
* Flip.
* Affine transformation.
* Perspective transformation.

### Expected Output

Hiển thị original và từng transformation.

### Key Concepts

Coordinate system, affine transform, homography, perspective.

### Extension

Cho sinh viên tự xác định bốn điểm để thực hiện perspective transform.

---

# A05 — Image Filtering & Denoising

### Problem

Khử nhiễu ảnh bằng các bộ lọc khác nhau.

### Tasks

Tạo nhiễu và so sánh:

* Average filter.
* Gaussian filter.
* Median filter.
* Bilateral filter.

### Expected Output

```text
Original
Noisy
Average
Gaussian
Median
Bilateral
```

### Key Concepts

Convolution, kernel, noise reduction, edge preservation.

### Extension

So sánh kết quả với các mức nhiễu khác nhau.

---

# A06 — Image Sharpening

### Problem

Tăng độ sắc nét của ảnh.

### Tasks

* Laplacian.
* Sharpening kernel.
* Unsharp masking.

### Expected Output

```text
Original → Blurred → Sharpened
```

### Key Concepts

High-pass filtering, convolution, sharpening.

---

# A07 — Edge Detection

### Problem

Phát hiện biên của vật thể.

### Tasks

* Sobel X.
* Sobel Y.
* Gradient magnitude.
* Laplacian.
* Canny.

### Expected Output

Pipeline:

```text
Original
 ↓
Gray
 ↓
Blur
 ↓
Edges
```

### Key Concepts

Gradient, edge, threshold, Canny.

### Extension

Thay đổi Canny thresholds và quan sát kết quả.

---

# A08 — Thresholding

### Problem

Tách foreground khỏi background bằng threshold.

### Tasks

So sánh:

* Binary threshold.
* Inverse threshold.
* Adaptive threshold.
* Otsu.

### Expected Output

Một bảng so sánh các phương pháp.

### Key Concepts

Thresholding, bimodal histogram, adaptive threshold, Otsu.

---

# A09 — Morphological Processing

### Problem

Làm sạch binary mask.

### Tasks

Demo:

* Erosion.
* Dilation.
* Opening.
* Closing.
* Gradient.
* Top-hat.
* Black-hat.

### Expected Output

Hiển thị mask trước và sau từng phép biến đổi.

### Key Concepts

Structuring element, morphology, noise removal.

---

# A10 — Connected Components

### Problem

Xác định các vùng liên thông trong ảnh binary.

### Tasks

Tính:

* Number of components.
* Area.
* Bounding box.
* Centroid.

### Expected Output

Mỗi component có ID và bounding box riêng.

### Extension

Loại bỏ các component có diện tích nhỏ.

---

# A11 — Contour Detection

### Problem

Phân tích hình dạng vật thể bằng contour.

### Tasks

Tính:

* Area.
* Perimeter.
* Bounding rectangle.
* Rotated rectangle.
* Convex hull.

### Expected Output

Vẽ contour và bounding structures.

### Key Concepts

Contour, perimeter, shape representation.

---

# A12 — Shape Recognition

### Problem

Nhận dạng hình học cơ bản.

### Classes

```text
Triangle
Square
Rectangle
Circle
Polygon
```

### Tasks

* Detect contours.
* Approximate polygon.
* Count vertices.
* Classify shape.

### Expected Output

Gắn label lên từng object.

### Extension

Thêm pentagon, hexagon, ellipse.

---

# A13 — Hough Line Transform

### Problem

Phát hiện đường thẳng trong ảnh.

### Tasks

* Edge detection.
* HoughLines.
* HoughLinesP.

### Expected Output

Vẽ detected lines lên ảnh.

### Application

Lane detection cơ bản.

---

# A14 — Hough Circle Transform

### Problem

Phát hiện các vật thể hình tròn.

### Tasks

Sử dụng Hough Circle Transform.

### Expected Output

Vẽ circle và center.

### Application

Coin detection / wheel detection.

---

# A15 — Template Matching

### Problem

Tìm một template trong ảnh lớn.

### Tasks

* Load template.
* Match template.
* Tính similarity.
* Xác định vị trí tốt nhất.

### Expected Output

Bounding rectangle quanh vùng matching.

### Extension

Thử với scale hoặc rotation khác nhau và phân tích hạn chế.

---

# A16 — Color-based Segmentation

### Problem

Tách vật thể dựa trên màu.

### Tasks

```text
BGR
 ↓
HSV
 ↓
Color Range
 ↓
Mask
 ↓
Morphology
 ↓
Object
```

### Expected Output

Original + mask + segmented object.

### Extension

Tách nhiều màu cùng lúc.

---

# A17 — Harris & Shi-Tomasi Corners

### Problem

Phát hiện các điểm góc đặc trưng.

### Tasks

So sánh Harris và Shi-Tomasi.

### Expected Output

Vẽ corner points lên ảnh.

### Key Concepts

Corner, local intensity variation.

---

# A18 — ORB Feature Detection

### Problem

Phát hiện local features bằng ORB.

### Tasks

* Detect keypoints.
* Extract descriptors.
* Visualize keypoints.

### Expected Output

Ảnh có keypoints.

### Key Concepts

Feature, descriptor, ORB.

---

# A19 — Feature Matching

### Problem

Tìm các điểm tương ứng giữa hai ảnh.

### Tasks

* ORB.
* BFMatcher.
* Hamming distance.
* Good matches.

### Expected Output

Hiển thị các đường nối giữa matching keypoints.

---

# A20 — Homography

### Problem

Tìm một vật thể hoặc tài liệu trong ảnh và biến đổi về góc nhìn chuẩn.

### Pipeline

```text
Feature Detection
 ↓
Feature Matching
 ↓
Homography
 ↓
Perspective Transform
```

### Expected Output

Ảnh đã được rectify.

### Key Concepts

Homography, projective geometry.

---

# A21 — Image Stitching

### Problem

Ghép nhiều ảnh thành panorama.

### Tasks

* Feature extraction.
* Feature matching.
* Image alignment.
* Stitching.

### Expected Output

Panoramic image.

### Extension

Thử 3–5 ảnh.

---

# A22 — Background Subtraction

### Problem

Phát hiện foreground trong video cố định camera.

### Tasks

So sánh:

* MOG2.
* KNN.

### Expected Output

Video gồm:

```text
Original Frame
Foreground Mask
Detected Foreground
```

---

# A23 — Optical Flow

### Problem

Ước lượng chuyển động của pixel giữa các frame.

### Tasks

* Lucas-Kanade.
* Farneback.

### Expected Output

Vẽ motion vectors.

### Key Concepts

Optical flow, motion estimation.

---

# A24 — Motion Detection

### Problem

Phát hiện vật thể chuyển động từ camera.

### Pipeline

```text
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

### Expected Output

Bounding boxes quanh vùng chuyển động.

---

# A25 — MeanShift / CamShift Tracking

### Problem

Theo dõi object trong video.

### Tasks

* Chọn ROI.
* Histogram.
* MeanShift.
* CamShift.

### Expected Output

Tracked bounding box và trajectory.

---

# A26 — Haar Cascade Face Detection

### Problem

Phát hiện khuôn mặt bằng phương pháp truyền thống.

### Tasks

* Face detection.
* Eye detection.
* Smile detection.

### Expected Output

Bounding boxes trên khuôn mặt.

### Discussion

So sánh hạn chế của Haar Cascade với deep learning detector.

---

# A27 — Camera Calibration

### Problem

Hiệu chỉnh camera và loại bỏ distortion.

### Tasks

* Chessboard detection.
* Camera matrix.
* Distortion coefficients.
* Undistortion.

### Expected Output

```text
Distorted
    ↓
Calibration
    ↓
Undistorted
```

---

# A28 — Pixel-to-World Measurement

### Problem

Ước lượng kích thước vật thể từ ảnh camera.

### Tasks

* Xác định reference object.
* Xây dựng mapping.
* Tính kích thước vật thể.

### Expected Output

Ví dụ:

```text
Estimated width: 12.4 cm
Estimated height: 7.8 cm
```

### Discussion

Phân tích nguồn sai số.

---

# A29 — Document Scanner

### Problem

Tự động phát hiện tài liệu và tạo ảnh scan.

### Pipeline

```text
Input
 ↓
Edge Detection
 ↓
Largest Contour
 ↓
Four Corners
 ↓
Perspective Transform
 ↓
Scanned Document
```

### Expected Output

Ảnh tài liệu đã được straighten.

---

# A30 — Lane Detection

### Problem

Phát hiện lane trên video đường phố.

### Pipeline

```text
Video
 ↓
ROI
 ↓
Grayscale
 ↓
Canny
 ↓
Hough Transform
 ↓
Lane Lines
```

### Expected Output

Video có lane overlay.

### Extension

Thử nghiệm với điều kiện ánh sáng khác nhau.

---

# PART B — AI-BASED COMPUTER VISION

# B01 — CNN Image Classification

### Problem

Xây dựng CNN phân loại ảnh.

### Tasks

* Dataset loading.
* Preprocessing.
* CNN.
* Training.
* Validation.
* Prediction.

### Expected Output

* Training curves.
* Validation curves.
* Confusion matrix.
* Sample predictions.

### Key Concepts

CNN, convolution, pooling, activation, softmax.

---

# B02 — Transfer Learning

### Problem

Phân loại ảnh bằng pretrained CNN.

### Models

* MobileNet.
* ResNet.
* EfficientNet.

### Tasks

So sánh training from scratch và transfer learning.

### Expected Output

Accuracy/loss curves và predictions.

---

# B03 — Data Augmentation

### Problem

Khảo sát tác động của data augmentation.

### Transformations

* Rotation.
* Flip.
* Crop.
* Zoom.
* Brightness.
* Contrast.

### Expected Output

Grid các augmented images.

### Extension

So sánh model có và không có augmentation.

---

# B04 — Vision Transformer Classification

### Problem

Sử dụng pretrained Vision Transformer để classification.

### Tasks

```text
Image
 ↓
Patch Embedding
 ↓
Transformer
 ↓
Classification
```

### Expected Output

Predicted class + confidence.

### Key Concepts

Patch, attention, Transformer.

---

# B05 — YOLO Object Detection

### Problem

Phát hiện nhiều object trong ảnh.

### Tasks

* Load pretrained YOLO.
* Inference.
* Extract boxes.
* Extract classes.
* Extract confidence.

### Expected Output

Bounding boxes + labels + confidence.

### Key Concepts

Object detection, bounding box, confidence.

---

# B06 — YOLO Video Detection

### Problem

Phát hiện object trong video.

### Tasks

* Read video.
* Run YOLO frame-by-frame.
* Draw detections.
* Save annotated video.

### Expected Output

Annotated video + FPS.

---

# B07 — Real-time Webcam Detection

### Problem

Phát hiện object từ webcam.

### Tasks

* Capture frames.
* Run detection.
* Display live results.

### Expected Output

Live detection interface.

### Colab Note

Sử dụng JavaScript webcam bridge phù hợp với Colab.

---

# B08 — Object Detection Evaluation

### Problem

Đánh giá model detection.

### Metrics

* IoU.
* Precision.
* Recall.
* AP.
* mAP.

### Expected Output

Visualize TP/FP/FN và metrics.

### Key Concepts

Detection evaluation.

---

# B09 — Semantic Segmentation

### Problem

Phân loại từng pixel theo semantic class.

### Expected Output

```text
Original
Ground Truth
Prediction
Overlay
```

### Key Concepts

Pixel classification, segmentation mask.

---

# B10 — U-Net

### Problem

Xây dựng U-Net cho semantic segmentation.

### Tasks

* Encoder.
* Bottleneck.
* Decoder.
* Skip connections.

### Expected Output

Predicted segmentation masks.

---

# B11 — Pretrained Semantic Segmentation

### Problem

Sử dụng model pretrained cho semantic segmentation.

### Models

* DeepLabV3.
* SegFormer.

### Expected Output

Mask và overlay.

### Extension

So sánh hai kiến trúc.

---

# B12 — Instance Segmentation

### Problem

Segment từng instance riêng biệt.

### Example

```text
Person #1
Person #2
Person #3
```

### Models

* Mask R-CNN.
* YOLO segmentation.

### Expected Output

Bounding box + mask + class + ID instance.

---

# B13 — Panoptic Segmentation

### Problem

Kết hợp semantic và instance segmentation.

### Expected Output

Phân biệt:

```text
Stuff → road, sky, building
Things → person, car, bicycle
```

---

# B14 — AI Object Tracking

### Problem

Theo dõi object sau khi detection.

### Pipeline

```text
YOLO
 ↓
Detection
 ↓
Tracker
 ↓
Object ID
```

### Models/Algorithms

* ByteTrack.
* BoT-SORT.

### Expected Output

Persistent IDs.

---

# B15 — Multi-object Tracking

### Problem

Theo dõi nhiều object đồng thời.

### Tasks

* Track creation.
* Track update.
* Track disappearance.
* Track ID.

### Expected Output

Trajectory của từng object.

---

# B16 — People Counting

### Problem

Đếm số người trong video.

### Pipeline

```text
Person Detection
 ↓
Tracking
 ↓
Counting
```

### Expected Output

```text
Current people: N
Maximum: M
```

---

# B17 — Vehicle Counting

### Problem

Đếm phương tiện đi qua một line.

### Classes

```text
Car
Motorcycle
Bus
Truck
```

### Expected Output

Counter theo class.

### Extension

Đếm theo hướng di chuyển.

---

# B18 — Human Pose Estimation

### Problem

Phát hiện skeleton người.

### Models

* MediaPipe Pose.
* YOLO Pose.

### Expected Output

Landmarks và skeleton overlay.

---

# B19 — Human Activity Recognition

### Problem

Nhận dạng hành động của người.

### Classes

```text
Standing
Sitting
Walking
Running
Waving
```

### Pipeline

```text
Video
 ↓
Pose
 ↓
Temporal Features
 ↓
Activity Class
```

### Extension

Xây classifier đơn giản từ pose features.

---

# B20 — Hand Tracking

### Problem

Theo dõi bàn tay và 21 landmarks.

### Expected Output

Hand skeleton.

### Key Concepts

Landmark detection, hand pose.

---

# B21 — Gesture Recognition

### Problem

Nhận dạng gesture từ hand landmarks.

### Classes

```text
Open Hand
Fist
Thumb Up
Victory
Pointing
```

### Expected Output

Gesture label trên video.

---

# B22 — Deep Learning Face Detection

### Problem

Phát hiện khuôn mặt bằng deep learning.

### Tasks

So sánh deep detector với Haar Cascade.

### Expected Output

Bounding boxes + confidence.

---

# B23 — Face Landmark Detection

### Problem

Phát hiện facial landmarks.

### Features

* Eyes.
* Nose.
* Mouth.
* Face contour.

### Expected Output

Landmark overlay.

---

# B24 — Face Recognition

### Problem

Nhận dạng danh tính từ face embedding.

### Pipeline

```text
Face Detection
 ↓
Alignment
 ↓
Embedding
 ↓
Similarity
 ↓
Identity
```

### Expected Output

Identity + similarity score.

### Discussion

False positive và false negative.

---

# B25 — Face Verification

### Problem

Xác định hai ảnh có cùng một người hay không.

### Input

Hai face images.

### Output

```text
Similarity: ...
Decision: Same / Different
```

### Key Concepts

Verification vs recognition.

---

# B26 — OCR

### Problem

Trích xuất text từ ảnh.

### Pipeline

```text
Image
 ↓
Text Detection
 ↓
Text Recognition
 ↓
Text
```

### Tools

* EasyOCR.
* PaddleOCR.
* Tesseract.

### Expected Output

Ảnh có bounding boxes + recognized text.

---

# B27 — Vietnamese Document OCR

### Problem

OCR tài liệu tiếng Việt.

### Input

Ảnh biểu mẫu hoặc tài liệu.

### Output

```text
Detected text
```

### Extension

Chuẩn hóa text và lưu thành `.txt`.

---

# B28 — License Plate Recognition

### Problem

Nhận dạng biển số xe.

### Pipeline

```text
Vehicle
 ↓
Plate Detection
 ↓
Plate Crop
 ↓
OCR
 ↓
Plate Number
```

### Expected Output

Bounding box biển số + text.

---

# B29 — Document Understanding

### Problem

Chuyển tài liệu hình ảnh thành structured information.

### Example

```json
{
  "seller": "...",
  "date": "...",
  "total": "...",
  "items": []
}
```

### Pipeline

```text
Document
 ↓
OCR / Vision Model
 ↓
Information Extraction
 ↓
Structured JSON
```

### Key Concepts

Document AI, information extraction.

---

# B30 — Image Captioning

### Problem

Sinh mô tả tự nhiên cho ảnh.

### Pipeline

```text
Image
 ↓
Vision Encoder
 ↓
Language Decoder
 ↓
Caption
```

### Expected Output

Caption cho từng ảnh.

### Extension

So sánh caption của nhiều ảnh.

---

# B31 — Visual Question Answering

### Problem

Trả lời câu hỏi dựa trên nội dung ảnh.

### Input

```text
Image + Question
```

### Example

```text
Question:
How many people are in the image?
```

### Output

Natural-language answer.

---

# B32 — Image Embedding

### Problem

Biến ảnh thành vector representation.

### Tasks

* Generate embeddings.
* Reduce dimensionality.
* Visualize embedding space.

### Techniques

* PCA.
* t-SNE.
* UMAP.

### Expected Output

2D embedding visualization.

---

# B33 — Image Similarity Search

### Problem

Tìm các ảnh tương tự một query image.

### Pipeline

```text
Query Image
 ↓
Embedding
 ↓
Similarity
 ↓
Top-K
```

### Expected Output

Query + Top-K similar images.

---

# B34 — Image Retrieval System

### Problem

Xây dựng mini image search engine.

### Tasks

* Build image index.
* Generate embeddings.
* Search.
* Rank.
* Display results.

### Expected Output

Gallery kết quả Top-K.

### Extension

Cho phép upload ảnh query.

---

# B35 — Visual Anomaly Detection

### Problem

Phát hiện sản phẩm bất thường.

### Pipeline

```text
Normal Images
 ↓
Representation
 ↓
Anomaly Score
 ↓
Normal / Anomaly
```

### Techniques

* Autoencoder.
* Embedding distance.

### Expected Output

Anomaly score + visualization.

---

# B36 — Text-to-Image Generation

### Problem

Sinh ảnh từ mô tả văn bản.

### Pipeline

```text
Text Prompt
 ↓
Text Encoder
 ↓
Diffusion Model
 ↓
Generated Image
```

### Expected Output

Generated image.

### Discussion

Prompt và visual representation.

---

# B37 — Image-to-Image Generation

### Problem

Biến đổi một ảnh theo một mục tiêu mới.

### Examples

```text
Sketch → Image
Low-level structure → Generated image
```

### Expected Output

Input/output comparison.

---

# B38 — AI Image Restoration

### Problem

Khôi phục ảnh chất lượng thấp.

### Tasks

* Denoising.
* Deblurring.
* Inpainting.

### Expected Output

```text
Corrupted Image
        ↓
AI Restoration
        ↓
Restored Image
```

---

# B39 — Super Resolution

### Problem

Tăng độ phân giải ảnh bằng AI.

### Comparison

```text
Low Resolution
   ├── Bicubic
   └── AI Super Resolution
```

### Expected Output

Side-by-side comparison.

---

# B40 — Monocular Depth Estimation

### Problem

Ước lượng depth từ một ảnh RGB.

### Pipeline

```text
RGB
 ↓
Depth Model
 ↓
Depth Map
```

### Expected Output

Original + depth map.

---

# B41 — Monocular 3D Understanding

### Problem

Sử dụng RGB + depth để suy luận cấu trúc không gian.

### Tasks

* Relative depth.
* Object ordering.
* Approximate distance.

### Expected Output

Visual depth interpretation.

---

# B42 — Stereo Vision

### Problem

Ước lượng depth từ hai camera.

### Pipeline

```text
Left Image
Right Image
      ↓
Stereo Matching
      ↓
Disparity
      ↓
Depth
```

### Expected Output

Disparity map + depth map.

---

# B43 — 3D Reconstruction

### Problem

Tái tạo point cloud từ nhiều ảnh.

### Pipeline

```text
Multiple Images
 ↓
Feature Matching
 ↓
Camera Geometry
 ↓
3D Reconstruction
 ↓
Point Cloud
```

### Expected Output

3D visualization.

---

# B44 — Visual Odometry

### Problem

Ước lượng chuyển động của camera.

### Pipeline

```text
Frame t
 ↓
Feature Extraction
 ↓
Feature Matching
 ↓
Motion Estimation
 ↓
Frame t+1
```

### Expected Output

Camera trajectory.

---

# B45 — Visual SLAM

### Problem

Minh họa simultaneous localization and mapping.

### Pipeline

```text
Camera
 ↓
Feature Detection
 ↓
Tracking
 ↓
Localization
 ↓
Mapping
```

### Expected Output

Camera trajectory + map/feature points.

### Key Concepts

Localization, mapping, tracking, SLAM.

---

# PART C — INTEGRATED COMPUTER VISION SYSTEMS

# C01 — Smart Traffic Camera

### Problem

Xây dựng hệ thống phân tích giao thông từ video.

### Pipeline

```text
Camera
 ↓
Object Detection
 ↓
Tracking
 ↓
Vehicle Classification
 ↓
Counting
 ↓
Statistics
```

### Output

Dashboard:

```text
Cars       : ...
Motorcycles: ...
Buses      : ...
Trucks     : ...
```

### Concepts

Detection, tracking, counting, analytics.

---

# C02 — Smart Classroom

### Problem

Phân tích trạng thái lớp học từ camera.

### Pipeline

```text
Camera
 ↓
Person Detection
 ↓
Tracking
 ↓
Pose Estimation
 ↓
Activity Analysis
```

### Output

* Number of people.
* Person locations.
* Standing/sitting status.
* Occupancy visualization.

### Extension

Tính occupancy theo thời gian.

---

# C03 — Automated Document Scanner

### Problem

Xây dựng hệ thống scan tài liệu tự động.

### Pipeline

```text
Camera Image
 ↓
Document Detection
 ↓
Corner Detection
 ↓
Perspective Correction
 ↓
Image Enhancement
 ↓
OCR
```

### Output

```text
Scanned Document
+
Extracted Text
```

### Concepts

OpenCV + AI OCR.

---

# C04 — AI Product Inspection

### Problem

Phát hiện sản phẩm lỗi trên dây chuyền.

### Pipeline

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

### Output

```text
Product #001 → PASS
Product #002 → FAIL
```

và ảnh có annotation.

---

# C05 — Face-based Attendance System

### Problem

Xây dựng prototype điểm danh dựa trên khuôn mặt.

### Pipeline

```text
Camera
 ↓
Face Detection
 ↓
Face Alignment
 ↓
Face Embedding
 ↓
Face Matching
 ↓
Identity
 ↓
Attendance Record
```

### Output

```text
Person
Time
Status
```

### Discussion

Sinh viên phải phân tích:

* False acceptance.
* False rejection.
* Threshold.
* Lighting.
* Pose.

---

# C06 — AI Visual Search Engine

### Problem

Xây dựng hệ thống tìm kiếm ảnh theo nội dung hình ảnh.

### Pipeline

```text
Image
 ↓
Vision Encoder
 ↓
Embedding
 ↓
Vector Index
 ↓
Similarity Search
 ↓
Top-K
```

### Output

Gallery Top-K images.

### Extension

Cho phép tìm kiếm theo:

```text
Image → Images
```

và nếu sử dụng vision-language model:

```text
Text → Images
```

---

# C07 — Visual Chatbot

### Problem

Xây dựng chatbot có khả năng hiểu ảnh.

### Input

```text
Image
+
Natural Language Question
```

### Pipeline

```text
Image
   +
Question
   ↓
Vision-Language Model
   ↓
Answer
```

### Example

```text
User:
What objects can you see?

System:
I can see a person, a car and a bicycle.
```

### Extension

Cho chatbot thực hiện nhiều lượt hỏi đáp trên cùng một ảnh.

---

# 3. Ma trận bao phủ kiến thức

| Domain                 | Labs              |
| ---------------------- | ----------------- |
| Image representation   | A01–A06           |
| Color processing       | A02–A03, A16      |
| Filtering              | A05–A06           |
| Edge detection         | A07               |
| Thresholding           | A08               |
| Morphology             | A09               |
| Segmentation classical | A10, A16          |
| Contours               | A11–A12           |
| Shape analysis         | A12               |
| Hough transform        | A13–A14           |
| Template matching      | A15               |
| Feature detection      | A17–A18           |
| Feature matching       | A19               |
| Homography             | A20               |
| Stitching              | A21               |
| Video processing       | A22–A25           |
| Optical flow           | A23               |
| Face detection         | A26, B22          |
| Camera calibration     | A27               |
| Measurement            | A28               |
| Document vision        | A29, B26–B29, C03 |
| Lane detection         | A30               |
| CNN                    | B01               |
| Transfer learning      | B02               |
| Data augmentation      | B03               |
| Vision Transformer     | B04               |
| Object detection       | B05–B08           |
| Semantic segmentation  | B09–B11           |
| Instance segmentation  | B12               |
| Panoptic segmentation  | B13               |
| Object tracking        | B14–B15           |
| Counting               | B16–B17           |
| Pose estimation        | B18               |
| Activity recognition   | B19               |
| Hand tracking          | B20               |
| Gesture recognition    | B21               |
| Face AI                | B22–B25           |
| OCR                    | B26–B29           |
| Image captioning       | B30               |
| VQA                    | B31               |
| Embedding              | B32               |
| Image retrieval        | B33–B34           |
| Anomaly detection      | B35               |
| Generative vision      | B36–B39           |
| Depth estimation       | B40–B41           |
| Stereo vision          | B42               |
| 3D reconstruction      | B43               |
| Visual odometry        | B44               |
| SLAM                   | B45               |
| Integrated systems     | C01–C07           |

---

# 4. Chuẩn đầu ra của mỗi Lab

Mỗi Lab notebook chính thức nên tạo ra tối thiểu:

```text
lab_xx/
├── README.md
├── lab_xx.ipynb
├── data/
└── output/
```

Trong notebook:

```text
Input
   ↓
Preprocessing
   ↓
Algorithm / Model
   ↓
Post-processing
   ↓
Visualization
   ↓
Evaluation
```

## Code requirement

Code phải:

* chạy được trên Google Colab;
* có cell cài đặt dependency;
* có comments bằng tiếng Việt hoặc tiếng Anh;
* không phụ thuộc file local của giảng viên;
* tự tải dataset/model cần thiết;
* kiểm tra GPU nếu model cần GPU;
* có fallback CPU khi khả thi;
* không sử dụng API trả phí nếu không cần thiết.

## Visualization requirement

Mỗi Lab phải có ít nhất một kết quả trực quan phù hợp với mục tiêu:

| Bài toán         | Visualization             |
| ---------------- | ------------------------- |
| Classification   | Image + predicted class   |
| Detection        | Bounding boxes            |
| Segmentation     | Mask + overlay            |
| Tracking         | ID + trajectory           |
| Pose             | Skeleton                  |
| OCR              | Text boxes + text         |
| Depth            | Depth map                 |
| Stereo           | Disparity map             |
| 3D               | Point cloud               |
| Feature matching | Matching lines            |
| Optical flow     | Motion vectors            |
| Retrieval        | Top-K gallery             |
| Generation       | Generated image           |
| VQA              | Image + question + answer |

---

# 5. Cấu trúc pedagogical của từng notebook

Mỗi notebook nên được viết theo mô hình:

```text
┌──────────────────────────────┐
│ 1. Problem                  │
├──────────────────────────────┤
│ 2. Concept                  │
├──────────────────────────────┤
│ 3. Input                    │
├──────────────────────────────┤
│ 4. Step-by-step             │
├──────────────────────────────┤
│ 5. Implementation           │
├──────────────────────────────┤
│ 6. Visualization            │
├──────────────────────────────┤
│ 7. Evaluation               │
├──────────────────────────────┤
│ 8. Experiment               │
├──────────────────────────────┤
│ 9. Discussion               │
├──────────────────────────────┤
│ 10. Extension               │
└──────────────────────────────┘
```

Đặc biệt, **không nên biến notebook thành một đoạn code dài**. Mỗi bước xử lý nên có một Markdown cell giải thích:

> **What are we doing?**

> **Why are we doing it?**

> **What should you expect to see?**

Sau đó mới đến code.

---

# 6. Phân cấp độ khó

Có thể gắn difficulty cho từng Lab:

### ⭐ Basic

A01–A16

Sinh viên chủ yếu sử dụng OpenCV API và quan sát kết quả.

### ⭐⭐ Intermediate

A17–A30, B01–B08

Sinh viên bắt đầu kết hợp nhiều thuật toán thành pipeline.

### ⭐⭐⭐ Advanced

B09–B31

Sinh viên làm việc với pretrained AI models và hiểu input/output.

### ⭐⭐⭐⭐ Expert

B32–B45

Embedding, retrieval, depth, stereo, 3D, visual odometry, SLAM.

### ⭐⭐⭐⭐⭐ System

C01–C07

Kết hợp nhiều thành phần thành một Computer Vision application.

---

# 7. Suggested learning progression

Một sinh viên học toàn bộ hệ thống sẽ đi theo progression:

```text
A01
 │
 ├── Understand images
 │
 A02–A09
 │
 ├── Image processing
 │
 A10–A16
 │
 ├── Classical object analysis
 │
 A17–A21
 │
 ├── Features & geometry
 │
 A22–A26
 │
 ├── Video & traditional detection
 │
 A27–A30
 │
 ├── Camera & applications
 │
 B01–B04
 │
 ├── Deep learning foundations
 │
 B05–B17
 │
 ├── Detection & tracking
 │
 B18–B31
 │
 ├── Human / face / document / VLM
 │
 B32–B39
 │
 ├── Representation & generation
 │
 B40–B45
 │
 ├── 3D vision
 │
 C01–C07
 │
 └── Integrated systems
```

---

# 8. Phân loại theo năng lực Computer Vision

Sau khi hoàn thành bộ Lab, sinh viên được tiếp xúc với các năng lực chính:

```text
PERCEPTION
├── Classification
├── Detection
├── Segmentation
├── Recognition
├── OCR
├── Pose
└── Depth

MOTION
├── Optical Flow
├── Tracking
├── Counting
├── Activity Recognition
└── Visual Odometry

GEOMETRY
├── Calibration
├── Homography
├── Stereo
├── 3D Reconstruction
└── SLAM

REPRESENTATION
├── Features
├── Embeddings
├── Similarity
└── Retrieval

GENERATIVE VISION
├── Captioning
├── VQA
├── Text-to-Image
├── Image-to-Image
└── Restoration

VISION SYSTEMS
├── Traffic
├── Classroom
├── Document AI
├── Inspection
├── Attendance
├── Visual Search
└── Visual Chatbot
```

---

# 9. Định hướng xây dựng bộ notebook chính thức

87 Lab trên không nhất thiết phải là 87 notebook viết thủ công từ đầu. Nên xây dựng thành một **Lab Bank** với template thống nhất:

```text
computer-vision-labs/
│
├── 00_common/
│   ├── visualization.py
│   ├── dataset.py
│   └── utils.py
│
├── A_opencv/
│   ├── A01_image_fundamentals/
│   ├── A02_color_spaces/
│   ├── A03_histogram/
│   ├── ...
│   └── A30_lane_detection/
│
├── B_ai/
│   ├── B01_cnn/
│   ├── B02_transfer_learning/
│   ├── ...
│   └── B45_visual_slam/
│
└── C_integrated/
    ├── C01_smart_traffic/
    ├── C02_smart_classroom/
    ├── ...
    └── C07_visual_chatbot/
```

Mỗi bài sau này có thể chuẩn hóa thành:

```text
A07_edge_detection/
├── README.md
├── lab.ipynb
├── solution.ipynb
└── assets/
```

Trong đó:

* `lab.ipynb`: notebook sinh viên thực hành, có TODO/đoạn code cần hoàn thiện.
* `solution.ipynb`: notebook lời giải đầy đủ.
* `README.md`: mục tiêu, yêu cầu và hướng dẫn.
* `assets/`: dữ liệu/hình ảnh tối thiểu nếu không thể tải tự động.

---

# 10. Chuẩn đánh giá một Lab

Mỗi Lab có thể chấm theo:

| Thành phần                      | Tỷ lệ |
| ------------------------------- | ----: |
| Chạy đúng pipeline              |   30% |
| Hiểu và giải thích code         |   20% |
| Visualization                   |   15% |
| Experiment / parameter analysis |   15% |
| Discussion                      |   10% |
| Extension                       |   10% |

Đối với các Lab AI, có thể bổ sung:

```text
Model understanding
Inference result analysis
Error analysis
Metric interpretation
```

---

# 11. Kết quả đầu ra của toàn bộ Lab Bank

87 Lab tạo thành một lộ trình từ:

```text
"How is an image represented?"
                ↓
"How can we process an image?"
                ↓
"How can we detect objects?"
                ↓
"How can we understand a scene?"
                ↓
"How can we track objects?"
                ↓
"How can we understand people?"
                ↓
"How can we understand documents?"
                ↓
"How can we represent visual information?"
                ↓
"How can we understand 3D?"
                ↓
"How can vision interact with language?"
                ↓
"How can we build a complete vision system?"
```

Đây là phạm vi kiến thức mà bộ thực hành hướng tới.
