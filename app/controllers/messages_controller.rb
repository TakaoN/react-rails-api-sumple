class MessagesController < ApplicationController
  before_action :set_message, only: [:show, :update, :destroy]

  def index
    messages = Message.all
    render json: messages
  end

  def create
    message = Message.new(message_params)
    message.save!
  end

  def show
    render json: @message
  end

  def update
    @message.update!(message_params)
  end

  def destroy
    @message.destroy!
  end

  private

  def set_message
    @message = Message.find(params[:id])
  end

  def message_params
    params.require(:message).permit(:title, :content)
  end
end
