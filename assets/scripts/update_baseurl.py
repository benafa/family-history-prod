# update_baseurl.py
import sys
import yaml

def update_baseurl(config_file, new_baseurl):
    with open(config_file, 'r') as f:
        config_data = yaml.load(f, Loader=yaml.FullLoader)

    config_data['baseurl'] = new_baseurl

    with open(config_file, 'w') as f:
        yaml.dump(config_data, f)

if __name__ == "__main__":
    config_file = sys.argv[1]
    new_baseurl = sys.argv[2]
    update_baseurl(config_file, new_baseurl)