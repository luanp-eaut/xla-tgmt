# Bài tập thực hành chương 5

---


## 1. Trích xuất đặc trưng và phân loại ảnh

---


### 1.1. Feature vector — Color Histogram
**📌 Bài tập 1:**
Cho ảnh `data.astronaut()`. Cắt ra 3 vùng: mặt người, nền xanh (sky), bộ đồ (clothing). Tính histogram màu 3D cho mỗi vùng (8 bins/kênh), so sánh khoảng cách giữa các feature vector bằng `np.linalg.norm`.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh và cắt 3 vùng
img_rgb = data.astronaut()
face     = img_rgb[60:180,  200:320]   # vùng mặt
sky      = img_rgb[0:80,    0:200]     # vùng nền xanh
clothing = img_rgb[300:400, 100:300]   # vùng áo

# 2. Hàm tính histogram màu 3D
def color_hist(img, bins=8):
    """Histogram 3D cho ảnh màu → vector 1D đã chuẩn hóa."""
    h = cv2.calcHist([img], [0, 1, 2], None,
                     [bins, bins, bins],
                     [0, 256, 0, 256, 0, 256])
    h = h.flatten()
    return h / h.sum()

feat_face  = color_hist(face)
feat_sky   = color_hist(sky)
feat_cloth = color_hist(clothing)
print(f"Kích thước feature vector: {feat_face.shape[0]} chiều")

# 3. Khoảng cách giữa các feature
def dist(a, b):
    return np.linalg.norm(a - b)

print(f"d(face, sky)      = {dist(feat_face, feat_sky):.4f}")
print(f"d(face, clothing) = {dist(feat_face, feat_cloth):.4f}")
print(f"d(sky, clothing)  = {dist(feat_sky, feat_cloth):.4f}")

# 4. Hiển thị
fig, axes = plt.subplots(2, 3, figsize=(15, 8))
for i, (patch, name) in enumerate(zip([face, sky, clothing],
                                       ['Mặt', 'Nền xanh', 'Áo'])):
    axes[0, i].imshow(patch)
    axes[0, i].set_title(f'Vùng: {name} — shape {patch.shape}')
    axes[0, i].axis('off')

# Histogram R, G, B cho từng vùng
colors = ['red', 'green', 'blue']
for i, (patch, name) in enumerate(zip([face, sky, clothing],
                                       ['Mặt', 'Nền xanh', 'Áo'])):
    for ch, c in enumerate(colors):
        hist = cv2.calcHist([patch], [ch], None, [64], [0, 256]).flatten()
        axes[1, i].plot(hist, color=c, alpha=0.7)
    axes[1, i].set_title(f'Histogram RGB — {name}')
    axes[1, i].set_xlabel('Mức xám')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Feature vector 512 chiều cho mỗi vùng.
- Vùng "nền xanh" khác biệt rõ với "mặt" và "áo" → khoảng cách lớn.
- Mặt và áo có thể gần nhau hơn nếu tông màu tương tự.

---


### 1.2. Phân loại ảnh với đặc trưng hình học + k-NN/SVM
**📌 Bài tập 2:**
Tự sinh dataset tổng hợp gồm 3 lớp hình học (tròn, vuông, tam giác), mỗi lớp 30 ảnh 64×64. Trích xuất 5 đặc trưng hình học từ contour. Huấn luyện k-NN và SVM để phân loại.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix, ConfusionMatrixDisplay

