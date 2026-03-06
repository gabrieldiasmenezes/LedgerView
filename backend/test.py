from services.data.data_loader import fetch_target_data

target=fetch_target_data(2025)
print("\nTargets for 2025:")
for index,row in target.items():
    print(f"{index.capitalize()}: {row}")