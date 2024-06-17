from django.shortcuts import get_object_or_404
from rest_framework import views, viewsets, pagination, generics
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
import django_filters
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .email_manager import EmailSend

class GoodFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')
    delivery = django_filters.BooleanFilter()
    price = django_filters.RangeFilter() 
    class Meta:
        model = GoodModel
        fields = ['name', 'delivery', 'price']


class GoodViewSet(viewsets.ViewSet):
    def create(self, request):
        if self.request.user.is_authenticated:
            if self.request.user.is_superuser:
                name = request.data["name"]
                desc = request.data["description"]
                price = request.data["price"]
                image = request.data["image"]
                good = GoodModel.objects.create(
                    name=name,
                    description=desc,
                    price=price,
                    image=image
                )
                
                good.save()
                serializer = GoodSerializer(good)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response("У вас нет прав для этих действии!", status=status.HTTP_405_METHOD_NOT_ALLOWED)
        return Response("Вы не авторизированы!", status=status.HTTP_401_UNAUTHORIZED)
    
    def list(self, request):
        # page_size = 12
        # page_number = request.query_params.get('page', 1)
        queryset = GoodModel.objects.all()
        filter = GoodFilter(request.GET, queryset=queryset)
        queryset = filter.qs
        ordering = request.GET.get('ordering', None)
        
        if ordering:
            queryset = queryset.order_by(ordering)
        # if page_number:
        #     page_number = int(page_number)
        # start_index = (page_number - 1) * page_size
        # end_index = page_number * page_size
        serializer = GoodSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def retrieve(self, request, pk=None):
        queryset = GoodModel.objects.all()
        good = get_object_or_404(queryset, pk=pk)
        serializer = GoodSerializer(good)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        if self.request.user.is_authenticated:
            if self.request.user.is_superuser:
                queryset = GoodModel.objects.all()
                good = get_object_or_404(queryset, pk=pk)
                good.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response("У вас нет прав для этих действии!", status=status.HTTP_405_METHOD_NOT_ALLOWED)
        return Response("Вы не авторизированы!", status=status.HTTP_401_UNAUTHORIZED)
    
    def update(self, request, pk=None):
        if self.request.user.is_authenticated:
            if self.request.user.is_superuser:
                queryset = GoodModel.objects.all()
                good = get_object_or_404(queryset, pk=pk)
                good.name = request.data["name"]
                good.price = request.data["price"]
                good.save()
                serializer = GoodSerializer(good)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response("У вас нет прав для этих действии!", status=status.HTTP_405_METHOD_NOT_ALLOWED)
        return Response("Вы не авторизированы!", status=status.HTTP_401_UNAUTHORIZED)
    

class CartViewSet(viewsets.ViewSet):
    def create(self, request):
        if self.request.user.is_authenticated:
            print(request.data)
            goods = GoodModel.objects.all()
            good = get_object_or_404(goods, pk=request.data["good_id"])
            user = self.request.user
            carts = CartModel.objects.all()
            count = int(request.data["count"])
            for c in carts:
                if good == c.good_id and user == c.user:
                    c.count += count
                    c.save()
                    serializer = CartSerializer(c)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                    
            cart = CartModel.objects.create(good_id=good, user=user, count=count)
            cart.save()
            serializer = CartSerializer(cart)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response("Пожалуйста авторизируйтесь, чтобы добавить в корзину!", status=status.HTTP_401_UNAUTHORIZED)
    
    def list(self, request):
        if self.request.user.is_authenticated:
            qs = CartModel.objects.filter(user=self.request.user)
            result = 0
            for q in qs:
                result += q.overall_price
            serializer = CartSerializer(qs, many=True)
            return Response({"sum_price":result,"data":serializer.data}, status=status.HTTP_200_OK)
        return Response("Вы не авторизированы!", status=status.HTTP_401_UNAUTHORIZED)
    
    def retrieve(self, request, pk=None):
        queryset = CartModel.objects.all()
        cart = get_object_or_404(queryset, pk=pk)
        if self.request.user.is_authenticated:
            if self.request.user == cart.user or self.request.user.is_superuser:
            
                serializer = CartSerializer(cart)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response("У вас нет прав для этих действии!", status=status.HTTP_405_METHOD_NOT_ALLOWED)
        return Response("Вы не авторизированы!", status=status.HTTP_401_UNAUTHORIZED)
    
    def destroy(self, request, pk=None):
        queryset = CartModel.objects.all()
        cart = get_object_or_404(queryset, pk=pk)
                
        if self.request.user.is_authenticated:
            if self.request.user.is_superuser or self.request.user == cart.user:
                cart.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response("У вас нет прав для этих действии!", status=status.HTTP_405_METHOD_NOT_ALLOWED)
        return Response("Вы не авторизированы!", status=status.HTTP_401_UNAUTHORIZED)
    
    def update(self, request, pk=None):
        
        if self.request.user.is_authenticated:
            queryset = CartModel.objects.all()
            cart = get_object_or_404(queryset, pk=pk)
            if self.request.user.is_superuser or self.request.user == cart.user:
                
                cart.count = request.data["count"]
                
                cart.save()
                serializer = CartSerializer(cart)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response("У вас нет прав для этих действии!", status=status.HTTP_405_METHOD_NOT_ALLOWED)
        return Response("Вы не авторизированы!", status=status.HTTP_401_UNAUTHORIZED)


