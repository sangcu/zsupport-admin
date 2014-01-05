Support.Me.CustomizeController = Ember.ObjectController.extend({	
	language:null,
	config:{
		headerBackground:'#000000',
		headerForeground:'#ffffff',
		textColor:'#bdc3c7',
		agentColor:'#16a085',
		guestColor:'#e67e22',
		chatBackgroundColor:'#e5e5e5',
		languageHeaderText:'Chúng tôi đang Online. Hỏi ngay',
		languageInputText:'Type and press <Enter>',
		languageEmptyText:'Bạn có câu hỏi hoặc cần tư vấn, nhập nội dung phía dưới và chúng tôi sẽ tư vấn cho bạn.',
		languageEmptyOfflineText:'Hiện đang ngoài giờ làm việc. Bạn vui lòng nhập nội dung và chọn gửi. Trả lời tin nhắn là việc đầu tiên của chúng tôi trong ngày làm việc',
		languageConnectingText:'Connecting to Agent',
		languageEmailText:'Email',
		languageEmailSuccessful:'Thông tin đã được gửi',
	},
});