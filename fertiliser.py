import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

dataset = pd.read_csv('data_core.csv')
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values

from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [6,7])], remainder='passthrough')
X = np.array(ct.fit_transform(X))

from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y = le.fit_transform(y)

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)


from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train[:,0:6] = sc.fit_transform(X_train[:,0:6])
X_test[:,0:6] = sc.transform(X_test[:,0:6])


from sklearn.tree import DecisionTreeClassifier
classifier = DecisionTreeClassifier(criterion = 'entropy', random_state = 0)
classifier.fit(X_train, y_train)

y_pred = classifier.predict(X_test)
#print(np.concatenate((y_pred.reshape(len(y_pred),1), y_test.reshape(len(y_test),1)),1))

from sklearn.metrics import confusion_matrix, accuracy_score
cm = confusion_matrix(y_test, y_pred)
#print(cm)
#accuracy_score(y_test, y_pred)#
# Define the new sample input
sample = np.array([[26, 52, 38, 37, 0, 0, 'Sandy', 'Maize']], dtype=object)

# Apply the same transformations as used for training
sample = np.array(ct.transform(sample))  # One-hot encoding categorical variables
sample[:, 0:6] = sc.transform(sample[:, 0:6])  # Standardizing numerical features

# Predict
prediction = classifier.predict(sample)
predicted_fertilizer = le.inverse_transform(prediction)  # Convert back to original label
print(predicted_fertilizer)