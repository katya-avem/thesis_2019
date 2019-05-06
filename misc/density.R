library(readr)
library(ggplot2)

#таблица
drama = read_csv("density.csv")

#таблица как матрица (без первой колонки)
matrix = as.matrix(drama[,-1])

#названия строк для матрицы
rownames(matrix) = drama$X1

# нормализация матрицы (насколько каждое значение в колонке отклоняется от среднего)
z.scores = scale(matrix)

#вычисление евклидова расстояния от каждой пьесы до любой другой
dist.mtrx = dist(z.scores, method="euclidean", diag=T, upper=T)
#посмотреть матрицу расстояний
as.matrix(dist.mtrx)

#иерархическая кластеризация (дендрограмма)
clust = hclust(dist.mtrx, method = "complete")
plot(clust)

## points

#визуализация соотношений пьес в двумерном пространстве (плотность в 1 и 2 действии)
ggplot(drama, aes(scale(`1`), scale(`2`))) + geom_point() + geom_text(aes(label=X1), vjust=-0.5)