# 1. Sinh dataset
def gen_shape(shape_type, size=64, noise=0.0):
    """Sinh ảnh 1 hình trên nền đen."""
    img = np.zeros((size, size), dtype=np.uint8)
    center = (size // 2, size // 2)
    if shape_type == 'circle':
        cv2.circle(img, center, size // 3, 255, -1)
    elif shape_type == 'square':
        s = size // 3
        cv2.rectangle(img, (center[0] - s, center[1] - s),
                            (center[0] + s, center[1] + s), 255, -1)
    elif shape_type == 'triangle':
        s = size // 3
        pts = np.array([[center[0], center[1] - s],
                        [center[0] - s, center[1] + s],
                        [center[0] + s, center[1] + s]])
        cv2.fillPoly(img, [pts], 255)
    if noise > 0:
        n = np.random.normal(0, noise * 255, img.shape)
        img = np.clip(img.astype(np.float32) + n, 0, 255).astype(np.uint8)
    return img

# 2. Trích xuất 5 đặc trưng hình học
def extract_features(img):
    _, th = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)
    cnts, _ = cv2.findContours(th, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if len(cnts) == 0:
        return np.zeros(5)
    c = max(cnts, key=cv2.contourArea)
    area = cv2.contourArea(c)
    peri = cv2.arcLength(c, True)
    approx = cv2.approxPolyDP(c, 0.02 * peri, True)
    n_vertices = len(approx)
    circularity = 4 * np.pi * area / (peri ** 2) if peri > 0 else 0
    x, y, w, h = cv2.boundingRect(c)
    aspect = w / h if h > 0 else 1
    return np.array([area, peri, n_vertices, circularity, aspect])

# 3. Sinh dataset 3 lớp
np.random.seed(42)
X, y = [], []
label_map = {'circle': 0, 'square': 1, 'triangle': 2}
for label_name, label_id in label_map.items():
    for _ in range(30):
        img = gen_shape(label_name, noise=np.random.uniform(0, 0.05))
        X.append(extract_features(img))
        y.append(label_id)
X = np.array(X); y = np.array(y)

# 4. Train/test split
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2,
                                           random_state=42, stratify=y)
print(f"Train: {len(X_tr)} mẫu | Test: {len(X_te)} mẫu")

# 5. Huấn luyện 2 mô hình
knn = KNeighborsClassifier(n_neighbors=3).fit(X_tr, y_tr)
svm = SVC(kernel='rbf', C=1.0).fit(X_tr, y_tr)

for name, model in [('k-NN (k=3)', knn), ('SVM (RBF)', svm)]:
    y_pred = model.predict(X_te)
    acc = accuracy_score(y_te, y_pred)
    print(f"\n{name}: Accuracy = {acc*100:.2f}%")
    print("Confusion matrix:")
    print(confusion_matrix(y_te, y_pred))

# 6. Trực quan hóa mẫu mỗi lớp
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
for i, (lname, lid) in enumerate(label_map.items()):
    imgs = [gen_shape(lname, noise=0.02) for _ in range(3)]
    combined = np.hstack(imgs)
    axes[i].imshow(combined, cmap='gray')
    axes[i].set_title(f'{lname} (label={lid})')
    axes[i].axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Cả 2 mô hình đều đạt accuracy cao (>95%).
- Số đỉnh (`n_vertices`) là đặc trưng quan trọng nhất: tam giác = 3, vuông = 4, tròn = nhiều.

---


### 1.3. Trích xuất đặc trưng HOG + SVM
**📌 Bài tập 3:**
Sinh dataset gồm 2 lớp: **đường ngang** và **đường dọc** (mỗi lớp 40 ảnh 64×64 có nhiễu nhẹ). Trích xuất HOG descriptor, huấn luyện SVM linear và đánh giá accuracy.

```python
import numpy as np
import matplotlib.pyplot as plt
from skimage.feature import hog
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 1. Sinh dataset
def gen_line(orientation, size=64, noise=0.05):
    img = np.zeros((size, size), dtype=np.uint8)
    if orientation == 'horizontal':
        for y in [size//2 - 1, size//2, size//2 + 1]:
            img[y, 10:size-10] = 255
    else:
        for x in [size//2 - 1, size//2, size//2 + 1]:
            img[10:size-10, x] = 255
    n = np.random.normal(0, noise * 255, img.shape)
    return np.clip(img.astype(np.float32) + n, 0, 255).astype(np.uint8)

# 2. Trích xuất HOG
def extract_hog(img):
    return hog(img, orientations=9, pixels_per_cell=(8, 8),
               cells_per_block=(2, 2), feature_vector=True)

X, y = [], []
for _ in range(40):
    X.append(extract_hog(gen_line('horizontal')));  y.append(0)
    X.append(extract_hog(gen_line('vertical')));    y.append(1)
X = np.array(X); y = np.array(y)
print(f"Feature HOG shape: {X.shape}")

# 3. Train/test + SVM
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2,
                                           random_state=42, stratify=y)
svm = SVC(kernel='linear', C=1.0).fit(X_tr, y_tr)
acc = accuracy_score(y_te, svm.predict(X_te))
print(f"SVM + HOG — Accuracy: {acc*100:.2f}%")

# 4. Trực quan HOG
fig, axes = plt.subplots(2, 2, figsize=(10, 10))
for i, (orient, name) in enumerate([('horizontal', 'Ngang'),
                                     ('vertical', 'Dọc')]):
    img = gen_line(orient, noise=0.02)
    _, hog_img = hog(img, orientations=9, pixels_per_cell=(8, 8),
                     cells_per_block=(2, 2), visualize=True)
    axes[i, 0].imshow(img, cmap='gray'); axes[i, 0].set_title(f'{name} — Ảnh gốc'); axes[i, 0].axis('off')
    axes[i, 1].imshow(hog_img, cmap='gray'); axes[i, 1].set_title(f'{name} — HOG'); axes[i, 1].axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Accuracy ~100% trên bài toán đơn giản.
- HOG visual cho thấy sự khác biệt rõ rệt về hướng gradient giữa 2 lớp.

---


## 2. Phát hiện đối tượng và khuôn mặt

---


### 2.1. Phát hiện khuôn mặt với Haar Cascade
**📌 Bài tập 4:**
Cho ảnh `data.astronaut()`. Load `haarcascade_frontalface_default.xml`, phát hiện mặt với 2 cặp tham số `(scaleFactor, minNeighbors) = (1.1, 5)` và `(1.3, 3)`. Vẽ bounding box lên ảnh gốc.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt
from skimage import data
import os

# 1. Tải ảnh và chuyển xám
img_rgb = data.astronaut()
img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)

# 2. Load Haar Cascade
face_cascade = cv2.CascadeClassifier('images/haarcascade_frontalface_default.xml')
if face_cascade.empty():
    raise IOError("Không load được file XML — hãy kiểm tra đường dẫn!")

# 3. Phát hiện với 2 cặp tham số
configs = [
    (1.1, 5, 'scaleFactor=1.1, minNeighbors=5'),
    (1.3, 3, 'scaleFactor=1.3, minNeighbors=3'),
]

vis_imgs = []
for sf, mn, title in configs:
    faces = face_cascade.detectMultiScale(img_gray, scaleFactor=sf,
                                           minNeighbors=mn, minSize=(30, 30))
    out = img_rgb.copy()
    for (x, y, w, h) in faces:
        cv2.rectangle(out, (x, y), (x + w, y + h), (255, 0, 0), 3)
    vis_imgs.append(out)
    print(f"{title}: phát hiện {len(faces)} khuôn mặt")

# 4. Hiển thị
fig, axes = plt.subplots(1, 3, figsize=(16, 5))
axes[0].imshow(img_rgb); axes[0].set_title('Ảnh gốc')
for i, (vis, cfg) in enumerate(zip(vis_imgs, configs)):
    axes[i+1].imshow(vis); axes[i+1].set_title(cfg[2])
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Haar Cascade phát hiện khuôn mặt phi hành gia.
- `scaleFactor` nhỏ + `minNeighbors` lớn → chính xác hơn nhưng có thể bỏ sót.
- `scaleFactor` lớn + `minNeighbors` nhỏ → nhạy hơn nhưng dễ false positive.

---


### 2.2. Phát hiện mắt và miệng
**📌 Bài tập 5:**
Cho ảnh `data.astronaut()`. Tiền xử lý bằng CLAHE để tăng tương phản. Phát hiện mặt trước, sau đó tìm mắt trong nửa trên khuôn mặt, tìm miệng trong nửa dưới. Nếu không tìm được miệng bằng cascade, dùng fallback hình học.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img_rgb = data.astronaut()
img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)

# 2. Tiền xử lý CLAHE
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
img_gray = clahe.apply(img_gray)

# 3. Load 3 cascade
face_cascade  = cv2.CascadeClassifier('images/haarcascade_frontalface_default.xml')
eye_cascade   = cv2.CascadeClassifier('images/haarcascade_eye.xml')
smile_cascade = cv2.CascadeClassifier('images/haarcascade_smile.xml')

# Kiểm tra cascade
for name, c in [('face', face_cascade), ('eye', eye_cascade), ('smile', smile_cascade)]:
    if c.empty():
        raise IOError(f"Cascade '{name}' rỗng — file XML chưa tải đúng!")

# 4. Phát hiện mặt
faces = face_cascade.detectMultiScale(img_gray, 1.1, 5, minSize=(50, 50))
out = img_rgb.copy()

for (x, y, w, h) in faces:
    cv2.rectangle(out, (x, y), (x + w, y + h), (255, 0, 0), 3)

    roi_gray  = img_gray[y:y+h, x:x+w]
    roi_color = out[y:y+h, x:x+w]

    # 5. Tìm mắt — nửa trên khuôn mặt
    upper = roi_gray[:int(h*0.6), :]
    eyes = eye_cascade.detectMultiScale(upper, scaleFactor=1.05,
                                         minNeighbors=4,
                                         minSize=(10, 10),
                                         maxSize=(h//3, h//3))
    for (ex, ey, ew, eh) in eyes:
        cv2.rectangle(roi_color, (ex, ey), (ex + ew, ey + eh), (0, 255, 0), 2)
    print(f"  Phát hiện {len(eyes)} mắt")

    # 6. Tìm miệng — nửa dưới
    lower = roi_gray[int(h*0.5):, :]
    smiles = smile_cascade.detectMultiScale(lower, scaleFactor=1.5,
                                             minNeighbors=10, minSize=(15, 10))
    if len(smiles) > 0:
        for (sx, sy, sw, sh) in smiles:
            cv2.rectangle(roi_color,
                          (sx, sy + int(h*0.5)),
                          (sx + sw, sy + sh + int(h*0.5)), (255, 255, 0), 2)
        print(f"  Phát hiện {len(smiles)} miệng")
    else:
        # Fallback: vẽ miệng theo hình học
        mx, my = int(w*0.25), int(h*0.68)
        mw, mh = int(w*0.5),  int(h*0.22)
        cv2.rectangle(roi_color, (mx, my), (mx + mw, my + mh), (255, 255, 0), 2)
        print(f"  Không có smile cascade → dùng fallback hình học")

# 7. Hiển thị
plt.figure(figsize=(7, 7))
plt.imshow(out); plt.title('Phát hiện mặt / mắt / miệng')
plt.axis('off'); plt.show()
```

**Kết quả mong đợi:**
- Bounding box đỏ (mặt), xanh lá (mắt), vàng (miệng).
- Haar Cascade có thể bỏ sót 1 mắt hoặc miệng — đây là **hành vi bình thường**.
- CLAHE giúp tăng khả năng phát hiện ở vùng tối.

---


### 2.3. Template Matching
**📌 Bài tập 6:**
Cho ảnh `data.coins()`. Cắt một đồng xu làm template. Áp dụng `cv2.matchTemplate` với 3 phương pháp `TM_CCOEFF_NORMED`, `TM_CCORR_NORMED`, `TM_SQDIFF_NORMED` và tìm vị trí khớp nhất bằng `cv2.minMaxLoc`.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh và cắt template
img = data.coins()
template = img[75:150, 230:305].copy()   # một đồng xu
h_t, w_t = template.shape

# 2. Áp dụng matchTemplate với 3 phương pháp
methods = {
    'TM_CCOEFF_NORMED': cv2.TM_CCOEFF_NORMED,
    'TM_CCORR_NORMED':  cv2.TM_CCORR_NORMED,
    'TM_SQDIFF_NORMED': cv2.TM_SQDIFF_NORMED,
}

results = []
for name, method in methods.items():
    res = cv2.matchTemplate(img, template, method)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
    # Với SQDIFF: giá trị NHỎ là tốt; với 2 cái còn lại: LỚN là tốt
    if method == cv2.TM_SQDIFF_NORMED:
        top_left = min_loc
        score = min_val
    else:
        top_left = max_loc
        score = max_val
    bottom_right = (top_left[0] + w_t, top_left[1] + h_t)

    out = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
    cv2.rectangle(out, top_left, bottom_right, (255, 0, 0), 2)
    results.append((out, f'{name}\nScore={score:.3f}'))
    print(f"{name}: score = {score:.4f}, vị trí = {top_left}")

# 3. Hiển thị
fig, axes = plt.subplots(1, 5, figsize=(22, 5))
axes[0].imshow(img, cmap='gray'); axes[0].set_title('Ảnh gốc')
axes[1].imshow(template, cmap='gray'); axes[1].set_title('Template')
for i, (out, title) in enumerate(results):
    axes[i+2].imshow(out); axes[i+2].set_title(title)
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Cả 3 phương pháp tìm đúng đồng xu.
- `TM_CCOEFF_NORMED` thường ổn định nhất với thay đổi ánh sáng.

---


## 3. Phát hiện đặc trưng và ghép ảnh

---


### 3.1. Phát hiện keypoint với ORB
**📌 Bài tập 7:**
Cho ảnh `data.astronaut()`. Tạo ORB detector với `nfeatures ∈ {50, 100, 500}`. Phát hiện keypoint + descriptor, in shape của descriptor array và vẽ keypoint lên ảnh.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh và chuyển xám
img_rgb = data.astronaut()
img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)

