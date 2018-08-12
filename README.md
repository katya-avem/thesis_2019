## Description

One Paragraph of project description goes here

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
