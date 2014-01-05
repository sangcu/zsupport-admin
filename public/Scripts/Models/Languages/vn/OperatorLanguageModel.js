Support.Me.OperatorInProcessLanguageModel = Ember.Object.extend({
    labelDialogTitle: 'Đang hỗ trợ',
    labelCloseButton: 'Đóng',
    labelTime: 'Bắt đầu lúc',
    labelMessage: 'Nội dung',
    labelSelect: 'Chọn',
    labelInforCaption: 'Thông tin',
    labelInforContent: "Hiện chưa có yêu cầu nào đang xử lý",
    labelAction: "Thao tác",
    labelMenuClose: "Đóng phiên chat",
    labelMenuOpen:"Tiếp tục chat"
});
Support.Me.OperatorQueueLanguageModel = Ember.Object.extend({
    labelDialogTitle: 'Yêu cầu mới',
    labelCloseButton: 'Đóng',
    labelTime: 'Bắt đầu lúc',
    labelMessage: 'Nội dung',
    labelSelect: 'Chọn',
    labelInforCaption: 'Thông tin',
    labelInforContent: "Hiện chưa có yêu cầu mới."
});
Support.Me.OperatorBoardLanguageModel = Ember.Object.extend({
    CurrentPage:'Khách đang xem',
    MarkCompleted:'Hoàn tất',
    MoreInfo:'Xem lịch sử',
    BlockUser:'Từ chối hỗ trợ',
    EmailSupport:'Gửi phàn hồi qua email',
    Redirect:'Điều hướng...',
    Send:'Gửi',
    AddLink:'Gửi liên kết',
    TestLink:'Kiểm tra',
    Activity:'Các hoạt động khác'
});

Support.Me.DashboardLanguageModel = Ember.Object.extend({    
    TrafficMonitor:'Thống kê lưu lượng truy cập và hỗ trợ',
    TicketStatus:"Tỉ lệ hỗ trợ",
    EmployeeStatistic:'Biểu đồ hiệu quả làm việc',
    Connected:'Kết nối',
    Drop:'Mất kết nối',
    Completed:'Thành công',
    Traffic:'Lưu lượng',
    Year:'Năm',
    Day:'Ngày'
});

Support.Me.CustomizeLanguageModel = Ember.Object.extend({    
    LayoutOption:"Tùy chỉnh màu sắc",
    LanguageAndConfig:"Ngôn ngữ",
    HeaderBackground:"Tiêu đề - Màu nền",
    HeaderForeground:"Tiêu đề - Màu chữ",
    TextColor:"Màu nội dung",
    AgentColor:"Màu - Nhân viên",
    GuestColor:"Màu - Khách",
    BackgroundColor:"Màu nền chat",
    Width:"Độ rộng",
    Height:"Độ cao",
    HeaderText:"Tiêu đề",
    InputInfoText:"Hướng dãn nhập",
    EmptyMessage:"Hiển thị khi chưa có nội dung",
    ConnectingMessage:"Đang kêt nối",
    ConntectedMessage:"Kết nối tới",
    Publish:"Lưu cấu hình",
    Online:'Trong giờ làm việc',
    Offline:'Ngoài giờ làm việc',
    SentSuccessful:'Thông tin đã được gửi',
    Email:'Địa chỉ Email'

});

Support.Me.SettingLanguageModel = Ember.Object.extend({    
   Settings:'Cài đặt tham số',
   Agents:'Hỗ trợ viên',
   colName:'Họ và tên',
   colRoles:'Vai trò',
   colAlias:'Tên hiển thị',
   colAvatar:'Hình đại diện',
   Delete:'Xóa',
   Edit:'Edit',
   AddAgent:'Thêm hỗ trợ viên',
   WorkingTime:'Giờ làm việc',
   BehaviouWhenOffline:'Hoạt động không hỗ trợ'
});
Support.Me.MomentLanguageModel={
            future : "trong %s",
            past : " Cách đây %s",
            s : "vài giây",
            m : "1 phút",
            mm : "%d phút",
            h : "1  giờ",
            hh : "%d giờ",
            d : "1 ngày",
            dd : "%d ngày",
            M : "1 tháng",
            MM : "%d tháng",
            y : "1 năm",
            yy : "%d năm"
        };