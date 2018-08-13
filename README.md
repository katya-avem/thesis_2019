## Description

These files represent the methods of quantitative analysis described in V. A. Sapogov's article «Some characteristics of dramaturgic construction of Ostrovsky’s comedy "Forest"». This method helps to consider the system of the social relations and plot functions of characters of various plays by means of the quantitative characteristics such as busyness, frequency of emergence, mobility, rank and probability of characters’s meetings. In this research methods of the quantitative analysis are applied to some plays of the 1870-s, namely «Forest» and «Wolves and sheep» by A. N. Ostrovsky, «Loop» and «Topic of the day» by N. A. Potekhin and «Mayorsha» by I.V. Shpazhinsky.

## Prerequisites

Live in `requirements.txt`

## Usage

1. Create a file drama_name.py with the following content:
```python
from template import generate

name = 'drama_name'
data = [[['3-d list with drama heroes here for each scene and act here']]]
generate(name, data)
```
2. Execute `python drama_name.py`. This will generate `drama_name.ipynb`

3. Execute `jupyter nbconvert --execute --inplace drama_name.ipynb`

## License

This project is licensed under the [MIT License](LICENSE)

## Acknowledgments

* Сапогов В. А. «Некоторые характеристики драматургического построения комедии Островского "Лес"» (1974)
