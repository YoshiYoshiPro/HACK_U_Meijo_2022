import os
import logging
import csv
import random
# from tkinter.messagebox import QUESTION
import main
filename = 'questions.csv'

logger = logging.getLogger()
logger.setLevel(logging.INFO)

from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage, StickerSendMessage, QuickReply, QuickReplyButton, MessageAction, PostbackAction, FollowEvent
)

MAX_QUESTION_NUMBER = 50        # クイズの最大問題数
QUESTION = 10                   # 出題する問題数

# 乱数生成（引数：最大問題数，欲しい問題数）
# def random_generator(max_question_num, want_question_num):
#     previous = []
#     while len(previous) < want_question_num:
#         random_num = random.randint(1, max_question_num)
#         if not random_num in previous:
#             previous.append(random_num)
#     return previous


# 環境変数からLINEBOTのシークレットキーやアクセストークン取得
LINE_CHANNEL_ACCESS_TOKEN   = os.environ['LINE_CHANNEL_ACCESS_TOKEN']
LINE_CHANNEL_SECRET         = os.environ['LINE_CHANNEL_SECRET']
LINE_BOT_API = LineBotApi(LINE_CHANNEL_ACCESS_TOKEN)
LINE_HANDLER = WebhookHandler(LINE_CHANNEL_SECRET)


# Lambdaのハンドル
def lambda_handler(event, context):
    logger.info(event)
    signature = event["headers"]["x-line-signature"]
    body = event["body"]


    # フォローイベント
    @LINE_HANDLER.add(FollowEvent)
    def follow_message(line_follow_event):
        profile = LINE_BOT_API.get_profile(line_follow_event.source.user_id)
        logger.info(profile)
        LINE_BOT_API.reply_message(line_follow_event.reply_token, TextSendMessage(text=f'{profile.display_name}さん、フォローありがとう!\n「問題」と送信すると問題がはじまります!!'))


    # メッセージイベント
    @LINE_HANDLER.add(MessageEvent, message=TextMessage)
    def on_message(line_reply_event):
        profile = LINE_BOT_API.get_profile(line_reply_event.source.user_id)
        logger.info(profile)

        message = line_reply_event.message.text.lower()
        class Question:
            def __init__(self, questions_list):
                self.questions_list = questions_list

            def get_questions(self, num):
                return self.questions_list[num][0]

            def get_answer(self, num):
                return self.questions_list[num][1]

            def get_comment(self, num):
                return self.questions_list[num][2]

        # 出題する問題番号のリスト生成
        question_num = random_generator(MAX_QUESTION_NUMBER, QUESTION)

        # インスタンス化
        questions = Question(main.ans_lists)

        for i in question_num:
            if message == '問題':
                LINE_BOT_API.reply_message(line_reply_event.reply_token,
                    TextSendMessage(text=questions.get_questions(i),
                            quick_reply=QuickReply(items=[
                                QuickReplyButton(action=PostbackAction(label="〇", data="〇", text="〇")),
                                QuickReplyButton(action=PostbackAction(label="×", data="×", text="×")),
                            ])
                    )
                )
            elif message == questions.get_answer(i):
                LINE_BOT_API.reply_message(line_reply_event.reply_token,
                    TextSendMessage(text='正解！',
                            quick_reply=QuickReply(items=[
                                QuickReplyButton(action=PostbackAction(label="問題", data="問題", text="問題"))
                            ])
                    )
                )
            else:
                LINE_BOT_API.reply_message(line_reply_event.reply_token,
                    TextSendMessage(text='不正解！\n\n' + questions.get_comment(i),
                            quick_reply=QuickReply(items=[
                                QuickReplyButton(action=PostbackAction(label="問題", data="問題", text="問題"))
                            ])
                    )
                )

    LINE_HANDLER.handle(body, signature)
    return 0