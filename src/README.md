<div class="guideline">

# XỬ LÝ ẢNH & THỊ GIÁC MÁY TÍNH

---

## Tổng quan khóa học

Khóa học bao gồm 5 chương, bao gồm các nội dung sau đây:

- [**Chương 1**: Giới thiệu tổng quan](slides/chapter_1.md)
- [**Chương 2**: Biến đổi ảnh](slides/chapter_2.md)
- [**Chương 3**: Nén ảnh](slides/chapter_3.md)
- [**Chương 4**: Phát hiện biên & phân vùng](slides/chapter_4.md)
- [**Chương 5**: Thị giác máy tính](slides/chapter_5.md)

---

## Nội dung các chương

### Chương 1: Giới thiệu tổng quan

- Giới thiệu về ảnh số: Định nghĩa ảnh, pixel, cường độ sáng, mức xám
- Phân cấp xử lý ảnh: Mức thấp, trung bình và cao
- Các lĩnh vực ứng dụng: Y tế, công nghiệp, an ninh, viễn thám
- Mô hình hình thành ảnh: Thành phần chiếu sáng và phản xạ
- Lấy mẫu và lượng tử hóa: Độ phân giải không gian và cường độ
- Các khái niệm về kề và liên thông: 4-láng giềng, 8-láng giềng, m-kề nhau
- Công cụ toán học cơ bản: Phép toán trên ảnh, biến đổi hình học

---

### Chương 2: Biến đổi ảnh

**Biến đổi cường độ (Point Processing):**
  - Ảnh âm bản: $s = L - 1 - r$
  - Biến đổi Log: $s = c·log(1 + r)$
  - Biến đổi Gamma: $s = c·r^γ$
  - Biến đổi hàm bậc thang: Tăng tương phản, cắt mức xám, trích xuất bit

**Lọc không gian (Spatial Filtering):**
  - Lọc làm mịn: Mean filter, Gaussian filter, Median filter
  - Lọc làm nét: Laplacian (đạo hàm bậc 2), Sobel (đạo hàm bậc 1)
  - Unsharp Masking và Highboost Filtering

**Xử lý Histogram:**
  - Cân bằng histogram (Histogram Equalization)
  - Khớp histogram (Histogram Matching)
  - Xử lý histogram cục bộ

**Biến đổi trong miền tần số:**
  - Biến đổi Fourier rời rạc (2D DFT) và FFT
  - Lọc thông thấp, thông cao, chặn dải, Notch
  - Bộ lọc Laplacian và High-frequency-emphasis trong miền tần số

---

### Chương 3: Nén ảnh

**Giới thiệu về nén dữ liệu:**
  - Dữ liệu, thông tin, tỷ lệ nén, các loại dư thừa
  - Entropy và Định lý Shannon
  - Đánh giá chất lượng: RMSE, SNR

**Nén không tổn thất (Lossless):**
  - Mã Huffman: Xây dựng cây, mã hóa và giải mã
  - Mã Golomb và Golomb-Rice
  - Mã số học (Arithmetic Coding)
  - Mã LZW (Lempel-Ziv-Welch): Từ điển động
  - Mã hóa độ dài Run (RLE)
  - Mã hóa Symbol-based (JBIG2)
  - Mã hóa Bit-plane

**Nén có tổn thất (Lossy):**
  - Mã hóa biến đổi khối: DCT, lượng tử hóa, Zigzag, mã hóa entropy (JPEG)
  - Mã hóa dự đoán DPCM
  - Mã hóa Wavelet: DWT, JPEG 2000, EZW/SPIHT/EBCOT

---

### Chương 4: Phát hiện biên và phân vùng ảnh

**Phát hiện điểm, đường và biên:**
  - Phát hiện điểm biệt lập: Mặt nạ Laplacian, ngưỡng R > T
  - Phát hiện đường: Mặt nạ theo hướng (ngang, dọc, chéo)
  - Phát hiện biên: Gradient (đạo hàm bậc 1) và Laplacian (đạo hàm bậc 2)

