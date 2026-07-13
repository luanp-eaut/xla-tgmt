---
marp: true
theme: eaut
paginate: true
---

<!-- _class: cover -->

<div class="middle">

# XỬ LÝ ẢNH& THỊ GIÁC MÁY TÍNH

## Chương 5: Thị giác máy tính

</div>

### Giảng viên: Nguyễn Phồn Lữa

---

<!-- _class: section -->

# Giới thiệu học phần

---

# XỬ LÝ ẢNH& THỊ GIÁC MÁY TÍNH

- **Chương 5:** Thị giác máy tính
- **Khoa Công nghệ Thông tin**

---

# Định nghĩa Thị giác máy tính(Computer Vision- CV)

- **Khái niệm:** Computer Vision (CV) là khoa học giúp máy tính "nhìn" và hiểu thế giới từ ảnh/video.
- **Đầu vào:** Pixel (ma trận số).
- **Đầu ra:** Thông tin có nghĩa (nhãn, vị trí, mô tả).
- **Mục tiêu tổng quát:** "Xây dựng hệ thống thị giác nhân tạo mạnh mẽ như con người".

---

# Mục tiêu của CV

- **Hiểu nội dung ảnh:** Xác định các đối tượng, cảnh, hành động, mối quan hệ không gian.
- **Trích xuất thông tin:** Chuyển dữ liệu thô (pixel) thành cấu trúc dữ liệu có nghĩa (tọa độ, nhãn, mô tả).
- **Ra quyết định dựa trên hình ảnh:** Ví dụ: Nhận diện biển báo để tự lái xe, phát hiện khối u trong ảnh y tế.
- **Khái quát hóa:** Hoạt động tốt trên nhiều điều kiện đầu vào khác nhau (thay đổi ánh sáng, góc nhìn, độ phân giải).

---

# Ví dụ ứng dụng CV

- **Đời sống hàng ngày:** Mở khóa khuôn mặt, tìm kiếm ảnh theo nội dung, lọc ảo (AR filter).
- **Y tế:** Phát hiện ung thư vú, phân loại bệnh võng mạc, hỗ trợ phẫu thuật robot.
- **Phương tiện tự hành:** Xe tự lái (phát hiện làn đường, người đi bộ), drone giao hàng.
- **Sản xuất:** Phát hiện lỗi sản phẩm, đọc mã vạch tốc độ cao.
- **An ninh:** Phát hiện hành vi bất thường, đếm người, phân tích dòng người.
- **Nông nghiệp:** Phát hiện sâu bệnh, đếm trái cây, ước tính sản lượng.
- **Thương mại điện tử:** Thử đồ ảo, tìm kiếm sản phẩm bằng ảnh chụp.

---

# So sánh Thị giác máy tính& Xử lý ảnh

| Khía cạnh          | Thị giác máy tính (Computer Vision)                          | Xử lý ảnh (Image Processing)                             |
| :----------------- | :----------------------------------------------------------- | :------------------------------------------------------- |
| **Mục đích**       | Suy luận về hình ảnh và hiểu nội dung.                       | Cải thiện chất lượng hình ảnh và thêm hiệu ứng.          |
| **Trọng tâm**      | Làm quen, phân loại và đưa ra phán đoán.                     | Khử nhiễu, tăng cường hình ảnh, phát hiện đặc trưng.     |
| **Kỹ thuật**       | Nhận dạng mẫu, học sâu (Deep Learning), phát hiện đối tượng. | Lọc, ngưỡng hóa (thresholding), các phép toán hình thái. |
| **Sự phụ thuộc**   | Phụ thuộc vào các hình ảnh đã được xử lý.                    | Có thể hoạt động độc lập hoặc đóng vai trò tiền xử lý.   |
| **Kết quả đầu ra** | Các phán đoán, phân loại, hành vi.                           | Hình ảnh đã được lọc và cải thiện để phân tích.          |
| **Độ phức tạp**    | Rất phức tạp, đòi hỏi huấn luyện trên tập dữ liệu lớn.       | Trung bình, dựa trên quy tắc hoặc thuật toán.            |

---

# Các bài toán cơ bản

**1. Phân loại ảnh (Image Classification)**

- **Đầu vào:** Một ảnh.
- **Đầu ra:** Một nhãn duy nhất (từ tập các lớp xác định trước).
- **Ví dụ:** Ảnh chó → "Chó"; Ảnh mèo → "Mèo".

**Bài tập thực hành:** Phân loại ảnh chó/mèo sử dụng mạng CNN đơn giản với PyTorch.

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms

