import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Trash2, LogOut } from 'lucide-react';

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserInfoModal({ isOpen, onClose }: UserInfoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-lg font-medium">个人信息</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-auto p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* User Info */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">用户名</span>
              <span className="text-sm font-medium">Admin</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">手机号</span>
              <span className="text-sm font-medium">199****65</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">邮箱</span>
              <span className="text-sm font-medium">Admin@philips.com</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">删除所有对话</span>
              <Button 
                variant="default" 
                size="sm"
                className="bg-primary hover:bg-primary-hover text-primary-foreground px-4"
              >
                删除
              </Button>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">注销账号</span>
              <Button 
                variant="default" 
                size="sm"
                className="bg-primary hover:bg-primary-hover text-primary-foreground px-4"
              >
                注销
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}