class OrderViewSet(viewsets.ViewSet):
    def create(self, request):
        if self.request.user.is_authenticated:
            user = self.request.user
            address = request.data["address"]
            phone = request.data["phone"]
            carts = request.data["carts"]
            city = request.data["city"]
            first_name = request.data["first_name"]
            last_name = request.data["last_name"]
            payment_method = request.data["payment_method"]
            for cart in carts:
                crt = CartModel.objects.get(id=cart)
                


                order = OrderModel.objects.create(
                    user=user,
                    address=address,
                    good_id=crt.good_id,
                    count=crt.count,
                    phone=phone,
                    city=city,
                    first_name=first_name,
                    last_name=last_name,
                    payment_method=payment_method,
                )
                order.save()
                crt.delete()
                subject = 'Новый заказ!'
                body = f"У нас новый заказ! Пожалуйста, ознакомьтесь с деталями:\n\nГород: {city}\nАдрес: {address}\nСпособ оплаты: {payment_method}\n\nНазвание товара: {crt.good_id.name}\nИдентификатор товара в базе данных: {crt.good_id.pk}\nКоличество: {crt.count}\n\nИмя Фамилия: {first_name} {last_name}\nКонтактные данные, номер телефона: {phone}\nУникальный идентификатор заказа: {order.id}\n\nПросим вас обработать этот заказ как можно скорее и связаться с клиентом для подтверждения деталей доставки и оплаты.\n\nСпасибо!"
                EmailSend(email_receiver="lukmanovrashit1@gmail.com", subject=subject, body=body)
            return Response("", status=status.HTTP_201_CREATED)
        
        return Response("Вы не авторизированы!", status=status.HTTP_401_UNAUTHORIZED)
    
    def list(self, request):
        if self.request.user.is_authenticated:
            user = self.request.user
            order = OrderModel.objects.filter(user=user)
            serializer = OrderSerializer(order, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response("Вы не авторизированы!", status=status.HTTP_401_UNAUTHORIZED)
    
    def retrieve(self, request, pk=None):
        queryset = OrderModel.objects.all()
        order = get_object_or_404(queryset, pk=pk)
        if self.request.user.is_authenticated:
            if self.request.user == order.user or self.request.user.is_superuser:
            
                serializer = OrderSerializer(order)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response("У вас нет прав для этих действии!", status=status.HTTP_405_METHOD_NOT_ALLOWED)
        return Response("Вы не авторизированы!", status=status.HTTP_401_UNAUTHORIZED)
    
    def destroy(self, request, pk=None):
        queryset = OrderModel.objects.all()
        order = get_object_or_404(queryset, pk=pk)
                
        if self.request.user.is_authenticated:
            if self.request.user.is_superuser or self.request.user == order.user:
                order.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response("У вас нет прав для этих действии!", status=status.HTTP_405_METHOD_NOT_ALLOWED)
        return Response("Вы не авторизированы!", status=status.HTTP_401_UNAUTHORIZED)
    
    def update(self, request, pk=None):
        
        if self.request.user.is_authenticated:
            queryset = OrderModel.objects.all()
            order = get_object_or_404(queryset, pk=pk)
            if self.request.user.is_superuser or self.request.user == order.user:
                if 'count' in request.data:
                    order.count = request.data["count"]
                if 'address' in request.data:
                    order.address = request.data["address"]
                if 'city' in request.data:
                    order.city = request.data["city"]
                if 'first_name' in request.data:
                    order.first_name = request.data["first_name"]
                if 'last_name' in request.data:
                    order.last_name = request.data["last_name"]
                if 'payment_method' in request.data:
                    order.payment_method = request.data["payment_method"]
                order.save()
                serializer = OrderSerializer(order)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response("У вас нет прав для этих действии!", status=status.HTTP_405_METHOD_NOT_ALLOWED)
        return Response("Вы не авторизированы!", status=status.HTTP_401_UNAUTHORIZED)
    

class RegisterUserAPIView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class APILogoutView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        if self.request.data.get('all'):
            token: OutstandingToken
            for token in OutstandingToken.objects.filter(user=request.user):
                _, _ = BlacklistedToken.objects.get_or_create(token=token)
            return Response({"status": "OK, goodbye, all refresh tokens blacklisted"})
        refresh_token = self.request.data.get('refresh_token')
        tokens = RefreshToken(token=refresh_token)
        tokens.blacklist()
        return Response({"status": "OK, goodbye"})


