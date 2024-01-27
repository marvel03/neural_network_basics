import tensorflow as tf
from tensorflow import keras
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


losses = []
accuracies = []
epoch_count = []
test_data = pd.read_csv(r"C:\Users\91784\Downloads\training_data.csv")
test_data = pd.DataFrame(test_data)
print(test_data.shape)
test_data = test_data.drop_duplicates(subset=["x", "y"])
print("removed duplicates", test_data.shape)
test_data_kinematics = np.array(test_data)
input_train = test_data_kinematics[0:, :2]
output_train = test_data_kinematics[0:, 2:]
# print(output_train)

model = keras.models.load_model("nn.h5")
for i in range(1, 10000):
    response = model.fit(
        input_train,
        output_train,
        batch_size=input_train.shape[0],
        epochs=100,
        shuffle=True,
    )

    losses.append(response.history["loss"][0])
    accuracies.append(response.history["accuracy"][0])

    # print(response.history["accu"][0])
model.save("nn1.h5")
plt.plot(np.array(accuracies))
plt.show()
model.evaluate(input_train, output_train)
