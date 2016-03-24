import json
import sys

data = json.loads(sys.argv[1])
data = json.dumps(data)
print(data)
sys.stdout.flush()

# import logging

# logger = logging.getLogger('scope.name')

# file_log_handler = logging.FileHandler('logfile.log')
# logger.addHandler(file_log_handler)

# stderr_log_handler = logging.StreamHandler()
# logger.addHandler(stderr_log_handler)

# # nice output format
# formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
# file_log_handler.setFormatter(formatter)
# stderr_log_handler.setFormatter(formatter)

# logger.error(sys.argv[1])