# 2. Chạy ORB với 3 cấu hình
nfeatures_list = [50, 100, 500]
results, counts = [], []

print(f"{'nfeatures':>12}{'keypoint thực tế':>20}{'descriptor shape':>20}")
print("-" * 52)
for nf in nfeatures_list:
    orb = cv2.ORB_create(nfeatures=nf)
    kps, desc = orb.detectAndCompute(img_gray, None)
    counts.append(len(kps))
    print(f"{nf:>12}{len(kps):>20}{str(desc.shape):>20}")
    out = cv2.drawKeypoints(img_rgb, kps, None,
                             color=(0, 255, 0),
                             flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
    results.append(out)

# 3. Hiển thị
fig, axes = plt.subplots(2, 2, figsize=(14, 10))
axes[0, 0].imshow(img_rgb); axes[0, 0].set_title('Ảnh gốc'); axes[0, 0].axis('off')
for i, (r, nf, cnt) in enumerate(zip(results, nfeatures_list, counts)):
    ax = axes[(i+1) // 2, (i+1) % 2]
    ax.imshow(r); ax.set_title(f'ORB nfeatures={nf}\n{cnt} keypoint'); ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Descriptor ORB: 32 byte (256 bit) cho mỗi keypoint.
- Keypoint tập trung ở vùng có cấu trúc cao (mắt, tóc, chi tiết áo).

---


### 3.2. So sánh ORB vs SIFT
**📌 Bài tập 8:**
Cho ảnh `data.camera()`. Chạy ORB và SIFT (mỗi cái `nfeatures=500`). Đo số keypoint, thời gian phát hiện (ms), kích thước descriptor (byte). So sánh 2 phương pháp.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt
from skimage import data
import time

# 1. Tải ảnh
img = data.camera()

# 2. Định nghĩa 2 detector có sẵn trong opencv-python
detectors = {
    'ORB':  cv2.ORB_create(nfeatures=500),
    'SIFT': cv2.SIFT_create(nfeatures=500),
}

# 3. Chạy và đo
results = []
print(f"{'Detector':<10}{'Số keypoint':>14}{'Thời gian (ms)':>18}{'Descriptor (byte)':>20}")
print("-" * 62)

for name, det in detectors.items():
    t0 = time.time()
    kps, desc = det.detectAndCompute(img, None)
    t1 = time.time()
    dt_ms = (t1 - t0) * 1000
    desc_bytes = desc.itemsize * desc.shape[1] if desc is not None else 0

    out = cv2.drawKeypoints(img, kps, None,
                            color=(0, 255, 0),
                            flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
    results.append((out, name, len(kps), dt_ms, desc_bytes))
    print(f"{name:<10}{len(kps):>14}{dt_ms:>18.2f}{desc_bytes:>20}")

# 4. Hiển thị
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
axes[0].imshow(img, cmap='gray'); axes[0].set_title('Ảnh gốc')
for i, (r, name, cnt, dt, db) in enumerate(results):
    axes[i+1].imshow(r, cmap='gray')
    axes[i+1].set_title(f'{name}\n{cnt} kp — {dt:.1f} ms')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- **SIFT:** chậm hơn nhưng chất lượng keypoint tốt, bất biến scale + rotation.
- **ORB:** nhanh nhất, descriptor 32 byte, phù hợp real-time.

---


### 3.3. Ghép ảnh Panorama với ORB + Homography
**📌 Bài tập 9:**
Tạo 2 ảnh overlap bằng cách cắt từ `data.astronaut()` với offset khác nhau. Dùng ORB + BFMatcher + Homography để ghép 2 ảnh lại thành ảnh panorama.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt
from skimage import data

# 1. Tạo 2 ảnh overlap (offset 150 pixel)
img_full = data.astronaut()
offset = 150
img1 = img_full[:, :350].copy()
img2 = img_full[:, offset:offset+350].copy()

# 2. Phát hiện ORB keypoint
orb = cv2.ORB_create(nfeatures=1000)
kps1, desc1 = orb.detectAndCompute(cv2.cvtColor(img1, cv2.COLOR_RGB2GRAY), None)
kps2, desc2 = orb.detectAndCompute(cv2.cvtColor(img2, cv2.COLOR_RGB2GRAY), None)
print(f"Ảnh 1: {len(kps1)} keypoint")
print(f"Ảnh 2: {len(kps2)} keypoint")

# 3. Matching với BFMatcher
bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
matches = sorted(bf.match(desc1, desc2), key=lambda x: x.distance)
print(f"Tổng số match: {len(matches)}")

# 4. Trực quan hóa top 50 match
match_vis = cv2.drawMatches(img1, kps1, img2, kps2, matches[:50], None, flags=2)

# 5. Tính Homography (cần ít nhất 4 match)
if len(matches) >= 4:
    src_pts = np.float32([kps1[m.queryIdx].pt for m in matches]).reshape(-1, 1, 2)
    dst_pts = np.float32([kps2[m.trainIdx].pt for m in matches]).reshape(-1, 1, 2)
    H, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
    print(f"Số inlier: {mask.sum()}/{len(mask)}")

    # 6. Warp và ghép
    h, w = img_full.shape[:2]
    result = cv2.warpPerspective(img1, H, (w + offset, h))
    result[:, offset:offset+350] = img2
else:
    result = np.hstack([img1, img2])
    mask = None

# 7. Hiển thị
fig, axes = plt.subplots(2, 2, figsize=(14, 10))
axes[0, 0].imshow(img1); axes[0, 0].set_title('Ảnh 1 (trái)')
axes[0, 1].imshow(img2); axes[0, 1].set_title('Ảnh 2 (phải)')
axes[1, 0].imshow(match_vis); axes[1, 0].set_title(f'Top-50 matches (inlier: {mask.sum() if mask is not None else 0})')
axes[1, 1].imshow(result); axes[1, 1].set_title('Kết quả ghép')
for ax in axes.ravel(): ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Các đường match nối đúng điểm tương ứng giữa 2 ảnh.
- Ảnh ghép mượt ở vùng overlap.

---


## 4. Phân đoạn ảnh và đếm đối tượng

---


### 4.1. Đếm đối tượng trong ảnh
**📌 Bài tập 10:**
Cho ảnh `data.coins()`. Xây dựng pipeline: làm mịn Gaussian → Otsu → Morphology → findContours → lọc theo diện tích. Đếm số đồng xu, gán số thứ tự cho từng đối tượng.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.coins()

# 2. Pipeline
blur = cv2.GaussianBlur(img, (5, 5), 1.5)
_, th = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
opened = cv2.morphologyEx(th, cv2.MORPH_OPEN, kernel, iterations=2)
closed = cv2.morphologyEx(opened, cv2.MORPH_CLOSE, kernel, iterations=2)

# 3. Tìm contour
contours, _ = cv2.findContours(closed, cv2.RETR_EXTERNAL,
                                cv2.CHAIN_APPROX_SIMPLE)

# 4. Lọc theo diện tích
min_area = 200
valid = [c for c in contours if cv2.contourArea(c) > min_area]
print(f"Tổng số contour: {len(contours)}")
print(f"Số đối tượng hợp lệ (>200px²): {len(valid)}")

# 5. Vẽ contour + số thứ tự
out = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
for i, c in enumerate(valid, 1):
    cv2.drawContours(out, [c], -1, (0, 255, 0), 2)
    M = cv2.moments(c)
    if M['m00'] > 0:
        cx = int(M['m10'] / M['m00'])
        cy = int(M['m01'] / M['m00'])
        cv2.putText(out, str(i), (cx - 8, cy + 8),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)

# 6. Hiển thị
fig, axes = plt.subplots(1, 4, figsize=(18, 5))
axes[0].imshow(img, cmap='gray');    axes[0].set_title('Ảnh gốc')
axes[1].imshow(th, cmap='gray');     axes[1].set_title('Otsu')
axes[2].imshow(closed, cmap='gray'); axes[2].set_title('Sau Morphology')
axes[3].imshow(out);                 axes[3].set_title(f'Đếm được {len(valid)} đồng xu')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Đếm chính xác số đồng xu.
- Lọc diện tích giúp loại bỏ nhiễu nhỏ.

---


### 4.2. Đo lường kích thước đối tượng
**📌 Bài tập 11:**
Cho ảnh `data.coins()`. Giả định tỷ lệ: 1 pixel ≈ 0.1 mm. Từ contour, tính diện tích, chu vi, đường kính tương đương và circularity của từng đồng xu.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.coins()
PIXEL_TO_MM = 0.1    # tỷ lệ giả định

# 2. Pipeline phân đoạn
blur = cv2.GaussianBlur(img, (5, 5), 1.5)
_, th = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
closed = cv2.morphologyEx(th, cv2.MORPH_CLOSE, kernel, iterations=2)
contours, _ = cv2.findContours(closed, cv2.RETR_EXTERNAL,
                                cv2.CHAIN_APPROX_SIMPLE)
valid = sorted([c for c in contours if cv2.contourArea(c) > 200],
               key=cv2.contourArea, reverse=True)

# 3. Đo lường
print(f"{'#':>3}{'Diện tích':>12}{'Chu vi':>10}{'Đ.kính (px)':>14}"
      f"{'Đ.kính (mm)':>14}{'Tròn?':>8}")
print("-" * 63)

out = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
for i, c in enumerate(valid, 1):
    area = cv2.contourArea(c)
    peri = cv2.arcLength(c, True)
    diameter_px = 2 * np.sqrt(area / np.pi)
    diameter_mm = diameter_px * PIXEL_TO_MM
    circularity = 4 * np.pi * area / (peri ** 2) if peri > 0 else 0

    # Vẽ đường tròn bao ngoài + chú thích đường kính
    (x, y), r = cv2.minEnclosingCircle(c)
    cv2.circle(out, (int(x), int(y)), int(r), (0, 255, 0), 2)
    cv2.putText(out, f'{diameter_mm:.1f}mm',
                (int(x) - 30, int(y) + 5),
                cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 0, 0), 1)

    if i <= 5:
        print(f"{i:>3}{area:>12.0f}{peri:>10.1f}{diameter_px:>14.1f}"
              f"{diameter_mm:>14.1f}{circularity:>8.3f}")

# 4. Hiển thị
plt.figure(figsize=(7, 7))
plt.imshow(out); plt.title(f'Đo lường {len(valid)} đồng xu')
plt.axis('off'); plt.show()
```

**Kết quả mong đợi:**
- Bảng đo đường kính từng đồng xu (px và mm).
- Circularity > 0.9 chứng tỏ hình gần tròn hoàn hảo.

---


### 4.3. Phân đoạn ngữ nghĩa bằng ngưỡng
**📌 Bài tập 12:**
Cho ảnh `data.camera()`. Gán nhãn pixel theo 3 lớp bằng ngưỡng thủ công: tối (`I < 80`), trung bình (`80 ≤ I < 160`), sáng (`I ≥ 160`). Tạo color map, overlay lên ảnh gốc với alpha=0.4.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt
from skimage import data

# 1. Tải ảnh
img = data.camera()

# 2. Phân lớp theo ngưỡng
label_map = np.zeros_like(img, dtype=np.uint8)
label_map[img < 80]                          = 0   # nền tối
label_map[(img >= 80) & (img < 160)]         = 1   # trung bình
label_map[img >= 160]                        = 2   # sáng

# 3. Color map
palette = np.array([
    [  0,   0,   0],      # đen — lớp 0
    [ 50, 200,  50],      # xanh lá — lớp 1
    [255, 220,   0],      # vàng — lớp 2
], dtype=np.uint8)
seg_color = palette[label_map]

# 4. Overlay
img_rgb = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
overlay = (0.6 * img_rgb + 0.4 * seg_color).astype(np.uint8)

# 5. Tỷ lệ pixel mỗi lớp
total = img.size
for lbl, name in [(0, 'Tối (nền)'), (1, 'Trung bình'), (2, 'Sáng')]:
    ratio = np.sum(label_map == lbl) / total * 100
    print(f"Lớp {lbl} - {name}: {ratio:.1f}%")

# 6. Hiển thị
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
axes[0].imshow(img, cmap='gray');   axes[0].set_title('Ảnh gốc (xám)')
axes[1].imshow(seg_color);           axes[1].set_title('Phân đoạn ngữ nghĩa')
axes[2].imshow(overlay);             axes[2].set_title('Overlay (alpha=0.4)')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Ảnh được gán nhãn theo 3 mức sáng.
- Overlay giúp thấy rõ phân bố các lớp.

---


## 5. OCR và pipeline hoàn chỉnh

---


### 5.1. OCR đơn giản với Template Matching
**📌 Bài tập 13:**
Sinh template 10 chữ số `0-9` bằng `cv2.putText`. Sinh ảnh "biển số" chứa chuỗi "2024" với kích thước khác. Chia ảnh thành 4 ô đều, so khớp mỗi ô với 10 template để đọc chữ số.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt

# 1. Tạo template chữ số
def make_digit(d, size=(60, 40)):
    img = np.zeros(size, dtype=np.uint8)
    cv2.putText(img, str(d), (5, 45),
                cv2.FONT_HERSHEY_SIMPLEX, 1.5, 255, 3)
    return img

templates = {d: make_digit(d) for d in range(10)}

# 2. Tạo ảnh "biển số"
plate = np.zeros((80, 320), dtype=np.uint8)
cv2.putText(plate, "2024", (10, 60),
            cv2.FONT_HERSHEY_SIMPLEX, 2.0, 255, 4)
plate = cv2.copyMakeBorder(plate, 10, 10, 10, 10,
                            cv2.BORDER_CONSTANT, value=0)

# 3. Chia ảnh thành 4 ô, match mỗi ô với 10 template
h_t, w_t = templates[0].shape
best_matches = []
step = plate.shape[1] // 4

for i in range(4):
    x0 = i * step
    x1 = x0 + step
    roi = plate[:, x0:x1]
    roi_rs = cv2.resize(roi, (w_t, h_t))

    best_digit, best_score = None, -np.inf
    for d, tmpl in templates.items():
        res = cv2.matchTemplate(roi_rs, tmpl, cv2.TM_CCOEFF_NORMED)
        _, max_val, _, _ = cv2.minMaxLoc(res)
        if max_val > best_score:
            best_score = max_val
            best_digit = d
    best_matches.append((best_digit, best_score, x0, x1))

# 4. Vẽ kết quả
out = cv2.cvtColor(plate, cv2.COLOR_GRAY2RGB)
predicted = ""
for digit, score, x0, x1 in best_matches:
    predicted += str(digit)
    cv2.rectangle(out, (x0, 0), (x1, out.shape[0]), (0, 255, 0), 1)
    cv2.putText(out, str(digit), (x0 + 10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 0, 0), 2)

ground_truth = "2024"
print(f"Ground truth: {ground_truth}")
print(f"Dự đoán     : {predicted}")
print(f"Khớp?       : {predicted == ground_truth}")

# 5. Hiển thị
plt.figure(figsize=(10, 3))
plt.imshow(out); plt.title(f'OCR — GT="{ground_truth}" | Dự đoán="{predicted}"')
plt.axis('off'); plt.show()
```

**Kết quả mong đợi:**
- Đọc được chuỗi số "2024" (minh họa nguyên lý OCR cổ điển).
- Template matching chỉ hiệu quả với ảnh có cùng font/kích thước.

---


### 5.2. Pipeline CV hoàn chỉnh — Đếm và phân loại đối tượng
**📌 Bài tập 14:**
Cho ảnh `data.coins()`. Xây dựng pipeline tổng hợp từ Chương 1 → 5: tiền xử lý → phân đoạn → contour → trích xuất đặc trưng → phân loại rule-based thành 3 nhóm kích thước (nhỏ/vừa/lớn).

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data
from collections import Counter

# 1. Tải ảnh
img = data.coins()

# 2. Tiền xử lý (Chương 2)
blur = cv2.GaussianBlur(img, (5, 5), 1.5)
_, th = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

# 3. Morphology + contours (Chương 4)
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
closed = cv2.morphologyEx(th, cv2.MORPH_CLOSE, kernel, iterations=2)
contours, _ = cv2.findContours(closed, cv2.RETR_EXTERNAL,
                                cv2.CHAIN_APPROX_SIMPLE)
valid = [c for c in contours if cv2.contourArea(c) > 200]

# 4. Trích xuất đặc trưng (Chương 5)
feats = []
for c in valid:
    area = cv2.contourArea(c)
    peri = cv2.arcLength(c, True)
    circ = 4 * np.pi * area / (peri ** 2) if peri > 0 else 0
    x, y, w, h = cv2.boundingRect(c)
    aspect = w / h if h > 0 else 1
    feats.append({'contour': c, 'area': area, 'circularity': circ,
                  'aspect': aspect})

# 5. Phân loại rule-based theo percentile diện tích
area_vals = np.array([f['area'] for f in feats])
thresh_small = np.percentile(area_vals, 33)
thresh_large = np.percentile(area_vals, 66)

def classify(f):
    if f['area'] < thresh_small:   return 'small'
    if f['area'] < thresh_large:   return 'medium'
    return 'large'

for f in feats:
    f['class'] = classify(f)

counts = Counter(f['class'] for f in feats)
print(f"Ngưỡng nhỏ/vừa: {thresh_small:.0f} / {thresh_large:.0f}")
print(f"Số đối tượng: {counts}")

# 6. Vẽ theo nhóm màu
color_map = {'small':  (255, 100, 100),
             'medium': (100, 255, 100),
             'large':  (255, 200,   0)}
out = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
for f in feats:
    c = color_map[f['class']]
    cv2.drawContours(out, [f['contour']], -1, c, 2)
    M = cv2.moments(f['contour'])
    if M['m00'] > 0:
        cx = int(M['m10'] / M['m00'])
        cy = int(M['m01'] / M['m00'])
        cv2.putText(out, f['class'][0].upper(),
                    (cx - 6, cy + 6),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

# 7. Hiển thị
fig, axes = plt.subplots(1, 5, figsize=(22, 5))
for ax, (im, t) in zip(axes, [
    (img, '1. Ảnh gốc'),
    (blur, '2. Gaussian Blur'),
    (th, '3. Otsu'),
    (closed, '4. Morphology'),
    (out, f'5. Contour + Classify\nS={counts["small"]}, M={counts["medium"]}, L={counts["large"]}')
]):
    ax.imshow(im, cmap='gray' if im.ndim == 2 else None)
    ax.set_title(t); ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Pipeline phân loại đồng xu thành 3 nhóm kích thước.
- Minh họa toàn bộ kiến thức từ Chương 1 → 5.

---


## 6. Tổng kết

---


### 6.1. Bảng tổng hợp — Ví dụ theo slide lý thuyết

| Slide lý thuyết | Bài tập | Chủ đề |
|-----------------|:-------:|--------|
| Feature extraction | 1 | Color histogram |
| Classification | 2 | Đặc trưng hình học + k-NN/SVM |
| Classification (HOG) | 3 | HOG + SVM |
| Object Detection | 4 | Haar Cascade — khuôn mặt |
| Object Detection (parts) | 5 | Phát hiện mặt/mắt/miệng |
| Template Matching | 6 | Phát hiện đồng xu |
| Keypoint Detection | 7 | ORB detector |
| Keypoint Comparison | 8 | ORB vs SIFT |
| Image Stitching | 9 | Panorama |
| Instance Counting | 10 | Đếm đối tượng |
| Measurement | 11 | Đo kích thước |
| Semantic Segmentation | 12 | Phân đoạn theo ngưỡng |
| OCR | 13 | Template matching |
| Full Pipeline | 14 | Pipeline CV hoàn chỉnh |

---


### 6.2. Lưu ý quan trọng khi chạy code

| Vấn đề | Cách xử lý |
|--------|-----------|
| **`cv2.CascadeClassifier` không tồn tại** | Cài `opencv-contrib-python`, restart kernel |
| **File XML Haar không có sẵn** | Tải thủ công qua `urllib` vào thư mục `images/` |
| **`!empty()` assertion failed** | Kiểm tra file XML tồn tại + không rỗng |
| **`cv2.AKAZE_create` không tồn tại** | Chỉ dùng ORB hoặc SIFT |
| **`cv2.BRISK_create` không tồn tại** | Chỉ dùng ORB hoặc SIFT |
| **Hiển thị ảnh màu đọc từ OpenCV** | Đổi `BGR → RGB` trước khi `imshow` |
| **Haar Cascade bỏ sót mắt/miệng** | Nới lỏng `minNeighbors`, dùng CLAHE |

---


### 6.3. Tổng kết

**Năm nhóm nội dung chính Chương 5:**

| Nhóm | Số bài tập | Kỹ thuật chủ đạo |
|------|:----------:|------------------|
| **1. Trích xuất đặc trưng & phân loại** | 1 → 3 | Color hist, HOG, k-NN, SVM |
| **2. Phát hiện đối tượng & khuôn mặt** | 4 → 6 | Haar Cascade, Template Matching |
| **3. Đặc trưng & ghép ảnh** | 7 → 9 | ORB, SIFT, Homography |
| **4. Phân đoạn & đếm đối tượng** | 10 → 12 | Contour, đo lường, ngưỡng |
| **5. OCR & pipeline** | 13 → 14 | Template matching, tổng hợp |

**📌 Nhớ 3 điều:**
1. **Feature extraction** là bước quyết định — pixel thô đủ cho ảnh nhỏ, HOG/SIFT/ORB cho ảnh lớn.
2. **Haar Cascade** hoạt động tốt trong điều kiện lý tưởng, có thể bỏ sót khi ảnh phức tạp.
3. **Pipeline CV hoàn chỉnh** kết hợp nhiều chương: tiền xử lý → phân đoạn → trích xuất → phân loại.