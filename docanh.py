from PIL import Image
import numpy as np

# Đường dẫn tới file ảnh của bạn
image_path = 'cat.png' 

# Mở ảnh và chuyển sang chế độ thang độ xám (Grayscale)
img = Image.open(image_path).convert('L')

# Chuyển đổi ảnh thành mảng numpy
gray_matrix = np.array(img)

# In kích thước ma trận (số hàng x số cột)
print("Kích thước ma trận:", gray_matrix.shape)

# In ma trận cường độ xám
print(gray_matrix)