**Các toán tử gradient:**
  - Roberts: Mặt nạ 2×2, nhanh, nhạy nhiễu
  - Prewitt: Mặt nạ 3×3, trọng số bằng nhau
  - Sobel: Mặt nạ 3×3, trọng số cao ở tâm, ổn định

**Phát hiện biên Canny:**
  - Làm mịn bằng Gaussian
  - Tính gradient (độ lớn và hướng)
  - Nén không cực đại (Non-maximum Suppression)
  - Ngưỡng kép (Double Thresholding)
  - Nối biên theo độ trễ (Hysteresis)
  - Nối các điểm biên: Xử lý cục bộ, Hough Transform

**Phân ngưỡng (Thresholding):**
  - Toàn cục: Otsu tự động tìm ngưỡng tối ưu
  - Cục bộ (Adaptive): Ngưỡng thay đổi theo vùng
  - Đa ngưỡng: Nhiều ngưỡng cho nhiều đối tượng

**Phân đoạn dựa trên vùng:**
  - Phát triển vùng (Region Growing)
  - Chia tách và hợp nhất (Split & Merge)

**Phân đoạn sử dụng phân cụm và Superpixels:**
  - K-Means: Gom pixel vào K cụm
  - Superpixel SLIC: Vector $[l,a,b,x,y]$, khoảng cách D

---

### Chương 5: Thị giác máy tính (Computer Vision)

- **Định nghĩa và mục tiêu của CV:** Máy tính "nhìn" và hiểu thế giới từ ảnh/video
- **So sánh CV và Xử lý ảnh:** Mục đích, trọng tâm, kỹ thuật, độ phức tạp

**Các bài toán cơ bản trong CV:**
  - Phân loại ảnh (Image Classification)
  - Phát hiện đối tượng (Object Detection) - Bounding box
  - Phân đoạn ảnh (Segmentation): Semantic, Instance, Panoptic
  - Phát hiện và mô tả điểm đặc trưng (Keypoint Detection)
  - Nhận dạng và đọc chữ (OCR)
  - Tái tạo 3D từ ảnh (3D Reconstruction)

**Tiến hóa của CV:**
  - Cổ điển (trước 2012): SIFT, HOG, SVM, Haar Cascade
  - Deep Learning (2012 đến nay): CNN, ResNet, YOLO, Mask R-CNN, ViT

**Các mô hình Deep Learning điển hình:**
  - Phân loại: ResNet, EfficientNet, Vision Transformer (ViT)
  - Phát hiện: YOLO (v8, v9, v10), Faster R-CNN, DETR
  - Phân đoạn: U-Net, Mask R-CNN, DeepLab
  - Keypoint: OpenPose, HRNet
  - OCR: CRNN + CTC, TrOCR

**Quy trình phát triển ứng dụng CV:**
  1. Xác định bài toán
  2. Thu thập dữ liệu
  3. Gán nhãn dữ liệu
  4. Tiền xử lý (Resize, chuẩn hóa, augmentation)
  5. Xây dựng mô hình (chọn kiến trúc, huấn luyện)
  6. Đánh giá (Accuracy, Precision, Recall, F1)
  7. Triển khai và bảo trì

---

## Công nghệ sử dụng

- **Python 3.11+** - Ngôn ngữ lập trình chính
- **OpenCV** - Thư viện xử lý ảnh và CV thời gian thực (hơn 2500 thuật toán)
- **NumPy** - Xử lý mảng đa chiều, nền tảng cho các thư viện ảnh
- **scikit-image** - Thuật toán học thuật cho nghiên cứu
- **Pillow/PIL** - Thao tác ảnh cơ bản, thân thiện
- **Matplotlib** - Hiển thị và trực quan hóa ảnh
- **Jupyter Notebook** - Môi trường thực hành tương tác

</div>