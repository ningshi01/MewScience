# ------- Litang Save The World! -------
#
# @Time    : 2023/8/24 19:44
# @Author  : Lynx
# @File    : gitScript.py
#

import os

branch_name = input("请输入个人开发分支名 [ (a)wx / (b)wzs / (c)gyh / (d)ysb / (e)lynx / (f) elaikona /(g) zlh /(h) cbl]: ")
confirmation = input("请确认位于个人开发分支并已将所有更改提交！[y/n]: ")
dev_branch = 'master'

if branch_name == 'a':
    branch_name = 'wx'
elif branch_name == 'b':
    branch_name = 'wzs'
elif branch_name == 'c':
    branch_name = 'gyh'
elif branch_name == 'd':
    branch_name = 'ysb'
elif branch_name == 'e':
    branch_name = 'lynx'
elif branch_name == 'f':
    branch_name = 'elaikona'
elif branch_name == 'g':
    branch_name = 'zlh'
elif branch_name == 'h':
    branch_name = 'cbl'
    
# if branch_name in ['e', 'f']:
#     dev_branch = 'dev'
# else:
#     dev_branch = 'dev'

if confirmation.lower() == "y":
    os.system(f"git checkout {dev_branch}")
    os.system("git pull")
    os.system(f"git checkout {branch_name}")
    os.system(f"git merge {dev_branch}")
    print("该步骤可能会发生冲突，git分析中……")
    os.system(f"git checkout {dev_branch}")
    os.system(f"git merge {branch_name}")
    os.system("git push")
    os.system(f"git checkout {branch_name}")
    print(f"返回到自己的分支{branch_name}，请注意周期性提交开发进程。")
else:
    print("操作已取消。")