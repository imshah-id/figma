
import json

def get_nodes(node):
    yield node
    if 'children' in node:
        for child in node['children']:
            yield from get_nodes(child)

try:
    with open('figma_full.json', 'r') as f:
        data = json.load(f)
        print('Loaded JSON')
        
        found = False
        for node in get_nodes(data['document']):
            name = node.get('name', '')
            chars = node.get('characters', '')
            
            if name == 'Manual Setup' or (node.get('type') == 'TEXT' and 'Manual Setup' in chars):
                print(f"FOUND: ID={node['id']}, Name={name}, Type={node['type']}")
                found = True
                
        if not found:
            print("Not found")

except Exception as e:
    print(f"Error: {e}")
