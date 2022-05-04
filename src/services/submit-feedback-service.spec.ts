import { SubmitFeedbackService } from "./submit-feedback-service";

// spy= espiões
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);
describe("submite feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Teste comente",
        screenshot: "data:image/png;base64, heu2e8722"
      })
    ).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });
  it("should not be able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Teste comente",
        screenshot: "data:image/png;base64, heu2e8722"
      })
    ).rejects.toThrow();
  });
  it("should not be able to submit a feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64, heu2e8722"
      })
    ).rejects.toThrow();
  });
  it("should not be able to submit a feedback with an invalid screenshot ", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Tudo bugado!",
        screenshot: "teste.png"
      })
    ).rejects.toThrow();
  });
});
