# THỰC HÀNH CHƯƠNG 5
## XỬ LÝ ẢNH & THỊ GIÁC MÁY TÍNH
### Thị giác máy tính (Computer Vision)

---

## Mục tiêu chương

Sau khi hoàn thành các bài tập thực hành này, sinh viên có thể:

- Phân biệt và áp dụng các bài toán cơ bản của Computer Vision
- Xây dựng và huấn luyện mô hình phân loại ảnh với CNN
- Sử dụng mô hình pretrained (Transfer Learning) để phân loại và phát hiện đối tượng
- Triển khai phát hiện đối tượng với YOLO
- Thực hiện phân đoạn ngữ nghĩa và thể hiện với các mô hình deep learning
- Trích xuất và ghép nối đặc trưng (SIFT, ORB)
- Xây dựng pipeline hoàn chỉnh cho bài toán thị giác máy tính

---

## Chuẩn bị

- Cài đặt Python 3.11+ và các thư viện:
  ```bash
  pip install opencv-python numpy matplotlib scikit-image scikit-learn
  pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
  pip install ultralytics  # YOLO
  pip install transformers  # Hugging Face
  pip install tensorflow  # (nếu dùng)
  ```
- Ảnh mẫu: `cat.jpg`, `dog.jpg`, `car.jpg`, ảnh từ dataset CIFAR-10 (tự tải)
- Tạo cấu trúc thư mục:
  ```
  chapter_5_lab/
  ├── images/          # Ảnh đầu vào
  ├── output/          # Kết quả xử lý
  ├── models/          # Lưu mô hình đã huấn luyện
  └── src/             # Mã nguồn Python
  ```

---

## Ôn tập lý thuyết trọng tâm

| Bài toán | Đầu vào | Đầu ra | Mô hình tiêu biểu |
|----------|---------|--------|-------------------|
| **Phân loại ảnh** | 1 ảnh | 1 nhãn | ResNet, EfficientNet, ViT |
| **Phát hiện đối tượng** | 1 ảnh | Bounding boxes + nhãn | YOLO, Faster R-CNN, DETR |
| **Phân đoạn ngữ nghĩa** | 1 ảnh | Pixel-wise labels | U-Net, DeepLab |
| **Phân đoạn thể hiện** | 1 ảnh | Mask per object | Mask R-CNN |
| **Phát hiện keypoint** | 1 ảnh | Các điểm đặc trưng | OpenPose, HRNet |
| **OCR** | 1 ảnh văn bản | Chuỗi ký tự | CRNN+CTC, TrOCR |

**Các mốc quan trọng:**
- 2012: AlexNet - Cuộc cách mạng CNN
- 2015: ResNet - Học sâu hơn với skip connections
- 2015: YOLO - Phát hiện đối tượng real-time
- 2017: Mask R-CNN - Phân đoạn thể hiện
- 2018: BERT - Transformer (sau đó ViT cho ảnh)
- 2020: Vision Transformer (ViT)

---

## Bài tập 1: Phân loại ảnh với CNN từ đầu (CIFAR-10)

**Yêu cầu:**

1. Tải dataset CIFAR-10 (10 lớp: máy bay, ô tô, chim, mèo, hươu, chó, ếch, ngựa, tàu, xe tải)
2. Xây dựng mô hình CNN đơn giản (2-3 layer convolution + pooling + fully connected)
3. Huấn luyện và đánh giá độ chính xác
4. Dự đoán trên ảnh tự chọn và hiển thị kết quả

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex1_cnn_cifar10.py
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms
import matplotlib.pyplot as plt
import numpy as np

# ---- 1. Định nghĩa CNN ----
class SimpleCNN(nn.Module):
    def __init__(self, num_classes=10):
        super(SimpleCNN, self).__init__()
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(128 * 4 * 4, 256)
        self.fc2 = nn.Linear(256, num_classes)
        self.dropout = nn.Dropout(0.25)
    
    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = self.pool(F.relu(self.conv3(x)))
        x = x.view(-1, 128 * 4 * 4)
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        return x

def train_model(model, trainloader, testloader, epochs=10, device='cpu'):
    """Huấn luyện mô hình"""
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    train_losses = []
    test_accuracies = []
    
    for epoch in range(epochs):
        # Training
        model.train()
        running_loss = 0.0
        for i, data in enumerate(trainloader, 0):
            inputs, labels = data[0].to(device), data[1].to(device)
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            running_loss += loss.item()
        
        avg_loss = running_loss / len(trainloader)
        train_losses.append(avg_loss)
        
        # Testing
        model.eval()
        correct = 0
        total = 0
        with torch.no_grad():
            for data in testloader:
                images, labels = data[0].to(device), data[1].to(device)
                outputs = model(images)
                _, predicted = torch.max(outputs.data, 1)
                total += labels.size(0)
                correct += (predicted == labels).sum().item()
        
        acc = 100 * correct / total
        test_accuracies.append(acc)
        print(f'Epoch {epoch+1}/{epochs}: Loss = {avg_loss:.4f}, Accuracy = {acc:.2f}%')
    
    return train_losses, test_accuracies

