# Bài tập thực hành chương 5

---


## 1. Tổng quan về Thị giác máy tính

---



### 1.1. Kiến trúc hệ thống Computer Vision
**📌 Bài tập 1:**
Mô phỏng **kiến trúc 4 giai đoạn** của hệ thống Computer Vision bằng OpenCV trên ảnh `data.coins()`. Yêu cầu:
1. Giai đoạn 1 — Tiền xử lý: lọc nhiễu Gaussian, resize.
2. Giai đoạn 2 — Trích xuất đặc trưng: phát hiện biên Canny, keypoint ORB.
3. Giai đoạn 3 — Hiểu và nhận thức: phân đoạn Otsu + đếm contour.
4. Giai đoạn 4 — Ra quyết định: in ra số đối tượng phát hiện được.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# Tải ảnh đầu vào
img = data.coins()
print(f"Ảnh gốc: shape={img.shape}, dtype={img.dtype}")

# === GIAI ĐOẠN 1 — TIỀN XỬ LÝ ===
# Làm sạch dữ liệu đầu vào
blurred = cv2.GaussianBlur(img, (5, 5), 1.5)
resized = cv2.resize(blurred, (256, 256))
normalized = resized / 255.0

# === GIAI ĐOẠN 2 — TRÍCH XUẤT ĐẶC TRƯNG ===
# Phát hiện biên và keypoint
edges = cv2.Canny(resized, 50, 150)
orb = cv2.ORB_create(nfeatures=200)
kps, desc = orb.detectAndCompute(resized, None)
keypoint_vis = cv2.drawKeypoints(resized, kps, None,
                                 color=(0, 255, 0),
                                 flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)

# === GIAI ĐOẠN 3 — HIỂU VÀ NHẬN THỨC ===
# Phân đoạn và đếm đối tượng
_, th = cv2.threshold(resized, 0, 255,
                       cv2.THRESH_BINARY + cv2.THRESH_OTSU)
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
closed = cv2.morphologyEx(th, cv2.MORPH_CLOSE, kernel, iterations=2)
contours, _ = cv2.findContours(closed, cv2.RETR_EXTERNAL,
                                cv2.CHAIN_APPROX_SIMPLE)
valid = [c for c in contours if cv2.contourArea(c) > 100]

# === GIAI ĐOẠN 4 — RA QUYẾT ĐỊNH ===
result = cv2.cvtColor(resized, cv2.COLOR_GRAY2RGB)
for i, c in enumerate(valid, 1):
    cv2.drawContours(result, [c], -1, (255, 0, 0), 2)

print(f"\n=== KẾT QUẢ RA QUYẾT ĐỊNH ===")
print(f"Số đối tượng phát hiện: {len(valid)}")

# Hiển thị 4 giai đoạn
fig, axes = plt.subplots(1, 4, figsize=(20, 5))
axes[0].imshow(blurred, cmap='gray');       axes[0].set_title('1. Tiền xử lý')
axes[1].imshow(keypoint_vis, cmap='gray');  axes[1].set_title(f'2. Đặc trưng\n{len(kps)} keypoint')
axes[2].imshow(closed, cmap='gray');        axes[2].set_title('3. Nhận thức\n(Otsu + Morphology)')
axes[3].imshow(result);                     axes[3].set_title(f'4. Quyết định\n{len(valid)} đối tượng')
for ax in axes: ax.axis('off')
plt.suptitle('Kiến trúc 4 giai đoạn của hệ thống Computer Vision',
             fontsize=13, fontweight='bold')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Ảnh được xử lý qua 4 giai đoạn tuần tự.
- Số đối tượng (đồng xu) được đếm tự động.
- Mỗi giai đoạn có đầu ra riêng biệt, tương ứng với lý thuyết.

---





### 1.2. So sánh Computer Vision và Xử lý ảnh
**📌 Bài tập 2:**
Minh họa sự khác biệt giữa **xử lý ảnh** và **Computer Vision** trên cùng một ảnh. Yêu cầu:
1. Xử lý ảnh: tăng cường chất lượng (cân bằng histogram, khử nhiễu).
2. Computer Vision: đưa ra quyết định (phát hiện đối tượng).
3. Hiển thị song song để thấy sự khác biệt về **mục đích đầu ra**.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

img = data.camera()

# === VAI TRÒ XỬ LÝ ẢNH ===
# Mục đích: cải thiện chất lượng ảnh
# Kỹ thuật: lọc, ngưỡng hóa, hình thái học
eq_img = cv2.equalizeHist(img)          # cân bằng histogram
denoised = cv2.medianBlur(eq_img, 3)    # khử nhiễu muối tiêu
# Đầu ra: ảnh đã được cải thiện

# === VAI TRÒ COMPUTER VISION ===
# Mục đích: hiểu nội dung ảnh
# Kỹ thuật: nhận dạng mẫu, phát hiện đối tượng
_, th = cv2.threshold(denoised, 0, 255,
                       cv2.THRESH_BINARY + cv2.THRESH_OTSU)
contours, _ = cv2.findContours(th, cv2.RETR_EXTERNAL,
                                cv2.CHAIN_APPROX_SIMPLE)
valid = [c for c in contours if cv2.contourArea(c) > 500]

cv_result = cv2.cvtColor(denoised, cv2.COLOR_GRAY2RGB)
for c in valid:
    x, y, w, h = cv2.boundingRect(c)
    cv2.rectangle(cv_result, (x, y), (x+w, y+h), (255, 0, 0), 2)

# So sánh đầu ra
fig, axes = plt.subplots(1, 4, figsize=(20, 5))
axes[0].imshow(img, cmap='gray');        axes[0].set_title('Ảnh gốc')
axes[1].imshow(eq_img, cmap='gray');     axes[1].set_title('Xử lý ảnh:\nCân bằng histogram')
axes[2].imshow(denoised, cmap='gray');   axes[2].set_title('Xử lý ảnh:\nKhử nhiễu')
axes[3].imshow(cv_result);               axes[3].set_title(f'Computer Vision:\n{len(valid)} đối tượng')
for ax in axes: ax.axis('off')
plt.suptitle('Xử lý ảnh cải thiện chất lượng — Computer Vision hiểu nội dung',
             fontsize=13, fontweight='bold')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Hai cột đầu: ảnh được cải thiện nhưng **không có thông tin mới**.
- Cột cuối: ảnh được gán **thông tin có nghĩa** (vị trí đối tượng).

---


## 2. Các bài toán trong Thị giác máy tính

---


### 2.1. Bài toán Classification — Color Histogram + k-NN

**📌 Bài tập 3:**
Mô phỏng bài toán **Classification** với đặc trưng **color histogram**. Yêu cầu:
1. Cắt 3 vùng khác nhau từ `data.astronaut()`: mặt, nền xanh, áo.
2. Tính feature vector color histogram (8 bins/kênh) cho mỗi vùng.
3. Dùng k-NN để phân loại vùng mới dựa trên 3 vùng mẫu.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data
from sklearn.neighbors import KNeighborsClassifier

img_rgb = data.astronaut()

# Tạo 3 vùng mẫu (mỗi vùng là 1 lớp)
face     = img_rgb[60:180,  200:320]
sky      = img_rgb[0:80,    0:200]
clothing = img_rgb[300:400, 100:300]

# Hàm trích xuất đặc trưng color histogram
def color_hist(img, bins=8):
    h = cv2.calcHist([img], [0, 1, 2], None,
                     [bins, bins, bins],
                     [0, 256, 0, 256, 0, 256])
    h = h.flatten()
    return h / h.sum()

# Tạo tập huấn luyện
X_train = np.array([
    color_hist(face),
    color_hist(sky),
    color_hist(clothing),
])
y_train = np.array([0, 1, 2])   # 0=face, 1=sky, 2=clothing
class_names = ['Mặt', 'Nền xanh', 'Áo']

# Huấn luyện k-NN
knn = KNeighborsClassifier(n_neighbors=1).fit(X_train, y_train)

# Phân loại vùng mới (crop từ vị trí khác)
test_region = img_rgb[380:450, 150:250]   # vùng vai/áo khác
pred = knn.predict([color_hist(test_region)])[0]
print(f"Vùng test được phân loại là: {class_names[pred]}")

# Trực quan hóa
fig, axes = plt.subplots(1, 4, figsize=(16, 5))
axes[0].imshow(face);     axes[0].set_title('Mẫu 1: Mặt')
axes[1].imshow(sky);      axes[1].set_title('Mẫu 2: Nền xanh')
axes[2].imshow(clothing); axes[2].set_title('Mẫu 3: Áo')
axes[3].imshow(test_region)
axes[3].set_title(f'Test → Dự đoán: {class_names[pred]}')
for ax in axes: ax.axis('off')
plt.suptitle('Bài toán Classification với color histogram + k-NN',
             fontsize=13, fontweight='bold')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Vùng test được gán nhãn dựa trên đặc trưng màu sắc gần nhất với vùng mẫu.
- Minh họa nguyên lý Classification: **1 ảnh → 1 nhãn**.

---


### 2.2. Bài toán Object Detection — Haar Cascade

**📌 Bài tập 4:**
Mô phỏng bài toán **Object Detection** với Haar Cascade. Yêu cầu:
1. Tải Haar Cascade XML tự động vào `/tmp/`.
2. Phát hiện khuôn mặt trong `data.astronaut()`.
3. Vẽ bounding box và in tọa độ từng đối tượng.

```python
%pip uninstall -y opencv-python opencv-python-headless opencv-contrib-python -q
%pip install "opencv-contrib-python==4.10.0.84" -q
```

