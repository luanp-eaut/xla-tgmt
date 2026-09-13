# 🔍 Giải thích: Vì sao Haar Cascade không phát hiện miệng và chỉ phát hiện 1 mắt?

Đây là **hạn chế cố hữu** của Haar Cascade, không phải lỗi code. Có 4 nguyên nhân chính:

## 📌 Nguyên nhân

### 1. `haarcascade_smile.xml` chỉ phát hiện **nụ cười**, không phải **miệng**

- File này được huấn luyện để nhận diện **khuôn mặt đang cười** (miệng mở rộng, thấy răng).
- Nếu người trong ảnh **không cười** (miệng khép, môi khép) → cascade **không phát hiện**.
- Ảnh `data.astronaut()` — phi hành gia Eileen Collins có **miệng khép, không cười** → cascade thất bại.

### 2. `haarcascade_eye.xml` rất nhạy với:
- **Kính** (gọng kính làm nhiễu đặc trưng Haar).
- **Bóng tối / ánh sáng không đều** ở vùng mắt.
- **Góc nghiêng đầu** — Haar cascade không bất biến với xoay.
- **Mắt nhắm / nheo** — mất cấu trúc "con ngươi sáng + tròng đen tối".

→ Trong ảnh astronaut, một mắt có thể bị bóng hoặc hướng nhìn làm cascade bỏ sót.

### 3. Tham số `scaleFactor` và `minNeighbors` quá chặt
- `minNeighbors=8` cho mắt và `minNeighbors=22` cho miệng là **khá cao** → loại bỏ nhiều ứng viên yếu (nhưng thật).
- `scaleFactor=1.1` bỏ qua các kích thước trung gian.

### 4. Vùng ROI bị cắt mất đối tượng
- `upper_half = roi_gray[:h//2, :]` — nếu mắt nằm thấp hơn `h//2` → không được quét.
- `lower_half = roi_gray[h//2:, :]` — nếu miệng nằm cao hơn `h//2` (mặt tròn, cằm ngắn) → không được quét.

---

## ✅ Giải pháp 1: Nới lỏng tham số

```python
# Thay vì minNeighbors=8 → 3-4
eyes = eye_cascade.detectMultiScale(upper_half, 
                                     scaleFactor=1.05,      # nhỏ hơn → quét kỹ hơn
                                     minNeighbors=4,        # thấp hơn → nhạy hơn
                                     minSize=(10, 10),
                                     maxSize=(h//3, h//3))
```

## ✅ Giải pháp 2: Dùng `haarcascade_mcs_mouth.xml` thay vì `smile.xml`

Cascade **MCS** (Modular Computer Vision System) chuyên phát hiện **miệng nói chung**, không cần cười. Tuy nhiên, nó không có sẵn trong OpenCV — bạn cần tải riêng. Không khuyến nghị vì phức tạp.

## ✅ Giải pháp 3: Suy luận vị trí miệng theo hình học (khuyên dùng)

Nếu không cần độ chính xác tuyệt đối, có thể **giả định miệng nằm ở 2/3 dưới khuôn mặt**:

```python
# Vẽ bounding box miệng theo tỷ lệ khuôn mặt
mx = x + int(w * 0.25)
my = y + int(h * 0.65)
mw = int(w * 0.5)
mh = int(h * 0.25)
cv2.rectangle(out, (mx, my), (mx + mw, my + mh), (255, 255, 0), 2)
```

## ✅ Giải pháp 4: Tiền xử lý ảnh trước khi phát hiện

```python
# Cân bằng histogram để tăng tương phản vùng tối
img_gray = cv2.equalizeHist(img_gray)

# Hoặc dùng CLAHE (tốt hơn cho ảnh có chiếu sáng không đều)
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
img_gray = clahe.apply(img_gray)
```

---

## 📝 Lời giải Bài 4 cải tiến (kết hợp nhiều cách)