def main():
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    print(f"Sử dụng device: {device}")
    
    # ---- 2. Chuẩn bị dữ liệu ----
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
    ])
    
    # Tải CIFAR-10 (tự động download nếu chưa có)
    trainset = torchvision.datasets.CIFAR10(root='./data', train=True,
                                            download=True, transform=transform)
    trainloader = torch.utils.data.DataLoader(trainset, batch_size=64,
                                              shuffle=True, num_workers=2)
    
    testset = torchvision.datasets.CIFAR10(root='./data', train=False,
                                           download=True, transform=transform)
    testloader = torch.utils.data.DataLoader(testset, batch_size=64,
                                             shuffle=False, num_workers=2)
    
    classes = ('plane', 'car', 'bird', 'cat', 'deer',
               'dog', 'frog', 'horse', 'ship', 'truck')
    
    # ---- 3. Huấn luyện ----
    model = SimpleCNN(num_classes=10).to(device)
    train_losses, test_accuracies = train_model(model, trainloader, testloader,
                                                epochs=10, device=device)
    
    # ---- 4. Vẽ biểu đồ ----
    plt.figure(figsize=(12, 4))
    
    plt.subplot(1, 2, 1)
    plt.plot(train_losses, 'b-')
    plt.title('Training Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.grid(True)
    
    plt.subplot(1, 2, 2)
    plt.plot(test_accuracies, 'r-')
    plt.title('Test Accuracy')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy (%)')
    plt.grid(True)
    
    plt.tight_layout()
    plt.show()
    
    # ---- 5. Dự đoán trên ảnh từ test set ----
    model.eval()
    # Lấy 4 ảnh bất kỳ từ test set
    dataiter = iter(testloader)
    images, labels = next(dataiter)
    images, labels = images[:4], labels[:4]
    
    with torch.no_grad():
        outputs = model(images.to(device))
        _, predicted = torch.max(outputs, 1)
        predicted = predicted.cpu()
    
    # Hiển thị
    fig, axes = plt.subplots(1, 4, figsize=(12, 4))
    for i in range(4):
        img = images[i].numpy().transpose((1, 2, 0))
        img = img * 0.5 + 0.5  # Denormalize
        axes[i].imshow(img)
        axes[i].set_title(f'True: {classes[labels[i]]}\nPred: {classes[predicted[i]]}')
        axes[i].axis('off')
    plt.tight_layout()
    plt.show()
    
    # Lưu model
    torch.save(model.state_dict(), 'models/cnn_cifar10.pth')
    print("Đã lưu model tại models/cnn_cifar10.pth")

if __name__ == "__main__":
    main()
```
</div>

---

## Bài tập 2: Transfer Learning với ResNet (Phân loại ảnh)

**Yêu cầu:**

1. Sử dụng ResNet18 pretrained trên ImageNet
2. Fine-tune cho bài toán phân loại ảnh tùy chỉnh
3. Dự đoán trên ảnh thực tế (có thể dùng ảnh vật nuôi, đồ vật)
4. Hiển thị top-5 dự đoán với xác suất kèm theo

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex2_transfer_learning.py
import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import matplotlib.pyplot as plt
import numpy as np
import cv2

def load_model(num_classes=2):
    """Tải ResNet18 pretrained và thay đổi lớp cuối"""
    model = models.resnet18(pretrained=True)
    # Đóng băng các lớp đặc trưng
    for param in model.parameters():
        param.requires_grad = False
    
    # Thay thế lớp FC cuối cho số lớp mới
    num_features = model.fc.in_features
    model.fc = nn.Linear(num_features, num_classes)
    
    return model

def predict_image(model, image_path, transform, class_names, device='cpu'):
    """Dự đoán một ảnh"""
    # Đọc và tiền xử lý
    img = Image.open(image_path).convert('RGB')
    img_tensor = transform(img).unsqueeze(0).to(device)
    
    # Dự đoán
    model.eval()
    with torch.no_grad():
        outputs = model(img_tensor)
        probabilities = torch.nn.functional.softmax(outputs, dim=1)
    
    # Lấy top-5 dự đoán
    top5_prob, top5_idx = torch.topk(probabilities, min(5, len(class_names)), dim=1)
    top5_prob = top5_prob.cpu().numpy()[0]
    top5_idx = top5_idx.cpu().numpy()[0]
    
    # Trả về kết quả
    results = [(class_names[idx], prob) for idx, prob in zip(top5_idx, top5_prob)]
    return results, img

def main():
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    print(f"Sử dụng device: {device}")
    
    # ---- 1. Định nghĩa class_names và transform ----
    # 2 lớp: cat và dog (có thể mở rộng)
    class_names = ['cat', 'dog']
    
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                           std=[0.229, 0.224, 0.225])
    ])
    
    # ---- 2. Tải model ----
    model = load_model(num_classes=len(class_names)).to(device)
    
    # Load weights đã train (nếu có)
    try:
        model.load_state_dict(torch.load('models/resnet_pet.pth', map_location=device))
        print("Đã tải model đã huấn luyện.")
    except:
        print("Không tìm thấy model đã huấn luyện. Cần huấn luyện trước.")
        print("Mô tả huấn luyện được cung cấp bên dưới.")
        return
    
    # ---- 3. Dự đoán trên ảnh ----
    # Sử dụng ảnh từ thư mục images/
    test_images = ['images/cat.jpg', 'images/dog.jpg']
    
    plt.figure(figsize=(12, 6))
    
    for idx, img_path in enumerate(test_images):
        try:
            results, img = predict_image(model, img_path, transform, class_names, device)
            
            plt.subplot(1, 2, idx+1)
            plt.imshow(img)
            title = f"Top-1: {results[0][0]} ({results[0][1]*100:.1f}%)"
            plt.title(title)
            plt.axis('off')
            
            # In kết quả
            print(f"Kết quả cho {img_path}:")
            for cls, prob in results:
                print(f"  {cls}: {prob*100:.2f}%")
        except FileNotFoundError:
            print(f"Không tìm thấy ảnh: {img_path}")
    
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    main()
```

**Huấn luyện model (Code bổ sung để fine-tune):**

```python
# src/ex2_train.py (Code huấn luyện)
"""
import torch
import torch.nn as nn
import torchvision.datasets as datasets
from torchvision import transforms
from torch.utils.data import DataLoader

def train_model(model, trainloader, testloader, epochs=10, device='cpu'):
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.fc.parameters(), lr=0.001)
    
    for epoch in range(epochs):
        model.train()
        running_loss = 0.0
        for inputs, labels in trainloader:
            inputs, labels = inputs.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            running_loss += loss.item()
        
        # Đánh giá
        model.eval()
        correct = 0
        total = 0
        with torch.no_grad():
            for inputs, labels in testloader:
                inputs, labels = inputs.to(device), labels.to(device)
                outputs = model(inputs)
                _, predicted = torch.max(outputs, 1)
                total += labels.size(0)
                correct += (predicted == labels).sum().item()
        
        print(f'Epoch {epoch+1}: Loss={running_loss/len(trainloader):.4f}, Acc={100*correct/total:.2f}%')
    
    torch.save(model.state_dict(), 'models/resnet_pet.pth')
"""
```
</div>

---

## Bài tập 3: Phát hiện đối tượng với YOLO

**Yêu cầu:**

1. Sử dụng YOLOv8 pretrained (hoặc YOLOv5) để phát hiện đối tượng
2. Phát hiện trên ảnh tĩnh và vẽ bounding boxes
3. Hiển thị nhãn và độ tin cậy của từng đối tượng
4. Thử nghiệm với ảnh chụp từ thực tế

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex3_yolo_detection.py
import cv2
import numpy as np
import matplotlib.pyplot as plt
from ultralytics import YOLO

def draw_detections(img, results, conf_threshold=0.5):
    """Vẽ bounding boxes và nhãn lên ảnh"""
    img_copy = img.copy()
    
    for result in results:
        boxes = result.boxes
        if boxes is None:
            continue
        
        for box in boxes:
            # Lấy tọa độ
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            conf = float(box.conf[0])
            cls = int(box.cls[0])
            label = result.names[cls]
            
            # Chỉ vẽ nếu độ tin cậy > ngưỡng
            if conf < conf_threshold:
                continue
            
            # Vẽ bounding box
            cv2.rectangle(img_copy, (x1, y1), (x2, y2), (0, 255, 0), 2)
            
            # Vẽ nhãn
            text = f"{label} {conf:.2f}"
            cv2.putText(img_copy, text, (x1, y1 - 10),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    
    return img_copy

def main():
    # ---- 1. Tải model YOLOv8 ----
    model = YOLO('yolov8n.pt')  # nano version (nhẹ nhất)
    print("Đã tải YOLOv8n pretrained")
    print(f"Các lớp hỗ trợ: {len(model.names)} classes")
    
    # ---- 2. Phát hiện trên ảnh ----
    image_paths = ['images/sample.jpg', 'images/car.jpg', 'images/cat_dog.jpg']
    
    plt.figure(figsize=(15, 10))
    
    for idx, img_path in enumerate(image_paths):
        try:
            # Đọc ảnh
            img = cv2.imread(img_path)
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            
            # Dự đoán
            results = model(img_rgb, conf=0.25)
            
            # Vẽ kết quả
            result_img = draw_detections(img_rgb, results, conf_threshold=0.3)
            
            # Hiển thị
            plt.subplot(2, 3, idx+1)
            plt.imshow(img_rgb)
            plt.title('Ảnh gốc')
            plt.axis('off')
            
            plt.subplot(2, 3, idx+4)
            plt.imshow(result_img)
            plt.title(f'YOLO Detection\n{len(results[0].boxes) if results[0].boxes else 0} objects')
            plt.axis('off')
            
            # Lưu kết quả
            cv2.imwrite(f'output/yolo_{idx}.jpg', cv2.cvtColor(result_img, cv2.COLOR_RGB2BGR))
            print(f"Đã xử lý: {img_path}")
            
        except FileNotFoundError:
            print(f"Không tìm thấy ảnh: {img_path}")
    
    plt.tight_layout()
    plt.show()
    
    # ---- 3. Phát hiện từ camera (nếu có) ----
    # cap = cv2.VideoCapture(0)
    # while True:
    #     ret, frame = cap.read()
    #     if not ret:
    #         break
    #     results = model(frame)
    #     annotated = results[0].plot()
    #     cv2.imshow('YOLO Detection', annotated)
    #     if cv2.waitKey(1) & 0xFF == ord('q'):
    #         break
    # cap.release()
    # cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
```
</div>

---

## Bài tập 4: Phân đoạn ảnh (Semantic & Instance Segmentation)

**Yêu cầu:**

1. Sử dụng mô hình DeepLabV3 (pretrained) để phân đoạn ngữ nghĩa
2. Sử dụng YOLOv8 segmentation (hoặc Mask R-CNN) để phân đoạn thể hiện
3. Vẽ mask màu cho từng lớp/đối tượng
4. So sánh semantic và instance segmentation

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex4_segmentation.py
import cv2
import numpy as np
import matplotlib.pyplot as plt
import torch
import torchvision.transforms as transforms
from torchvision.models.segmentation import deeplabv3_resnet50
from ultralytics import YOLO

def semantic_segmentation_deeplab(img_rgb, device='cpu'):
    """Phân đoạn ngữ nghĩa với DeepLabV3"""
    # Tải model (lần đầu sẽ download)
    model = deeplabv3_resnet50(pretrained=True)
    model = model.to(device)
    model.eval()
    
    # Tiền xử lý
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                           std=[0.229, 0.224, 0.225])
    ])
    
    # Resize thành 520x520 (input của DeepLab)
    img_resized = cv2.resize(img_rgb, (520, 520))
    img_tensor = transform(img_resized).unsqueeze(0).to(device)
    
    with torch.no_grad():
        output = model(img_tensor)['out']
        output = torch.argmax(output.squeeze(), dim=0).cpu().numpy()
    
    # Resize về kích thước gốc
    output = cv2.resize(output.astype(np.uint8), (img_rgb.shape[1], img_rgb.shape[0]),
                       interpolation=cv2.INTER_NEAREST)
    
    return output

def colorize_semantic_mask(mask, num_classes=21):
    """Tô màu cho semantic segmentation mask (PASCAL VOC 21 classes)"""
    # Bảng màu cơ bản cho 21 lớp
    colors = np.array([
        [0, 0, 0], [128, 0, 0], [0, 128, 0], [128, 128, 0],
        [0, 0, 128], [128, 0, 128], [0, 128, 128], [128, 128, 128],
        [64, 0, 0], [192, 0, 0], [64, 128, 0], [192, 128, 0],
        [64, 0, 128], [192, 0, 128], [64, 128, 128], [192, 128, 128],
        [0, 64, 0], [128, 64, 0], [0, 192, 0], [128, 192, 0],
        [0, 64, 128]
    ])
    
    colored_mask = colors[mask.flatten()]
    colored_mask = colored_mask.reshape(mask.shape[0], mask.shape[1], 3)
    return colored_mask.astype(np.uint8)

def instance_segmentation_yolo(img_rgb):
    """Phân đoạn thể hiện với YOLOv8 segmentation"""
    # Tải model YOLO segmentation (lần đầu sẽ download)
    model = YOLO('yolov8n-seg.pt')
    
    # Dự đoán
    results = model(img_rgb, conf=0.3)
    
    # Lấy mask và bounding boxes
    if results[0].masks is None:
        return img_rgb, []
    
    masks = results[0].masks.data.cpu().numpy()
    boxes = results[0].boxes.xyxy.cpu().numpy()
    cls_ids = results[0].boxes.cls.cpu().numpy().astype(int)
    confs = results[0].boxes.conf.cpu().numpy()
    
    # Vẽ kết quả
    result_img = img_rgb.copy()
    colors = np.random.randint(0, 255, (len(masks), 3))
    
    for i, (mask, box, cls_id, conf) in enumerate(zip(masks, boxes, cls_ids, confs)):
        # Resize mask về kích thước ảnh gốc
        mask_resized = cv2.resize(mask, (img_rgb.shape[1], img_rgb.shape[0]))
        mask_binary = (mask_resized > 0.5).astype(np.uint8)
        
        # Tô màu mask
        color = colors[i].tolist()
        colored = np.zeros_like(img_rgb)
        colored[mask_binary == 1] = color
        
        # Overlay mask với alpha
        alpha = 0.5
        result_img = cv2.addWeighted(result_img, 1, colored, alpha, 0)
        
        # Vẽ bounding box
        x1, y1, x2, y2 = map(int, box)
        cv2.rectangle(result_img, (x1, y1), (x2, y2), color, 2)
        text = f"{model.names[cls_id]} {conf:.2f}"
        cv2.putText(result_img, text, (x1, y1-10),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
    
    return result_img, results

def main():
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    
    # Đọc ảnh
    img = cv2.imread('images/sample.jpg')
    if img is None:
        print("Không thể đọc ảnh!")
        return
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # ---- 1. Semantic Segmentation ----
    print("Đang chạy Semantic Segmentation...")
    semantic_mask = semantic_segmentation_deeplab(img_rgb, device)
    semantic_colored = colorize_semantic_mask(semantic_mask)
    
    # ---- 2. Instance Segmentation ----
    print("Đang chạy Instance Segmentation...")
    instance_result, yolo_results = instance_segmentation_yolo(img_rgb)
    
    # ---- 3. Hiển thị ----
    plt.figure(figsize=(15, 5))
    
    plt.subplot(1, 3, 1)
    plt.imshow(img_rgb)
    plt.title('Ảnh gốc')
    plt.axis('off')
    
    plt.subplot(1, 3, 2)
    plt.imshow(semantic_colored)
    plt.title('Semantic Segmentation')
    plt.axis('off')
    
    plt.subplot(1, 3, 3)
    plt.imshow(instance_result)
    plt.title('Instance Segmentation (YOLO)')
    plt.axis('off')
    
    plt.tight_layout()
    plt.show()
    
    # Lưu kết quả
    cv2.imwrite('output/semantic_segmentation.jpg', 
                cv2.cvtColor(semantic_colored, cv2.COLOR_RGB2BGR))
    cv2.imwrite('output/instance_segmentation.jpg', 
                cv2.cvtColor(instance_result, cv2.COLOR_RGB2BGR))
    
    print("Đã hoàn thành phân đoạn.")

if __name__ == "__main__":
    main()
```
</div>

---

## Bài tập 5: Phát hiện và mô tả điểm đặc trưng (SIFT, ORB)

**Yêu cầu:**

1. Trích xuất keypoints và descriptors bằng SIFT và ORB
2. Vẽ keypoints lên ảnh
3. Ghép nối hai ảnh bằng cách match descriptors
4. Tính toán homography và ghép ảnh thành panorama

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex5_feature_matching.py
import cv2
import numpy as np
import matplotlib.pyplot as plt

def detect_and_match_features(img1, img2, method='SIFT'):
    """Phát hiện và ghép nối đặc trưng"""
    # Chuyển sang grayscale
    gray1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    gray2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
    
    # Chọn detector
    if method == 'SIFT':
        detector = cv2.SIFT_create()
    elif method == 'ORB':
        detector = cv2.ORB_create(nfeatures=1000)
    else:
        raise ValueError("Phương pháp không hỗ trợ")
    
    # Phát hiện keypoints và descriptors
    kp1, des1 = detector.detectAndCompute(gray1, None)
    kp2, des2 = detector.detectAndCompute(gray2, None)
    
    print(f"{method}: Ảnh 1 có {len(kp1)} keypoints, Ảnh 2 có {len(kp2)} keypoints")
    
    # Matching
    if method == 'SIFT':
        # SIFT dùng FLANN matcher
        FLANN_INDEX_KDTREE = 1
        index_params = dict(algorithm=FLANN_INDEX_KDTREE, trees=5)
        search_params = dict(checks=50)
        matcher = cv2.FlannBasedMatcher(index_params, search_params)
        matches = matcher.knnMatch(des1, des2, k=2)
        
        # Lọc theo ratio test (Lowe's)
        good_matches = []
        for m, n in matches:
            if m.distance < 0.7 * n.distance:
                good_matches.append(m)
    else:  # ORB
        # ORB dùng BFMatcher với Hamming distance
        matcher = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
        matches = matcher.match(des1, des2)
        # Sắp xếp theo distance
        matches = sorted(matches, key=lambda x: x.distance)
        good_matches = matches[:100]  # Lấy 100 match tốt nhất
    
    print(f"Số lượng matches tốt: {len(good_matches)}")
    
    return kp1, kp2, good_matches

def draw_matches(img1, kp1, img2, kp2, matches, max_matches=50):
    """Vẽ các cặp matches lên ảnh"""
    img_matches = cv2.drawMatches(img1, kp1, img2, kp2, matches[:max_matches],
                                  None, flags=cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS)
    return img_matches

def compute_homography(kp1, kp2, matches):
    """Tính homography từ các matches"""
    if len(matches) < 4:
        print("Không đủ matches để tính homography!")
        return None, None
    
    src_pts = np.float32([kp1[m.queryIdx].pt for m in matches]).reshape(-1, 1, 2)
    dst_pts = np.float32([kp2[m.trainIdx].pt for m in matches]).reshape(-1, 1, 2)
    
    H, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
    return H, mask

def main():
    # Đọc 2 ảnh (có thể là 2 góc của cùng một cảnh)
    img1 = cv2.imread('images/left.jpg')
    img2 = cv2.imread('images/right.jpg')
    
    if img1 is None or img2 is None:
        print("Không tìm thấy ảnh. Sử dụng ảnh mẫu hoặc tự chụp.")
        print("Đang tạo ảnh mẫu để minh họa...")
        # Tạo ảnh mẫu cho demo
        img1 = np.ones((300, 300, 3), dtype=np.uint8) * 255
        img2 = np.ones((300, 300, 3), dtype=np.uint8) * 255
        cv2.rectangle(img1, (50, 50), (200, 200), (0, 0, 255), 2)
        cv2.rectangle(img2, (100, 50), (250, 200), (0, 0, 255), 2)
        cv2.putText(img1, "Image 1", (100, 150), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 2)
        cv2.putText(img2, "Image 2", (100, 150), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 2)
    
    # ---- 1. SIFT ----
    kp1_sift, kp2_sift, matches_sift = detect_and_match_features(img1, img2, method='SIFT')
    img_matches_sift = draw_matches(img1, kp1_sift, img2, kp2_sift, matches_sift)
    
    # ---- 2. ORB ----
    kp1_orb, kp2_orb, matches_orb = detect_and_match_features(img1, img2, method='ORB')
    img_matches_orb = draw_matches(img1, kp1_orb, img2, kp2_orb, matches_orb)
    
    # ---- 3. Hiển thị ----
    plt.figure(figsize=(15, 8))
    
    plt.subplot(1, 2, 1)
    plt.imshow(cv2.cvtColor(img_matches_sift, cv2.COLOR_BGR2RGB))
    plt.title(f'SIFT: {len(matches_sift)} matches')
    plt.axis('off')
    
    plt.subplot(1, 2, 2)
    plt.imshow(cv2.cvtColor(img_matches_orb, cv2.COLOR_BGR2RGB))
    plt.title(f'ORB: {len(matches_orb)} matches')
    plt.axis('off')
    
    plt.tight_layout()
    plt.show()
    
    # Lưu kết quả
    cv2.imwrite('output/matches_sift.jpg', img_matches_sift)
    cv2.imwrite('output/matches_orb.jpg', img_matches_orb)
    
    # ---- 4. Tính homography và tạo panorama (nếu có đủ matches) ----
    if len(matches_sift) >= 4:
        H, mask = compute_homography(kp1_sift, kp2_sift, matches_sift)
        if H is not None:
            # Ghép ảnh thành panorama
            h1, w1 = img1.shape[:2]
            h2, w2 = img2.shape[:2]
            
            # Xác định kích thước ảnh panorama
            corners1 = np.float32([[0, 0], [0, h1], [w1, h1], [w1, 0]]).reshape(-1, 1, 2)
            corners2 = np.float32([[0, 0], [0, h2], [w2, h2], [w2, 0]]).reshape(-1, 1, 2)
            corners1_transformed = cv2.perspectiveTransform(corners1, H)
            all_corners = np.concatenate((corners1_transformed, corners2), axis=0)
            
            [xmin, ymin] = np.int32(all_corners.min(axis=0).ravel() - 0.5)
            [xmax, ymax] = np.int32(all_corners.max(axis=0).ravel() + 0.5)
            
            # Dịch chuyển để hiển thị
            translation = np.float32([[-xmin], [-ymin]])
            H_trans = np.float32([[1, 0, -xmin], [0, 1, -ymin], [0, 0, 1]])
            H_final = H_trans @ H
            
            # Warp ảnh
            panorama = cv2.warpPerspective(img1, H_final, (xmax - xmin, ymax - ymin))
            panorama[-ymin: h2 - ymin, -xmin: w2 - xmin] = img2
            
            cv2.imwrite('output/panorama.jpg', panorama)
            print("Đã tạo panorama tại output/panorama.jpg")
            
            plt.figure(figsize=(12, 6))
            plt.imshow(cv2.cvtColor(panorama, cv2.COLOR_BGR2RGB))
            plt.title('Panorama')
            plt.axis('off')
            plt.show()

if __name__ == "__main__":
    main()
```
</div>

---

## Bài tập 6: Nhận dạng và đọc chữ (OCR)

**Yêu cầu:**

1. Sử dụng Tesseract OCR để đọc văn bản từ ảnh
2. Vẽ bounding boxes xung quanh các từ/vùng chữ
3. Trích xuất thông tin từ ảnh biển số xe hoặc văn bản
4. Xử lý ảnh trước khi OCR (threshold, denoise) để tăng độ chính xác

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex6_ocr.py
import cv2
import numpy as np
import matplotlib.pyplot as plt
import pytesseract
from PIL import Image

# Cấu hình đường dẫn Tesseract (nếu cần)
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def preprocess_for_ocr(img):
    """Tiền xử lý ảnh để tăng độ chính xác OCR"""
    # Chuyển grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Cân bằng histogram
    equalized = cv2.equalizeHist(gray)
    
    # Làm mịn để giảm nhiễu
    blurred = cv2.GaussianBlur(equalized, (3, 3), 0)
    
    # Áp dụng threshold để nhị phân hóa
    _, thresh = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    
    # Nâng cao độ tương phản
    kernel = np.array([[-1,-1,-1],
                       [-1, 9,-1],
                       [-1,-1,-1]])
    sharpened = cv2.filter2D(thresh, -1, kernel)
    
    return sharpened

def detect_text_regions(img):
    """Phát hiện các vùng văn bản trong ảnh"""
    # Chuyển grayscale và threshold
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    
    # Tìm contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Lọc các contours có kích thước phù hợp
    text_regions = []
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)
        area = w * h
        # Bỏ qua vùng quá nhỏ hoặc quá lớn
        if 100 < area < 10000 and w > 20 and h > 10:
            # Kiểm tra tỉ lệ khung hình (đặc trưng của chữ)
            aspect_ratio = w / h
            if 0.1 < aspect_ratio < 10:
                text_regions.append((x, y, w, h))
    
    return text_regions

def main():
    # Đọc ảnh văn bản hoặc biển số xe
    img = cv2.imread('images/text_sample.jpg')
    if img is None:
        print("Không tìm thấy ảnh văn bản. Đang tạo ảnh mẫu...")
        img = np.ones((300, 600, 3), dtype=np.uint8) * 255
        cv2.putText(img, "XU LY ANH & THI GIAC MAY TINH", (30, 80),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 0), 2)
        cv2.putText(img, "CHUONG 5: THI GIAC MAY TINH", (40, 140),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, (50, 50, 50), 2)
        cv2.putText(img, "Ngay: 21/07/2026", (180, 200),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.6, (100, 100, 100), 2)
        cv2.putText(img, "Truong Dai hoc X", (200, 250),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.6, (150, 150, 150), 2)
    
    # ---- 1. Tiền xử lý ----
    processed = preprocess_for_ocr(img)
    
    # ---- 2. OCR với Tesseract ----
    # Chuyển sang PIL Image
    pil_img = Image.fromarray(processed)
    
    # Cấu hình OCR
    config = '--oem 3 --psm 6 -l vie+eng'  # Tiếng Việt + Tiếng Anh
    
    # Thực hiện OCR
    text = pytesseract.image_to_string(pil_img, config=config)
    
    # Lấy thông tin chi tiết (bounding boxes)
    data = pytesseract.image_to_data(pil_img, config=config, output_type=pytesseract.Output.DICT)
    
    print("=" * 50)
    print("KẾT QUẢ OCR")
    print("=" * 50)
    print(text)
    
    # ---- 3. Vẽ bounding boxes ----
    img_with_boxes = img.copy()
    n_boxes = len(data['level'])
    for i in range(n_boxes):
        if data['conf'][i] > 30:  # Chỉ hiển thị text có confidence > 30%
            (x, y, w, h) = (data['left'][i], data['top'][i],
                          data['width'][i], data['height'][i])
            if w > 10 and h > 10:
                cv2.rectangle(img_with_boxes, (x, y), (x+w, y+h), (0, 255, 0), 2)
                cv2.putText(img_with_boxes, data['text'][i], (x, y-5),
                          cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)
    
    # ---- 4. Hiển thị ----
    plt.figure(figsize=(15, 6))
    
    plt.subplot(1, 3, 1)
    plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    plt.title('Ảnh gốc')
    plt.axis('off')
    
    plt.subplot(1, 3, 2)
    plt.imshow(processed, cmap='gray')
    plt.title('Sau tiền xử lý')
    plt.axis('off')
    
    plt.subplot(1, 3, 3)
    plt.imshow(cv2.cvtColor(img_with_boxes, cv2.COLOR_BGR2RGB))
    plt.title('Kết quả OCR')
    plt.axis('off')
    
    plt.tight_layout()
    plt.show()
    
    # Lưu kết quả
    cv2.imwrite('output/ocr_result.jpg', img_with_boxes)
    with open('output/ocr_text.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    
    print("\nĐã lưu kết quả OCR tại output/")

if __name__ == "__main__":
    main()
```
</div>

---

## Bài tập 7: Xây dựng pipeline hoàn chỉnh cho ứng dụng CV

**Yêu cầu:**

1. Xây dựng một ứng dụng hoàn chỉnh (ví dụ: phát hiện vật thể trong video/ảnh)
2. Kết hợp tiền xử lý ảnh + phát hiện đối tượng + hậu xử lý
3. Hiển thị kết quả theo thời gian thực (nếu dùng video/camera)
4. Lưu kết quả và thống kê

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex7_pipeline.py
import cv2
import numpy as np
import matplotlib.pyplot as plt
from ultralytics import YOLO
import time
from collections import deque

class VisionPipeline:
    """Pipeline xử lý thị giác máy tính hoàn chỉnh"""
    
    def __init__(self, model_path='yolov8n.pt', conf_threshold=0.3):
        self.model = YOLO(model_path)
        self.conf_threshold = conf_threshold
        self.class_names = self.model.names
        self.detections_history = deque(maxlen=100)  # Lịch sử phát hiện
    
    def preprocess(self, img):
        """Tiền xử lý ảnh"""
        # Resize nếu quá lớn
        h, w = img.shape[:2]
        if max(h, w) > 1280:
            scale = 1280 / max(h, w)
            new_w = int(w * scale)
            new_h = int(h * scale)
            img = cv2.resize(img, (new_w, new_h))
        
        # Tăng độ tương phản
        lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
        l, a, b = cv2.split(lab)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
        l = clahe.apply(l)
        enhanced = cv2.merge([l, a, b])
        enhanced = cv2.cvtColor(enhanced, cv2.COLOR_LAB2BGR)
        
        return enhanced
    
    def detect(self, img):
        """Phát hiện đối tượng"""
        results = self.model(img, conf=self.conf_threshold)
        return results
    
    def postprocess(self, img, results):
        """Hậu xử lý và vẽ kết quả"""
        annotated = img.copy()
        detections = []
        
        if results[0].boxes is None:
            return annotated, detections
        
        boxes = results[0].boxes
        for box in boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            conf = float(box.conf[0])
            cls = int(box.cls[0])
            label = self.class_names[cls]
            
            # Lưu thông tin
            detections.append({
                'class': label,
                'confidence': conf,
                'bbox': (x1, y1, x2, y2)
            })
            
            # Vẽ bounding box
            cv2.rectangle(annotated, (x1, y1), (x2, y2), (0, 255, 0), 2)
            text = f"{label} {conf:.2f}"
            cv2.putText(annotated, text, (x1, y1-10),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        
        return annotated, detections
    
    def process_image(self, image_path, output_path=None):
        """Xử lý một ảnh"""
        img = cv2.imread(image_path)
        if img is None:
            print(f"Không thể đọc ảnh: {image_path}")
            return None
        
        # Preprocess
        processed = self.preprocess(img)
        
        # Detection
        results = self.detect(processed)
        
        # Postprocess
        result_img, detections = self.postprocess(processed, results)
        
        # Lưu lịch sử
        self.detections_history.append(detections)
        
        # Lưu kết quả
        if output_path:
            cv2.imwrite(output_path, result_img)
        
        return result_img, detections
    
    def process_video(self, video_path, output_path=None):
        """Xử lý video"""
        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            print(f"Không thể mở video: {video_path}")
            return
        
        fps = int(cap.get(cv2.CAP_PROP_FPS))
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        
        # Video writer
        out = None
        if output_path:
            fourcc = cv2.VideoWriter_fourcc(*'mp4v')
            out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
        
        frame_count = 0
        total_detections = []
        start_time = time.time()
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            
            # Xử lý frame
            processed = self.preprocess(frame)
            results = self.detect(processed)
            result_frame, detections = self.postprocess(processed, results)
            
            # Thống kê
            frame_count += 1
            total_detections.extend(detections)
            
            # Hiển thị FPS
            if frame_count % 10 == 0:
                elapsed = time.time() - start_time
                fps_current = frame_count / elapsed
                cv2.putText(result_frame, f"FPS: {fps_current:.1f}", (10, 30),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
            
            # Ghi video
            if out:
                out.write(result_frame)
            
            # Hiển thị
            cv2.imshow('Vision Pipeline', result_frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        
        cap.release()
        if out:
            out.release()
        cv2.destroyAllWindows()
        
        # Thống kê
        print(f"\nThống kê xử lý video:")
        print(f"  Tổng số frame: {frame_count}")
        print(f"  Tổng số đối tượng phát hiện: {len(total_detections)}")
        if total_detections:
            classes = {}
            for d in total_detections:
                classes[d['class']] = classes.get(d['class'], 0) + 1
            print("  Phân bố lớp:")
            for cls, count in sorted(classes.items(), key=lambda x: -x[1]):
                print(f"    {cls}: {count}")
    
    def generate_report(self, output_path='output/report.txt'):
        """Tạo báo cáo thống kê"""
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write("=" * 60 + "\n")
            f.write("BÁO CÁO THỐNG KÊ DETECTION\n")
            f.write("=" * 60 + "\n\n")
            
            # Thống kê từ lịch sử
            all_detections = []
            for dets in self.detections_history:
                all_detections.extend(dets)
            
            f.write(f"Tổng số lần detect: {len(self.detections_history)}\n")
            f.write(f"Tổng số đối tượng: {len(all_detections)}\n\n")
            
            if all_detections:
                classes = {}
                for d in all_detections:
                    classes[d['class']] = classes.get(d['class'], 0) + 1
                f.write("Phân bố đối tượng:\n")
                for cls, count in sorted(classes.items(), key=lambda x: -x[1]):
                    f.write(f"  {cls}: {count}\n")
            
            f.write("\n" + "=" * 60 + "\n")

def main():
    # ---- Khởi tạo pipeline ----
    pipeline = VisionPipeline(conf_threshold=0.3)
    
    # ---- Xử lý ảnh ----
    print("=== XỬ LÝ ẢNH ===")
    result, detections = pipeline.process_image('images/sample.jpg', 'output/pipeline_result.jpg')
    
    if result is not None:
        plt.figure(figsize=(12, 6))
        plt.imshow(cv2.cvtColor(result, cv2.COLOR_BGR2RGB))
        plt.title('Kết quả Detection Pipeline')
        plt.axis('off')
        plt.show()
        
        print(f"Phát hiện {len(detections)} đối tượng:")
        for d in detections:
            print(f"  {d['class']}: {d['confidence']:.2f}")
    
    # ---- Xử lý video (nếu có) ----
    # pipeline.process_video('images/input_video.mp4', 'output/output_video.mp4')
    
    # ---- Tạo báo cáo ----
    pipeline.generate_report()
    print("\nĐã tạo báo cáo tại output/report.txt")

if __name__ == "__main__":
    main()
```
</div>

---

## Bài tập nâng cao (Tự chọn)

### Bài 8: Huấn luyện YOLO trên dataset tùy chỉnh
- Thu thập dữ liệu ảnh (khoảng 200-500 ảnh) và gán nhãn bằng CVAT/LabelImg
- Fine-tune YOLOv8 với dữ liệu tùy chỉnh
- Đánh giá mAP (mean Average Precision)

### Bài 9: Phân đoạn toàn cảnh (Panoptic Segmentation)
- Kết hợp semantic và instance segmentation
- Sử dụng mô hình Panoptic FPN (từ detectron2 hoặc transformers)
- So sánh ba loại phân đoạn

### Bài 10: Ứng dụng Vision Transformer (ViT)
- Sử dụng ViT pretrained để phân loại ảnh
- So sánh với CNN truyền thống
- Visualization attention map

### Bài 11: Xây dựng API cho mô hình CV
- Dùng FastAPI để xây dựng REST API cho phân loại/detection
- Nhận ảnh từ client, xử lý và trả về kết quả JSON
- Triển khai lên cloud hoặc edge device

### Bài 12: Ứng dụng AR (Augmented Reality)
- Phát hiện đối tượng và overlay 3D model
- Sử dụng OpenCV + MediaPipe
- Vẽ khung hình ảo lên khuôn mặt hoặc vật thể
