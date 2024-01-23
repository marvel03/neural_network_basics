import tensorflow as tf
from tensorflow import keras
import numpy as np
import matplotlib.pyplot as plt

(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()

print("total entries : ", len(x_train))

print("size of the image: ", x_train[0].shape)  # printing the shape of one image
# it is a 28x28 image

# to view the image use matplotlib
plt.matshow(x_train[0])  # first image is displayed
plt.show()

# the respective classification can also be checked
# print(y_train[0])

# now we have to flatten this image, its 28x28 ,so we have to flatten it to 1x(28*28)
print("shape of entire x_train: ", x_train.shape)
x_train_flattened = x_train.reshape(
    len(x_train), x_train[0].shape[0] * x_train[0].shape[1]
)
print("shape of the x_train_flattend: ", x_train_flattened.shape)
