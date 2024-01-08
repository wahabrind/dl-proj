from django.shortcuts import render

# Create your views here.


def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('pass')

        #validating data
        if (username =='' or username==None) or (password =='' or password==None):
            messages.success(request, f"Incorrect Data")
            return render(request, 'login.html')


        user = authenticate(username=username, password=password)
        if user is not None:
            auth_login(request,user)
            messages.success(request, f"You are now logged in as {username}")
            return redirect('/')
        else:
            messages.success(request, f"Incorrect username and password")
            return render(request, 'login.html')

    return render(request, 'login.html')


def handleLogout(request):
    logout(request)
    messages.success(
            request, f"You have succesfully logged out")
    return redirect('/')
        