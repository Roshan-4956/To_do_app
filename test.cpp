#include <bits/stdc++.h>
using namespace std;

int main(){
    map<int,int> mp;
    for(int i=0;i<2;i++)
    mp[i]=0;

    mp[0]++;
    for(auto x:mp){
        cout<<x.first<<" "<<x.second<<endl;
    }
}