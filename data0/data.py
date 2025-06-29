import json

def create_files():
	with open("./data.json", "r") as f:
		jsn = json.load(f);
		base_name = jsn["dir_base_name"];
		"""
		for i in range(len(jsn["dirs"])):
			for j in range(int(jsn["dirs"][i]["n_of"])):
				my_dir = jsn["json_dir_name"];
				my_dir2 = jsn["text_dir_name"];
				my_name = jsn["dirs"][i]["name"];
				with open(f"./{base_name + str(i)}/{my_dir}/{my_name} ({str(j + 1)}).json", "w") as f2:
					obj = {
						"edit": "none"
					};
					json.dump(obj, f2, indent = 4);
				with open(f"./{base_name + str(i)}/{my_dir2}/{my_name} ({str(j + 1)}).txt", "w")as f2:
					f2.write("");
		"""
		i = 3
		for j in range(int(jsn["dirs"][i]["n_of"])):
			my_dir = jsn["json_dir_name"];
			my_dir2 = jsn["text_dir_name"];
			my_name = jsn["dirs"][i]["name"];
			with open(f"./{base_name + str(i)}/{my_dir}/{my_name} ({str(j + 1)}).json", "w") as f2:
				obj = {
					"edit": "none"
				};
				json.dump(obj, f2, indent = 4);
			with open(f"./{base_name + str(i)}/{my_dir2}/{my_name} ({str(j + 1)}).txt", "w")as f2:
				f2.write("");
create_files();