import nltk

nltk.download('wordnet')
from nltk.corpus import wordnet as wn 

#synset single
word = 'nile'
word = word.lower()
syns = wn.synsets(word)

for syn in syns:
    print(syn, ": ", syn.definition(), "\n")

#synset multiple
word = 'bat'
word = word.lower()
syns = wn.synsets(word)

for syn in syns:
    print(syn, ": ", syn.definition(), "\n")

#get only noun synsets
#Question 1: Which of these is a noctural animal that flies?
# a) _______
# b) _______
# c) bat
# d) _______

word = "bat"
word = word.lower()
syns = wn.synsets(word, 'n')

for syn in syns:
    print(syn, ": ", syn.definition(), "\n")

#get hypernyms for a synset
word = 'lion'
word = word.lower()
syns = wn.synsets(word, 'n')

hypernym = syns[0].hypernyms()
print(hypernym)
print(hypernym[0].hyponyms())

#distractors from wordnet
def get_distractors_wordnet(syn, word):
    distractors = []
    word = word.lower()
    orig_word = word
    if len(word.split()) > 0:
        word = word.replace(" ", "_")
    hypernym = syn.hypernyms()
    if len(hypernym) == 0:
        return distractors
    for item in hypernym[0].hyponyms():
        name = item.lemmas()[0].name()
        if name == orig_word:
            continue
        name = name.replace("_", " ")
        name = " ".join(w.capitalize() for w in name.split())
        if name is not None and name not in distractors:
            distractors.append(name)
    return distractors 

original_word = "lion"
synset_to_use = wn.synsets(original_word, 'n')[0]
distractors_calculated = get_distractors_wordnet(synset_to_use, original_word)

print('original word: ', original_word.capitalize())
print(distractors_calculated)

original_word = "bat"
synset_to_use = wn.synsets(original_word, 'n')[0]
distractors_calculated = get_distractors_wordnet(synset_to_use, original_word)

print('\noriginal word: ', original_word.capitalize())
print(distractors_calculated)

original_word = 'green'
synset_to_use = wn.synsets(original_word, 'n')[0]
distractors_calculated = get_distractors_wordnet(synset_to_use, original_word)

print('\noriginal word: ', original_word.capitalize())
print(distractors_calculated)

#an example of a word with two different senses
original_word = 'cricket'

syns = wn.synsets(original_word, 'n')

for syn in syns:
    print(syn, ": ", syn.definition(), "\n")

synset_to_use = wn.synsets(original_word, 'n')[0]
distractors_calculated = get_distractors_wordnet(synset_to_use, original_word)

print("\noriginal word: ", original_word.capitalize())
print(distractors_calculated)

original_word = 'cricket'
synset_to_use = wn.synsets(original_word, 'n')[1]
distractors_calculated = get_distractors_wordnet(synset_to_use, original_word)

print('\noriginal word: ', original_word.capitalize())
print(distractors_calculated)