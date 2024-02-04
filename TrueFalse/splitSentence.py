#split a sentence at ending noun phrase or verb phrase
import spacy
nlp = spacy.load("en_core_web_sm")

from allennlp_models.pretrained import load_predictor
predictor = load_predictor("structured-prediction-constituency-parser")

test_sentence = "The old woman was sitting under a tree and sipping coffee."
test_sentence = test_sentence.rstrip('?:!.,;')
print (test_sentence)
parser_output = predictor.predict(sentence=test_sentence)
print (parser_output)

tree_string = parser_output["trees"]
print (tree_string)

from nltk import tokenize
from nltk.tree import Tree

tree = Tree.fromstring(tree_string)
print (tree)
print (tree.pretty_print())

tree.pretty_print()
temp1 = tree[0]
temp2 = tree[1]
temp3 = tree[-1]
temp1.pretty_print()
temp2.pretty_print()
temp3.pretty_print()

# split at right most nounphrase or verbphrase

def get_flattened(t):
    sent_str_final = None
    if t is not None:
        sent_str = [" ".join(x.leaves()) for x in list(t)]
        sent_str_final = [" ".join(sent_str)]
        sent_str_final = sent_str_final[0]
    return sent_str_final

def get_right_most_VP_or_NP(parse_tree,last_NP = None,last_VP = None):
    if len(parse_tree.leaves()) == 1:
        return last_NP,last_VP
    last_subtree = parse_tree[-1]
    if last_subtree.label() == "NP":
        last_NP = last_subtree
    elif last_subtree.label() == "VP":
        last_VP = last_subtree
    
    return get_right_most_VP_or_NP(last_subtree,last_NP,last_VP)


last_nounphrase, last_verbphrase =  get_right_most_VP_or_NP(tree)
last_nounphrase_flattened = get_flattened(last_nounphrase)
last_verbphrase_flattened = get_flattened(last_verbphrase)

print ("Original Sentence ",test_sentence)
print ("last_nounphrase ",last_nounphrase )
print ("last_verbphrase ",last_verbphrase)
print ("\n ")
print ("last_nounphrase ",last_nounphrase_flattened )
print ("last_verbphrase ",last_verbphrase_flattened)