```python
import os
import tempfile
import urllib.request
import cv2
import matplotlib.pyplot as plt
from skimage import data

# Hàm load cascade hỗ trợ OpenCV 4.x và 5.0
def get_cascade_classifier():
    if hasattr(cv2, 'CascadeClassifier'):
        return cv2.CascadeClassifier
    elif hasattr(cv2, 'objdetect') and hasattr(cv2.objdetect, 'CascadeClassifier'):
        return cv2.objdetect.CascadeClassifier
    raise AttributeError("Không tìm thấy CascadeClassifier")

def load_cascade(filename):
    filepath = os.path.join(tempfile.gettempdir(), filename)
    if not os.path.exists(filepath):
        url = (f"https://raw.githubusercontent.com/opencv/opencv/"
               f"master/data/haarcascades/{filename}")
        urllib.request.urlretrieve(url, filepath)
        print(f"Đã tải: {filename}")
    return get_cascade_classifier()(filepath)

# Tải cascade
face_cascade = load_cascade("haarcascade_frontalface_default.xml")

# Phát hiện khuôn mặt
img_rgb = data.astronaut()
img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)
faces = face_cascade.detectMultiScale(img_gray, 1.1, 5, minSize=(30, 30))

# Vẽ bounding box
result = img_rgb.copy()
print(f"\n=== KẾT QUẢ DETECTION ===")
print(f"Số khuôn mặt phát hiện: {len(faces)}")
print(f"{'STT':>4}{'x':>6}{'y':>6}{'w':>6}{'h':>6}")
print("-" * 28)
for i, (x, y, w, h) in enumerate(faces, 1):
    cv2.rectangle(result, (x, y), (x+w, y+h), (255, 0, 0), 3)
    print(f"{i:>4}{x:>6}{y:>6}{w:>6}{h:>6}")

plt.figure(figsize=(8, 8))
plt.imshow(result)
plt.title(f'Object Detection: {len(faces)} khuôn mặt')
plt.axis('off'); plt.show()
```

**Kết quả mong đợi:**
- Bounding box đỏ khoanh vùng khuôn mặt.
- Bảng tọa độ từng đối tượng được in ra.
- Minh họa nguyên lý Detection: **ảnh → danh sách + bounding box + nhãn**.

---


### 2.3. Bài toán Segmentation — Otsu + Morphology + Contour

**📌 Bài tập 5:**
Mô phỏng bài toán **Segmentation** với pipeline Otsu + Morphology. Yêu cầu:
1. Phân đoạn ảnh `data.coins()`.
2. So sánh **Semantic Segmentation** và **Instance Segmentation** (thông qua label).
3. Hiển thị mask kết quả.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data
from skimage.measure import label
from skimage.color import label2rgb

img = data.coins()

# === SEMANTIC SEGMENTATION ===
# Gán nhãn theo lớp (nhị phân: nền/đối tượng)
blurred = cv2.GaussianBlur(img, (5, 5), 1.5)
_, semantic_mask = cv2.threshold(blurred, 0, 255,
                                  cv2.THRESH_BINARY + cv2.THRESH_OTSU)
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
semantic_mask = cv2.morphologyEx(semantic_mask, cv2.MORPH_CLOSE,
                                  kernel, iterations=2)

# === INSTANCE SEGMENTATION ===
# Gán nhãn cho từng cá thể riêng biệt
binary = (semantic_mask > 0).astype(np.uint8)
instance_labels = label(binary)
n_instances = instance_labels.max()

# Loại bỏ các vùng nhỏ (nhiễu)
min_area = 100
for i in range(1, n_instances + 1):
    if np.sum(instance_labels == i) < min_area:
        instance_labels[instance_labels == i] = 0
instance_labels = label(instance_labels > 0)
n_clean = instance_labels.max()

# Tô màu cho instance segmentation
colored = label2rgb(instance_labels, image=img, bg_label=0)

print(f"Số instance ban đầu: {n_instances}")
print(f"Sau khi lọc nhiễu:   {n_clean}")

fig, axes = plt.subplots(1, 3, figsize=(16, 5))
axes[0].imshow(img, cmap='gray');           axes[0].set_title('Ảnh gốc')
axes[1].imshow(semantic_mask, cmap='gray'); axes[1].set_title('Semantic Segmentation\n(1 nhãn cho tất cả đồng xu)')
axes[2].imshow(colored);                    axes[2].set_title(f'Instance Segmentation\n({n_clean} cá thể riêng)')
for ax in axes: ax.axis('off')
plt.suptitle('So sánh Semantic vs Instance Segmentation',
             fontsize=13, fontweight='bold')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- **Semantic:** tất cả đồng xu cùng màu (cùng lớp).
- **Instance:** mỗi đồng xu có màu khác nhau (cá thể riêng biệt).
- Minh họa sự khác biệt rõ ràng giữa 2 loại segmentation.

---


### 2.4. Bài toán Keypoint — ORB Detector

**📌 Bài tập 6:**
Mô phỏng bài toán **Phát hiện điểm đặc trưng** với ORB. Yêu cầu:
1. Phát hiện keypoint trên ảnh `data.camera()`.
2. Đo **thời gian phát hiện** và **số keypoint**.
3. Chứng minh tính **bất biến với rotation**: xoay ảnh 90°, phát hiện lại và so sánh.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data
import time

img = data.camera()

# Phát hiện keypoint trên ảnh gốc
orb = cv2.ORB_create(nfeatures=500)
t0 = time.time()
kps1, desc1 = orb.detectAndCompute(img, None)
t1 = time.time()
print(f"Ảnh gốc:  {len(kps1)} keypoint, {(t1-t0)*1000:.2f} ms")

# Xoay ảnh 90 độ và phát hiện lại
img_rot = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
t0 = time.time()
kps2, desc2 = orb.detectAndCompute(img_rot, None)
t1 = time.time()
print(f"Xoay 90°: {len(kps2)} keypoint, {(t1-t0)*1000:.2f} ms")

# Matching giữa 2 ảnh để chứng minh bất biến
bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
matches = sorted(bf.match(desc1, desc2), key=lambda x: x.distance)
print(f"Số match: {len(matches)}")

