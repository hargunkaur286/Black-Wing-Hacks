from sense2vec import Sense2Vec 
s2v = Sense2Vec().from_disk('s2v_old')

word = "Donald Trump"
word = word.lower()
word = word.replace(" ", "_")
print("word", word)
sense = s2v.get_best_sense(word)
print("Best sense", sense)
most_similar = s2v.most_similar(sense, n=12)
print(most_similar)


distractors = []
for each_word in most_similar:
    append_word = each_word[0].split("|")[0].replace("_", " ").lower()
    if append_word.lower() != word:
        distractors.append(append_word.title())
print(distractors)


from collections import OrderedDict
def sense2vec_get_words(word,s2v):
    output = []
    word = word.replace(" ", "_")
    sense = s2v.get_best_sense(word)
    most_similar = s2v.most_similar(sense, n=20)

    sense = s2v.get_best_sense(word)
    most_similar = s2v.most_similar(sense, n=20)

    for each_word in most_similar:
        append_word = each_word[0].split("|")[0].replace("_", " ").lower()
        if append_word.lower() != word:
            output.append(append_word.title())
    
    out = list(OrderedDict.fromkeys(output))
    return out

word = "Natural Language Processing"
distractors = sense2vec_get_words(word, s2v)

print("Distractors for", word, " : ")
print(distractors)


import string
# A function to get all the edits for a word
def edits(word):
    "All edits that are one edit away from `word`."
    letters    = 'abcdefghijklmnopqrstuvwxyz '+string.punctuation
    splits     = [(word[:i], word[i:])    for i in range(len(word) + 1)]
    deletes    = [L + R[1:]               for L, R in splits if R]
    transposes = [L + R[1] + R[0] + R[2:] for L, R in splits if len(R)>1]
    replaces   = [L + c + R[1:]           for L, R in splits if R for c in letters]
    inserts    = [L + c + R               for L, R in splits for c in letters]
    return set(deletes + transposes + replaces + inserts)

print (edits("cat"))

word = "USA"
distractors = sense2vec_get_words(word,s2v)

print ("Distractors for ",word, " : ")
print (distractors)

all_edits = edits (word.lower())
print (all_edits)

filtered_distractors_edit_distance = [x for x in distractors if x.lower() not in all_edits]
print (filtered_distractors_edit_distance)

from similarity.normalized_levenshtein import NormalizedLevenshtein
normalized_levenshtein = NormalizedLevenshtein()

print ("Levenshtein Distance USA  & U.S.A  ->", normalized_levenshtein.distance("USA","U.S.A"))
print ("Levenshtein Distance USA  & U.S  ->", normalized_levenshtein.distance("USA","U.S"))
print ("Levenshtein Distance USA  & America  ->", normalized_levenshtein.distance("USA","America"))
print ("Levenshtein Distance USA  & Canada  ->", normalized_levenshtein.distance("USA","Canada"))
print ("Levenshtein Distance USA  & United States  ->", normalized_levenshtein.distance("USA","United States"))

threshold = 0.7
filtered_distractors_edit_distance_and_levenshtein_distance =[[x for x in filtered_distractors_edit_distance if normalized_levenshtein.distance(x.lower(),word.lower())>threshold] ]
print (filtered_distractors_edit_distance_and_levenshtein_distance)

print(distractors)