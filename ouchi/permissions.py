from rest_framework import permissions

class BaseUserPermissions(permissions.BasePermission):
    """
    Base permission class
    """
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True

        # check if user is a given obj's user
        return request.user == obj.user

class SuperUserPermissions(permissions.BasePermission):
    """
    Base permission class
    """
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True

        # check if user is super user
        return request.user.is_superuser

class BaseTransactionPermissions(permissions.BasePermission):
    """
    Rermissions for Transaction objects
    """
    def has_object_permission(self, request, view, obj):
        # check if user is a given obj's requester or respondent
        return request.user == obj.requester or request.user == obj.respondent