# Vẽ
out1 = cv2.drawKeypoints(img, kps1, None, color=(0, 255, 0),
                         flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
out2 = cv2.drawKeypoints(img_rot, kps2, None, color=(0, 255, 0),
                         flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
match_vis = cv2.drawMatches(img, kps1, img_rot, kps2,
                             matches[:30], None, flags=2)

fig, axes = plt.subplots(1, 3, figsize=(18, 5))
axes[0].imshow(out1, cmap='gray'); axes[0].set_title(f'Ảnh gốc\n{len(kps1)} keypoint')
axes[1].imshow(out2, cmap='gray'); axes[1].set_title(f'Xoay 90°\n{len(kps2)} keypoint')
axes[2].imshow(match_vis);         axes[2].set_title(f'Top-30 match')
for ax in axes: ax.axis('off')
plt.suptitle('Keypoint bất biến với rotation',
             fontsize=13, fontweight='bold')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Số keypoint tương tự giữa ảnh gốc và ảnh xoay.
- Nhiều match thành công → chứng minh tính **bất biến với rotation**.

---


### 2.5. Bài toán OCR — Template Matching

**📌 Bài tập 7:**
Mô phỏng bài toán **OCR** đơn giản với Template Matching. Yêu cầu:
1. Tạo template chữ số `0-9` bằng `cv2.putText`.
2. Sinh ảnh "biển số" chứa chuỗi `"2024"`.
3. Chia ảnh thành các ô, phân loại từng ô.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Tạo template chữ số
def make_digit(d):
    img = np.zeros((60, 40), dtype=np.uint8)
    cv2.putText(img, str(d), (5, 45),
                cv2.FONT_HERSHEY_SIMPLEX, 1.5, 255, 3)
    return img

templates = {d: make_digit(d) for d in range(10)}

# Sinh ảnh biển số
plate = np.zeros((80, 320), dtype=np.uint8)
cv2.putText(plate, "2024", (10, 60),
            cv2.FONT_HERSHEY_SIMPLEX, 2.0, 255, 4)
plate = cv2.copyMakeBorder(plate, 10, 10, 10, 10,
                            cv2.BORDER_CONSTANT, value=0)

# OCR từng ký tự
step = plate.shape[1] // 4
predicted = ""
print(f"{'Ô':>4}{'Dự đoán':>10}{'Score':>10}")
print("-" * 26)

for i in range(4):
    roi = plate[:, i*step:(i+1)*step]
    roi_rs = cv2.resize(roi, (40, 60))
    best_digit, best_score = None, -np.inf
    for d, tmpl in templates.items():
        res = cv2.matchTemplate(roi_rs, tmpl, cv2.TM_CCOEFF_NORMED)
        _, max_val, _, _ = cv2.minMaxLoc(res)
        if max_val > best_score:
            best_score = max_val
            best_digit = d
    predicted += str(best_digit)
    print(f"{i+1:>4}{best_digit:>10}{best_score:>10.3f}")

ground_truth = "2024"
print(f"\nGround truth: {ground_truth}")
print(f"Dự đoán     : {predicted}")
print(f"Khớp?       : {predicted == ground_truth}")

# Hiển thị
out = cv2.cvtColor(plate, cv2.COLOR_GRAY2RGB)
for i in range(4):
    x0 = i * step
    cv2.rectangle(out, (x0, 0), (x0 + step, out.shape[0]), (0, 255, 0), 1)

plt.figure(figsize=(10, 3))
plt.imshow(out)
plt.title(f'OCR: GT="{ground_truth}" | Dự đoán="{predicted}"')
plt.axis('off'); plt.show()
```

**Kết quả mong đợi:**
- Chuỗi `"2024"` được đọc chính xác.
- Score của từng ký tự > 0.5.
- Minh họa OCR cổ điển: **ảnh → văn bản**.

---


### 2.6. Bài toán 3D — Stereo Vision đơn giản

**📌 Bài tập 8:**
Mô phỏng bài toán **tái tạo 3D** với **Stereo Vision**. Yêu cầu:
1. Tạo 2 ảnh stereo từ `data.camera()` (dịch chuyển ngang).
2. Tính **disparity map** bằng `cv2.StereoSGBM`.
3. Ước lượng **depth map** từ disparity.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# Tạo cặp ảnh stereo từ 1 ảnh (mô phỏng)
img_left = data.camera()
shift = 20
img_right = np.roll(img_left, -shift, axis=1)

# Tính disparity map
stereo = cv2.StereoSGBM_create(
    minDisparity=0,
    numDisparities=64,
    blockSize=11,
    P1=8 * 3 * 11 ** 2,
    P2=32 * 3 * 11 ** 2,
)
disparity = stereo.compute(img_left, img_right).astype(np.float32) / 16.0

# Ước lượng depth từ disparity
# Công thức: depth = focal_length * baseline / disparity
focal_length = 500    # giả định
baseline = 0.1        # giả định 10 cm
depth = np.zeros_like(disparity)
valid = disparity > 0
depth[valid] = focal_length * baseline / disparity[valid]

# Chuẩn hóa để hiển thị
disp_norm = cv2.normalize(disparity, None, 0, 255,
                          cv2.NORM_MINMAX).astype(np.uint8)
depth_norm = cv2.normalize(depth, None, 0, 255,
                            cv2.NORM_MINMAX).astype(np.uint8)

print(f"Baseline: {baseline*100:.0f} cm")
print(f"Focal length: {focal_length} pixels")
print(f"Disparity range: {disparity[valid].min():.1f} – {disparity[valid].max():.1f} pixels")

fig, axes = plt.subplots(1, 4, figsize=(20, 5))
axes[0].imshow(img_left, cmap='gray');  axes[0].set_title('Ảnh trái')
axes[1].imshow(img_right, cmap='gray'); axes[1].set_title(f'Ảnh phải (dịch {shift}px)')
axes[2].imshow(disp_norm, cmap='jet');  axes[2].set_title('Disparity map')
axes[3].imshow(depth_norm, cmap='jet'); axes[3].set_title('Depth map (ước lượng)')
for ax in axes: ax.axis('off')
plt.suptitle('Stereo Vision — Tái tạo 3D từ 2 ảnh',
             fontsize=13, fontweight='bold')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- **Disparity map:** vùng gần camera có disparity lớn.
- **Depth map:** ngược lại, vùng gần có depth nhỏ.
- Minh họa nguyên lý tái tạo 3D từ **nhiều ảnh chụp**.

---


## 3. Quy trình và công cụ

---


### 3.1. Pipeline hoàn chỉnh

**📌 Bài tập 9:**
Áp dụng **pipeline 7 bước** xây dựng hệ thống Computer Vision vào bài toán đếm đối tượng. Yêu cầu in ra từng bước của pipeline.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data
from collections import Counter

# === BƯỚC 1 — XÁC ĐỊNH BÀI TOÁN ===
print("Bước 1: Bài toán đếm và phân loại đồng xu theo kích thước")

# === BƯỚC 2 — THU THẬP DỮ LIỆU ===
img = data.coins()
print(f"Bước 2: Ảnh đầu vào shape={img.shape}")

# === BƯỚC 3 — GÁN NHÃN DỮ LIỆU ===
# Không cần thiết cho bài toán không giám sát (dùng rule-based)
print("Bước 3: Không cần gán nhãn (dùng rule-based)")

# === BƯỚC 4 — TIỀN XỬ LÝ ===
blurred = cv2.GaussianBlur(img, (5, 5), 1.5)
_, th = cv2.threshold(blurred, 0, 255,
                       cv2.THRESH_BINARY + cv2.THRESH_OTSU)
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
closed = cv2.morphologyEx(th, cv2.MORPH_CLOSE, kernel, iterations=2)
print("Bước 4: Đã làm sạch ảnh")

# === BƯỚC 5 — XÂY DỰNG MÔ HÌNH ===
# Rule-based: phân loại theo percentile diện tích
contours, _ = cv2.findContours(closed, cv2.RETR_EXTERNAL,
                                cv2.CHAIN_APPROX_SIMPLE)
valid = [c for c in contours if cv2.contourArea(c) > 200]
areas = np.array([cv2.contourArea(c) for c in valid])
thresh_small = np.percentile(areas, 33)
thresh_large = np.percentile(areas, 66)

def classify(area):
    if area < thresh_small: return 'small'
    if area < thresh_large: return 'medium'
    return 'large'

labels = [classify(a) for a in areas]
counts = Counter(labels)
print(f"Bước 5: Ngưỡng diện tích nhỏ/vừa: {thresh_small:.0f}/{thresh_large:.0f}")

# === BƯỚC 6 — ĐÁNH GIÁ ===
# Không có ground truth → in kết quả
print(f"Bước 6: Số đối tượng = {len(valid)}")
print(f"         Phân loại   = {dict(counts)}")

# === BƯỚC 7 — TRIỂN KHAI ===
color_map = {'small': (255, 100, 100),
             'medium': (100, 255, 100),
             'large': (255, 200, 0)}
result = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
for c, lbl in zip(valid, labels):
    cv2.drawContours(result, [c], -1, color_map[lbl], 2)
    M = cv2.moments(c)
    if M['m00'] > 0:
        cx = int(M['m10'] / M['m00'])
        cy = int(M['m01'] / M['m00'])
        cv2.putText(result, lbl[0].upper(), (cx-8, cy+8),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
print("Bước 7: Đã xuất kết quả")

fig, axes = plt.subplots(1, 3, figsize=(16, 5))
axes[0].imshow(img, cmap='gray');    axes[0].set_title('1. Ảnh gốc')
axes[1].imshow(closed, cmap='gray'); axes[1].set_title('4. Tiền xử lý')
axes[2].imshow(result)
axes[2].set_title(f'7. Kết quả\nS={counts["small"]}, M={counts["medium"]}, L={counts["large"]}')
for ax in axes: ax.axis('off')
plt.suptitle('Pipeline 7 bước xây dựng hệ thống CV',
             fontsize=13, fontweight='bold')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Cả 7 bước đều được in ra console.
- Đối tượng được phân loại thành 3 nhóm kích thước.
- Kết quả trực quan với màu khác nhau cho từng nhóm.

---


## 4. Mô hình AI trong Thị giác máy tính

---


### 4.1. Mô hình AI — So sánh với lập trình truyền thống

**📌 Bài tập 10:**
Minh họa sự khác biệt giữa **lập trình truyền thống** và **mô hình AI** qua bài toán phân loại hình học đơn giản.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# ============================================================
# CÁCH 1: LẬP TRÌNH TRUYỀN THỐNG
# Con người viết quy tắc: đếm số đỉnh
# ============================================================
def traditional_classify(img):
    """Rule-based: đếm số đỉnh của contour."""
    _, th = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)
    cnts, _ = cv2.findContours(th, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    c = max(cnts, key=cv2.contourArea)
    peri = cv2.arcLength(c, True)
    approx = cv2.approxPolyDP(c, 0.02 * peri, True)
    n = len(approx)
    if n == 3: return 0     # tam giác
    if n == 4: return 1     # vuông
    return 2                # tròn

# ============================================================
# CÁCH 2: MÔ HÌNH AI
# Máy tự học quy tắc từ dữ liệu
# ============================================================
def gen_shape(shape_type, size=64):
    img = np.zeros((size, size), dtype=np.uint8)
    c = (size // 2, size // 2)
    if shape_type == 'circle':
        cv2.circle(img, c, size // 3, 255, -1)
    elif shape_type == 'square':
        s = size // 3
        cv2.rectangle(img, (c[0]-s, c[1]-s), (c[0]+s, c[1]+s), 255, -1)
    elif shape_type == 'triangle':
        s = size // 3
        pts = np.array([[c[0], c[1]-s], [c[0]-s, c[1]+s], [c[0]+s, c[1]+s]])
        cv2.fillPoly(img, [pts], 255)
    return img

def extract_features(img):
    _, th = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)
    cnts, _ = cv2.findContours(th, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    c = max(cnts, key=cv2.contourArea)
    area = cv2.contourArea(c)
    peri = cv2.arcLength(c, True)
    approx = cv2.approxPolyDP(c, 0.02 * peri, True)
    circ = 4 * np.pi * area / (peri ** 2) if peri > 0 else 0
    return np.array([len(approx), circ, area])

# Sinh dataset
np.random.seed(42)
X, y = [], []
for label, shape in enumerate(['triangle', 'square', 'circle']):
    for _ in range(30):
        img = gen_shape(shape)
        X.append(extract_features(img))
        y.append(label)

X = np.array(X); y = np.array(y)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=42)

# Huấn luyện k-NN
knn = KNeighborsClassifier(n_neighbors=3).fit(X_tr, y_tr)
y_pred = knn.predict(X_te)
acc = accuracy_score(y_te, y_pred)

print("=== SO SÁNH 2 CÁCH TIẾP CẬN ===")
print(f"Lập trình truyền thống: Con người viết quy tắc 'n == 3 → tam giác'")
print(f"Mô hình AI:            Máy học từ {len(X_tr)} mẫu")
print(f"\nAccuracy của mô hình AI: {acc*100:.2f}%")

# Trực quan hóa
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
for i, shape in enumerate(['triangle', 'square', 'circle']):
    axes[i].imshow(gen_shape(shape), cmap='gray')
    axes[i].set_title(f'{shape}\n(label={i})')
    axes[i].axis('off')
plt.suptitle('Lập trình truyền thống (rules) vs Mô hình AI (học từ data)',
             fontsize=13, fontweight='bold')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Lập trình truyền thống: cần **định nghĩa quy tắc** thủ công.
- Mô hình AI: **học từ dữ liệu**, không cần viết quy tắc.
- Minh họa rõ sự khác biệt cốt lõi.

---


### 4.2. Mô hình ResNet — Minh họa Transfer Learning

**📌 Bài tập 11:**
Minh họa **Transfer Learning** với ResNet18. Yêu cầu:
1. Load ResNet18 pretrained.
2. Đóng băng các lớp đầu, thay lớp FC cuối cho 3 lớp mới.
3. In số tham số huấn luyện được so với tổng.

```python
# Cài đặt: %pip install torch torchvision -q
import torch
import torch.nn as nn
import torchvision.models as models

# Load ResNet18 pretrained
model = models.resnet18(pretrained=True)

# Đếm tham số trước khi đóng băng
total_params = sum(p.numel() for p in model.parameters())
print(f"Tổng số tham số ResNet18: {total_params:,}")

# Đóng băng các lớp đầu
for param in model.parameters():
    param.requires_grad = False

# Thay lớp FC cuối cho 3 lớp mới
num_classes = 3
model.fc = nn.Linear(512, num_classes)

# Đếm tham số huấn luyện được
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
frozen = total_params - trainable

print(f"\n=== SAU KHI TRANSFER LEARNING ===")
print(f"Tham số đóng băng  : {frozen:,} ({frozen/total_params*100:.1f}%)")
print(f"Tham số huấn luyện : {trainable:,} ({trainable/total_params*100:.1f}%)")
print(f"→ Chỉ cần huấn luyện ~{trainable/1e3:.0f}K tham số")
print(f"→ Thay vì {total_params/1e6:.1f}M tham số!")

# Forward pass với input giả
dummy = torch.randn(1, 3, 224, 224)
model.eval()
with torch.no_grad():
    output = model(dummy)
print(f"\nInput shape : {tuple(dummy.shape)}")
print(f"Output shape: {tuple(output.shape)}")
```

**Kết quả mong đợi:**
- ResNet18 có ~11.7M tham số.
- Sau khi đóng băng chỉ còn ~1.5K tham số cần huấn luyện (~0.013%).
- Minh họa hiệu quả của **Transfer Learning** với dữ liệu nhỏ.

---


### 4.3. Mô hình YOLO — Xử lý output detection

**📌 Bài tập 12:**
Mô phỏng **xử lý output của YOLO**. Tạo output giả (shape `(N, 85)`) và xử lý: lọc confidence, chuyển đổi tọa độ, vẽ bounding box.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt
from skimage import data

# Tải ảnh
img = data.astronaut()
h, w = img.shape[:2]

# === MÔ PHỎNG OUTPUT YOLO ===
# Output shape: (N, 85) = [x_center, y_center, w, h, objectness, 80 class_scores]
np.random.seed(42)
mock_output = np.zeros((5, 85))
mock_output[:, 4] = [0.92, 0.85, 0.78, 0.45, 0.30]   # objectness
mock_output[:, 5] = 1   # class index 0 (person) có score = 1
mock_output[:, :4] = [
    [0.50, 0.20, 0.20, 0.30],   # đầu
    [0.50, 0.55, 0.45, 0.40],   # áo
    [0.50, 0.85, 0.35, 0.20],   # chân
    [0.20, 0.50, 0.15, 0.25],   # vai trái
    [0.80, 0.50, 0.15, 0.25],   # vai phải
]

# === XỬ LÝ OUTPUT ===
conf_threshold = 0.5
class_names = {0: 'person'}   # ✅ SỬA: class 0 là "person" (COCO dataset)

out = img.copy()
detections = []

for det in mock_output:
    conf = det[4]
    if conf < conf_threshold:
        continue

    # argmax trả về index trong mảng class scores → đây chính là class_id
    class_id = int(np.argmax(det[5:]))

    xc, yc, bw, bh = det[:4]
    # Chuyển từ tọa độ chuẩn hóa → pixel
    x1 = int((xc - bw/2) * w)
    y1 = int((yc - bh/2) * h)
    x2 = int((xc + bw/2) * w)
    y2 = int((yc + bh/2) * h)

    detections.append((x1, y1, x2, y2, class_names[class_id], conf))

    cv2.rectangle(out, (x1, y1), (x2, y2), (0, 255, 0), 2)
    cv2.putText(out, f'{class_names[class_id]} {conf:.2f}',
                (x1, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5,
                (0, 255, 0), 1)

print(f"Ngưỡng confidence: {conf_threshold}")
print(f"Tổng số detection ban đầu: {len(mock_output)}")
print(f"Sau khi lọc: {len(detections)}")
print(f"\n{'STT':>4}{'Class':>8}{'Conf':>8}{'x1':>6}{'y1':>6}{'x2':>6}{'y2':>6}")
print("-" * 44)
for i, d in enumerate(detections, 1):
    print(f"{i:>4}{d[4]:>8}{d[5]:>8.2f}{d[0]:>6}{d[1]:>6}{d[2]:>6}{d[3]:>6}")

plt.figure(figsize=(8, 8))
plt.imshow(out)
plt.title(f'YOLO output processing\n{len(detections)} detection hợp lệ')
plt.axis('off'); plt.show()
```

**Kết quả mong đợi:**
- Chỉ giữ detection có confidence > 0.5.
- Tọa độ chuẩn hóa được chuyển sang pixel.
- Minh họa pipeline xử lý output của YOLO.

---


### 4.4. Mô hình U-Net — Minh họa kiến trúc

**📌 Bài tập 13:**
Minh họa **kiến trúc U-Net** bằng PyTorch. Yêu cầu:
1. Xây dựng U-Net mini với 2 encoder + 2 decoder.
2. Forward pass với input giả.
3. Chứng minh **output cùng kích thước input** (semantic segmentation).

```python
import torch
import torch.nn as nn
import numpy as np
import matplotlib.pyplot as plt

class DoubleConv(nn.Module):
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 3, padding=1),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_ch, out_ch, 3, padding=1),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
        )
    def forward(self, x):
        return self.conv(x)

class MiniUNet(nn.Module):
    def __init__(self, in_ch=3, out_ch=3):
        super().__init__()
        # Encoder
        self.enc1 = DoubleConv(in_ch, 32)
        self.enc2 = DoubleConv(32, 64)
        self.pool = nn.MaxPool2d(2)
        # Bottleneck
        self.bottleneck = DoubleConv(64, 128)
        # Decoder
        self.up2  = nn.ConvTranspose2d(128, 64, 2, stride=2)
        self.dec2 = DoubleConv(128, 64)
        self.up1  = nn.ConvTranspose2d(64, 32, 2, stride=2)
        self.dec1 = DoubleConv(64, 32)
        self.out  = nn.Conv2d(32, out_ch, 1)

    def forward(self, x):
        # Encoder
        e1 = self.enc1(x)
        e2 = self.enc2(self.pool(e1))
        # Bottleneck
        b = self.bottleneck(self.pool(e2))
        # Decoder + skip connections
        d2 = self.up2(b)
        d2 = torch.cat([d2, e2], dim=1)   # skip
        d2 = self.dec2(d2)
        d1 = self.up1(d2)
        d1 = torch.cat([d1, e1], dim=1)   # skip
        d1 = self.dec1(d1)
        return self.out(d1)

model = MiniUNet(in_ch=3, out_ch=3)
dummy_input = torch.randn(1, 3, 64, 64)

with torch.no_grad():
    output = model(dummy_input)

total = sum(p.numel() for p in model.parameters())
print(f"=== KIẾN TRÚC U-NET MINI ===")
print(f"Tổng số tham số: {total:,}")
print(f"Input shape : {tuple(dummy_input.shape)}")
print(f"Output shape: {tuple(output.shape)}")
print(f"→ Output cùng kích thước input (pixel-wise classification)")

# Trực quan
mask = output.argmax(dim=1)[0].numpy()
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
axes[0].imshow(dummy_input[0].permute(1, 2, 0).numpy() * 0.5 + 0.5)
axes[0].set_title('Input (random)')
axes[1].imshow(mask, cmap='viridis')
axes[1].set_title('Segmentation mask (argmax)')
axes[2].imshow(output[0, 0].numpy(), cmap='gray')
axes[2].set_title('Class 0 logits')
for ax in axes: ax.axis('off')
plt.suptitle('Minh họa U-Net: input → mask cùng kích thước',
             fontsize=13, fontweight='bold')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Input `(1, 3, 64, 64)` → Output `(1, 3, 64, 64)`.
- Skip connections giữ chi tiết từ encoder sang decoder.
- Minh họa nguyên lý semantic segmentation.

---


### 4.5. Mô hình OpenPose — Keypoint giả lập

**📌 Bài tập 14:**
Minh họa **Pose Estimation** bằng cách vẽ **17 keypoint chuẩn COCO** và **16 cạnh skeleton** trên ảnh `data.astronaut()`.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt
from skimage import data

img = data.astronaut()
h, w = img.shape[:2]

# 17 keypoint chuẩn COCO với tọa độ giả lập (tỷ lệ ảnh)
keypoints = {
    'nose':           (0.50, 0.18),
    'left_eye':       (0.47, 0.16),
    'right_eye':      (0.53, 0.16),
    'left_ear':       (0.44, 0.17),
    'right_ear':      (0.56, 0.17),
    'left_shoulder':  (0.35, 0.30),
    'right_shoulder': (0.65, 0.30),
    'left_elbow':     (0.28, 0.45),
    'right_elbow':    (0.72, 0.45),
    'left_wrist':     (0.22, 0.60),
    'right_wrist':    (0.78, 0.60),
    'left_hip':       (0.40, 0.60),
    'right_hip':      (0.60, 0.60),
    'left_knee':      (0.38, 0.78),
    'right_knee':     (0.62, 0.78),
    'left_ankle':     (0.36, 0.95),
    'right_ankle':    (0.64, 0.95),
}

# Chuyển sang pixel
points = {k: (int(x * w), int(y * h)) for k, (x, y) in keypoints.items()}

# 16 cạnh skeleton chuẩn COCO
skeleton = [
    ('nose', 'left_eye'), ('nose', 'right_eye'),
    ('left_eye', 'left_ear'), ('right_eye', 'right_ear'),
    ('left_shoulder', 'right_shoulder'),
    ('left_shoulder', 'left_elbow'), ('left_elbow', 'left_wrist'),
    ('right_shoulder', 'right_elbow'), ('right_elbow', 'right_wrist'),
    ('left_shoulder', 'left_hip'), ('right_shoulder', 'right_hip'),
    ('left_hip', 'right_hip'),
    ('left_hip', 'left_knee'), ('left_knee', 'left_ankle'),
    ('right_hip', 'right_knee'), ('right_knee', 'right_ankle'),
]

# Vẽ skeleton
out = img.copy()
for p1, p2 in skeleton:
    cv2.line(out, points[p1], points[p2], (0, 255, 255), 3)

# Vẽ keypoint
for (x, y) in points.values():
    cv2.circle(out, (x, y), 6, (255, 0, 0), -1)
    cv2.circle(out, (x, y), 8, (255, 255, 255), 2)

print(f"=== POSE ESTIMATION ===")
print(f"Số keypoint: {len(points)}")
print(f"Số cạnh skeleton: {len(skeleton)}")
print(f"\nTọa độ 5 keypoint đầu:")
for i, (name, (x, y)) in enumerate(list(points.items())[:5], 1):
    print(f"  {i}. {name:<15} → ({x}, {y})")

fig, axes = plt.subplots(1, 2, figsize=(14, 6))
axes[0].imshow(img); axes[0].set_title('Ảnh gốc')
axes[1].imshow(out)
axes[1].set_title(f'Pose Estimation\n{len(points)} keypoint | {len(skeleton)} cạnh')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- 17 keypoint được vẽ đúng vị trí.
- 16 cạnh skeleton kết nối thành hình người.
- Minh họa nguyên lý Pose Estimation.

---


### 4.6. Foundation Model — Zero-shot CLIP mô phỏng

**📌 Bài tập 15:**
Minh họa **Zero-shot Classification** của CLIP bằng cách so sánh **image embedding** với **text embedding** (giả lập) qua **cosine similarity**.

```python
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

img = data.astronaut()

# === EMBEDDING ẢNH (giả lập 5 đặc trưng ngữ nghĩa) ===
def image_embedding(img):
    img_f = img.astype(np.float32) / 255.0
    return np.array([
        img_f.mean(),               # độ sáng
        img_f[:,:,0].mean(),        # tông đỏ
        img_f[:,:,1].mean(),        # tông xanh lá
        img_f[:,:,2].mean(),        # tông xanh dương
        img_f.std(),                # độ tương phản
    ])

# === EMBEDDING TEXT (giả lập dựa trên keyword) ===
def text_embedding(text):
    text = text.lower()
    v = np.array([0.5, 0.4, 0.4, 0.4, 0.25])
    if 'bright' in text or 'light' in text: v[0] = 0.7
    if 'dark' in text:                      v[0] = 0.3
    if 'red' in text:                       v[1] = 0.7
    if 'green' in text:                     v[2] = 0.7
    if 'blue' in text:                      v[3] = 0.7
    if 'colorful' in text or 'vivid' in text: v[4] = 0.5
    return v

# Cosine similarity
def cosine_sim(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# === ZERO-SHOT CLASSIFICATION ===
img_emb = image_embedding(img)
class_prompts = [
    "a bright colorful image",
    "a dark image",
    "an image with a lot of red",
    "an image with a lot of green",
    "an image with a lot of blue",
]

scores = []
print(f"=== ZERO-SHOT CLASSIFICATION ===")
print(f"{'Prompt':<35}{'Cosine Sim':>12}")
print("-" * 47)
for prompt in class_prompts:
    sim = cosine_sim(img_emb, text_embedding(prompt))
    scores.append((prompt, sim))
    print(f"{prompt:<35}{sim:>12.4f}")

# Sắp xếp và hiển thị
scores.sort(key=lambda x: -x[1])
print(f"\n→ CLIP dự đoán: '{scores[0][0]}'")

fig, axes = plt.subplots(1, 2, figsize=(14, 5))
axes[0].imshow(img); axes[0].set_title('Ảnh query'); axes[0].axis('off')

prompts_sorted = [s[0] for s in scores]
scores_sorted  = [s[1] for s in scores]
axes[1].barh(range(len(prompts_sorted)), scores_sorted, color='steelblue')
axes[1].set_yticks(range(len(prompts_sorted)))
axes[1].set_yticklabels([p[:28] for p in prompts_sorted])
axes[1].set_xlabel('Cosine similarity')
axes[1].set_title('Xếp hạng prompt theo độ tương đồng')
axes[1].invert_yaxis()
plt.suptitle('CLIP Zero-shot: ảnh + text cùng không gian vector',
             fontsize=13, fontweight='bold')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Prompt có cosine similarity cao nhất được chọn.
- Không cần huấn luyện, chỉ cần định nghĩa prompt.
- Minh họa nguyên lý **Zero-shot Classification** của CLIP.
---


## 5. Ứng dụng mô hình AI trong các bài toán thực tế

---


### 5.1. Phân loại chữ số viết tay với MNIST
**📌 Bài tập 16:**
Sử dụng tập dữ liệu **MNIST** có sẵn trong `sklearn.datasets.load_digits()`. Huấn luyện mô hình **k-NN** và **SVM**, sau đó **dự đoán trên tập test** và hiển thị kết quả trực quan (đúng/sai).

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix, ConfusionMatrixDisplay

# ============ BƯỚC 1: TẢI DỮ LIỆU ============
digits = load_digits()
X, y = digits.data, digits.target
print(f"Shape: {X.shape}, Số lớp: {len(digits.target_names)}")

# ============ BƯỚC 2: CHIA TRAIN/TEST ============
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2,
                                           random_state=42, stratify=y)

# ============ BƯỚC 3: HUẤN LUYỆN ============
knn = KNeighborsClassifier(n_neighbors=3).fit(X_tr, y_tr)
svm = SVC(kernel='rbf', C=10.0, random_state=42).fit(X_tr, y_tr)

# ============ BƯỚC 4: DỰ ĐOÁN TRÊN TẬP TEST ============
y_pred_knn = knn.predict(X_te)
y_pred_svm = svm.predict(X_te)

print(f"k-NN Accuracy: {accuracy_score(y_te, y_pred_knn)*100:.2f}%")
print(f"SVM  Accuracy: {accuracy_score(y_te, y_pred_svm)*100:.2f}%")

# ============ BƯỚC 5: DỰ ĐOÁN 1 MẪU MỚI (PREDICT) ============
# Chọn ngẫu nhiên 10 mẫu từ tập test để dự đoán
np.random.seed(7)
sample_idx = np.random.choice(len(X_te), 10, replace=False)
X_sample = X_te[sample_idx]
y_true = y_te[sample_idx]
y_pred = svm.predict(X_sample)

print(f"\n=== DỰ ĐOÁN 10 MẪU NGẪU NHIÊN (SVM) ===")
print(f"{'STT':>4}{'Nhãn thật':>12}{'Dự đoán':>10}{'Đúng?':>8}")
print("-" * 36)
for i, (t, p) in enumerate(zip(y_true, y_pred), 1):
    status = '✓' if t == p else '✗'
    print(f"{i:>4}{t:>12}{p:>10}{status:>8}")

# ============ BƯỚC 6: HIỂN THỊ TRỰC QUAN ============
fig, axes = plt.subplots(2, 5, figsize=(14, 7))
for i, ax in enumerate(axes.ravel()):
    img = X_sample[i].reshape(8, 8)
    ax.imshow(img, cmap='gray_r')
    color = 'green' if y_true[i] == y_pred[i] else 'red'
    ax.set_title(f'Thật: {y_true[i]}\nDự đoán: {y_pred[i]}',
                 color=color, fontweight='bold', fontsize=11)
    ax.axis('off')

plt.suptitle('Dự đoán 10 mẫu — Xanh: đúng | Đỏ: sai',
             fontsize=14, fontweight='bold', color='darkblue')
plt.tight_layout(); plt.show()

# ============ BƯỚC 7: CONFUSION MATRIX ============
fig, ax = plt.subplots(figsize=(8, 7))
ConfusionMatrixDisplay(confusion_matrix(y_te, y_pred_svm),
                        display_labels=digits.target_names).plot(
    ax=ax, cmap='Blues', colorbar=False)
ax.set_title('Confusion Matrix — SVM', fontweight='bold')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- **Bảng dự đoán 10 mẫu:** hiển thị nhãn thật, dự đoán, đánh dấu đúng/sai.
- **Hình ảnh trực quan:** 10 chữ số với tiêu đề **màu xanh** (đúng) hoặc **màu đỏ** (sai).
- **Confusion matrix:** thấy rõ mô hình nhầm lẫn cặp chữ số nào.

---


### 5.2. Phân loại ảnh màu với CIFAR-10

**📌 Bài tập 17:**
Sử dụng tập **CIFAR-10** với **HOG + SVM**. Sau khi huấn luyện, dự đoán trên 10 ảnh mới và hiển thị trực quan.

```python
import torchvision
import numpy as np
import matplotlib.pyplot as plt
from skimage.feature import hog
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

# ============ BƯỚC 1: TẢI DỮ LIỆU ============
train_set = torchvision.datasets.CIFAR10(root='./data', train=True, download=True)
test_set = torchvision.datasets.CIFAR10(root='./data', train=False, download=True)

X_train = np.array([np.array(img) for img, _ in train_set])[:2000]
y_train = np.array([label for _, label in train_set])[:2000]
X_test = np.array([np.array(img) for img, _ in test_set])[:500]
y_test = np.array([label for _, label in test_set])[:500]

class_names = train_set.classes
print(f"Classes: {class_names}")

# ============ BƯỚC 2: TRÍCH XUẤT HOG ============
def extract_hog(img):
    gray = np.dot(img[..., :3], [0.299, 0.587, 0.114]).astype(np.uint8)
    return hog(gray, orientations=9, pixels_per_cell=(8, 8),
               cells_per_block=(2, 2))

print("Đang trích xuất HOG...")
X_tr_hog = np.array([extract_hog(img) for img in X_train])
X_te_hog = np.array([extract_hog(img) for img in X_test])

# ============ BƯỚC 3: HUẤN LUYỆN SVM ============
svm = SVC(kernel='rbf', C=10.0, gamma='scale').fit(X_tr_hog, y_train)
acc = accuracy_score(y_test, svm.predict(X_te_hog))
print(f"SVM + HOG — Accuracy: {acc*100:.2f}%")

# ============ BƯỚC 4: DỰ ĐOÁN 10 ẢNH MỚI ============
np.random.seed(123)
sample_idx = np.random.choice(len(X_test), 10, replace=False)
X_sample = X_test[sample_idx]
y_true = y_test[sample_idx]
y_pred = svm.predict(X_te_hog[sample_idx])

print(f"\n=== DỰ ĐOÁN 10 ẢNH CIFAR-10 ===")
print(f"{'STT':>4}{'Nhãn thật':<15}{'Dự đoán':<15}{'Đúng?':>8}")
print("-" * 45)
n_correct = 0
for i, (t, p) in enumerate(zip(y_true, y_pred), 1):
    status = '✓' if t == p else '✗'
    if t == p: n_correct += 1
    print(f"{i:>4}{class_names[t]:<15}{class_names[p]:<15}{status:>8}")
print(f"\nSố ảnh dự đoán đúng: {n_correct}/10")

# ============ BƯỚC 5: HIỂN THỊ TRỰC QUAN ============
fig, axes = plt.subplots(2, 5, figsize=(16, 7))
for i, ax in enumerate(axes.ravel()):
    ax.imshow(X_sample[i])
    color = 'green' if y_true[i] == y_pred[i] else 'red'
    ax.set_title(f'Thật: {class_names[y_true[i]]}\nDự đoán: {class_names[y_pred[i]]}',
                 color=color, fontweight='bold', fontsize=10)
    ax.axis('off')

plt.suptitle(f'CIFAR-10 — Dự đoán {n_correct}/10 đúng (Xanh: đúng | Đỏ: sai)',
             fontsize=14, fontweight='bold', color='darkblue')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Accuracy khoảng 40–55% (do subset nhỏ).
- Hình ảnh 10 mẫu với nhãn màu xanh/đỏ.
- Sinh viên thấy được mô hình dễ nhầm lẫn giữa các lớp giống nhau (cat ↔ dog).

---


### 5.3. Phát hiện đối tượng với YOLO qua OpenCV DNN

**📌 Bài tập 18:**
Sử dụng **YOLOv8n ONNX** pretrained. Sau khi inference, hiển thị **từng đối tượng phát hiện** dưới dạng crop riêng biệt.

```python
%pip install ultralytics -q
```

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data
import urllib.request
from ultralytics import YOLO
import os

# ============ BƯỚC 1: TẢI MODEL ============
MODEL_PATH = "/tmp/yolov8n.onnx"
if not os.path.exists(MODEL_PATH):
    print("Đang tải và export YOLOv8n sang ONNX...")
    model_pt = YOLO("yolov8n.pt")          # tự động tải .pt (~6MB)
    model_pt.export(format="onnx")          # export → yolov8n.onnx
    # Di chuyển file về /tmp/
    import shutil
    shutil.move("yolov8n.onnx", MODEL_PATH)
    print("Export xong!")

net = cv2.dnn.readNetFromONNX(MODEL_PATH)

# ============ BƯỚC 2: CHUẨN BỊ ẢNH ============
img_rgb = data.astronaut()
h, w = img_rgb.shape[:2]
blob = cv2.dnn.blobFromImage(img_rgb, 1/255.0, (640, 640),
                              swapRB=True, crop=False)
net.setInput(blob)

# ============ BƯỚC 3: INFERENCE ============
outputs = np.squeeze(net.forward()).T

conf_threshold = 0.4
scores = np.max(outputs[:, 4:], axis=1)
class_ids = np.argmax(outputs[:, 4:], axis=1)
boxes = outputs[:, :4]

mask = scores > conf_threshold
boxes, scores, class_ids = boxes[mask], scores[mask], class_ids[mask]

# ============ BƯỚC 4: VẼ KẾT QUẢ ============
out = img_rgb.copy()
detections = []
for box, score, cls_id in zip(boxes, scores, class_ids):
    xc, yc, bw, bh = box
    x1 = max(0, int((xc - bw/2) * w / 640))
    y1 = max(0, int((yc - bh/2) * h / 640))
    x2 = min(w, int((xc + bw/2) * w / 640))
    y2 = min(h, int((yc + bh/2) * h / 640))
    detections.append((x1, y1, x2, y2, score, cls_id))
    cv2.rectangle(out, (x1, y1), (x2, y2), (0, 255, 0), 2)
    cv2.putText(out, f'class_{cls_id} {score:.2f}', (x1, y1-5),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)

print(f"Số đối tượng phát hiện: {len(boxes)}")
for i, (x1, y1, x2, y2, score, cls_id) in enumerate(detections, 1):
    print(f"  #{i}: class_{cls_id}, conf={score:.3f}, box=({x1},{y1},{x2},{y2})")

# ============ BƯỚC 5: HIỂN THỊ TỔNG QUAN ============
fig, axes = plt.subplots(1, 2, figsize=(16, 7))
axes[0].imshow(img_rgb); axes[0].set_title('Ảnh gốc', fontweight='bold')
axes[0].axis('off')
axes[1].imshow(out); axes[1].set_title(f'YOLOv8n — {len(boxes)} đối tượng',
                                         fontweight='bold')
axes[1].axis('off')
plt.tight_layout(); plt.show()

# ============ BƯỚC 6: HIỂN THỊ TỪNG ĐỐI TƯỢNG ĐƯỢC PHÁT HIỆN ============
if len(detections) > 0:
    n_show = min(len(detections), 6)
    fig, axes = plt.subplots(1, n_show, figsize=(3 * n_show, 4))
    if n_show == 1:
        axes = [axes]
    for i, (x1, y1, x2, y2, score, cls_id) in enumerate(detections[:n_show]):
        crop = img_rgb[y1:y2, x1:x2]
        axes[i].imshow(crop)
        axes[i].set_title(f'class_{cls_id}\nconf={score:.2f}',
                          color='darkgreen', fontweight='bold')
        axes[i].axis('off')
    plt.suptitle('Các đối tượng được phát hiện (crop riêng)',
                 fontsize=14, fontweight='bold', color='darkblue')
    plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Ảnh gốc và ảnh với bounding box.
- **Dãy ảnh crop** hiển thị từng đối tượng được phát hiện riêng biệt — sinh viên thấy trực quan mô hình "nhìn thấy" gì.

---


### 5.4. Phát hiện đối tượng với RetinaNet pretrained

**📌 Bài tập 19:**
Sử dụng **RetinaNet ResNet50 FPN** pretrained trên **COCO**. Hiển thị kết quả và crop riêng từng đối tượng.

```python
import torch
import torchvision
from torchvision.models.detection import retinanet_resnet50_fpn
from torchvision.transforms import functional as F
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
from skimage import data

# ============ BƯỚC 1: LOAD MODEL ============
print("Đang tải RetinaNet ResNet50 FPN (~130MB)...")
model = retinanet_resnet50_fpn(pretrained=True)
model.eval()

# ============ BƯỚC 2: CHUẨN BỊ ẢNH ============
img_pil = Image.fromarray(data.astronaut())
img_tensor = F.to_tensor(img_pil)

# ============ BƯỚC 3: INFERENCE ============
with torch.no_grad():
    predictions = model([img_tensor])[0]

# ============ BƯỚC 4: LỌC THEO CONFIDENCE ============
conf_threshold = 0.5
keep = predictions['scores'] > conf_threshold
boxes = predictions['boxes'][keep].numpy()
labels = predictions['labels'][keep].numpy()
scores = predictions['scores'][keep].numpy()

COCO_CLASSES = ['__background__', 'person', 'bicycle', 'car', 'motorcycle',
                'airplane', 'bus', 'train', 'truck', 'boat', 'traffic light',
                'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird',
                'cat', 'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear',
                'zebra', 'giraffe', 'backpack', 'umbrella', 'handbag', 'tie',
                'suitcase', 'frisbee', 'skis', 'snowboard', 'sports ball',
                'kite', 'baseball bat', 'baseball glove', 'skateboard',
                'surfboard', 'tennis racket', 'bottle', 'wine glass', 'cup',
                'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple',
                'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza',
                'donut', 'cake', 'chair', 'couch', 'potted plant', 'bed',
                'dining table', 'toilet', 'tv', 'laptop', 'mouse', 'remote',
                'keyboard', 'cell phone', 'microwave', 'oven', 'toaster',
                'sink', 'refrigerator', 'book', 'clock', 'vase', 'scissors',
                'teddy bear', 'hair drier', 'toothbrush']

# ============ BƯỚC 5: HIỂN THỊ KẾT QUẢ ============
img_np = np.array(img_pil)
fig, ax = plt.subplots(1, 1, figsize=(10, 8))
ax.imshow(img_np)

print(f"\n{'Class':<15}{'Conf':>8}")
print("-" * 23)
for box, label, score in zip(boxes, labels, scores):
    x1, y1, x2, y2 = box
    class_name = COCO_CLASSES[label]
    ax.add_patch(plt.Rectangle((x1, y1), x2-x1, y2-y1,
                               fill=False, edgecolor='lime', linewidth=3))
    ax.text(x1, y1-8, f'{class_name} {score:.2f}',
            color='lime', fontsize=11, weight='bold',
            bbox=dict(facecolor='black', alpha=0.6, pad=2))
    print(f"{class_name:<15}{score:>8.2f}")

ax.axis('off')
ax.set_title(f'RetinaNet (COCO) — {len(boxes)} đối tượng',
             fontsize=14, fontweight='bold')
plt.tight_layout(); plt.show()

# ============ BƯỚC 6: CROP RIÊNG TỪNG ĐỐI TƯỢNG ============
if len(boxes) > 0:
    n_show = min(len(boxes), 6)
    fig, axes = plt.subplots(1, n_show, figsize=(3 * n_show, 4))
    if n_show == 1:
        axes = [axes]
    for i in range(n_show):
        x1, y1, x2, y2 = boxes[i].astype(int)
        crop = img_np[y1:y2, x1:x2]
        axes[i].imshow(crop)
        axes[i].set_title(f'{COCO_CLASSES[labels[i]]}\nconf={scores[i]:.2f}',
                          color='darkgreen', fontweight='bold')
        axes[i].axis('off')
    plt.suptitle('Các đối tượng được phát hiện (crop riêng)',
                 fontsize=14, fontweight='bold', color='darkblue')
    plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Bounding box màu xanh lá với nhãn COCO.
- **Dãy ảnh crop** từng đối tượng — sinh viên thấy rõ mô hình phát hiện gì.

---


### 5.5. Semantic Segmentation với U-Net trên Oxford-IIIT Pet

**📌 Bài tập 20:**
Sử dụng **Oxford-IIIT Pet** huấn luyện **U-Net**. Sau khi huấn luyện, **dự đoán** trên 3 ảnh mới và hiển thị **mask dự đoán** so với mask thật.

```python
import os
import glob
import tarfile
import urllib.request
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt

# ============ BƯỚC 1: TẢI VÀ GIẢI NÉN DATASET ============
DATA_DIR = "/tmp/oxford_pet"
os.makedirs(DATA_DIR, exist_ok=True)

URLS = {
    "images.tar.gz":      "https://www.robots.ox.ac.uk/~vgg/data/pets/data/images.tar.gz",
    "annotations.tar.gz": "https://www.robots.ox.ac.uk/~vgg/data/pets/data/annotations.tar.gz",
}

for filename, url in URLS.items():
    filepath = os.path.join(DATA_DIR, filename)
    if not os.path.exists(filepath):
        print(f"Đang tải {filename}...")
        urllib.request.urlretrieve(url, filepath)
        print(f"  ✓ Đã tải {filename}")

    # Giải nén nếu chưa có thư mục đích
    extract_dir = os.path.join(DATA_DIR, filename.replace(".tar.gz", ""))
    if not os.path.exists(extract_dir):
        print(f"Đang giải nén {filename}...")
        with tarfile.open(filepath) as tar:
            tar.extractall(path=DATA_DIR)
        print(f"  ✓ Đã giải nén")

# Kiểm tra cấu trúc thư mục
IMG_DIR = os.path.join(DATA_DIR, "images")
MASK_DIR = os.path.join(DATA_DIR, "annotations", "trimaps")
SPLIT_DIR = os.path.join(DATA_DIR, "annotations")

print(f"\nSố ảnh      : {len(os.listdir(IMG_DIR))}")
print(f"Số mask     : {len(os.listdir(MASK_DIR))}")

# ============ BƯỚC 2: ĐỌC DANH SÁCH TRAIN / TEST ============
def read_split(filename):
    """Đọc file split (trainval.txt hoặc test.txt) → danh sách tên ảnh."""
    filepath = os.path.join(SPLIT_DIR, filename)
    names = []
    with open(filepath, 'r') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#'):
                names.append(line.split()[0])
    return names

train_names = read_split("trainval.txt")
test_names  = read_split("test.txt")
print(f"Train: {len(train_names)} ảnh")
print(f"Test : {len(test_names)} ảnh")

# ============ BƯỚC 3: PIPELINE ĐỌC ẢNH + MASK ============
IMG_SIZE = 128

def load_sample(name):
    """Đọc 1 ảnh + mask, resize về IMG_SIZE."""
    # Ảnh gốc (.jpg)
    img_path = os.path.join(IMG_DIR, name + ".jpg")
    img = tf.io.read_file(img_path)
    img = tf.image.decode_jpeg(img, channels=3)
    img = tf.image.resize(img, (IMG_SIZE, IMG_SIZE)) / 255.0

    # Mask (.png), giá trị gốc: 1=pet, 2=background, 3=boundary
    # → trừ 1 để về [0, 1, 2] cho sparse_categorical_crossentropy
    mask_path = os.path.join(MASK_DIR, name + ".png")
    mask = tf.io.read_file(mask_path)
    mask = tf.image.decode_png(mask, channels=1)
    mask = tf.image.resize(mask, (IMG_SIZE, IMG_SIZE),
                            method='nearest')  # nearest để giữ giá trị nguyên
    mask = tf.squeeze(mask, axis=-1) - 1
    mask = tf.cast(mask, tf.int32)

    return img, mask

def make_dataset(names, batch_size=32, shuffle=True):
    ds = tf.data.Dataset.from_tensor_slices(names)
    if shuffle:
        ds = ds.shuffle(len(names), seed=42)
    ds = ds.map(load_sample, num_parallel_calls=tf.data.AUTOTUNE)
    ds = ds.batch(batch_size).prefetch(tf.data.AUTOTUNE)
    return ds

train_ds = make_dataset(train_names, shuffle=True)
test_ds  = make_dataset(test_names, shuffle=False)

print(f"\nSố batch train: {len(train_ds)}")
print(f"Số batch test : {len(test_ds)}")

# ============ BƯỚC 4: XÂY DỰNG U-NET MINI ============
def unet_model():
    inputs = tf.keras.Input(shape=(IMG_SIZE, IMG_SIZE, 3))

    # --- Encoder ---
    c1 = tf.keras.layers.Conv2D(16, 3, activation='relu', padding='same')(inputs)
    p1 = tf.keras.layers.MaxPooling2D()(c1)

    c2 = tf.keras.layers.Conv2D(32, 3, activation='relu', padding='same')(p1)
    p2 = tf.keras.layers.MaxPooling2D()(c2)

    # --- Bottleneck ---
    b = tf.keras.layers.Conv2D(64, 3, activation='relu', padding='same')(p2)

    # --- Decoder + Skip connections ---
    u2 = tf.keras.layers.Conv2DTranspose(32, 2, strides=2, padding='same')(b)
    u2 = tf.keras.layers.Concatenate()([u2, c2])
    c3 = tf.keras.layers.Conv2D(32, 3, activation='relu', padding='same')(u2)

    u1 = tf.keras.layers.Conv2DTranspose(16, 2, strides=2, padding='same')(c3)
    u1 = tf.keras.layers.Concatenate()([u1, c1])
    c4 = tf.keras.layers.Conv2D(16, 3, activation='relu', padding='same')(u1)

    # --- Output: 3 lớp ---
    outputs = tf.keras.layers.Conv2D(3, 1, activation='softmax')(c4)

    return tf.keras.Model(inputs, outputs)

model = unet_model()
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
model.summary()

# ============ BƯỚC 5: HUẤN LUYỆN ============
history = model.fit(train_ds, validation_data=test_ds, epochs=5)

# ============ BƯỚC 6: VẼ ĐƯỜNG CONG ============
fig, axes = plt.subplots(1, 2, figsize=(12, 4))
axes[0].plot(history.history['loss'], label='Train Loss', marker='o')
axes[0].plot(history.history['val_loss'], label='Val Loss', marker='s')
axes[0].set_title('Loss qua các epoch', fontweight='bold')
axes[0].legend(); axes[0].grid(alpha=0.3)

axes[1].plot(history.history['accuracy'], label='Train Acc', marker='o')
axes[1].plot(history.history['val_accuracy'], label='Val Acc', marker='s')
axes[1].set_title('Accuracy qua các epoch', fontweight='bold')
axes[1].legend(); axes[1].grid(alpha=0.3)
plt.tight_layout(); plt.show()

# ============ BƯỚC 7: DỰ ĐOÁN TRÊN 3 ẢNH MỚI ============
for images, masks in test_ds.take(1):
    # Chọn 3 ảnh ngẫu nhiên
    idx = np.random.choice(len(images), 3, replace=False)
    sample_imgs  = tf.gather(images, idx)
    sample_masks = tf.gather(masks, idx)

    # DỰ ĐOÁN
    preds = model.predict(sample_imgs, verbose=0)
    pred_masks = np.argmax(preds, axis=-1)

    # HIỂN THỊ
    fig, axes = plt.subplots(3, 3, figsize=(9, 9))
    for i in range(3):
        axes[i, 0].imshow(sample_imgs[i])
        axes[i, 0].set_title('Ảnh gốc', fontweight='bold')
        axes[i, 1].imshow(sample_masks[i], cmap='viridis', vmin=0, vmax=2)
        axes[i, 1].set_title('Mask thật', fontweight='bold')
        axes[i, 2].imshow(pred_masks[i], cmap='viridis', vmin=0, vmax=2)
        axes[i, 2].set_title('Mask dự đoán', fontweight='bold',
                              color='darkgreen')
        for ax in axes[i]: ax.axis('off')

    plt.suptitle('U-Net — Dự đoán phân đoạn trên 3 ảnh mới',
                 fontsize=13, fontweight='bold', color='darkblue')
    plt.tight_layout(); plt.show()

    # Đo IoU cho ảnh đầu tiên
    print(f"\n=== Chỉ số IoU cho ảnh #1 ===")
    mask_true = sample_masks[0].numpy()
    mask_pred = pred_masks[0]
    for cls in range(3):
        inter = np.logical_and(mask_true == cls, mask_pred == cls).sum()
        union = np.logical_or(mask_true == cls, mask_pred == cls).sum()
        iou = inter / union if union > 0 else 0
        class_name = ['Pet', 'Background', 'Boundary'][cls]
        print(f"  Class {cls} ({class_name:<10}) — IoU: {iou:.3f}")

    break
```

**Kết quả mong đợi:**
- **Đồ thị loss/accuracy** qua 5 epoch.
- **3 hàng ảnh:** ảnh gốc / mask thật / mask dự đoán.
- **Chỉ số IoU** cho từng lớp — đánh giá chất lượng phân đoạn.

---


### 5.6. Phát hiện tư thế người với MediaPipe

**📌 Bài tập 21:**
Sử dụng **MediaPipe Pose** phát hiện **33 keypoint**. Hiển thị skeleton và tọa độ từng keypoint.

```python
# Cài đặt mediapipe (nếu chưa có)
%pip install -q mediapipe

# Tải model Pose Landmarker
%wget -q -O pose_landmarker.task https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task
```

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

# ============ BƯỚC 1: KHỞI TẠO POSE LANDMARKER (API MỚI) ============
base_options = python.BaseOptions(model_asset_path='pose_landmarker.task')
options = vision.PoseLandmarkerOptions(
    base_options=base_options,
    running_mode=vision.RunningMode.IMAGE,
    min_pose_detection_confidence=0.5
)
landmarker = vision.PoseLandmarker.create_from_options(options)

# ============ BƯỚC 2: CHUẨN BỊ ẢNH ============
img_rgb = data.astronaut()
img_rgb = cv2.resize(img_rgb, (512, 512))

# Chuyển sang mediapipe.Image
mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=img_rgb)

# ============ BƯỚC 3: DỰ ĐOÁN POSE ============
results = landmarker.detect(mp_image)

if results.pose_landmarks:
    # results.pose_landmarks là list các NormalizedLandmarkList
    # Lấy danh sách landmark của người đầu tiên
    landmarks = results.pose_landmarks[0]
    n_landmarks = len(landmarks)
    print(f"Số keypoint phát hiện: {n_landmarks}")

    # ============ BƯỚC 4: IN TỌA ĐỘ TỪNG KEYPOINT ============
    POSE_NAMES = [
        'nose', 'left_eye_inner', 'left_eye', 'left_eye_outer',
        'right_eye_inner', 'right_eye', 'right_eye_outer',
        'left_ear', 'right_ear', 'mouth_left', 'mouth_right',
        'left_shoulder', 'right_shoulder', 'left_elbow', 'right_elbow',
        'left_wrist', 'right_wrist', 'left_pinky', 'right_pinky',
        'left_index', 'right_index', 'left_thumb', 'right_thumb',
        'left_hip', 'right_hip', 'left_knee', 'right_knee',
        'left_ankle', 'right_ankle', 'left_heel', 'right_heel',
        'left_foot_index', 'right_foot_index'
    ]
    print(f"\n{'Keypoint':<22}{'x':>8}{'y':>8}{'visibility':>12}")
    print("-" * 50)
    for i, lm in enumerate(landmarks[:10]):
        name = POSE_NAMES[i] if i < len(POSE_NAMES) else f"kp_{i}"
        print(f"{name:<22}{lm.x:>8.3f}{lm.y:>8.3f}{lm.visibility:>12.3f}")

    # ============ BƯỚC 5: VẼ SKELETON ============
    out = img_rgb.copy()
    h, w = out.shape[:2]

    # Vẽ keypoint
    for lm in landmarks:
        x, y = int(lm.x * w), int(lm.y * h)
        cv2.circle(out, (x, y), 4, (255, 0, 0), -1)

    # Vẽ các cạnh skeleton dựa trên kết nối chuẩn của MediaPipe Pose
    # (Bạn cần định nghĩa các cặp keypoint cần nối)
    POSE_CONNECTIONS = [
        (0, 1), (1, 2), (2, 3), (3, 7), (0, 4), (4, 5), (5, 6), (6, 8),
        (9, 10), (11, 12), (11, 13), (13, 15), (15, 17), (15, 19), (15, 21),
        (17, 19), (12, 14), (14, 16), (16, 18), (16, 20), (16, 22), (18, 20),
        (11, 23), (12, 24), (23, 24), (23, 25), (24, 26), (25, 27), (26, 28),
        (27, 29), (28, 30), (29, 31), (30, 32), (27, 31), (28, 32)
    ]
    for p1, p2 in POSE_CONNECTIONS:
        if p1 < len(landmarks) and p2 < len(landmarks):
            x1, y1 = int(landmarks[p1].x * w), int(landmarks[p1].y * h)
            x2, y2 = int(landmarks[p2].x * w), int(landmarks[p2].y * h)
            cv2.line(out, (x1, y1), (x2, y2), (0, 255, 255), 2)

    # ============ BƯỚC 6: HIỂN THỊ ============
    fig, axes = plt.subplots(1, 3, figsize=(18, 6))
    axes[0].imshow(img_rgb)
    axes[0].set_title('Ảnh gốc', fontweight='bold')

    img_dots = img_rgb.copy()
    for lm in landmarks:
        x, y = int(lm.x * w), int(lm.y * h)
        cv2.circle(img_dots, (x, y), 5, (255, 0, 0), -1)
    axes[1].imshow(img_dots)
    axes[1].set_title(f'Keypoint ({n_landmarks} điểm)', fontweight='bold')

    axes[2].imshow(out)
    axes[2].set_title('Skeleton đầy đủ', fontweight='bold', color='darkgreen')

    for ax in axes: ax.axis('off')
    plt.suptitle('MediaPipe Pose Landmarker (Tasks API) — Dự đoán tư thế người',
                 fontsize=14, fontweight='bold', color='darkblue')
    plt.tight_layout(); plt.show()
else:
    print("Không phát hiện được người trong ảnh.")

# Đóng landmarker sau khi dùng xong
landmarker.close()
```

**Kết quả mong đợi:**
- **3 ảnh:** ảnh gốc, keypoint riêng lẻ, skeleton đầy đủ.
- **Bảng tọa độ** 10 keypoint đầu với độ tin cậy visibility.
- Sinh viên thấy mô hình "nhìn thấy" các khớp như thế nào.

---


### 5.7. OCR với EasyOCR

**📌 Bài tập 22:**
Sử dụng **EasyOCR** đọc chữ trong ảnh. Tạo 3 ảnh biển số khác nhau và **dự đoán trên từng ảnh**.

```python
%pip install easyocr -q
```

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
import easyocr

# ============ BƯỚC 1: KHỞI TẠO ============
reader = easyocr.Reader(['en'], gpu=False)

# ============ BƯỚC 2: TẠO 3 ẢNH BIỂN SỐ ============
def make_plate(text):
    plate = np.zeros((100, 400, 3), dtype=np.uint8)
    cv2.putText(plate, text, (20, 70),
                cv2.FONT_HERSHEY_SIMPLEX, 1.8, (255, 255, 255), 4)
    return plate

plates = [
    ("29A-12345", "Biển 1"),
    ("51F-67890", "Biển 2"),
    ("ABC-9999",  "Biển 3"),
]

# ============ BƯỚC 3: DỰ ĐOÁN TRÊN TỪNG ẢNH ============
fig, axes = plt.subplots(3, 2, figsize=(14, 10))

for i, (text, name) in enumerate(plates):
    plate = make_plate(text)

    # DỰ ĐOÁN
    results = reader.readtext(plate)

    # Vẽ kết quả
    out = plate.copy()
    detected_text = ""
    for bbox, txt, conf in results:
        pts = np.array(bbox, dtype=np.int32)
        cv2.polylines(out, [pts], True, (0, 255, 0), 2)
        detected_text += txt + " "

    # Hiển thị
    axes[i, 0].imshow(cv2.cvtColor(plate, cv2.COLOR_BGR2RGB))
    axes[i, 0].set_title(f'{name} — Gốc', fontweight='bold')
    axes[i, 0].axis('off')

    axes[i, 1].imshow(cv2.cvtColor(out, cv2.COLOR_BGR2RGB))
    match = "✓" if text.replace("-", "") in detected_text.replace(" ", "").replace("-", "") else "?"
    axes[i, 1].set_title(f'Dự đoán: "{detected_text.strip()}" {match}',
                          fontweight='bold',
                          color='darkgreen' if match == "✓" else 'darkorange')
    axes[i, 1].axis('off')

    # In bảng chi tiết
    print(f"\n=== {name} ===")
    print(f"Text gốc: {text}")
    for bbox, txt, conf in results:
        print(f"  Text: {txt:<15} Conf: {conf:.3f}")

plt.suptitle('EasyOCR — Dự đoán trên 3 ảnh biển số',
             fontsize=14, fontweight='bold', color='darkblue')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- **3 hàng ảnh:** mỗi hàng gồm ảnh gốc + ảnh với bounding box.
- **Text dự đoán** so với text gốc, đánh dấu ✓ nếu khớp.
- **Bảng confidence** cho từng vùng chữ.

---

<!-- #region -->
# Hướng dẫn điều chỉnh kích thước ảnh hiển thị

Ảnh bị vỡ thường do **`figsize` quá lớn** kết hợp với **ảnh gốc có kích thước nhỏ**. Dưới đây là các cách điều chỉnh:

## 1. Giảm `figsize` trong `plt.subplots`

Đây là cách đơn giản nhất. Nếu đang dùng `figsize=(20, 5)`, giảm xuống `(12, 3)` hoặc `(10, 2.5)`.

```python
# Trước — quá lớn
fig, axes = plt.subplots(1, 5, figsize=(20, 4))

# Sau — nhỏ hơn, ảnh không bị vỡ
fig, axes = plt.subplots(1, 5, figsize=(12, 2.5))
```

**Quy tắc chung:** mỗi subplot nên rộng khoảng **2–3 inch**, không nên vượt quá 4 inch.

## 2. Giảm số ảnh trên một hàng (tăng `nrows`)

Nếu hiển thị 10 ảnh trên 1 hàng, mỗi ảnh sẽ rất nhỏ và dễ vỡ. Chia thành 2 hàng × 5 cột sẽ đẹp hơn.

```python
# Trước — 10 ảnh trên 1 hàng, mỗi ảnh ~2 inch
fig, axes = plt.subplots(1, 10, figsize=(20, 3))

# Sau — 2 hàng × 5 cột, mỗi ảnh ~3 inch
fig, axes = plt.subplots(2, 5, figsize=(14, 6))
for ax in axes.ravel():
    ax.axis('off')
```

## 3. Set DPI hiển thị toàn cục

Thêm dòng này **1 lần duy nhất** ở đầu notebook:

```python
import matplotlib.pyplot as plt
plt.rcParams['figure.dpi'] = 80       # mặc định là 100
plt.rcParams['savefig.dpi'] = 100     # khi lưu file
```

Hoặc set trong từng figure:

```python
fig = plt.figure(figsize=(10, 3), dpi=80)
```

## 4. Dùng `interpolation` phù hợp cho ảnh nhỏ

Ảnh nhỏ như **MNIST (8×8)** khi phóng to sẽ bị "pixel hóa". Dùng `interpolation='nearest'` để giữ nét vuông, hoặc `'bilinear'` để làm mượt.

```python
# Cho MNIST — giữ nét pixel rõ ràng
ax.imshow(img, cmap='gray_r', interpolation='nearest')

# Cho ảnh tự nhiên — làm mượt
ax.imshow(img, interpolation='bilinear')
```

## 5. Dùng `plt.tight_layout()` và `subplots_adjust`

Giảm khoảng trắng giữa các ảnh để tận dụng không gian:

```python
plt.tight_layout()                              # tự động
# Hoặc điều chỉnh thủ công
plt.subplots_adjust(wspace=0.1, hspace=0.2)     # giảm khoảng cách
```

## 6. Giảm số ảnh hiển thị (chỉ show 5–6 ảnh)

Nếu có 20 ảnh, chỉ hiển thị **6 ảnh đại diện** thay vì tất cả:

```python
n_show = 6
fig, axes = plt.subplots(2, 3, figsize=(10, 6))
for i, ax in enumerate(axes.ravel()):
    ax.imshow(images[i])
    ax.axis('off')
```

## 7. Với ảnh crop từ object detection (dãy ngang dài)

Nếu có nhiều ảnh crop (5–6 ảnh), đừng dùng `figsize=(3*n, 4)`. Thay bằng:

```python
n_show = min(len(detections), 6)
fig, axes = plt.subplots(2, 3, figsize=(10, 6))   # lưới 2×3 thay vì 1×6
for i, ax in enumerate(axes.ravel()[:n_show]):
    ax.imshow(crop_list[i])
    ax.axis('off')
for j in range(n_show, 6):
    axes.ravel()[j].axis('off')
```

## 8. Với confusion matrix (thường bị to)

```python
# Trước
fig, ax = plt.subplots(figsize=(8, 7))

# Sau
fig, ax = plt.subplots(figsize=(6, 5))
```

## 9. Với `InsightFace` / `label2rgb` / ảnh output

Nếu output là **ảnh 512×512 hoặc lớn hơn**, `figsize` chỉ cần **4×4 inch** là đủ:

```python
plt.figure(figsize=(5, 5))    # thay vì (10, 8)
plt.imshow(result)
plt.axis('off'); plt.show()
```

## 10. Bảng tóm tắt kích thước gợi ý

| Loại hiển thị | `figsize` gợi ý |
|---------------|:---------------:|
| 1 ảnh đơn | `(5, 5)` hoặc `(6, 6)` |
| 2 ảnh ngang | `(10, 4)` |
| 3 ảnh ngang | `(12, 4)` |
| 4 ảnh ngang | `(14, 4)` |
| 5 ảnh ngang | `(15, 3)` |
| Lưới 2×3 | `(12, 7)` |
| Lưới 3×3 | `(12, 12)` |
| Confusion matrix 10×10 | `(6, 5)` |

## 11. Mẹo nhanh — công thức chung

> **Chiều rộng figure ≈ số cột × 2.5 đến 3 inch**  
> **Chiều cao figure ≈ số hàng × 2.5 đến 3 inch**

Ví dụ: lưới `2×5` → `figsize ≈ (5 × 2.8, 2 × 2.8) = (14, 5.6)`.

## 12. Nếu vẫn bị vỡ sau khi in ra file

Nguyên nhân có thể do **`savefig` với DPI quá cao** → file nặng nhưng khi hiển thị lại bị thu nhỏ. Sửa:

```python
plt.savefig('output.png', dpi=100, bbox_inches='tight')   # thay vì dpi=300
```

---

## Quy trình điều chỉnh nhanh

1. **Giảm `figsize`** xuống 50–60% so với hiện tại.
2. **Thêm `interpolation='nearest'`** cho ảnh nhỏ (MNIST, mask).
3. **Đổi layout** từ `1×N` sang `2×ceil(N/2)` nếu N > 4.
4. **Set `plt.rcParams['figure.dpi'] = 80`** ở đầu notebook.
5. **Chỉ show 5–6 ảnh** đại diện nếu có quá nhiều.
<!-- #endregion -->