# 1. Tiền xử lý dữ liệu
transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Giả sử đã có thư mục dữ liệu 'data/dogs_cats' chứa 2 thư mục con 'dogs' và 'cats'
train_data = datasets.ImageFolder(root='data/dogs_cats/train', transform=transform)
train_loader = torch.utils.data.DataLoader(train_data, batch_size=32, shuffle=True)

# 2. Xây dựng mô hình CNN đơn giản
class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()
        self.conv1 = nn.Conv2d(3, 16, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(16, 32, kernel_size=3, padding=1)
        self.fc1 = nn.Linear(32 * 32 * 32, 128)
        self.fc2 = nn.Linear(128, 2) # 2 lớp: chó và mèo

    def forward(self, x):
        x = self.pool(torch.relu(self.conv1(x)))
        x = self.pool(torch.relu(self.conv2(x)))
        x = x.view(-1, 32 * 32 * 32)
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

model = SimpleCNN()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 3. Huấn luyện mô hình (Ví dụ 1 epoch)
for epoch in range(1):
    for inputs, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
    print(f"Epoch {epoch+1}, Loss: {loss.item():.4f}")
```

---

# Các bài toán cơ bản

**2. Phát hiện đối tượng (Object Detection)**

- **Đầu vào:** Một ảnh.
- **Đầu ra:** Danh sách các đối tượng kèm vị trí (thường là bounding box) và nhãn.
- **Ví dụ:** Phát hiện người, xe đạp, ô tô trong ảnh giao thông.

**Bài tập thực hành:** Phát hiện đối tượng sử dụng YOLOv8 với thư viện `ultralytics`.

```python
from ultralytics import YOLO
import cv2

# 1. Tải mô hình YOLOv8 đã được huấn luyện trước (pre-trained)
model = YOLO('yolov8n.pt') # 'n' là nano, nhẹ và nhanh nhất

# 2. Thực hiện suy luận (inference) trên một ảnh
image_path = 'sample_traffic.jpg'
results = model(image_path)

# 3. Xử lý kết quả và vẽ bounding box
for result in results:
    boxes = result.boxes
    for box in boxes:
        # Tọa độ bounding box
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        # Nhãn và độ tin cậy
        cls = int(box.cls[0])
        conf = float(box.conf[0])
        label = model.names[cls]

        print(f"Phát hiện: {label} với độ tin cậy {conf:.2f} tại [{x1}, {y1}, {x2}, {y2}]")

        # Vẽ lên ảnh
        img = cv2.imread(image_path)
        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(img, f'{label} {conf:.2f}', (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        cv2.imshow('Object Detection', img)
        cv2.waitKey(0)
```

---

# Các bài toán cơ bản

**3. Phân đoạn ảnh (Image Segmentation)**

- **Phân đoạn ngữ nghĩa (Semantic Segmentation):** Gán nhãn cho từng pixel theo lớp đối tượng (ví dụ: pixel thuộc "đường", "vỉa hè").
- **Phân đoạn thể hiện (Instance Segmentation):** Phân biệt các thể hiện khác nhau của cùng một lớp (ví dụ: người A khác người B).
- **Phân đoạn toàn cảnh (Panoptic Segmentation):** Mở rộng của Instance Segmentation, bao gồm cả vật vô định hình (background).

**Bài tập thực hành:** Phân đoạn ngữ nghĩa sử dụng mô hình DeepLabV3 với PyTorch.

```python
import torch
import torchvision.transforms as T
from torchvision import models
import matplotlib.pyplot as plt
from PIL import Image

# 1. Tải mô hình DeepLabV3 đã huấn luyện trên COCO
model = models.segmentation.deeplabv3_resnet101(weights='DEFAULT')
model.eval()

# 2. Tiền xử lý ảnh
transform = T.Compose([
    T.Resize(520),
    T.CenterCrop(520),
    T.ToTensor(),
    T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

image = Image.open("sample_street.jpg")
input_tensor = transform(image).unsqueeze(0)

# 3. Thực hiện phân đoạn
with torch.no_grad():
    output = model(input_tensor)['out'][0]

# Lấy lớp có xác suất cao nhất cho mỗi pixel
predicted_mask = output.argmax(0).cpu().numpy()

# 4. Hiển thị kết quả
plt.figure(figsize=(10, 5))
plt.subplot(1, 2, 1)
plt.title("Original Image")
plt.imshow(image)
plt.subplot(1, 2, 2)
plt.title("Semantic Segmentation")
plt.imshow(predicted_mask, cmap='jet', alpha=0.6)
plt.show()
```

---

# Các bài toán cơ bản

**4. Phát hiện và mô tả điểm đặc trưng (Keypoint Detection & Description)**

- **Khái niệm:** Phát hiện các điểm đặc biệt (góc, cạnh, chấm) và xây dựng "dấu vân tay" (descriptor) cho điểm đó.
- **Ứng dụng:** Ghép ảnh (panorama), tái tạo 3D, theo dõi đối tượng.

**Bài tập thực hành:** Phát hiện và ghép nối điểm đặc trưng sử dụng ORB trong OpenCV.

```python
import cv2
import matplotlib.pyplot as plt

# 1. Đọc ảnh (chuyển sang grayscale)
img1 = cv2.imread('box.png', 0)
img2 = cv2.imread('box_in_scene.png', 0)

# 2. Khởi tạo bộ phát hiện điểm đặc trưng ORB
orb = cv2.ORB.create()

# 3. Phát hiện điểm đặc trưng và mô tả (descriptors)
kp1, des1 = orb.detectAndCompute(img1, None)
kp2, des2 = orb.detectAndCompute(img2, None)

# 4. So khớp các điểm đặc trưng (Sử dụng Brute-Force Matcher)
bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
matches = bf.match(des1, des2)

# Sắp xếp các match theo khoảng cách (tốt nhất lên đầu)
matches = sorted(matches, key=lambda x: x.distance)

# 5. Vẽ kết quả
img3 = cv2.drawMatches(img1, kp1, img2, kp2, matches[:20], None, flags=cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS)
plt.imshow(img3)
plt.title('ORB Feature Matching')
plt.show()
```

---

# Các bài toán cơ bản

**5. Nhận dạng và đọc chữ (OCR - Optical Character Recognition)**

- **Khái niệm:** Chuyển đổi văn bản trong ảnh thành mã ký tự có thể chỉnh sửa.
- **Ví dụ:** Đọc biển số xe, số hóa tài liệu, trích xuất thông tin từ hóa đơn.

**Bài tập thực hành:** Sử dụng thư viện `easyocr` để trích xuất văn bản từ ảnh.

```python
import easyocr
import cv2

# 1. Khởi tạo reader (chọn ngôn ngữ, ví dụ: tiếng Anh và tiếng Việt)
reader = easyocr.Reader(['en', 'vi'], gpu=False)

# 2. Đọc ảnh
image_path = 'sample_text.jpg'
img = cv2.imread(image_path)

# 3. Thực hiện OCR
results = reader.readtext(image_path)

# 4. Hiển thị kết quả
for (bbox, text, prob) in results:
    # Vẽ bounding box và text lên ảnh
    (top_left, top_right, bottom_right, bottom_left) = bbox
    top_left = (int(top_left[0]), int(top_left[1]))
    bottom_right = (int(bottom_right[0]), int(bottom_right[1]))

    cv2.rectangle(img, top_left, bottom_right, (0, 255, 0), 2)
    cv2.putText(img, text, (top_left[0], top_left[1] - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    print(f"Văn bản: {text} (Độ tin cậy: {prob:.2f})")

cv2.imshow('OCR Result', img)
cv2.waitKey(0)
```

---

# Các bài toán cơ bản

**6. Tái tạo 3D từ ảnh (3D Reconstruction)**

- **Khái niệm:** Xây dựng mô hình 3D của vật thể/cảnh từ nhiều ảnh chụp từ các góc khác nhau.
- **Kỹ thuật chính:** Structure from Motion (SfM), Multi-view Stereo (MVS).
- **Ứng dụng:** Lập bản đồ 3D, di sản số (số hóa di tích), phim ảnh, thực tế ảo (VR/AR).

---

# Machine Learning và Deep Learning trong CV

- **Cách tiếp cận cổ điển (trước 2012):**
  - Sử dụng kỹ thuật xử lý ảnh thủ công (SIFT, HOG, LBP) để trích xuất đặc trưng.
  - Sử dụng bộ phân loại cổ điển (SVM, Random Forest, AdaBoost).
  - **Hạn chế:** Đặc trưng do con người thiết kế không đủ tổng quát, khó mở rộng.
- **Machine Learning trong CV truyền thống:**
  - **Học có giám sát:** Cần ảnh có nhãn để huấn luyện.
  - **Kỹ thuật:** PCA, k-NN, HOG+SVM (phát hiện người đi bộ), Haar cascade (phát hiện mặt).
- **Deep Learning – Cuộc cách mạng CV (2012 đến nay):**
  - **Mạng nơ-ron tích chập (CNN):** Tự động học các đặc trưng từ thấp đến cao (cạnh → kết cấu → bộ phận → đối tượng).
  - **Kiến trúc tiêu biểu:** AlexNet, VGG, ResNet, YOLO, Mask R-CNN, Transformer (ViT).
  - **Điểm mạnh:** Độ chính xác vượt trội, không cần thiết kế đặc trưng thủ công, hoạt động tốt trên dữ liệu lớn.
  - **Yêu cầu:** Dữ liệu gán nhãn lớn, GPU mạnh, thời gian huấn luyện lâu.
- _Lưu ý:_ Ngày nay, hầu hết các hệ thống CV tiên tiến đều dựa trên deep learning, nhưng machine learning cổ điển vẫn hữu ích cho bài toán nhỏ, ít dữ liệu, hoặc tài nguyên hạn chế.

---

# Một số mô hình Deep Learning

| Bài toán                       | Mô hình Deep Learning điển hình                |
| :----------------------------- | :--------------------------------------------- |
| **Classification** (Phân loại) | ResNet, EfficientNet, Vision Transformer (ViT) |
| **Detection** (Phát hiện)      | YOLO (v8, v9, v10), Faster R-CNN, DETR         |
| **Segmentation** (Phân đoạn)   | U-Net (y tế), Mask R-CNN, DeepLab              |
| **Keypoint** (Điểm đặc trưng)  | OpenPose, HRNet                                |
| **OCR** (Nhận dạng chữ)        | CRNN + CTC, TrOCR (Transformer)                |

---

# Ứng dụng thực tiễn

- **Đời sống hàng ngày:** Mở khóa khuôn mặt, tìm kiếm ảnh theo nội dung, lọc ảo (AR filter) trên Instagram, TikTok.
- **Y tế và chăm sóc sức khỏe:** Phát hiện ung thư vú từ ảnh X-quang, phân loại bệnh võng mạc, hỗ trợ phẫu thuật robot.
- **Phương tiện tự hành:** Xe tự lái (Tesla, Waymo) phát hiện làn đường, biển báo; Drone giao hàng tránh va chạm.
- **Sản xuất công nghiệp:** Phát hiện lỗi sản phẩm (vết xước, lắp ráp sai) trên băng chuyền, đọc mã vạch tốc độ cao.
- **An ninh và giám sát:** Phát hiện hành vi bất thường (ngã, xâm nhập), đếm người, phân tích dòng người.
- **Nông nghiệp:** Phát hiện sâu bệnh trên lá cây qua ảnh drone, đếm trái cây, ước tính sản lượng.
- **Thương mại điện tử:** Thử đồ ảo (kính mắt, giày dép), tìm kiếm sản phẩm bằng ảnh chụp.

---

# Quy trình xây dựng hệ thống CV

| Bước                        | Mô tả                                                                        | Ví dụ                                                               |
| :-------------------------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| **1. Xác định bài toán**    | Mục tiêu kinh doanh/kỹ thuật, đầu vào và đầu ra mong muốn.                   | Phân loại sản phẩm (tốt/lỗi) từ ảnh chụp trên băng chuyền.          |
| **2. Thu thập dữ liệu**     | Lấy ảnh từ camera, cảm biến, nguồn có sẵn. Chú ý đa dạng (góc, sáng, nhiễu). | Chụp 10.000 ảnh sản phẩm từ 3 camera khác nhau.                     |
| **3. Gán nhãn dữ liệu**     | Tạo ground truth (công cụ: LabelImg, CVAT, hoặc thuê dịch vụ).               | Gán nhãn "tốt"/"lỗi" cho từng ảnh, vẽ bounding box vết lỗi nếu cần. |
| **4. Tiền xử lý**           | Resize, chuẩn hóa, augment (xoay, lật, thay đổi độ sáng).                    | Resize về 224x224, chuẩn hóa pixel về [0,1], thêm nhiễu Gaussian.   |
| **5. Xây dựng mô hình**     | Chọn kiến trúc, huấn luyện, tối ưu siêu tham số.                             | Dùng CNN pretrained ResNet50, fine-tune trên dữ liệu của mình.      |
| **6. Đánh giá**             | Dùng tập kiểm tra, tính độ chính xác, precision, recall, F1, ROC.            | Đạt độ chính xác 98% trên tập test, thời gian suy luận 20ms/ảnh.    |
| **7. Triển khai & bảo trì** | Đưa lên thiết bị nhúng/cloud, giám sát drift, cập nhật dữ liệu mới.          | Triển khai trên Raspberry Pi + camera, kiểm tra định kỳ mỗi tháng.  |

---

# Công cụ và thư viện phổ biến

| Giai đoạn                    | Công cụ                          |
| :--------------------------- | :------------------------------- |
| **Xử lý ảnh**                | OpenCV, PIL, scikit-image        |
| **Machine learning cổ điển** | scikit-learn, XGBoost            |
| **Deep learning**            | TensorFlow, PyTorch, Keras       |
| **Gán nhãn**                 | LabelImg, CVAT, Makesense.ai     |
| **Triển khai**               | ONNX, TensorRT, OpenVINO, TFLite |