```python
img_rgb = data.astronaut()
img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)

# ✅ Tiền xử lý: CLAHE tăng tương phản vùng tối
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
img_gray = clahe.apply(img_gray)

# Load cascades
face_cascade  = cv2.CascadeClassifier('images/haarcascade_frontalface_default.xml')
eye_cascade   = cv2.CascadeClassifier('images/haarcascade_eye.xml')
smile_cascade = cv2.CascadeClassifier('images/haarcascade_smile.xml')

# 1. Phát hiện mặt
faces = face_cascade.detectMultiScale(img_gray, 1.1, 5, minSize=(50, 50))
out = img_rgb.copy()

for (x, y, w, h) in faces:
    cv2.rectangle(out, (x, y), (x + w, y + h), (255, 0, 0), 3)

    roi_gray  = img_gray[y:y+h, x:x+w]
    roi_color = out[y:y+h, x:x+w]

    # 2. MẮT — nới lỏng tham số, quét cả 60% trên
    upper = roi_gray[:int(h*0.6), :]
    eyes = eye_cascade.detectMultiScale(upper,
                                         scaleFactor=1.05,
                                         minNeighbors=4,
                                         minSize=(10, 10),
                                         maxSize=(h//3, h//3))
    for (ex, ey, ew, eh) in eyes:
        cv2.rectangle(roi_color, (ex, ey),
                      (ex + ew, ey + eh), (0, 255, 0), 2)
    print(f"  Phát hiện {len(eyes)} mắt")

    # 3. MIỆNG — thử smile cascade trước, nếu không có thì suy luận hình học
    lower = roi_gray[int(h*0.5):, :]
    smiles = smile_cascade.detectMultiScale(lower,
                                             scaleFactor=1.5,
                                             minNeighbors=10,
                                             minSize=(15, 10))
    if len(smiles) > 0:
        for (sx, sy, sw, sh) in smiles:
            cv2.rectangle(roi_color,
                          (sx, sy + int(h*0.5)),
                          (sx + sw, sy + sh + int(h*0.5)),
                          (255, 255, 0), 2)
        print(f"  Phát hiện {len(smiles)} miệng (smile cascade)")
    else:
        # Fallback: vẽ miệng theo hình học
        mx, my = int(w*0.25), int(h*0.68)
        mw, mh = int(w*0.5),  int(h*0.22)
        cv2.rectangle(roi_color, (mx, my),
                      (mx + mw, my + mh), (255, 255, 0), 2)
        print(f"  Không có smile cascade → dùng fallback hình học")

show_image(out, 'Bài 4: Phát hiện mặt / mắt / miệng (cải tiến)',
           figsize=(7, 7),
           save_path='output/bai4_face_parts.png')
```

**Kết quả mong đợi:**
- Phát hiện **2 mắt** (nhờ `minNeighbors=4` + CLAHE).
- Vùng miệng vẫn được khoanh **dù không cười** — nhờ **fallback hình học**.

---

## 🎓 Bài học rút ra

| Vấn đề | Ghi nhớ |
|--------|---------|
| **Haar Cascade cổ điển** | Chỉ hoạt động tốt trong điều kiện **lý tưởng**: mặt thẳng, đủ sáng, không kính, miệng cười rõ |
| **Muốn chính xác cao** | Dùng **Deep Learning** (MTCNN, RetinaFace, MediaPipe) — không thuộc phạm vi môn học |
| **Trong phạm vi môn học** | Nới lỏng tham số + tiền xử lý (CLAHE) + fallback hình học |
| **Ảnh khác nhau** | Kết quả khác nhau — cùng code có thể phát hiện đủ 2 mắt/1 mắt/0 mắt tùy ảnh |

Đây là **hành vi bình thường** của Haar Cascade, không phải lỗi. Trong thực tế, kỹ sư CV thường phải **tinh chỉnh tham số cho từng loại ảnh** hoặc chuyển sang **Deep Learning** khi cần độ chính xác cao.

Bạn thử chạy phiên bản cải tiến và cho tôi biết kết quả nhé! 🚀