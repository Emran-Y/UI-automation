alpha  = 'abcdefghijklmnopqrstuvwxyz'
for _ in range(int(input())):
    n,m = map(int,input().split())
    re =  n // m
    ans = ''
    for i in range(m):
        if n >= re:
            ans+=alpha[i]*re
            n-=(re)
        else:
            ans+=alpha[i] * n
            n = 0
            
    if n!=0:
        ans+=alpha[m-1]*n
    print(ans)